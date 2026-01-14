"use client";

import { heroPerksList } from "@/lib/constants/hero-perks";
import { useTheme } from "next-themes";

export function HeroPerks() {
    
    const { theme, setTheme } = useTheme();

    return(
      <div
        className="flex w-[var(--content-width)] justify-between">
        {heroPerksList.map(perk => {

          const Icon = perk.icon;

          return (
            <div
              key={perk.label}
              className="flex flex-col gap-1 items-center justify-center">
                {typeof(perk.icon) === "string"
            ?
              <img src={`${Icon}-${theme === "light" ? "light" : "dark"}.svg`} alt="perk-icon" className="3xl:w-8 3xl:h-8" />
            : 
                <Icon className="text-primary 3xl:w-8 3xl:h-8" />
              }
              <p className="font-header text-sm 3xl:text-base font-bold text-primary-foreground uppercase">{perk.label}</p>
          </div>
        )})}
        </div>
    )
}  