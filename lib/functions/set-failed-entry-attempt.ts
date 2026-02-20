import { SupabaseClient } from "@supabase/supabase-js";
import { UUID } from "../constants/uuid";

export async function setFailedEntryAttempt(supabase: SupabaseClient, entry_attempt_id: UUID, reason_text: string) {
    const { data, error } = await supabase
    .from("Entry_attempts")
    .update({ result: "failed", reason: reason_text })
    .eq("id", entry_attempt_id)
    .select()
    .single();

    if (error) throw error;
    
    return data;
}