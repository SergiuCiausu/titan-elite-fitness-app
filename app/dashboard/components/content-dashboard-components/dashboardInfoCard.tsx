import { h3Settings } from "@/lib/constants/classes-tw/h3-settings";
import { LucideIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { PieChartInfoCardDashboard } from "./pieChartInfoCardDashboard";

type InfoLayoutContent = {
    infoLabel: string,
    icon?: string | LucideIcon,
    infoHeader?: string,
    infoContent: string,
    isHighlighted?: boolean,
    completed?: number,
    total?: number,
}

export type InfoLayout = {
    type: "col" | "row-gap" | "row-between" | "pie-chart",
    info: InfoLayoutContent[],
}

export type InfoCardHeader = {
    text: string,
    highlightText?: string,
    highlightColor?: string,
}

export function DashboardInfoCard({ width, header, infoLayout, btn, isBtnDisabled, btnBgColor, btnHref, btnAboveText }: { width: number, header: InfoCardHeader, infoLayout: InfoLayout[], btn: string, isBtnDisabled?: boolean, btnBgColor: string, btnHref: string, btnAboveText?: string }){
    return (
        <div
            className="bg-background rounded-2xl p-8 flex flex-col justify-between"
            style={{ width }}>
                <div
                    className="flex flex-col">
                    <h3
                        className={`${h3Settings} !text-2xl mb-4`}>
                        {header.text} {header.highlightText ? <span style={{ color: `var(--${header.highlightColor})`}}>{header.highlightText}</span> : ""}
                    </h3>
                        {infoLayout.map(infoArray => (
                            infoArray.type === "col" 
                        ?
                        <div
                            className={`flex flex-wrap ${infoLayout.length === 1 && infoLayout[0].info.length === 1 ? "justify-center" : "justify-between"}`}>
                            {infoArray.info.map(info => (
                                <div
                                    key={info.infoHeader}
                                    className="flex flex-col">
                                        <p
                                            className="font-body font-semibold text-sm text-primary-foreground">
                                            {info.infoHeader!}
                                        </p>
                                        <p
                                            className="font-body text-sm text-primary-foreground opacity-50">
                                            {info.infoContent}
                                        </p>
                                </div>
                            ))}
                        </div>
                        : infoArray.type === "row-between"
                            ?
                            <div
                                className="flex flex-col">
                                {infoArray.info.map(info => (
                                    <div
                                        key={info.infoHeader}
                                        className="flex items-center justify-between">
                                            <p
                                                className={`font-body font-semibold ${info.isHighlighted ? "text-base" : "text-sm"} text-primary-foreground`}>
                                                {info.infoHeader}
                                            </p>
                                            <p
                                                className={`font-body ${info.isHighlighted ? "text-base text-accent" : "text-sm text-primary-foreground"}`}>
                                                {info.infoContent}
                                            </p>
                                    </div>
                                ))}
                            </div>
                            :
                                infoArray.type === "row-gap" 
                                ?   
                                    <div
                                        className="flex flex-col gap-1">
                                        {
                                            infoArray.info.map(info => {

                                                const Icon = typeof (info.icon) === "string" ? null : info.icon;
                                                const imgSrc = typeof (info.icon) === "string" ? info.icon : "";

                                                return (
                                                    <div
                                                        key={info.infoHeader}
                                                        className="flex gap-2 items-center">
                                                            {
                                                                Icon
                                                                ? (
                                                                    <Icon className={`w-5 h-5 text-accent`} />
                                                                )
                                                                : (
                                                                    <img src={imgSrc} alt={`${info.infoLabel} icon`} className={`w-4 h-4 ${info.isHighlighted ? "text-accent" : "text-primary-foreground"}`} />
                                                                )
                                                            }
                                                            <p className="font-body text-sm text-primary-foreground">{info.infoContent}</p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div> 
                                    
                                :
                                    <div>
                                        {
                                            infoArray.info.map(info => {

                                            const data = Array.from({ length: info.total! }, (_, i) => ({
                                                value: 1,
                                                fill: i < info.completed! ? "hsl(var(--accent)" : "hsl(var(--primary-foreground)"
                                            }))

                                            return <PieChartInfoCardDashboard data={data} centerLabel={`${info.completed!}/${info.total!}`} />
                                        })
                                        }
                                    </div>
                        ))}
                        <div
                            className={`flex flex-col ${isBtnDisabled ? "gap-1" : "gap-4"}`}>
                            {btnAboveText ? <p className={`font-body text-center ${isBtnDisabled ? "text-xs text-primary-foreground opacity-50" : "font-semibold text-primary-foreground text-sm"}`}>{btnAboveText}</p> : ""}
                            <button className={`w-full px-6 py-4 text-xl ${isBtnDisabled ? "opacity-20" : "" } bg-primary text-primary-foreground text-center rounded-2xl`} style={ btnBgColor ? { backgroundColor: `hsl(var(--${btnBgColor}))` } : undefined} onClick={() => redirect(btnHref)}>{btn}</button>
                        </div>
                </div>
        </div>
    )
}