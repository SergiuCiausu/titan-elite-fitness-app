import { dashboardSidebarCustomerLinks } from "@/lib/constants/dashboard-sidebar-links";
import { Sidebar } from "./sidebar";

export function MemberContentDashboard() {
    return (
        <div
            className="bg-card">
                <Sidebar links={dashboardSidebarCustomerLinks} selectedLink="General" />
        </div>
    )
}