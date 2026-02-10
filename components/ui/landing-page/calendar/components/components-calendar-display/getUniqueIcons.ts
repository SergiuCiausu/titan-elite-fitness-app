import { ClassSession } from "@/lib/constants/class-sessions-type";

export function getUniqueIcons({ sessionIds, sessions } : { sessionIds: string[], sessions: Record<string, ClassSession> }) {
    const renderedIcons = new Set();

    const uniqueSessionIds = sessionIds.filter(sessionId => {
        const normalizedClassName = sessions[sessionId].class_name
            .toLowerCase()
            .replace(/-/g, "");

        if (renderedIcons.has(normalizedClassName)) return false;
        renderedIcons.add(normalizedClassName);
        return true;
    })
    
    return uniqueSessionIds;
}