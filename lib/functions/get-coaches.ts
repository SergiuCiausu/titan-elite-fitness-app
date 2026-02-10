import { createClient } from "../supabase/server";

export type Coach = {
    user_id: string,
    first_name: string,
    last_name: string,
    Coach_specialties: {
        coach_id: string,
        class_type_id: string,
        Class_types: {
            id: string,
            name: string,
            icon: string
        }
    }[],
    Tenant_coaches: {
        tenant_id: string,
        Tenants: {
            name: string,
            city: string,
        }
    }[]
}

export async function getCoaches(){
    const supabase = await createClient();

    const { data, error } = await supabase
    .from("Coaches")
    .select(`user_id, first_name, last_name,
        Coach_specialties!inner (
            coach_id,
            class_type_id,
            Class_types!inner (
                id,
                name,
                icon
            )
        ),
        Tenant_coaches!inner(
            tenant_id,
            Tenants!inner (
                name,
                city
            )
        )        
    `)
    .order("last_name", { ascending: true }) as { data: Coach[] | null, error: any };

    if (error) throw error;

    if (!data) return [];

    return data.sort((a, b) => (b.Coach_specialties?.length || 0) - (a.Coach_specialties?.length || 0))
}