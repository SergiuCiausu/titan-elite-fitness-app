import { HeaderHr } from "@/components/ui/headerhr";
import { h3Settings } from "@/lib/constants/classes-tw/h3-settings";
import { SetStateAction } from "react";

export function Facilitati({ facilitati, openedPopup, setOpenedPopup }: { facilitati: {tip: string, denumire: string,  poze: number}[], openedPopup: string, setOpenedPopup: React.Dispatch<SetStateAction<string>> }){
    return (
        <div
            className="p-16 basis-1/2 flex flex-col bg-background gap-4 rounded-2xl">
            <div>
                <div
                    className="flex flex-col">
                    <h3 className={`${h3Settings} font-anton uppercase`}>Facilități</h3>
                    <HeaderHr color="primary" size="sm" />   
                </div>
                <p
                    className="text-primary-foreground text-base leading-normal opacity-50 my-4">
                    Fiecare locație Titan Elite Fitness este dotată cu pachete de Spa & Wellness, având zonele prezentate mai jos, care să completeze experiența exclusivă pe care căutăm să o oferim.
                </p>
            </div>
            <div
                className="flex flex-col gap-4 overflow-y-auto scrollbar-thin"
                style={{
                    maxHeight: `calc(144px * 3 + 32px)`
                }}>
                {facilitati.map((facilitate, index) => (
                    <div
                        key={`${facilitate.denumire}-${index}`}
                        className="w-full h-36 relative cursor-pointer"
                        onClick={() => setOpenedPopup(`facilitate-${facilitate.denumire}`)}>
                        <img src={`/images/landing-page/facilitati-${index + 1}.png`} alt="" />
                        <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 items-center">
                            <p
                                className={`${h3Settings} uppercase text-center !text-secondary-foreground`}
                                style={{
                                    fontFamily: "var(--header-font)",
                                    textShadow: "var(--accent-shadow)",
                                }}>
                                {facilitate.tip}
                            </p>
                            <HeaderHr size="sm" color="accent" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}