import { SupabaseClient } from "@supabase/supabase-js";
import { City } from "../constants/city-type";

export async function fetchCities(supabase: SupabaseClient) {
    try {
        const { data, error } = await supabase.from('unique_cities').select('*');

        if (error) throw error;

        if (data) {
            const sorted: City[] = data.sort((a, b) => b.tenant_count - a.tenant_count);
            return sorted;
        } else {
            return [];
        }
    } catch (err) {
        console.log("Error fetching cities: ", err);
        return [];
    }
}