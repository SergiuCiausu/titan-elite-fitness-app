import { UUID } from "../constants/uuid";
import { createClient } from "../supabase/server";

export type TenantCoaches = {
    tenant_id: UUID,
    Tenants: {
        name: string,
        city: string,
    }
}

export type CoachSpecialties = {
    coach_id: UUID,
    class_type_id: UUID,
    Class_types: {
        id: UUID,
        name: string,
        icon: string
    }
}

export type Coach = {
    user_id: UUID,
    first_name: string,
    last_name: string,
    Coach_specialties: CoachSpecialties[],
    Tenant_coaches: TenantCoaches[]
}

export async function getCoaches({ names }: { names?: string[] } = {}){
    const supabase = await createClient();

    const baseQuery = supabase
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
    .order("last_name", { ascending: true });

    if (names && names.length > 0){
        baseQuery.in("name_unaccent", names);
    }

    const { data, error } = await baseQuery as { data: Coach[] | null, error: any };

    if (error) throw error;

    if (!data) return [];

    return data.sort((a, b) => (b.Coach_specialties?.length || 0) - (a.Coach_specialties?.length || 0))
}