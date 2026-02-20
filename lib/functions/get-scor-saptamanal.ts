import { SupabaseClient } from "@supabase/supabase-js";
import { format, startOfWeek } from "date-fns";

export async function getScorSaptamanal(supabase: SupabaseClient, user_id: string) {

    const monday = startOfWeek(new Date(), { weekStartsOn: 1 }).toISOString()

    const today = new Date().toISOString();

    const { data, error } = await supabase
    .from("Entries")
    .select("id")
    .eq("user_id", user_id)
    .gte("entered_at", monday)
    .lte("entered_at", today);

    if (error || data.length === 0) return 0;

    return data.length > 5 ? 100 : data.length * 20; 
    // 20 = 1/5 din 100, unde 5 = 5 intrari/saptamana ale unui utilizator in sala 
    // este metrica pe care presupunem ca a cerut-o proprietarul 
    // pentru a stimula prezenta in sali
}