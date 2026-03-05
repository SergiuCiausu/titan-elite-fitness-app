import { getUserClasses } from "@/lib/functions/get-user-classes";
import { getUserTrainings } from "@/lib/functions/get-user-trainings";
import { getUserWeeklyWorkoutObjective } from "@/lib/functions/get-user-weekly-workout-objective";
import { SupabaseClient } from "@supabase/supabase-js";
import { endOfWeek, format, startOfWeek } from "date-fns";
import { InfoCardsGeneral } from "../info-cards-general";

export async function progresSaptamanalPrepareInfoCard(supabase: SupabaseClient, user_id: string,) {
    const today = new Date();

    const monday = startOfWeek(today);
    const sunday = endOfWeek(today);

    const mondayDate = format(monday, 'yyyy-MM-dd');
    const sundayDate = format(sunday, 'yyyy-MM-dd');

    const classes = await getUserClasses({supabase, user_id, start_date: mondayDate, end_date: sundayDate});
    
    if (!classes) return null;

    const trainings = await getUserTrainings({supabase, user_id, start_date: mondayDate, end_date: sundayDate})

    if (!trainings) return null;

    const weeklyWorkoutObjective = await getUserWeeklyWorkoutObjective(supabase, user_id);

    if (!weeklyWorkoutObjective) return "Nu ți-ai setat niciun obiectiv de antrenament.";

    InfoCardsGeneral["Progres săptămânal"] = InfoCardsGeneral["Progres săptămânal"].map(card => ({
        ...card,
        info: card.info.map(info => (
            info.infoLabel === "antrenamente per saptamana"
            ?
                {
                    ...info,
                    infoLabel: `${classes.length + trainings.length}/${weeklyWorkoutObjective}`
                }
            : info
        ))
    }))
}