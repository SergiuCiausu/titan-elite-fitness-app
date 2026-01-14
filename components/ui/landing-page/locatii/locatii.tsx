import { createClient } from "@/lib/supabase/client";
import { SectionHeader } from "../components/sectionheader";
import { SearchProps } from "@/lib/constants/search-props";
import { div } from "framer-motion/client";

export async function Locatii({ searchParams } : SearchProps) {

    const query = searchParams?.q ?? '';

    const supabase = createClient();

    const { data: initialLocations, error } = query
    ? await supabase
        .from('Tenants')
        .select('*')
        .or(`city.ilike.%${query}%,province.ilike.%${query}%`)
        .limit(10)
    : await supabase
        .from('Tenants')
        .select('*')
        .limit(10)

    console.log("Gen salut: ", initialLocations);

    return (
        <section
            className="w-full flex flex-col items-center justify-center">
                <SectionHeader text={"Locații"} />
                <div
                    className="w-full flex gap-16 items-center justify-center h-fit">
                        <div>
                            {initialLocations?.map(location => (
                                <div>
                                    <p>{location.name}</p>
                                </div>
                            ))}
                        </div>
                        {/* mapcn */}
                </div>
        </section>
    )
}