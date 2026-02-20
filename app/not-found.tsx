"use client";

import { Button } from "@/components/ui/button";
import { errorLayoutSettings } from "@/lib/constants/classes-tw/error-layout-settings";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

export default function NotFound(){

    const { theme, resolvedTheme } = useTheme();
    const router = useRouter();

    const themeName = resolvedTheme ?? "dark";
    
    const imgSrc = `/images/landing-page/no-coaches-${themeName}.png`;

    return (
        <div
            className={errorLayoutSettings}>
            <img src={imgSrc} alt="Error image" style={{ width: 256}} />
            <div
                className="flex flex-col gap-2">
                <p className="text-base text-primary-foreground">Ne pare rău. Această pagină nu există.</p>
                <Button onClick={() => router.push("/")}>
                    Întoarce-te pe pagina principală
                </Button>
            </div>
        </div>
    )
}