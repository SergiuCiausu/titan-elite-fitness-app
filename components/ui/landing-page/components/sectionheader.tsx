import { h2Settings } from "@/lib/constants/classes-tw/h2-settings";
import { HeaderHr } from "../../headerhr";

export function SectionHeader({ text }: { text: string }) {
    return (
        <div
            className="w-full flex flex-col gap-4 items-center justify-center">
            <h2 className={`uppercase ${h2Settings} text-primary-foreground`}>{text}</h2>
            <HeaderHr />
        </div>
    )
}