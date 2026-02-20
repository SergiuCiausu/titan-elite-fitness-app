import { SupabaseClient } from "@supabase/supabase-js";

export async function closeUserEntry(supabase: SupabaseClient, entry_id: string) {
    const { data, error } = await supabase
    .from("Entries")
    .update({ status: "closed" })
    .eq("id", entry_id)
    .select()
    .single();

    if (error) throw error;

    return data;
}