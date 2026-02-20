import { SupabaseClient } from "@supabase/supabase-js";
import { UUID } from "../constants/uuid";

export async function insertEntryAttempt({ supabase, user_id, tenant_id, ip_address } : { supabase: SupabaseClient, user_id: string, tenant_id: UUID, ip_address: string }) {
    const { data, error } = await supabase
    .from("Entry_attempts")
    .insert({
        user_id,
        tenant_id,
        ip_address,
        result: "pending"
    })
    .select()
    .single();

    if (error) throw error;

    return data;
}