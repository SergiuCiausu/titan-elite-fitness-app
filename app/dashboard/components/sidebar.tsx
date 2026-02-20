import { DashboardSidebarLink, linkHrefHead } from "@/lib/constants/dashboard-sidebar-links";
import Link from "next/link";

export function Sidebar({ links, selectedLink }: { links: DashboardSidebarLink[], selectedLink: string }) {

    return (
        <div
            className="h-screen w-[var(--dashboard-sidebar-content-width)] p-[var(--dashboard-sidebar-padding)] flex flex-col justify-between">
                <Link
                    href="/dashboard"
                    className="font-body text-sm text-primary-foreground font-semibold">
                        Titan Elite Fitness
                </Link>
                <div
                    className="mt-2 flex flex-col gap-2 w-full">
                        {links.map(link => {

                            const Icon = typeof (link.icon) === "string" ? null : link.icon;
                            const imgSrc = typeof (link.icon) === "string" ? link.icon : "";
                            const isSelected = selectedLink === link.label

                            return (
                                <Link
                                    key={link.label}
                                    className={`flex items-center px-4 py-1 rounded-lg gap-2 cursor-pointer`}
                                    href={`${linkHrefHead}${link.href}`}>
                                        {
                                            Icon
                                            ? (
                                                <Icon className={`w-4 h-4 ${isSelected ? "text-secondary-foreground" : "text-primary-foreground"}`} />
                                            )
                                            : (
                                                <img src={imgSrc} alt={`${link.label} icon`} className={`w-4 h-4 ${isSelected ? "text-secondary-foreground" : "text-primary-foreground"}`} />
                                            )
                                        }
                                        <p className={`font-body font-semibold ${isSelected ? "text-secondary-foreground" : "text-primary-foreground"}`}>{link.label}</p>
                                </Link>
                        )})}
                </div>
        </div>
    )
}