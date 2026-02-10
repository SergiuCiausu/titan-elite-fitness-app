import { SupabaseClient } from "@supabase/supabase-js";
import { getLocations } from "./getlocations";
import { Location } from "../constants/location-type";

export async function fetchLocations(supabase: SupabaseClient){
    try {
        const locations: Location[] = await getLocations(supabase, {});

        return locations;
    } catch (err) {
        console.log("Error fetching locations: ", err);
        return [];
    }
}