import { getUser } from "@/lib/functions/get-user";
import { NavMemberContentDashboard } from "./navMemberContentDashboard";
import { createClient } from "@/lib/supabase/server";
import { checkUserSubscription } from "@/lib/functions/check-user-subscription";
import { redirect } from "next/navigation";
import { UnauthorizedLayout } from "@/app/unauthorized/unauthorizedLayout";
import { getAllUserSubscriptions } from "@/lib/functions/get-all-user-subscriptions";
import { InfoCardsGeneral } from "./info-cards-general";
import { getLastUserSubscription } from "@/lib/functions/get-last-user-subscription";
import { getFavoriteUserLocation } from "@/lib/functions/get-favorite-user-location";
import { getScorSaptamanal } from "@/lib/functions/get-scor-saptamanal";
import { prepareInfoCardsGeneral } from "./prepare-info-cards-general";

export async function MainMemberContentDashboard() {
    
    const supabase = await createClient();
    const user = await getUser(supabase);

    if (!user) redirect("/unauthorized");

    const subscription = await checkUserSubscription(supabase, user.id);

    if (!subscription) {

        const allUserSubscriptions = await getAllUserSubscriptions(supabase, user.id);

        if (!allUserSubscriptions) return <UnauthorizedLayout text="Nu ai niciun abonament creat." btn="Alege abonament" src="/icons/errors/subscription-expired.png" route="/abonament/creeaza-abonament"/>
    }

    const subscriptionName = subscription ? subscription[0].Subscription_plans[0].name : null;

    const cards = await prepareInfoCardsGeneral(supabase, user.id, subscriptionName);

    return (
        <div
            className="flex flex-col gap-8"
            style={{
                padding: "var(--dashboard-sidebar-padding) var(--dashboard-main-container-padding)"
            }}>
            <NavMemberContentDashboard user={user} subscription={subscriptionName} />
        </div>
    )
}