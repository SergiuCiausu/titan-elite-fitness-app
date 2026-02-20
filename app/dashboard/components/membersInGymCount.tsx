import { createClient } from "@/lib/supabase/server"
import { ClientMembersInGymCount } from "./membersInGymCount-components/clientMembersInGymCount";
import { SupabaseClient } from "@supabase/supabase-js";

async function getActiveCount(supabase: SupabaseClient) {
    const { data, error } = await supabase
    .from("Entries")
    .select("id")
    .eq("status", "active");

    if (error) throw error;
    return data.length ?? 0;
}

export async function MembersInGymCount() {

    const supabase = await createClient();

    const initialMembersCount = await getActiveCount(supabase);

    return <ClientMembersInGymCount initialMembersCount={initialMembersCount} />
}