import { dashboardSidebarCustomerLinks } from "@/lib/constants/dashboard-sidebar-links";
import { Sidebar } from "./sidebar";
import { MainMemberContentDashboard } from "./member-content-dasboard-components/mainMemberContentDashboard";

export function MemberContentDashboard() {
    return (
        <div
            className="bg-card">
                <Sidebar links={dashboardSidebarCustomerLinks} selectedLink="General" />
                <MainMemberContentDashboard />
        </div>
    )
}