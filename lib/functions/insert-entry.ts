import { SupabaseClient } from "@supabase/supabase-js";
import { UUID } from "../constants/uuid";

type EntryStatus = "pending" | "active" | "rejected" | "closed";

export async function insertEntry(supabase: SupabaseClient, entry_attempt_id: UUID, user_id: string, subscription_id: UUID, tenant_id: UUID, status: EntryStatus) {
    const { data, error } = await supabase
    .from("Entries")
    .insert({
        entry_attempt_id,
        user_id,
        subscription_id,
        tenant_id,
        status
    })
    .select()
    .single();

    if (error) throw error;

    return data;
}