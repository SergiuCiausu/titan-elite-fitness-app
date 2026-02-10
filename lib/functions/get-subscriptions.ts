
import { SubscriptionPlan } from "../constants/subscription-plan-type";
import { createClient } from "../supabase/server";

export async function getSubscriptions({ type }: { type?: "landing-page"}) {
    const supabase = await createClient();

    const cols = `id, name, opening_hour, closing_hour, base_price, currency ${type === "landing-page" ? ", landing_page_benefits, landing_page_ideal_pentru, landing_page_pentru" : ""}`

    const { data, error } = await supabase.from("Subscription_plans").select(cols).order("base_price->0", { ascending: true }) as unknown as { data: SubscriptionPlan[], error: any }

    if (error) throw error;

    if (!data) return [];

    return data;
}