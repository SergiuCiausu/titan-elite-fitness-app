import { HeaderHr } from "../../headerhr";
import { h1Settings } from "@/lib/constants/h1-settings";

export function HeroHeader() {
  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="relative w-full">
        <h1 className={`uppercase z-10 ${h1Settings} text-center text-primary-foreground md:!leading-tight`}>Echipat pentru performanță. Creat pentru tine.</h1>
        {/* <h1 className="sr-only">Echipat pentru performanță. Creat pentru tine.</h1>
        <img src="/hero-h1.svg" alt="Hero outline" className="absolute bottom-1 right-1" /> */}
      </div>
      <HeaderHr />
    </div>
  );
}
