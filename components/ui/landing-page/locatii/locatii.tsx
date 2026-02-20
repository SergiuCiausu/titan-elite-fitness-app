"use client";

import { createClient } from "@/lib/supabase/client";
import { SectionHeader } from "../components/sectionheader";
import { SearchProps } from "@/lib/constants/search-props";
import { LocationsDisplay } from "./components/display-locations";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Map, MapControls } from "@/components/ui/map";
import { Card } from "@/components/ui/card";
import { RomaniaLayer } from "./components/romania-map";
import { MapMarkers } from "../../mapmarkers";
import { Location } from "@/lib/constants/location-type";
import { countyCenters } from "@/lib/constants/countycenters";
import { useMap } from "@/components/ui/map";
import { getUserLocation } from "@/lib/functions/getuserlocation";
import { City } from "@/lib/constants/city-type";
import { CitySelector } from "../components/selectcity";
import { getLocations } from "@/lib/functions/getlocations";
import { romaniaStartingCoords } from "@/lib/constants/romania-starting-coords";

export type Coords = {
    lng: number,
    lat: number,
}

export function ConditionalRomaniaLayer() {
    const { map, isLoaded } = useMap();
    const [zoom, setZoom] = useState(0);

    useEffect(() => {
        if (!map || !isLoaded) return;

        const handleZoom = () => {
            setZoom(map.getZoom());
        };

        map.on('zoom', handleZoom);
        setZoom(map.getZoom());

        return () => {
            map.off('zoom', handleZoom);
        };
    }, [map, isLoaded]);

    if (zoom >= 9.5) return null;

    return <RomaniaLayer />;
}

export function Locatii({ searchParams }: SearchProps) {
    const [startingCoords, setStartingCoords] = useState<Coords>(romaniaStartingCoords);
    const [hasMapLoaded, setHasMapLoaded] = useState(false);
    const [mapZoom, setMapZoom] = useState(6);
    const [query, setQuery] = useState(searchParams?.q ?? '')
    const [search, setSearch] = useState("");
    const [cities, setCities] = useState<City[]>([]);
    const [selected, setSelected] = useState<string>('');
    const [locations, setLocations] = useState<Location[]>([]);
    const mapRef = useRef<any>(null);
    const [debouncedQuery, setDebouncedQuery] = useState(query);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 250);

        return () => clearTimeout(handler);
    }, [query]);

    function setNewMapCoordsAndZoom({ lng, lat, zoom } : { lng: number, lat: number, zoom: number }) {
        if (mapRef.current) {
            mapRef.current.flyTo({
                center: [lng, lat],
                zoom,
                essential: true,
                duration: 2000
            });
            setMapZoom(zoom);
        }
    }

    function mapRelocationOnSearch(value: string | FormDataEntryValue | null) {

        const newCenter = locations.every((obj, index, array) => obj.city === locations[0].city);

        if (typeof value === "string") {
            setSearch(value.toLowerCase().trim());

            if (newCenter && locations[0]) {
                const newCoords = countyCenters[locations[0].province];
                setSelected(locations[0].city);
                setNewMapCoordsAndZoom({lng: newCoords.lng, lat: newCoords.lat, zoom: 11});
            }
        }

        if (!value || locations.length === 0) {
            setNewMapCoordsAndZoom({lng: startingCoords.lng, lat: startingCoords.lat, zoom: 6});
            setSelected("all");
        }
    }

    useEffect(() => {
        if (!hasMapLoaded) return;

        if (locations.length > 0 && debouncedQuery.length > 0) {
            const first = locations[0];

            const isSameCity = locations.every(loc => loc.city === first.city);

            if (isSameCity) {
                const center = countyCenters[first.city] || countyCenters[first.province];

                if (center && mapRef.current) {
                    setNewMapCoordsAndZoom({ lng: center.lng, lat: center.lat, zoom: 11 });
                    setSelected(first.city);
                }
            }
        }  else if (locations.length === 0 && hasMapLoaded) {
            setNewMapCoordsAndZoom({ lng: startingCoords.lng, lat: startingCoords.lat, zoom: 6 });
            setSelected("all");
        }
    }, [locations, debouncedQuery]);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const coordsData = await getUserLocation();
                const center = countyCenters[coordsData.state];
                let sorted = []
                let userCityExists: {city: string, tenant_count: number} = {city: "", tenant_count: 0};

                const supabase = createClient();
                const { data, error } = await supabase.from('unique_cities').select('*');
                if (error) {
                    console.error(error);
                } else if (data) {
                    sorted = data.sort((a, b) => b.tenant_count - a.tenant_count);
                    setCities(sorted);

                    userCityExists = sorted.find(c => 
                        c.city.localeCompare(coordsData.city, 'ro', { sensitivity: 'base' }) === 0
                    );
    
                    if (userCityExists) {
                        setSelected(userCityExists.city);

                        const center = countyCenters[coordsData.state];
                        if (center) {
                            setStartingCoords({ lng: center.lng, lat: center.lat });
                            setMapZoom(11);
                        }
                    } else {
                        setSelected("all");
                    }
                }

                if (!center) {
                    console.warn("Region code not found in countyCenters:", coordsData.state);
                } else if (mapRef.current && userCityExists) {
                        mapRef.current.setCenter([center.lng, center.lat]);
                        mapRef.current.setZoom(11);
                        setMapZoom(11);
                    }
                
                setHasMapLoaded(true);
            } catch (err) {
                console.error("Error fetching IP data: ", err);
            }
        };

        const fetchLocations = async () => {
            const supabase = createClient();

            const data = await getLocations(supabase, {});

            setLocations(data ?? []);
        }

        fetchCities();
        fetchLocations();
    }, []);

    const handleCityLocationsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

        const cityName = e.target.value;

        if (cityName === selected) return;

        setSelected(cityName);

        if (!mapRef.current) return; 

        if (cityName === "all") {
            setNewMapCoordsAndZoom({ lng: 24.97, lat: 45.97, zoom: 6 });
            return;
        }

        const cityProvince = locations.find(location => location.city === e.target.value)?.province;

        if (!cityProvince) {
            setNewMapCoordsAndZoom({ lng: 24.97, lat: 45.97, zoom: 6 });
            return;
        }

        const center = countyCenters[cityProvince];

        if (center) {
            setNewMapCoordsAndZoom({ lng: center.lng, lat: center.lat, zoom: 11 });
        } //  else {
        //     const regionFromLocations = locations.find(l => l.city === cityName);
        //     if (regionFromLocations) {
        //         const provinceCenter = countyCenters[regionFromLocations.province];
        //         setNewMapCoordsAndZoom({ lng: provinceCenter.lng, lat: provinceCenter.lat, zoom: 11 });
        //     }
        // }
    }

    const handleLocationSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const value = formData.get("search");

        mapRelocationOnSearch(value);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const value = e.target.value;

        setQuery(value);

        mapRelocationOnSearch(value);
    }

    return (
        <section
            id="locatii"
            className="w-full flex flex-col gap-16 items-center justify-center">
            <SectionHeader text={"Locații"} />
            <div
                className="w-full flex max-lg:flex-col gap-16 items-center justify-center h-[740px] 3xl:h-[950px] bg-card">
                <div
                    className="basis-1/2 flex flex-col gap-8 rounded-2xl h-full py-16 pl-16 2xl:pl-[16.82vw]">
                    <div
                        className="flex items-center justify-between gap-16">
                        <CitySelector selected={selected} cities={cities} onCityChange={handleCityLocationsChange} type="large" />
                        <div
                            className="flex-1">
                            <form onSubmit={handleLocationSearch} className="w-full">
                                <input type="text" name="search" value={query} onChange={handleInputChange} placeholder="Caută orașul tău..." className="search-bar w-full 3xl:border-[3px] rounded-2xl 3xl:rounded-[24px] text-base text-foreground" />
                            </form>
                        </div>
                    </div>
                    <div
                        className="flex flex-col gap-4 overflow-y-auto scrollbar-thin scroll-thumb-gray">
                        <LocationsDisplay query={query} search={search} option={selected} locations={locations} />
                    </div>
                </div>
                <div
                    className="basis-1/2 h-full">
                    <Card className="h-full p-0 overflow-hidden">
                        <Map ref={mapRef} center={[startingCoords.lng, startingCoords.lat]} zoom={mapZoom}>
                            <MapControls />
                            <ConditionalRomaniaLayer />
                            <MapMarkers markers={locations} />
                        </Map>
                    </Card>
                </div>
            </div>
        </section>
    )
}