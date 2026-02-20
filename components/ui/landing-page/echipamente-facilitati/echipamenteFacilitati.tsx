"use client";

import { useEffect, useState } from "react";
import { Echipamente } from "./components/echipamente";
import { Facilitati } from "./components/facilitati";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ImagineEchipament } from "./components/imagineEchipament";
import { createClient } from "@/lib/supabase/client";
import { getLocations } from "@/lib/functions/getlocations";
import { getUserLocation } from "@/lib/functions/getuserlocation";
import { Location } from "@/lib/constants/location-type";

export type Echipament = {
    [key: string]: {
        tip: string,
        denumire: string,
        poze: number,
    }[],
}

export function EchipamenteFacilitati(){

    const [locations, setLocations] = useState<Location[]>([]);
    const [openedPopup, setOpenedPopup] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [currentWidth, setCurrentWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => setCurrentWidth(window.innerWidth);

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchLocations = async () => {
            const supabase = createClient();

            const data = await getLocations(supabase, {});

            setLocations(data ?? []);

            const userLocation = await getUserLocation();

            if (!userLocation) {
                setSelectedLocation("");
                return;
            }
            const defaultLocation = data.find(location => location.city.localeCompare(userLocation.city, 'ro', { sensitivity: 'accent' }) === 0);
            if (defaultLocation) {
                setSelectedLocation(defaultLocation.name);
            } else {
                setSelectedLocation("");
            }
        }

        fetchLocations();
    }, [])

    const echipamente: Echipament = {
        echipament: [{tip: "aparate", denumire: "aparate", poze: 4}, {tip: "greutăți libere", denumire:"greutati-libere", poze: 8}, {tip: "yoga & pilates", denumire:"yoga-pilates", poze: 5}, {tip: "stretching", denumire: "stretching", poze: 4}, {tip: "aerobics & cardio", denumire: "aerobics-cardio", poze: 5}, {tip: "coordonare & viteză", denumire: "coordonare-viteza", poze: 4}, {tip: "alte echipamente", denumire: "alte-echipamente", poze: 3}],
        facilitate: [{tip: "dușuri", denumire: "dusuri", poze: 3}, {tip: "masaj", denumire: "masaj", poze: 3}, {tip: "saună", denumire: "sauna", poze: 3}, {tip: "solar", denumire: "solar", poze: 3}, {tip: "salină", denumire: "salina", poze: 1}]
    }

    const handleClosePopup = () => {
        setOpenedPopup("")
    }

    return (
        <div
            id="aparate"
            className="w-full bg-card flex justify-center pb-8">
            <div
                className="flex w-[var(--content-width)] justify-center gap-6">
                <Echipamente echipament={echipamente.echipament} openedPopup={openedPopup} setOpenedPopup={setOpenedPopup} />
                <Facilitati facilitati={echipamente.facilitate} openedPopup={openedPopup} setOpenedPopup={setOpenedPopup} />
            </div>
            <AnimatePresence>
                {openedPopup !== ""
                ?
                    <motion.div
                        className="fixed flex flex-col items-center top-0 left-0 h-full bg-background-75 z-30 overflow-y-auto"
                        style={{
                            width: currentWidth
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}>
                            <div
                                className="flex items-center gap-8 mt-32 mb-8">
                                {locations.map(location => {
                                    
                                    // location.name.localeCompare(selectedLocation, 'ro', { sensitivity: 'accent' }) === 0 ? console.log("UAT: ", openedPopup.slice(openedPopup.indexOf("-") + 1)) : "";

                                    return (
                                        <button key={location.name} className={`text-base logo uppercase transition-colors duration-150 ${location.name.localeCompare(selectedLocation, 'ro', { sensitivity: 'accent' }) === 0 ? "text-accent hover:text-accent-foreground" : "text-foreground hover:text-foreground-hover"}`} onClick={() => setSelectedLocation(location.name)}>{location.name}</button>
                                )})}
                            </div>
                            <div
                                className="flex gap-6 mx-16 flex-wrap relative">
                                    {Array.from({ length: echipamente[openedPopup.split("-")[0]].find(echipament => echipament.denumire === openedPopup.slice(openedPopup.indexOf("-") + 1))?.poze || 0 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="max-h-[580px] basis-1/4"
                                            style={{
                                                minWidth: `calc(${currentWidth}px / 5.5)`,
                                                maxWidth: `calc(${currentWidth}px / 4.51)`,
                                                minHeight: `calc(${currentWidth}px / 5.5)`,
                                                maxHeight: `calc(${currentWidth}px / 4.51)`,
                                            }}>
                                            <ImagineEchipament src={`/images/landing-page/${openedPopup.slice(openedPopup.indexOf("-") + 1)}-${i + 1}.jpg`} />
                                        </div>
                                    ))}
                                    <div
                                        className="absolute"
                                        style={{
                                            right: 12,
                                            top: -32,
                                        }}>
                                        <button onClick={handleClosePopup}><X /></button>
                                    </div>
                            </div>
                    </motion.div>
                : ""}
            </AnimatePresence>
        </div>
    )
}