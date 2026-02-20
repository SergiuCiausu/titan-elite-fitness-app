"use client";

import { CoachSpecialties } from "@/lib/functions/get-coaches";

export function CoachClassSpecialties({ coachSpecialties }: { coachSpecialties: CoachSpecialties[] }) {

    return (
        coachSpecialties.map(specialty => {
                
                const textColor = `hsl(var(--${specialty.Class_types.name.split(" ").join("").toLowerCase()}))`
                const imgSrc = `/icons/classes/${specialty.Class_types.icon}.svg`

                return (
                    <div
                        key={specialty.class_type_id}
                        className="flex items-center gap-1 mx-1">
                        <img src={imgSrc} alt={specialty.Class_types.icon} className="w-4 h-4" />
                        <p className="text-[13px]" style={{ color: textColor }}>{specialty.Class_types.name}</p>
                    </div>
                )
            })
    )
}