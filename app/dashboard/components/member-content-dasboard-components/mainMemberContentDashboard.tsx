import { NavMemberContentDashboard } from "./navMemberContentDashboard";
import { createClient } from "@/lib/supabase/server";
import { prepareInfoCardsGeneral } from "./prepare-info-cards-general";
import { authorizeUser } from "@/lib/functions/authorize-user";
import { InfoCardsGeneral } from "./info-cards-general";

export async function MainMemberContentDashboard() {
    
    const supabase = await createClient();
    const result = await authorizeUser(supabase);

    if ("error" in result) return result.error;

    const { user, subscription } = result;

    const subscriptionName = subscription ? subscription[0]?.Subscription_plans[0]?.name : null;

    await prepareInfoCardsGeneral(supabase, user.id, subscriptionName);

    console.log("ia: ", InfoCardsGeneral);

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