import { ClassSession } from "../constants/class-sessions-type";
import { buildStacks, Day, Stack } from "../zustand/useCalendarStore";

export function hydrateClassStacks(sessions: Record<string, ClassSession[]>) {
    const days: Record<string, Day> = {}
    const stacks: Record<string, Stack> = {}
    const sessionsMap: Record<string, ClassSession> = {}

    for (const day in sessions) {
        const daySessions = sessions[day];
        const dayStacks = buildStacks(daySessions)

        days[day] = {
            date: day,
            stackIds: dayStacks.map(s => s.id),
        }

        for (const stack of dayStacks) {
            stacks[stack.id] = stack
        }

        for (const s of daySessions) {
            sessionsMap[s.id] = s
        }
    }
    
    return { days, stacks, sessionsMap }
    
}