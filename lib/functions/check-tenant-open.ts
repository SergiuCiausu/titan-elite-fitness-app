import { SupabaseClient } from "@supabase/supabase-js";
import { UUID } from "../constants/uuid";

function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export async function checkTenantOpen(supabase: SupabaseClient, tenant_id: UUID) {

    const nowTime = new Date()
    const now = nowTime.getHours() * 60 + nowTime.getMinutes();

    const { data, error } = await supabase
    .from("Tenants")
    .select("opening_at, closing_at, manual_override_until")
    .eq("id", tenant_id)
    .single();

    if (error) throw error;

    if (!data) return false;

    if (data.manual_override_until && new Date(data.manual_override_until) > new Date()) return false;

    const opening = timeToMinutes(data.opening_at);
    const closing = timeToMinutes(data.closing_at);

    if (closing < opening) {
        if (now < opening && now > closing) return false;
    } else {
        if (now < opening || now > closing) return false;
    }

    return true;
}