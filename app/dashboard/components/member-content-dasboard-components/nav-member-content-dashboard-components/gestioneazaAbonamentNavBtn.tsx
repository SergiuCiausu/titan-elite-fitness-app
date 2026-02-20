import { linkHrefHead } from "@/lib/constants/dashboard-sidebar-links";
import { CircleFadingArrowUp } from "lucide-react";
import Link from "next/link";
import { navIconClasses } from "../navMemberContentDashboard";

export function GestioneazaAbonamentNavBtn() {
    return (
        <Link
            href={`${linkHrefHead}/abonament/gestioneaza-abonament`}
            className="flex items-center gap-2">
            <CircleFadingArrowUp className={navIconClasses} />
            <p className="font-body font-semibold text-primary-foreground text-sm">Gestionează abonament</p>
        </Link>
    )
}