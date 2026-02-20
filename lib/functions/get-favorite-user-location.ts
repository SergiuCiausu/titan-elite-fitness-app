import { SupabaseClient } from "@supabase/supabase-js";

export async function getFavoriteUserLocation(supabase: SupabaseClient, user_id: string) {
    const { data, error } = await supabase
    .from("Entries")
    .select("id, Tenants!inner(name, city)")
    .eq("user_id", user_id)

    if (error || data.length === 0) return null;

    const favoriteLocations = data.reduce<Record<string, number>>((acc, tenant) => {
        acc[tenant.Tenants[0].name] = (acc[tenant.Tenants[0].name] ?? 0) + 1
        return acc
    }, {})

    const sortedFavoriteLocations = Object.entries(favoriteLocations)
        .sort(([, a], [, b]) => b - a)
        .map(([name, count]) => ({ name, count }))

    return sortedFavoriteLocations;
}