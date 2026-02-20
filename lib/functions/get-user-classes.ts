import { SupabaseClient } from "@supabase/supabase-js";
import { ClassOnDashboard } from "../constants/class-sessions-type";

export async function getUserClasses({ supabase, user_id, start_date, end_date } : {supabase: SupabaseClient, user_id: string, start_date?: string, end_date?: string}) {
    
    const query = supabase
    .from("Payments")
    .select("id, Purchases!inner(Class_purchases!inner(Class_assignments!inner(Coaches!inner(first_name, last_name, name_unaccent), Class_sessions!inner(starts_at, ends_at, date, Class_types!inner(name, icon, duration_default), Tenants!inner(name, province, city)))))")
    .eq("user_id", user_id);

    if (start_date) {
        query.gte("paid_at", start_date);
    }

    if (end_date) {
        query.gte("paid_at", end_date);
    }

    const { data, error } = await query as unknown as { data: ClassOnDashboard[], error: any };

    if (error || data.length === 0) return null;

    const processedData = data.map(payment => {
        const purchase = payment.Purchases;
        const classPurchase = purchase.Class_purchases;
        const assignment = classPurchase.Class_assignments;
        const session = assignment.Class_sessions;

        const classType = session.Class_types;
        const tenant = session.Tenants;
        const coach = assignment.Coaches;

        const [year, month, day] = session.date.split("-").map(Number);
        const [startH, startM] = session.starts_at.split(":").map(Number);
        const [endH, endM] = session.ends_at.split(":").map(Number);

        return {
            id: payment.id,

            class_name: classType.name,
            class_icon: classType.icon,

            class_date: session.date,
            class_day: day,
            class_month: month,
            class_year: year,

            class_starts_at: startH * 60 + startM,
            class_ends_at: endH * 60 + endM,

            tenant_name: tenant.name,
            tenant_city: tenant.city,
            tenant_province: tenant.province,

            coach_first_name: coach.first_name,
            coach_last_name: coach.last_name,
        };
    });

    return processedData;
}