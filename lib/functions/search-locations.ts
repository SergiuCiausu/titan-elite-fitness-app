import { SupabaseClient } from "@supabase/supabase-js";
import { UUID } from "../constants/uuid";

export async function searchLocation({ supabase, id }: { supabase: SupabaseClient, id: UUID}) {
    const { data, error } = await supabase.from("Tenants").select("id").eq("id", id);

    if (error || !data)  {
        return null;
    }

    return data;
}