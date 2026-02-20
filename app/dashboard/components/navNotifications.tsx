import { Bell } from "lucide-react";
import { navIconClasses } from "./member-content-dasboard-components/navMemberContentDashboard";

export function NavNotifications() {
    return (
        <div>
            <Bell className={navIconClasses} />
            <p className={`font-body text-sm font-semibold`}>
                Notificări
            </p>
        </div>
    )
}