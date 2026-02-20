"use client";

import { HeaderHr } from "@/components/ui/headerhr";
import { City } from "@/lib/constants/city-type";
import { h2Settings } from "@/lib/constants/classes-tw/h2-settings";
import { h3Settings } from "@/lib/constants/classes-tw/h3-settings";
import { Location } from "@/lib/constants/location-type";
import { Coach } from "@/lib/functions/get-coaches";
import { MapPin, SquareArrowOutUpRight } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { CitySelector } from "../../components/selectcity";
import { LocationSelector } from "../../components/locationselector";
import { useTheme } from "next-themes";
import { CoachClassSpecialties } from "./client-antrenor-components/coach-class-specialties";
import { AntrenorPopup } from "./client-antrenor-components/antrenor-popup";

export function AntrenoriClient({ initialLocations, initialCities, initialAntrenori, profesieAntrenori }: { initialLocations: Location[], initialCities: City[], initialAntrenori: Coach[], profesieAntrenori: {[key: string]: string} }){

    const [antrenori, setAntrenori] = useState<Coach[]>(initialAntrenori);
    const [selectedCity, setSelectedCity] = useState("all");
    const [selectedLocation, setSelectedLocation] = useState("all");
    const [openedPopup, setOpenedPopup] = useState({
        id: "",
        name: ""
    });

    const { theme, resolvedTheme } = useTheme();
    const [isComponentMounted, setIsComponentMounted] = useState(false);

    useEffect(() => {
        setIsComponentMounted(true);
    }, []);

    const themeImg = isComponentMounted && (resolvedTheme === "dark") ? "dark" : "light";

    const noCoachesImgSrc = `/images/landing-page/no-coaches-${themeImg}.png`

    const cardHeight = 700;

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(e.target.value);
        setSelectedLocation("all");

        if (e.target.value === "all") {
            setAntrenori(initialAntrenori);
        } else {
            setAntrenori(initialAntrenori.filter(antrenor => antrenor.Tenant_coaches.some(location => location.Tenants.city === e.target.value)))
        }
    }

    const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLocation(e.target.value)

        if (e.target.value === "all") {
            setAntrenori(initialAntrenori.filter(antrenor => antrenor.Tenant_coaches.some(location => location.Tenants.city === selectedCity)));
        } else {
            const location = initialLocations.find(location => location.name === e.target.value);

            if (!location) {
                setSelectedCity("all");
                return;
            }

            setSelectedCity(location?.city);
            setAntrenori(initialAntrenori.filter(antrenor => antrenor.Tenant_coaches.some(location => location.Tenants.name === e.target.value)))
        }
    }

    const handleAntrenorPopupOpen = (antrenor: Coach, fullName: string) => {
        setOpenedPopup({id: antrenor.user_id, name: fullName})
    }

    return (
        <div
            id="antrenori"
            className="bg-card">
            <div
                className="w-full relative flex flex-col items-center">
                <img src="/images/landing-page/antrenori-banner.jpg" alt="Antrenori banner" className="w-full h-full object-cover" style={{
                    maxHeight: 350
                }} />
                <div
                    className="w-full flex flex-col gap-4 items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <h2 className={`uppercase ${h2Settings} text-secondary-foreground`}>Antrenori</h2>
                    <HeaderHr />
                </div>
            </div>
            <div
                className="mt-16 mx-auto w-[var(--content-width)]">
                    <div
                        className="flex justify-between w-full">
                        <LocationSelector
                            selected={selectedLocation}
                            locations={initialLocations}
                            onLocationChange={handleLocationChange}
                            type="small"
                            selectedCity={selectedCity}
                            setSelected={setSelectedLocation}
                            isLocationsMounted={true}
                        />
                        <CitySelector selected={selectedCity} cities={initialCities} onCityChange={handleCityChange} type="small" />
                    </div>
                    <div
                        className="w-full gap-5 pt-8 pb-16 grid grid-cols-3 2xl:grid-cols-4">
                            {antrenori.length > 0 ? antrenori.map(antrenor => {

                                const fullName = `${antrenor.first_name} ${antrenor.last_name}`
                                const locationName = `${antrenor.Tenant_coaches[0].Tenants.name}, ${antrenor.Tenant_coaches[0].Tenants.city}`

                                return (
                                    <div
                                        key={antrenor.last_name}
                                        className="flex flex-col bg-background"
                                        style={{
                                            minWidth: 304,
                                            height: cardHeight,
                                        }}>
                                            <div>
                                                <img src={`/images/coaches/${antrenor.first_name.toLowerCase()}-${antrenor.last_name.toLowerCase()}.jpg`} alt={`${antrenor.first_name.toLowerCase()}-${antrenor.last_name.toLowerCase()} image`} className="rounded-[20px]" />
                                            </div>
                                            <div
                                                className="p-8 rounded-t-[20px] rounded-b-2xl flex flex-col justify-between h-full">
                                                    <div>
                                                        <h3
                                                            className={`${h3Settings} !text-2xl`}>
                                                            {antrenor.first_name} {antrenor.last_name}
                                                        </h3>
                                                        <p className="text-primary-foreground opacity-50">
                                                            {profesieAntrenori[fullName]}
                                                        </p>
                                                    </div>
                                                    <div
                                                        className="flex gap-1 flex-wrap items-center">
                                                        <CoachClassSpecialties coachSpecialties={antrenor.Coach_specialties} />
                                                    </div>
                                                    <div
                                                        className="flex flex-col gap-4">
                                                        <div
                                                            className="flex flex-col">
                                                            <p className="text-primary-foreground">100+ transformări</p>
                                                            <button
                                                                className="text-accent hover:text-accent-hover transition-colors duration-150 flex items-center gap-1 underline underline-offset-4"
                                                                onClick={() => handleAntrenorPopupOpen(antrenor, fullName)}>
                                                                <MapPin strokeWidth={2.5} className="w-4 h-4 3xl:w-6 3xl:h-6" />
                                                                <p className="select-none cursor-pointer">{antrenor.Tenant_coaches.length === 1 ? locationName : `${antrenor.Tenant_coaches.length} locații`}</p>
                                                                <SquareArrowOutUpRight strokeWidth={2.5} className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                        <button
                                                            className="bg-primary text-primary-foreground hover:bg-primary-hover transition-colors duration-150 rounded-2xl w-full py-4 uppercase">
                                                            Contactează
                                                        </button>
                                                    </div>
                                            </div>
                                    </div>
                                )
                            })
                            : 
                            <div
                                className="w-[var(--content-width)] flex items-center justify-center"
                                style={{
                                    height: cardHeight,
                                }}>
                                <div
                                    className="flex flex-col justify-center items-center">
                                    <img src={noCoachesImgSrc} alt="No coaches" className="w-64 h-64 opacity-75"/>
                                    <p className="text-primary-foreground opacity-50">Momentan nu au fost adăugați antrenori aici.</p>
                                </div>
                            </div>
                        }
                    </div>
            </div>
            {openedPopup.id !== "" ? <AntrenorPopup antrenor={antrenori.find(antrenor => antrenor.user_id === openedPopup.id)! } profesie={profesieAntrenori[openedPopup.name]} setOpenedPopup={setOpenedPopup} /> : ""}
        </div>
    )
}