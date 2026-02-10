export function CalendarDayHeader({ width, day, dayOfTheWeek }: { width: number, day: number, dayOfTheWeek: string }){
    return <p className={`font-body font-bold text-sm 3xl:text-base text-center py-4`} style={{ width }}>{dayOfTheWeek} {day}</p>
}