import { getUserTrainings } from "@/lib/functions/get-user-trainings";
import { groupClassesByDate } from "@/lib/functions/group-classes-by-date";
import { SupabaseClient } from "@supabase/supabase-js";
import { format, getISODay } from "date-fns";
import { InfoCardsGeneral } from "../info-cards-general";
import { daysOfTheWeek } from "@/lib/constants/days-of-the-week";
import { hydrateClassStacks } from "@/lib/functions/hydrate-class-stacks";

export async function urmatorulAntrenamentRezervatPrepareInfoCard(supabase: SupabaseClient, user_id: string) {
    const now = new Date();
    const today = now.toISOString();
    const todayDate = format(now, "yyyy-MM-dd");

    const trainings = await getUserTrainings({ supabase, user_id, start_date: today })

    if (!trainings) return null;

    const groupedTrainings = groupClassesByDate(trainings);

    const { days, stacks, sessionsMap: sessions } = hydrateClassStacks(groupedTrainings);
    
    const daysKeys = Object.keys(days).sort()
    const nextKey = daysKeys.find(k => k >= todayDate);

    if (!nextKey) return null;

    const firstStack = stacks[days[nextKey].stackIds[0]]
    const firstClass = sessions[firstStack.sessionIds[0]]

    const classDateInfo = `${daysOfTheWeek[getISODay(new Date(firstClass.class_date))]}, ${format(new Date(firstClass.class_date), "dd.MM.yyyy")}, ora ${firstClass.class_starts_at / 60}:${firstClass.class_starts_at % 60}`

    const clasaOre = (firstClass.class_ends_at - firstClass.class_starts_at) / 60
    const clasaMinute = (firstClass.class_ends_at - firstClass.class_starts_at) % 60
    const isClasaOre = clasaOre > 0
    const isClasaMinute = clasaMinute > 0
    const isClasaSi = isClasaOre && isClasaMinute
    const durataOre = `${isClasaOre ? `${clasaOre} ${clasaOre === 1 ? "oră" : "ore"}` : ""}`
    const durataMinute = `${isClasaSi ? "și " : ""}${isClasaMinute ? `${clasaMinute} ${clasaMinute % 60 === 1 ? "minut" : "minute"}` : ""}`
    const durataClasa = `${durataOre} ${durataMinute}`

    InfoCardsGeneral["Următorul antrenament"] = InfoCardsGeneral["Următorul antrenament"].map(card => ({
        ...card,
        info: card.info.map(info => (
            info.infoLabel === "antrenament"
            ?
                {
                    ...info,
                    icon: firstClass.class_icon,
                    infoContent: firstClass.class_name
                }
            : info.infoLabel === "data"
                ?
                    {
                        ...info,
                        infoContent: classDateInfo
                    }
                : info.infoLabel === "antrenor"
                    ?
                        {
                            ...info,
                            infoContent: `${firstClass.coach_first_name} ${firstClass.coach_last_name.toUpperCase()}`
                        }
                    : info.infoLabel === "locatia"
                        ?
                            {
                                ...info,
                                infoContent: `${firstClass.tenant_name}, ${firstClass.tenant_city}`
                            }
                        : info.infoLabel === "durata"
                            ?
                                {
                                    ...info,
                                    infoContent: durataClasa
                                }
                            : info
        ))
    }))
}