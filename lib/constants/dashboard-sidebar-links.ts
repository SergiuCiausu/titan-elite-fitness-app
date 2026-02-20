import { Calendar, CalendarDays, ChartLine, CircleDollarSign, CircleUser, Dumbbell, LayoutDashboard, LucideIcon, MapPin, Users } from "lucide-react"

export type DashboardSidebarLink = {
    icon: LucideIcon | string,
    label: string,
    href: string
}

const iconHrefHead = "/icons/dashboard"
export const linkHrefHead = "/dashboard"

export const dashboardSidebarCustomerLinks: DashboardSidebarLink[] = [
    {
        icon: LayoutDashboard,
        label: "General",
        href: "/",
    },
    {
        icon: `${iconHrefHead}/abonament-icon`,
        label: "Abonament",
        href: "/abonament",
    },
    {
        icon: Dumbbell,
        label: "Antrenamente & Clase",
        href: "/antrenamente-clase",
    },
    {
        icon: `${iconHrefHead}/confirmari-icon`,
        label: "Confirmări",
        href: "/confirmari",
    },
    {
        icon: CalendarDays,
        label: "Calendar",
        href: "/calendar",
    },
    {
        icon: `${iconHrefHead}/progres-transformari-icon`,
        label: "Progres & Transformări",
        href: "/progres-transformari",
    },
    {
        icon: `${iconHrefHead}/conversatii-icon`,
        label: "Conversații",
        href: "/conversatii",
    },
    {
        icon: ChartLine,
        label: "Statistici",
        href: "/statistici",
    },
    {
        icon: Users,
        label: "Antrenori",
        href: "/antrenori",
    },
    {
        icon: `${iconHrefHead}/clase-icon`,
        label: "Clase",
        href: "/clase",
    },
    {
        icon: MapPin,
        label: "Locații",
        href: "/locatii",
    },
] 

export const dashboardSidebarCoachLinks = [
    {
        icon: LayoutDashboard,
        label: "General",
        href: "/",
    },
    {
        icon: `${iconHrefHead}/confirmari-icon`,
        label: "Confirmări",
        href: "/confirmari",
    },
    {
        icon: CircleUser,
        label: "Clienți",
        href: "/clienti",
    },
    {
        icon: Dumbbell,
        label: "Programe antrenament",
        href: "/programe-antrenament",
    },
    {
        icon: Calendar,
        label: "Activități",
        href: "/activitati",
    },
    {
        icon: `${iconHrefHead}/clase-icon`,
        label: "Clase",
        href: "/clase",
    },
    {
        icon: `${iconHrefHead}/progres-transformari-icon`,
        label: "Transformări",
        href: "/transformari",
    },
    {
        icon: CircleDollarSign,
        label: "Câștiguri",
        href: "/castiguri",
    },
    {
        icon: CalendarDays,
        label: "Calendar",
        href: "/calendar",
    },
    {
        icon: `${iconHrefHead}/conversatii-icon`,
        label: "Conversații",
        href: "/conversatii",
    },
    {
        icon: ChartLine,
        label: "Statistici",
        href: "/statistici",
    },
]

export const dashboardSidebarAdminLinks = [
    {
        icon: LayoutDashboard,
        label: "General",
        href: "/",
    },
    {
        icon: `${iconHrefHead}/confirmari-icon`,
        label: "Confirmări",
        href: "/confirmari",
    },
    {
        icon: CircleUser,
        label: "Clienți",
        href: "/clienti",
    },
    {
        icon: MapPin,
        label: "Locații",
        href: "/locatii",
    },
    {
        icon: Users,
        label: "Antrenori",
        href: "/antrenori",
    },
    {
        icon: Calendar,
        label: "Activități",
        href: "/activitati",
    },
    {
        icon: `${iconHrefHead}/clase-icon`,
        label: "Clase",
        href: "/clase",
    },
    {
        icon: Dumbbell,
        label: "Programe antrenament",
        href: "/programe-antrenament",
    },
    {
        icon: `${iconHrefHead}/progres-transformari-icon`,
        label: "Transformări",
        href: "/transformari",
    },
        {
        icon: CircleDollarSign,
        label: "Câștiguri",
        href: "/castiguri",
    },
    {
        icon: CalendarDays,
        label: "Calendar",
        href: "/calendar",
    },
    {
        icon: `${iconHrefHead}/conversatii-icon`,
        label: "Conversații",
        href: "/conversatii",
    },
    {
        icon: ChartLine,
        label: "Statistici",
        href: "/statistici",
    },
]