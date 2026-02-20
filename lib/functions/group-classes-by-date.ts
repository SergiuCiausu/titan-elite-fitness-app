import { ClassSession } from "../constants/class-sessions-type";

export function groupClassesByDate(classes: ClassSession[]) {
    const sessionsObj: Record<string, ClassSession[]> = {}
    
    classes.forEach((session: ClassSession) => {
        if(!sessionsObj[session.class_date]) {
            sessionsObj[session.class_date] = [];
        }
        sessionsObj[session.class_date].push(session);
    })

    return sessionsObj;
}