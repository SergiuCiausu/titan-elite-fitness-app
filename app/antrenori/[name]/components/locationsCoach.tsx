import { LocationsDisplay } from "@/components/ui/landing-page/locatii/components/display-locations";
import { PageProps } from "../page";
import { getLocations } from "@/lib/functions/getlocations";
import { Coach, getCoaches } from "@/lib/functions/get-coaches";
import { createClient } from "@/lib/supabase/server";
import { MapCoachLocations } from "./mapCoachLocations";
import { SectionHeader } from "@/components/ui/landing-page/components/sectionheader";

export async function CoachLocations({ params }: PageProps) {

    const { name } = await params;

    const supabase = await createClient();

    const coach: Coach[] = await getCoaches({ names: [name]})

    const locations = await getLocations(supabase, { ids: [coach[0].user_id]})
    return (
        <div
            className="flex flex-col gap-16 items-center">
            <SectionHeader text={"Locații"} />
            <div
                className="w-[var(--content-width)] h-[587px] mx-auto flex gap-16">
                <div
                    className="basis-1/2 flex flex-col gap-4 overflow-y-auto scrollbar-thin scroll-thumb-gray">
                    <LocationsDisplay query="" search="" option="all" locations={locations} />
                </div>
                <MapCoachLocations locations={locations} />
            </div>
        </div>
    )
}