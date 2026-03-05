import { SupabaseClient } from "@supabase/supabase-js";
import { ClassOnDashboard, TrainingOnDashboard } from "../constants/class-sessions-type";

export async function getUserTrainings({ supabase, user_id, start_date, end_date } : {supabase: SupabaseClient, user_id: string, start_date?: string, end_date?: string}) {
    const query = supabase
    .from("Payments")
    .select("id, status, Purchases!inner(Training_purchases!inner(Training_program_sessions!inner(Training_programs!inner(Tenants!inner(name, city), name), Coaches!inner(first_name, last_name, name_unaccent), date, starts_at, ends_at)))")
    .eq("user_id", user_id);

    if (start_date) {
        query.gte("paid_at", start_date);
    }

    if (end_date) {
        query.gte("paid_at", end_date);
    }

    const { data, error } = await query as unknown as { data: TrainingOnDashboard[], error: any };
    
    if (error || data.length === 0 || data[0].status !== "success") return null;
    
    const processedData = data.map(payment => {
        const purchase = payment.Purchases;
        const classPurchase = purchase.Training_purchases;
        const assignment = classPurchase.Training_program_sessions;

        const tenant = assignment.Tenants;
        const coach = assignment.Coaches;

        const [year, month, day] = assignment.date.split("-").map(Number);
        const [startH, startM] = assignment.starts_at.split(":").map(Number);
        const [endH, endM] = assignment.ends_at.split(":").map(Number);

        return {
            id: payment.id,

            class_name: assignment.Training_programs.name,
            class_icon: assignment.Training_programs.icon,

            class_date: assignment.date,
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