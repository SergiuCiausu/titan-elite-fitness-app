import { ClassSession } from "@/lib/constants/class-sessions-type";
import { ChevronDown } from "lucide-react";
import { SetStateAction } from "react";

export function StackSessionLayout({ session, rowHeight, hoursGap, dayCellWidth, classGap, selectedStackClass, setSelectedStackClass }: { session: ClassSession, rowHeight: number, hoursGap: number, dayCellWidth: number, classGap: number, selectedStackClass: string, setSelectedStackClass: React.Dispatch<SetStateAction<string>> }){

    const iconSrc = `/icons/classes/${session.class_icon}-white.svg`;
    const sessionStart = session.class_starts_at;
    const sessionEnd = session.class_ends_at;
    const sessionHeight = (rowHeight + hoursGap) * ((sessionEnd - sessionStart - (sessionEnd - sessionStart) % 60) / 60 + ((sessionEnd - sessionStart) % 60) / 60) - classGap - 1;

    const handleClassClick = () => {
        setSelectedStackClass(prev => prev === session.id ? "" : session.id);
    }

    return (
        <div
            className={`p-3 cursor-pointer select-none flex flex-col gap-4 rounded-2xl`}
            style={{
                width: dayCellWidth - classGap * 2 - 16*2,
                marginTop: classGap * 2,
                backgroundColor: `hsl(var(--${session.class_icon}))`,
            }}
            >
            <div
                className="cursor-pointer flex items-center justify-between w-full"
                onClick={handleClassClick}>
                <div
                    className={`flex flex-col h-fit`}>
                        <div
                            className="flex items-center gap-1 mb-[2px]">
                            <img src={iconSrc} alt={`${session.class_icon} icon`} className={`w-5 h-5`} />
                            <p
                                className="text-secondary-foreground text-sm font-bold leading-tight">
                                {session.class_name}
                            </p> 
                        </div>
                    <p
                        className="text-secondary-foreground text-sm leading-tight">
                        {(sessionStart - sessionStart % 60) / 60 < 10 ? `0${(sessionStart - sessionStart % 60) / 60}` : (sessionStart - sessionStart % 60) / 60}:{sessionStart % 60 < 10 ? `0${sessionStart % 60}` : sessionStart % 60} - {(sessionEnd - sessionEnd % 60) / 60 < 10 ? `0${(sessionEnd - sessionEnd % 60) / 60}` : (sessionEnd - sessionEnd % 60) / 60}:{sessionEnd % 60 < 10 ? `0${sessionEnd % 60}` : sessionEnd % 60}
                    </p> 
                </div>
                <ChevronDown size={16} strokeWidth={3} className={`text-secondary-foreground ${selectedStackClass === session.id ? "rotate-180" : ""}`} />
            </div>
            
            {selectedStackClass === session.id 
            ?
                <div
                    className="w-full flex flex-col gap-1">
                        <div
                            className="w-full flex gap-2 items-center">
                                <img src="/icons/general/coach-white.svg" alt="Coach icon" className="w-5 h-5 mb-[2px]" />
                                <p className="text-secondary-foreground text-sm leading-tight font-bold">{session.coach_first_name} {session.coach_last_name}</p>
                        </div>
                        <div
                            className="w-full flex gap-2 items-center">
                                <img src="/icons/general/location-white.svg" alt="Coach icon" className="w-5 h-5 mb-[2px]" />
                                <p className="text-secondary-foreground text-sm leading-tight">{session.tenant_name}, {session.tenant_city}</p>
                        </div>
                </div>
            : ""}
        </div>
    )
}