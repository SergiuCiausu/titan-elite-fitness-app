import { ChevronDown, CircleUser } from "lucide-react";
import { navIconClasses } from "../navMemberContentDashboard";

export function ContNavBtn({ userEmail }: { userEmail : string }) {
    return (
        <button
            className="flex items-center gap-2">
                <CircleUser className={navIconClasses} />
                <p className="font-body text-sm text-primary-foreground font-semibold">{userEmail}</p>
                <ChevronDown className="text-primary-foreground w-2 h-1" />
        </button>
    )
}