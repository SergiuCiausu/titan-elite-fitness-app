'use client';

import { useEffect, useState} from "react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { Location } from "@/lib/constants/location-type";
import { getLocations } from "@/lib/functions/getlocations";
import { createClient } from "@/lib/supabase/client";

export function LocationsDisplay({ query, search, option, locations, setLocations }: { query: string, search: string, option: string, locations: Location[], setLocations: React.Dispatch<React.SetStateAction<Location[]>>, setSelected: React.Dispatch<React.SetStateAction<string>> }) {

  const searchTerm = (query || search || "").toLowerCase();

  const locationsDisplay = locations.filter(location => {
    const fieldsToSearch = [
      location.city, 
      location.city_unaccent, 
      location.province, 
      location.province_unaccent
    ];

    const matchesOption = option === "all" || location.city === option;
    const matchesSearch = fieldsToSearch.some(f => f?.toLowerCase().includes(searchTerm));

    return matchesOption && matchesSearch;
  });

  return (
    locationsDisplay.map((location, index) => (
        <div key={location.id} className="flex bg-background w-full rounded-tr-2xl rounded-br-2xl">
          <div className="w-[223px] min-h-[223px]">
            <img
              src={`/images/landing-page/${location.first_image}`}
              alt={location.name}
              className="w-full h-full max-h-64 object-cover bg-center rounded-tl-2xl rounded-bl-2xl"
            />
          </div>
          <div className="flex-1 p-8 flex flex-col w-full h-full justify-between gap-8">
            <div className="flex flex-col gap-1">
              <h3 className="max-md:text-xl md:text-2xl text-primary-foreground">{location.name}</h3>
              <p className="text-primary-foreground/50 text-sm 3xl:text-base">{location.address}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Button variant="no_bg" size="sm" className="!p-0 3xl:text-base text-accent hover:text-accent-foreground !gap-1">
                <MapPin />
                <p>Vezi locație</p>
              </Button>
              <Button variant="default" size="lg" className="w-full">
                <Link href={`/${location.href}`}>Vezi sală</Link>
              </Button>
            </div>
          </div>
        </div>
      ))
  );
}
