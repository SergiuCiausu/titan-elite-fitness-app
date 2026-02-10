import { endOfDay, endOfWeek, startOfDay, startOfWeek } from "date-fns";
import { CalendarClient } from "./components/client-calendar";
import { createClient } from "@/lib/supabase/server";
import { fetchCities } from "@/lib/functions/get-cities";
import { fetchLocations } from "@/lib/functions/fetch-locations";

export async function Calendar() {

    const supabase = await createClient();

    const initialStartDate = startOfDay(startOfWeek(new Date(), { weekStartsOn: 1 })).toISOString();
    const initialEndDate = endOfDay(endOfWeek(new Date(), { weekStartsOn: 1 })).toISOString();

    const initialLocations = await fetchLocations(supabase);
    const initialCities = await fetchCities(supabase);

    const calendarClientProps = {
        initialStartDate,
        initialEndDate,
        initialLocations,
        initialCities,
    }

    return (
        <CalendarClient {...calendarClientProps} />
    )
}