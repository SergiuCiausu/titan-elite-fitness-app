import { ComponentType, SVGProps } from "react";
import { QrCode } from "lucide-react";
import { ShieldCheck } from "lucide-react";
import { Hand } from "lucide-react";
import { ShowerHead } from 'lucide-react';
import { Wifi } from "lucide-react";
import { Heater } from "lucide-react";

export type HeroPerk = {
    icon: ComponentType<SVGProps<SVGSVGElement>> | string,
    label: string,
}

export const heroPerksList: HeroPerk[] = [
    {
        icon: "/icons/hero/medal",
        label: "Echipament premium",
    },
    {
        icon: QrCode,
        label: "Acces digital",
    },
    {
        icon: ShieldCheck,
        label: "Sistem filtrare aer",
    },
    {
        icon: "/icons/hero/flower-spa",
        label: "Aerobic & Stretching",
    },
    {
        icon: Hand,
        label: "Clase pentru orice nivel",
    },
    {
        icon: ShowerHead,
        label: "Curățenie & igienă",
    },
    {
        icon: Wifi,
        label: "Wi-fi rapid gratuit",
    },
    {
        icon: Heater,
        label: "Saună gratuită",
    },
]