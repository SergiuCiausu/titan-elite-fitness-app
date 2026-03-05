import { SupabaseClient } from "@supabase/supabase-js";

export async function getUserWeeklyWorkoutObjective(supabase: SupabaseClient, user_id: string) {
    const { data, error } = await supabase
    .from("Users_weekly_workout_objective")
    .select("weekly_workout_goal")
    .eq("user_id", user_id)
    .single();

    if (error || !data) return null;

    return data;
}