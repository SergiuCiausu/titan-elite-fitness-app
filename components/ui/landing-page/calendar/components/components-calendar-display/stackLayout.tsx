"use client";

import { Stack } from "@/lib/zustand/useCalendarStore";
import { getUniqueIcons } from "./getUniqueIcons";
import { ClassSession } from "@/lib/constants/class-sessions-type";
import { getStackHeight } from "@/lib/functions/calendar/getHeight";
import { getStackTop } from "@/lib/functions/calendar/getTop";
import { ChevronDown } from "lucide-react";
import { SetStateAction, useState } from "react";
import { StackSessionLayout } from "./stackSessionLayout";

export function StackLayout({ stack, sessions, rowHeight, hoursGap, classGap, hours, dayCellWidth, index, selectedClass, setSelectedClass }: { stack: Stack, sessions: Record<string, ClassSession>, rowHeight: number, hoursGap: number, classGap: number, hours: number[], dayCellWidth: number, index: number, selectedClass: string, setSelectedClass: React.Dispatch<SetStateAction<string>> }) {

    const [selectedStackClass, setSelectedStackClass] = useState("");

    const uniqueIcons = getUniqueIcons({sessionIds: stack.sessionIds, sessions});

    const stackLength = stack.sessionIds.length
    const stackStart = stack.start;                                                                                
    const stackEnd = stack.end;      
    const stackWidth = dayCellWidth - classGap * 2; 
    const stackHeight = getStackHeight({ rowHeight, hoursGap, stackEnd, stackStart, classGap });
    const stackTop = getStackTop({ rowHeight, hoursGap, hours, stackStart });
    
    const handleStackClick = () => {
        setSelectedClass(prev => prev === stack.id ? "" : stack.id);
    }

    return (
        <div
            className={`absolute select-none bg-secondary ${selectedClass === stack.id ? "rounded-t-2xl z-30" : "rounded-2xl"} p-4 flex justify-between ${stackHeight <= rowHeight + hoursGap ? "items-center" : ""}`}
            style={{
                width: stackWidth,
                height: stackHeight,
                top: stackTop,
                marginLeft: index !== 0 ? classGap : 0,
                marginTop: classGap * 2,
            }}>
            <div
                className="cursor-pointer w-full h-full"
                onClick={handleStackClick}>
                    <div
                        className={`flex ${selectedClass === stack.id ? "" : "h-full"} items-center justify-between`}>
                        <div>
                            <p className="text-secondary-foreground">{stackLength} clase</p>
                                <div
                                    className="flex gap-1 items-center">
                                    {
                                        uniqueIcons.length < 7 && stackHeight > rowHeight + hoursGap ? uniqueIcons.map(sessionId => {
                                            const iconSrc = `/icons/classes/${sessions[sessionId].class_icon}-white.svg`;
                                            return (
                                                <div
                                                    key={`stack-${stack.id}-session-${sessionId}`}
                                                    className="flex-wrap"
                                                    >
                                                    <img
                                                        src={iconSrc}
                                                        alt={`${sessions[sessionId].class_icon} icon`}
                                                        className="w-4 h-4"
                                                    />
                                                </div>
                                            )
                                        }) : ""
                                    }
                                </div>
                        </div>
                        <ChevronDown size={24} strokeWidth={3} className={`text-secondary-foreground ${selectedClass === stack.id ? "rotate-180" : ""}`}/>
                    </div>
            </div>
            {selectedClass === stack.id 
            ? <div
                className={`absolute overflow-y-auto overflow-x-hidden scrollbar-thin flex flex-col items-center px-4 ${stackHeight > rowHeight + hoursGap ? "mt-4" : ""} gap-1 bg-secondary rounded-b-2xl`}
                style={{
                    width: stackWidth,
                    left: 0,
                    maxHeight: stackHeight * 2,
                    top: rowHeight + hoursGap - classGap * 2,
                }}>
                {stack.sessionIds.map(sessionId => (
                    <StackSessionLayout key={sessionId} session={sessions[sessionId]} rowHeight={rowHeight} hoursGap={hoursGap} dayCellWidth={dayCellWidth} classGap={classGap} selectedStackClass={selectedStackClass} setSelectedStackClass={setSelectedStackClass} />
                ))}
            </div> 
            : ""}
        </div>
    )
}