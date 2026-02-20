"use client";

import { Button } from "@/components/ui/button";
import { errorLayoutSettings } from "@/lib/constants/classes-tw/error-layout-settings";
import { ArrowRight, LucideIcon } from "lucide-react";
import { redirect } from "next/navigation";

export function UnauthorizedLayout({ text, btn, route, src } : { text: string, btn: string, route: string, src: string }){
    return (
        <div
            className={errorLayoutSettings}>
            <img src={src} alt="Error image" style={{ width: 256 }} />
            <div
                className="flex flex-col gap-2 items-center">
                <p className="text-base text-primary-foreground">{text}</p>
                <Button onClick={() => redirect(route)}>
                    {btn}
                    <ArrowRight strokeWidth={3} />
                </Button>
            </div>
        </div>
    )
}