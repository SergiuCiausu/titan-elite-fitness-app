import { SupabaseClient } from "@supabase/supabase-js";

export async function getAllUserSubscriptions(supabase: SupabaseClient, user_id: string) {
    const { data, error } = await supabase
    .from("Subscriptions")
    .select("id")
    .eq("user_id", user_id);

    if (error || data.length === 0) return null;

    return data;
}