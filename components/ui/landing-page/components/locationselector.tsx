"use client";

import { selectSettings } from "@/lib/constants/classes-tw/select-settings";
import { Location } from "@/lib/constants/location-type";
import { ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

export function LocationSelector ({ locations, onLocationChange, selected, type, selectedCity, setSelected, isLocationsMounted }: { locations: Location[], onLocationChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, selected: string, type: "small" | "large", selectedCity: string, setSelected: React.Dispatch<React.SetStateAction<string>>, isLocationsMounted: boolean }) {

    const { theme, resolvedTheme } = useTheme();
    const [isComponentMounted, setIsComponentMounted] = useState(false);

    useEffect(() => {
        setIsComponentMounted(true);
    }, []);

    const selectRef = useRef<HTMLSelectElement>(null);

    const themeImg = isComponentMounted && (resolvedTheme === "dark") ? "dark" : "light";

    const imgSrc = `/icons/general/gym-icon-${themeImg}.svg`

    const selectWidth = 350;

    if (!isLocationsMounted) {
        return (
            <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                <div className="h-8 rounded-2xl bg-accent" style={{ width: selectWidth }} />
            </div>
        );
    }

    return (
        <div
            className="flex items-center gap-2 justify-between" style={{ width: `${selectWidth}px`}}>
            <div
                className="flex items-center gap-2">
                <img src={imgSrc} alt="Gym icon" className="pr-2" />
                <select ref={selectRef} value={selected} onChange={onLocationChange} name="city-select" id="locations-city-select" className={`${selectSettings.select} ${type === "small" ? "!text-base 3xl:!text-xl" : ""}`}>
                    <option value="all" className={`${selectSettings.option} ${type === "small" ? "!text-sm 3xl:!text-base" : ""} font-bold`}>Toate locațiile</option>
                    {locations.map((location: Location) => (
                        <option key={`${location.name}-${location.id}`} value={location.name} className={`${selectSettings.option} ${type === "small" ? "!text-sm 3xl:!text-base" : ""}`}>
                            {location.name}
                        </option>
                    ))}
                </select>
            </div>
            <ChevronDown size={24} strokeWidth={3} className="3xl:w-8 3xl:h-8" />
        </div>
    )
}