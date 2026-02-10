import { City } from "@/lib/constants/city-type";
import { selectSettings } from "@/lib/constants/classes-tw/select-settings";
import { ChevronDown, MapPin } from "lucide-react";

export function CitySelector({ selected, cities, onCityChange, type }: { selected: string, cities: City[], onCityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, type: "small" | "large" }) {
    return (
        <div
            className="flex items-center gap-2">
            <MapPin size={24} strokeWidth={2.4} className="text-accent 3xl:w-8 3xl:h-8 3xl:object-contain" />
            <select value={selected} onChange={onCityChange} name="city-select" id="locations-city-select" className={`${selectSettings.select} ${type === "small" ? "!text-base 3xl:!text-xl" : ""}`}>
                <option value="all" className={`${selectSettings.option} ${type === "small" ? "!text-sm 3xl:!text-base" : ""} font-bold`}>Toate orașele</option>
                {cities?.map((city: City) => (
                    <option key={`${city.city}-${city.tenant_count}`} value={city.city} className={`${selectSettings.option} ${type === "small" ? "!text-sm 3xl:!text-base" : ""}`}>
                        {city.city}
                    </option>
                ))}
            </select>
            <ChevronDown size={24} strokeWidth={3} className="3xl:w-6 3xl:h-6" />
        </div>
    )
}