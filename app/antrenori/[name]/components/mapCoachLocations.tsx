"use client";

import { Card } from "@/components/ui/card";
import { ConditionalRomaniaLayer, Coords } from "@/components/ui/landing-page/locatii/locatii";
import { Map, MapControls } from "@/components/ui/map";
import { MapMarkers } from "@/components/ui/mapmarkers";
import { countyCenters } from "@/lib/constants/countycenters";
import { Location } from "@/lib/constants/location-type";
import { romaniaStartingCoords } from "@/lib/constants/romania-starting-coords";
import { useEffect, useRef, useState } from "react";

export function MapCoachLocations({ locations }: { locations: Location[] }) {

    const mapRef = useRef<any>(null);
    const [mapZoom, setMapZoom] = useState(7);
    const [startingCoords, setStartingCoords] = useState<Coords>(romaniaStartingCoords)

    const [isMapMounted, setIsMapMounted] = useState(false);

    useEffect(() => {

        setIsMapMounted(false);

        const centerMap = async () => {

            const province = locations[0].province
            const { lng, lat } = countyCenters[province];

            const zoom = locations[0].province === "Ilfov" || locations[0].province === "București" ? 10 : 11;

            setStartingCoords({ lng: lng, lat: lat })
            setMapZoom(zoom);

            if (mapRef.current) {    
                mapRef.current.setCenter([lng, lat]);
                mapRef.current.setZoom(zoom);
            }
        }

        centerMap();

        setIsMapMounted(true);
    }, [])
     
    if (!isMapMounted) return;

    return (
        <div
            className="basis-1/2">
            <Card className="h-full p-0 overflow-hidden">
                <Map ref={mapRef} center={[startingCoords.lng, startingCoords.lat]} zoom={mapZoom}>
                    <MapControls />
                    <ConditionalRomaniaLayer />
                    <MapMarkers markers={locations} />
                </Map>
            </Card>
        </div>
    )
}