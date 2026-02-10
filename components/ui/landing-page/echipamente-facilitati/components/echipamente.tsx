import { HeaderHr } from "@/components/ui/headerhr";
import { h3Settings } from "@/lib/constants/classes-tw/h3-settings";
import { SetStateAction } from "react";

export function Echipamente({ echipament, openedPopup, setOpenedPopup }: { echipament: {tip: string, denumire: string, poze: number}[], openedPopup: string, setOpenedPopup: React.Dispatch<SetStateAction<string>> }){
    return (
        <div
                    className="p-16 basis-1/2 flex flex-col bg-background gap-4 rounded-2xl">
                    <div>
                        <div
                            className="flex flex-col">
                            <h3 className={`${h3Settings} font-anton uppercase`}>Echipamente</h3>
                            <HeaderHr color="primary" size="sm" />   
                        </div>
                        <p
                            className="text-primary-foreground text-base leading-normal opacity-50 my-4">
                            Sălile Titan Elite Fitness dispun de echipament premium, de ultimă generație, acoperind toate nevoile esențiale atât pentru activitate fizică intensă, cât și pentru relaxare și detașare.
                        </p>
                    </div>
                    <div
                        className="flex flex-col gap-4 overflow-y-auto scrollbar-thin"
                        style={{
                            maxHeight: `calc(144px * 3 + 32px)`
                        }}>
                        {echipament.map((echipament, index) => (
                            <div
                                key={`${echipament.denumire}-${index}`}
                                className="w-full h-36 relative cursor-pointer"
                                onClick={() => setOpenedPopup(`echipament-${echipament.denumire}`)}>
                                <img src={`/images/landing-page/echipament-${index + 1}.png`} alt="" />
                                <div
                                    className="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 items-center">
                                    <p
                                        className={`${h3Settings} !text-4xl !w-full uppercase text-center !text-secondary-foreground`}
                                        style={{
                                            fontFamily: "var(--header-font)",
                                            textShadow: "var(--accent-shadow)",
                                        }}>
                                        {echipament.tip}
                                    </p>
                                    <HeaderHr size="sm" color="accent" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
    )
}