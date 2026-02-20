'use client'

import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { ClassSession } from "../constants/class-sessions-type"
import { hydrateClassStacks } from '../functions/hydrate-class-stacks'

export type Day = {
	date: string
	stackIds: string[]
}

export type ClassSessionByDay = {
	sessions: ClassSession[]
}

export type Stack = {
	id: string
	start: number
	end: number
	sessionIds: string[]
}

export type CalendarState = {
	days: Record<string, Day>
	stacks: Record<string, Stack>
	sessions: Record<string, ClassSession>
	
	hydrate: (sessions: Record<string, ClassSession[]>) => void
	upsertSession: (session: ClassSession) => void
	removeSession: (sessionId: string) => void
}

export function buildStacks(sessions: ClassSession[]): Stack[] {
  if (sessions.length === 0) return []

  const sorted = [...sessions].sort((a, b) => a.class_starts_at - b.class_starts_at)
  const stacks: Stack[] = []

  let current: ClassSession[] = []
  let currentEnd = -1

  for (const session of sorted) {
    if (session.class_starts_at < currentEnd) {
      current.push(session)
      currentEnd = Math.max(currentEnd, session.class_ends_at)
    } else {
      if (current.length) {
        stacks.push(makeSingleStack(current))
      }
      current = [session]
      currentEnd = session.class_ends_at
    }
  }

  if (current.length) stacks.push(makeSingleStack(current))

  return stacks
}

export function makeSingleStack(sessions: ClassSession[]): Stack {
  const start = Math.min(...sessions.map(s => s.class_starts_at))
  const end = Math.max(...sessions.map(s => s.class_ends_at))
  const { class_day, class_date, class_month, class_year } = sessions[0]

  return {
    id: `${class_day}-${class_date}-${class_month}-${class_year}-${start}-${end}`,
    start,
    end,
    sessionIds: sessions.map(s => s.id),
  }
}

export const useCalendarStore = create<CalendarState>()(
  immer((set, get) => ({
    days: {},
    stacks: {},
    sessions: {},

    hydrate(sessions) {

      const { days, stacks, sessionsMap } = hydrateClassStacks(sessions);

      set({ days, stacks, sessions: sessionsMap })
    },
	
    upsertSession(session) {
      set(state => {
        const prev = state.sessions[session.id]
        state.sessions[session.id] = session

        const affectedDates = new Set<string>()
        if (prev) affectedDates.add(prev.class_date)
        affectedDates.add(session.class_date)

        for (const date of affectedDates) {
          const daySessions = Object.values(state.sessions)
            .filter(s => s.class_date === date)

          const oldStackIds = state.days[date]?.stackIds ?? []
          for (const id of oldStackIds) {
            delete state.stacks[id]
          }

          const newStacks = buildStacks(daySessions)

          state.days[date] = {
            date: date,
            stackIds: newStacks.map(s => s.id),
          }

          for (const s of newStacks) {
            state.stacks[s.id] = s
          }
        }
      })
    },

    removeSession(sessionId) {
      set(state => {
        const session = state.sessions[sessionId]
        if (!session) return

        const date = session.class_date
        delete state.sessions[sessionId]

        const daySessions = Object.values(state.sessions)
          .filter(e => e.class_date === date)

        const oldStackIds = state.days[date]?.stackIds ?? []
        for (const id of oldStackIds) {
          delete state.stacks[id]
        }

        const newStacks = buildStacks(daySessions)

        state.days[date] = {
          date: date,
          stackIds: newStacks.map(c => c.id),
        }

        for (const s of newStacks) {
          state.stacks[s.id] = s
        }
      })
    },
  }))
)