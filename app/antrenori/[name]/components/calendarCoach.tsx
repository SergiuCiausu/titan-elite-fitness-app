import { endOfDay, endOfWeek, startOfDay, startOfWeek } from "date-fns";
import { PageProps } from "../page";
import { createClient } from "@/lib/supabase/server";
import { Coach, getCoaches } from "@/lib/functions/get-coaches";
import { getLocations } from "@/lib/functions/getlocations";
import { CalendarClient } from "@/components/ui/landing-page/calendar/components/client-calendar";

export async function CoachCalendar({ params }: PageProps){
    
    const { name } = await params;
    
    const supabase = await createClient();

    const coach: Coach[] = await getCoaches({ names: [name]})

    const cities = [...new Map(
        coach[0].Tenant_coaches.map(tc => [tc.Tenants.city, { city: tc.Tenants.city, tenant_count: 1 }])
    ).values()];

    const locations = await getLocations(supabase, { ids: [coach[0].user_id]})

    const initialStartDate = startOfDay(startOfWeek(new Date(), { weekStartsOn: 1 })).toISOString();
    const initialEndDate = endOfDay(endOfWeek(new Date(), { weekStartsOn: 1 })).toISOString();

    const calendarClientProps = {
        initialStartDate,
        initialEndDate,
        initialLocations: locations,
        initialCities: cities,
        coach: coach[0]
    }

    return (
        <div
            className="w-[var(--content-width)] mx-auto mb-16">
            {locations.length > 0 && <CalendarClient {...calendarClientProps} />}
        </div>        
    )
}