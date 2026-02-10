"use client";

import { heroPerksList } from "@/lib/constants/hero-perks";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function HeroPerks() {
    
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted) return null;

    return(
      <div
        className="flex w-[var(--content-width)] justify-between">
        {heroPerksList.map(perk => {

          const Icon = typeof(perk.icon) === "string" ? `${perk.icon}-${theme === "light" ? "light" : "dark"}.svg` : perk.icon;

          return (
            <div
              key={perk.label}
              className="flex flex-col gap-1 items-center justify-center">
                {typeof(Icon) === "string"
            ?
              <img src={Icon} alt="perk-icon" className="3xl:w-8 3xl:h-8" />
            : 
                <Icon className="text-primary 3xl:w-8 3xl:h-8" />
              }
              <p className="font-header text-sm 3xl:text-base font-bold text-secondary-foreground uppercase">{perk.label}</p>
          </div>
        )})}
        </div>
    )
}  