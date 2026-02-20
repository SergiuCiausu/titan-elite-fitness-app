import { SupabaseClient } from "@supabase/supabase-js";
import { UUID } from "../constants/uuid";

export async function getLocations(supabase: SupabaseClient, { query, search, option, ids }: { query?: string, search?: string, option?: string, ids?: UUID[] }) {

    let baseQuery;

    if (ids && ids.length > 0) {
        baseQuery = supabase.from("Tenants").select("*, Tenant_coaches!inner(coach_id)").in("Tenant_coaches.coach_id", ids);
    } else {
        baseQuery = supabase.from("Tenants").select("*");
    }
    

    if (query) {
        const searchQuery = `${query || search}`;
        baseQuery.or(`
            city.ilike.%${searchQuery}%,
            province.ilike.%${searchQuery}%,
            name.ilike.%${searchQuery}%,
            city_unaccent.ilike.%${searchQuery}%,
            province_unaccent.ilike.%${searchQuery}%,
            name_unaccent.ilike.%${searchQuery}%
        `);
    }

    if (option && option !== "all") {
        baseQuery.match({ city: option });
    }

    const { data, error } = await baseQuery;
    
    if (error) throw error;

    return data;
}