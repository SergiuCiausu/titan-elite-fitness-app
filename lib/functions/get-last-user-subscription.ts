import { SupabaseClient } from "@supabase/supabase-js";
import { SingleUserSubscription, UserSubscription } from "./check-user-subscription";

export async function getLastUserSubscription(supabase: SupabaseClient, user_id: string) {
    const { data, error } = await supabase
    .from("Subscriptions")
    .select("id, Subscription_plans!inner(name)")
    .eq("user_id", user_id)
    .order("end_date", { ascending: false })
    .limit(1)
    .single() as { data: SingleUserSubscription, error: any};

    if (error || !data) return null;

    return data;
}