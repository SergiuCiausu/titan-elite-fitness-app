import { Suspense } from "react";
import { MembersInGymCount } from "../membersInGymCount";
import { NavNotifications } from "../navNotifications";
import { AbonamentNavDisplay } from "./nav-member-content-dashboard-components/abonamentNavDisplay";
import { GestioneazaAbonamentNavBtn } from "./nav-member-content-dashboard-components/gestioneazaAbonamentNavBtn";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { checkUserSubscription, UserSubscription } from "@/lib/functions/check-user-subscription";
import { ContNavBtn } from "./nav-member-content-dashboard-components/contNavBtn";
import { User } from "@supabase/supabase-js";

export const navIconClasses = "text-accent w-5 h-5"

export async function NavMemberContentDashboard({ user, subscription }: { user: User, subscription: string }) {

    return (
        <div
            className="w-full items-center justify-between">
                <div>
                    <Suspense><MembersInGymCount /></Suspense>
                </div>
                <div
                    className="flex items-center gap-8">
                    <NavNotifications />
                    <AbonamentNavDisplay subscription={subscription} />
                    <GestioneazaAbonamentNavBtn />
                    <ContNavBtn userEmail={user.email ?? ""} />
                </div>
        </div>
    )
}