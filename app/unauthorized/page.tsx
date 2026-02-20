"use client";

import { Button } from "@/components/ui/button";
import { errorLayoutSettings } from "@/lib/constants/classes-tw/error-layout-settings";
import { ArrowRight} from "lucide-react";
import { redirect } from "next/navigation";

export function page(){
    return (
        <div
            className={errorLayoutSettings}>
            <img src={"/icons/errors/unauthorized.png"} alt="Error image" style={{ width: 256 }} />
            <div
                className="flex flex-col gap-2 items-center">
                <p className="text-base text-primary-foreground">Zât! N-ai voie să vezi pagina asta.</p>
                <Button onClick={() => redirect("/")}>
                    Întoarce-te pe pagina principală
                    <ArrowRight strokeWidth={3} />
                </Button>
            </div>
        </div>
    )
}