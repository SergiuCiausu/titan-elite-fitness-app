"use client";

import { SetStateAction } from "react";
import { LocationSelector } from "../../components/locationselector";
import { CitySelector } from "../../components/selectcity";
import { DateSelector } from "./dateselector";
import { Location } from "@/lib/constants/location-type";
import { City } from "@/lib/constants/city-type";

export function CalendarSelectors({
  selectedLocation,
  locations,
  handleLocationChange,
  selectedCity,
  setSelectedLocation,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  cities,
  handleCityChange,
  isLocationsMounted,
}: {
  selectedLocation: string;
  locations: Location[];
  handleLocationChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedCity: string;
  setSelectedLocation: React.Dispatch<SetStateAction<string>>;
  startDate: Date;
  endDate: Date;
  setStartDate: React.Dispatch<SetStateAction<Date>>;
  setEndDate: React.Dispatch<SetStateAction<Date>>;
  cities: City[];
  handleCityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isLocationsMounted: boolean,
}) {
  return (
    <div className="w-[var(--content-width)] flex items-center justify-between">
      <LocationSelector
        selected={selectedLocation}
        locations={locations}
        onLocationChange={handleLocationChange}
        type="small"
        selectedCity={selectedCity}
        setSelected={setSelectedLocation}
        isLocationsMounted={isLocationsMounted}
      />
      <DateSelector startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
      <CitySelector selected={selectedCity} cities={cities} onCityChange={handleCityChange} type="small" />
    </div>
  );
}
