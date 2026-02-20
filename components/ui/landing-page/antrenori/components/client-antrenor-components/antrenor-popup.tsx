"use client"

import { Coach } from "@/lib/functions/get-coaches";
import { createClient } from "@/lib/supabase/client";
import { Location } from "@/lib/constants/location-type";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { ConditionalRomaniaLayer, Coords } from "../../../locatii/locatii";
import { romaniaStartingCoords } from "@/lib/constants/romania-starting-coords";
import { h3Settings } from "@/lib/constants/classes-tw/h3-settings";
import { CoachClassSpecialties } from "./coach-class-specialties";
import { LocationsDisplay } from "../../../locatii/components/display-locations";
import { Card } from "@/components/ui/card";
import { Map, MapControls } from "@/components/ui/map";
import { MapMarkers } from "@/components/ui/mapmarkers";
import { countyCenters } from "@/lib/constants/countycenters";
import { X } from "lucide-react";
import { endOfDay, endOfWeek, startOfDay, startOfWeek } from "date-fns";
import { City } from "@/lib/constants/city-type";
import { CalendarClient } from "../../../calendar/components/client-calendar";

export function AntrenorPopup({ antrenor, profesie, setOpenedPopup }: { antrenor: Coach, profesie: string, setOpenedPopup: React.Dispatch<SetStateAction<{id: string, name: string}>> }) {

    const [startingCoords, setStartingCoords] = useState<Coords>(romaniaStartingCoords)
    const [mapZoom, setMapZoom] = useState(7);
    const mapRef = useRef<any>(null);
    const [locations, setLocations] = useState<Location[]>([]);
    const [hasMapLoaded, setHasMapLoaded] = useState(false);
    const [cities, setCities] = useState<City[]>([{
        city: "",
        tenant_count: 0
    }]);

    useEffect(() => {

        setHasMapLoaded(false);

        const getLocationsById = async () => {

            const coachLocationIds = antrenor.Tenant_coaches.map(location => location.tenant_id);

            const supabase = createClient();

            const { data, error } = await supabase.from("Tenants").select("*").in("id", coachLocationIds) as { data: Location[], error: any };

            if (error) {
                console.error(error);
                setLocations([]);
                return;
            };

            setLocations(data ?? []);

            const coachProvinces = [...new Set(data.map(loc => loc.province))];
            const coachCities = [...new Set(data.map(loc => loc.city))]

            setCities(coachCities.map(city => ({
                city,
                tenant_count: 1
            })));

            if (coachProvinces.length < 3) {
                setStartingCoords({ lng: countyCenters[coachProvinces[0]].lng, lat: countyCenters[coachProvinces[0]].lat })
                mapRef.current.setCenter([countyCenters[coachProvinces[0]].lng, countyCenters[coachProvinces[0]].lat]);
                mapRef.current.setZoom(10);
                setMapZoom(10) 
             } else {
                setStartingCoords(romaniaStartingCoords);
                mapRef.current.setCenter(romaniaStartingCoords);
                mapRef.current.setZoom(5);
                setMapZoom(5);
             }
        }
        getLocationsById();

        setHasMapLoaded(true);
    }, [])

    if (!hasMapLoaded) return;
    
    const initialStartDate = startOfDay(startOfWeek(new Date(), { weekStartsOn: 1 })).toISOString();
    const initialEndDate = endOfDay(endOfWeek(new Date(), { weekStartsOn: 1 })).toISOString();

    const calendarClientProps = {
        initialStartDate,
        initialEndDate,
        initialLocations: locations,
        initialCities: cities,
    }

    return (
        <div
            className="w-screen h-screen fixed top-0 left-0 z-40 bg-background-75 overflow-y-auto scrollbar-thin"
            style={{
                backdropFilter: "blur(20px)"
            }}>
                <div
                    className="flex flex-col gap-16 p-16 bg-background mx-auto fixed top-1/4 left-1/4">
                    <div
                        className="flex gap-16"
                        style={{
                            width: "calc(var(--content-width) + 16px)"
                        }}>
                        <div
                            className="basis-1/2 h-[587px] flex flex-col gap-16">
                            <div
                                className="flex items-center gap-4 h-fit">
                                <div
                                    className="min-w-[198px]">
                                    <img src={`/images/coaches/${antrenor.first_name.toLowerCase()}-${antrenor.last_name.toLowerCase()}.jpg`} alt={`${antrenor.first_name.toLowerCase()}-${antrenor.last_name.toLowerCase()} image`} className="w-full rounded-2xl" />
                                </div>
                                <div
                                    className="w-full flex flex-col gap-8">
                                        <div>
                                            <h3
                                                className={`${h3Settings} !text-2xl`}>
                                                {antrenor.first_name} {antrenor.last_name}
                                            </h3>
                                            <p className="text-primary-foreground opacity-50">
                                                {profesie}
                                            </p>
                                        </div>
                                        <div
                                            className="flex gap-1 items-center flex-wrap">
                                            <CoachClassSpecialties coachSpecialties={antrenor.Coach_specialties} />
                                        </div>
                                        
                                </div>
                            </div>
                            <div
                                className="overflow-y-auto scrollbar-thin">
                                <LocationsDisplay option="all" locations={locations} query="" search=""  />
                            </div>
                        </div> 
                        <div
                            className="basis-1/2 h-[587px]">
                            <Card className="h-full p-0 overflow-hidden">
                                <Map ref={mapRef} center={[startingCoords.lng, startingCoords.lat]} zoom={mapZoom}>
                                    <MapControls />
                                    <ConditionalRomaniaLayer />
                                    <MapMarkers markers={locations} />
                                </Map>
                            </Card>
                        </div>
                </div>
                <div
                    className="w-[var(--content-width)]">
                    {locations.length > 0 && <CalendarClient {...calendarClientProps} />}
                </div>
            </div>
            <button
                className="sticky top-24 left-[97%]"
                onClick={() => setOpenedPopup({id: "", name: ""})}>
                    <X size={24} className="text-primary-foreground" />
            </button>
        </div>
    )
}