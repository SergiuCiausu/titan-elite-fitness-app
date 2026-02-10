import { SupabaseClient } from "@supabase/supabase-js";

export async function getLocations(supabase: SupabaseClient, { query, search, option }: { query?: string, search?: string, option?: string }) {

    const baseQuery = supabase.from("Tenants").select("*");

    if (query) {
        baseQuery
            .or(`city.ilike.%${query}%,province.ilike.%${query}%,name.ilike.%${query}%`)
            .or(`city.ilike.%${search}%,province.ilike.%${search}%,name.ilike.%${search}%`)
            .or(`city_unaccent.ilike.%${query}%,province_unaccent.ilike.%${query}%,name_unaccent.ilike.%${query}%`)
            .or(`city_unaccent.ilike.%${search}%,province_unaccent.ilike.%${search}%,name_unaccent.ilike.%${search}%`);
    }

    if (option && option !== "all") {
        baseQuery.match({ city: option });
    }

    const { data, error } = await baseQuery;
    
    if (error) throw error;

    return data;
}