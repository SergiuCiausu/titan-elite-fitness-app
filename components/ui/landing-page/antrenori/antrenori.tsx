import { getCoaches } from "@/lib/functions/get-coaches"
import { h2Settings } from "@/lib/constants/classes-tw/h2-settings";
import { HeaderHr } from "../../headerhr";
import { h3Settings } from "@/lib/constants/classes-tw/h3-settings";
import { MapPin } from "lucide-react";
import { fetchCities } from "@/lib/functions/get-cities";
import { createClient } from "@/lib/supabase/server";
import { fetchLocations } from "@/lib/functions/fetch-locations";
import { AntrenoriClient } from "./components/client-antrenori";

export async function Antrenori() {

    const supabase = await createClient();

    const initialAntrenori = await getCoaches();

    const initialLocations = await fetchLocations(supabase);
    const initialCities = await fetchCities(supabase);

    const profesieAntrenori: {[key: string]: string} = {"Andrei Munteanu": "Forță & hipertrofie musculară", "Ana-Maria Țîrlea":"Antrenamente pentru femei, tonifiere & glute focus", "Ioana Dobre":"Mobility, stretching, recuperare posturală", "Radu Neagu":"Functional training & performanță sportivă", "Mihai Rusu":"Powerlifting & ridicări olimpice", "Alexandra Turcu":"Pilates, echilibru, siluetă & mobilitate", "Cristina Manolache":"Yoga, mindfulness, respirație & mobilitate", "Vlad Popescu":"Cardio intens, ardere calorică & condiționare"}

    return (
        <AntrenoriClient initialAntrenori={initialAntrenori} initialCities={initialCities} initialLocations={initialLocations} profesieAntrenori={profesieAntrenori} />
    )
}