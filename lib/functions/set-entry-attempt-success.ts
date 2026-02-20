import { SupabaseClient } from "@supabase/supabase-js";
import { UUID } from "../constants/uuid";

export async function setEntryAttemptSuccess(supabase: SupabaseClient, entry_attempt_id: UUID) {
    const { data, error } = await supabase
    .from("Entry_attempts")
    .update({ result: "success" })
    .eq("id", entry_attempt_id)
    .select()
    .single();

    if (error) throw error;

    return data;
} 