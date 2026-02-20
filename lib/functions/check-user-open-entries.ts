import { SupabaseClient } from "@supabase/supabase-js";

export async function checkUserOpenEntries(supabase: SupabaseClient, user_id: string) {
    const { data, error } = await supabase
    .from("Entries")
    .select("id, exited_at")
    .eq("user_id", user_id)
    .eq("status", "active");

    if (error) throw error;

    if (data.length === 0) return false;

    for (const entry of data) {
        if (entry.exited_at === null) {
            const { data: updated, error } = await supabase
            .from("Entries")
            .update({ exited_at: new Date(), status: "closed" })
            .eq("id", entry.id);

            if (error) throw error;
        }
    }

    return false;
}