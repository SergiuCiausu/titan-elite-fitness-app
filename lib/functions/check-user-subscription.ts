import { SupabaseClient } from "@supabase/supabase-js";

export type SingleUserSubscription = {
    id: any;
    end_date: any;
    Subscription_plans: {
        name: any;
    };
}

export type UserSubscription = {
    id: any;
    end_date: any;
    Subscription_plans: {
        name: any;
    }[];
}

export async function checkUserSubscription(supabase: SupabaseClient, user_id: string) {

    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
    .from("Subscriptions")
    .select("id, end_date, Subscription_plans!inner(name)")
    .eq("user_id", user_id)
    .lte("start_date", today)
    .gte("end_date", today) as { data: UserSubscription[], error: any}

    if (error || data.length === 0) return false;

    return data;
}