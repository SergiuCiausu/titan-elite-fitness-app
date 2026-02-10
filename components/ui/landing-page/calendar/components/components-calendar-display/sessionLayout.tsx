import { ClassSession } from "@/lib/constants/class-sessions-type";
import { getStackHeight } from "@/lib/functions/calendar/getHeight";
import { getStackTop } from "@/lib/functions/calendar/getTop";
import { ChevronDown } from "lucide-react";
import { SetStateAction } from "react";

export function SessionLayout({ session, rowHeight, hoursGap, hours, classGap, dayCellWidth, index, stackLength, selectedClass, setSelectedClass }: { session: ClassSession, rowHeight: number, hoursGap: number, hours: number[], classGap: number, dayCellWidth: number, index: number, stackLength: number, selectedClass: string, setSelectedClass: React.Dispatch<SetStateAction<string>> }){

    const iconSrc = `/icons/classes/${session.class_icon}-white.svg`;
    const sessionStart = session.class_starts_at;
    const sessionEnd = session.class_ends_at;
    const sessionHeight = getStackHeight({ rowHeight, hoursGap, classGap, stackEnd: sessionEnd, stackStart: sessionStart });
    const sessionTop = getStackTop({ rowHeight, hoursGap, hours, stackStart: sessionStart })

    const handleClassClick = () => {
        setSelectedClass(prev => prev === session.id ? "" : session.id);
    }

    return (
        <div
            className={`absolute cursor-pointer select-none flex flex-col rounded-2xl justify-center gap-1 ${selectedClass === session.id ? `${stackLength > 1 ? `${selectedClass === session.id ? "p-4" : "px-2"}` : "p-4"} gap-4 z-30` : ""} ${stackLength > 4 ? "rounded-xl" : ""}`}
            style={{
                top: sessionTop,
                width: selectedClass === session.id ? dayCellWidth - classGap * 2 : (dayCellWidth - classGap * 2) / stackLength - classGap,
                marginLeft: index !== 0 ? ((dayCellWidth - classGap * 2) / stackLength) * index + classGap : classGap,
                marginTop: classGap * 2,
                backgroundColor: `hsl(var(--${session.class_icon}))`,
                height: selectedClass === session.id ? undefined : sessionHeight,
            }}
            onClick={handleClassClick}>
                <div
                    className={`flex items-center w-full ${stackLength > 1 ? `${selectedClass === session.id ? "justify-between" : "px-2 justify-center"}` : `${selectedClass === session.id ? "" : "p-4"} justify-between`} ${stackLength > 4 ? `${selectedClass === session.id ? "" : "!p-0 flex-col"} gap-1 justify-center rounded-xl` : ""}`}>
                    <div
                        className={`flex items-center gap-1`}>
                        <img src={iconSrc} alt={`${session.class_icon} icon`} className={stackLength > 5 ? "w-5 h-5 mt-1" : `w-6 h-6 ${stackLength > 4 ? "mt-1" : ""}`} />
                        {stackLength < 2 || selectedClass === session.id ? 
                            <div>
                                <p
                                    className="text-secondary-foreground text-sm font-bold leading-tight">
                                    {session.class_name}
                                </p> 
                                <p
                                    className="text-secondary-foreground text-sm leading-tight">
                                    {(sessionStart - sessionStart % 60) / 60 < 10 ? `0${(sessionStart - sessionStart % 60) / 60}` : (sessionStart - sessionStart % 60) / 60}:{sessionStart % 60 < 10 ? `0${sessionStart % 60}` : sessionStart % 60} - {(sessionEnd - sessionEnd % 60) / 60 < 10 ? `0${(sessionEnd - sessionEnd % 60) / 60}` : (sessionEnd - sessionEnd % 60) / 60}:{sessionEnd % 60 < 10 ? `0${sessionEnd % 60}` : sessionEnd % 60}
                                </p> 
                            </div>
                            : ""
                        }
                    </div>
                    <ChevronDown size={selectedClass === session.id ? 24 : (stackLength > 4 ? 16 : 24)} strokeWidth={3} className={`text-secondary-foreground ${selectedClass === session.id ? "rotate-180" : ""}`} />
                </div>
            
            {selectedClass === session.id 
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