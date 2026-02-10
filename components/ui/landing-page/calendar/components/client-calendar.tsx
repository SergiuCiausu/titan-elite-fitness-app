"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { SectionHeader } from "../../components/sectionheader";
import { Location } from "@/lib/constants/location-type";
import { getUserLocation } from "@/lib/functions/getuserlocation";
import { getISODay, getDate, eachDayOfInterval, format } from "date-fns";
import { City } from "@/lib/constants/city-type";
import { ClassSession, GroupedClass, GroupedSchedule } from "@/lib/constants/class-sessions-type";
import { CalendarSelectors } from "./calendar-selectors";
import { useCalendarStore } from "@/lib/zustand/useCalendarStore";
import { YDashLine } from "./components-calendar-display/y-dashed-line";
import { CalendarDayHeader } from "./components-calendar-display/calendarDayHeader";
import { StackLayout } from "./components-calendar-display/stackLayout";
import { SessionLayout } from "./components-calendar-display/sessionLayout";


export function CalendarClient({ initialLocations, initialCities, initialStartDate, initialEndDate }: { initialLocations: Location[], initialCities: City[], initialStartDate: string, initialEndDate: string }) {

    const locationsBackup = initialLocations;
    const [locations, setLocations] = useState<Location[]>(initialLocations)
    const [selectedLocation, setSelectedLocation] = useState<string>("");
    const [startDate, setStartDate] = useState<Date>(new Date(initialStartDate));
    const [endDate, setEndDate] = useState<Date>(new Date(initialEndDate));

    const initialDaysArray = eachDayOfInterval({
        start: startDate,
        end: endDate
    }).map(date => format(date, "yyyy-MM-dd"));

    const initialDaysOfTheWeekArray = eachDayOfInterval({
        start: startDate,
        end: endDate
    }).map(date => ({
        [getISODay(date)]: getDate(date)
    }));


    const cities = initialCities;
    const [selectedCity, setSelectedCity] = useState("");
    const hoursRef = useRef<HTMLDivElement>(null);
    const daysRef = useRef<HTMLDivElement>(null);
    const [hoursHeight, setHoursHeight] = useState(0);
    const [hoursWidth, setHoursWidth] = useState(0);
    const [daysHeight, setDaysHeight] = useState(0);
    const [rowHeight, setRowHeight] = useState(0);
    const [windowWidth, setWindowWidth] = useState(0);
    const [daysArray, setDaysArray] = useState(initialDaysArray);
    const [daysOfTheWeekArray, setDaysOfTheWeekArray] = useState(initialDaysOfTheWeekArray)
    const [selectedClass, setSelectedClass] = useState("");

    const [isMounted, setIsMounted] = useState(false);
    const [isLocationsMounted, setIsLocationsMounted] = useState(false);

    const days: Record<number, string> = {
        1: "Luni",
        2: "Marți",
        3: "Miercuri",
        4: "Joi",
        5: "Vineri",
        6: "Sâmbătă",
        7: "Duminică"
    };

    // const targetLocations = selectedLocation && selectedLocation !== "all" 
    //     ? locations.filter(loc => loc.name === selectedLocation)
    //     : locations;

    // const openingAt = targetLocations.length > 0
    //     ? Math.min(...targetLocations.map(loc => getHour(loc.opening_at)))
    //     : 5;

    const openingAt = 5;

    // const closingAt = targetLocations.length > 0
    //     ? Math.max(...targetLocations.map(loc => getHour(loc.closing_at)))
    //     : 24;

    const closingAt = 24;

    const hoursLength = closingAt - openingAt + 1;

    const hours = Array.from({ length: hoursLength }, (_, i) => i + openingAt);
    
    const hoursGap = 40;
    const hoursPy = daysHeight;
    const calendarPy = 16;
    const calendarPx = 32;
    const hoursDaysGap = 16;
    const dayCellWidth = 202;
    const classGap = 3;

    useEffect(() => {
        setIsMounted(true);
        setWindowWidth(window.innerWidth);

        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (hoursRef.current) {
            const height = hoursRef.current.getBoundingClientRect().height;
            setHoursHeight(height);

            const width = hoursRef.current.getBoundingClientRect().width;
            setHoursWidth(width);

            setRowHeight((height - hoursGap * (hours.length -  1) - hoursPy * 2) / hours.length);
        }

        if (daysRef.current) {
            const height = daysRef.current.getBoundingClientRect().height;
            setDaysHeight(height);
        }
  }, [windowWidth]);

    useEffect(() => {
        const checkUserLocation = async () => {

            setIsLocationsMounted(false);

            const userLocation = await getUserLocation();

            if (!userLocation) {
                setSelectedLocation("all");
                return;
            }
            
            const cityLocations = locations.filter(location => location.city === userLocation.city);

            if (cityLocations.length > 0) {
                setSelectedLocation(cityLocations[0].name)
            } else {
                setSelectedLocation("all");
            }

            const userCityExists = cities.find(c => c.city === userLocation.state);

            if (userCityExists) {
                setSelectedCity(userLocation.state);
            } else {
                setSelectedCity("all");
            }

            setIsLocationsMounted(true);
        }

        checkUserLocation();
    }, [])

    useEffect(() => {
        const fetchClasses = async () => {

            selectedCity !== "all" && locations.length > 1 ? setIsLocationsMounted(false) : ""

            const setLocationsId = () => {
                const cityLocations = selectedCity !== "all" 
                    ? locations.filter(loc => loc.city === selectedCity)
                    : locations;

                if (selectedLocation !== "all") {
                    const found = cityLocations.find(loc => loc.name === selectedLocation);
                    console.log("na: ", selectedLocation);
                    
                    if (!found) {
                        return [locations.find(location => location.name === selectedLocation)?.id];
                    }
                    
                    return [found.id];
                }

                return cityLocations.map(loc => loc.id);
            };

            const locationsIDs = setLocationsId();

            const classesData = await fetch("/api/get-class-sessions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    startDate,
                    endDate,
                    locationsIDs,
                })
            })

            const data = await classesData.json();

            const sessionsObj: Record<string, ClassSession[]> = {}
            data.classes.forEach((session: ClassSession) => {
                if(!sessionsObj[session.class_date]) {
                    sessionsObj[session.class_date] = [];
                }
                sessionsObj[session.class_date].push(session);
            })

            useCalendarStore.getState().hydrate(sessionsObj)
            setIsLocationsMounted(true);
        }

        if (selectedCity === "" || selectedLocation === "") return;

        fetchClasses();
    }, [startDate, endDate, selectedCity, selectedLocation])
    
    useEffect(() => {
        const newDaysArray = eachDayOfInterval({
            start: startDate,
            end: endDate
        }).map(date => format(date, "yyyy-MM-dd"));

        setDaysArray(newDaysArray);

        const newDaysOfTheWeekArray = eachDayOfInterval({
            start: startDate,
            end: endDate
        }).map(date => ({
            [getISODay(date)]: getDate(date)
        }));

        setDaysOfTheWeekArray(newDaysOfTheWeekArray);

    }, [startDate, endDate])

    const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

        setIsLocationsMounted(false);
        setSelectedLocation(e.target.value);

        const location = locations.find(location => location.name === e.target.value);

        const newCity = cities.find(city => city.city === location?.city)?.city

        newCity ? setSelectedCity(newCity) : "";
        setIsLocationsMounted(true);
    }

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

        setIsLocationsMounted(false);
        setSelectedCity(e.target.value);

        e.target.value === "all" ? setLocations(locationsBackup) : setLocations(locationsBackup.filter(location => location.city === e.target.value));
    }

    const newDaysArray = useCalendarStore(s => s.days);
    const stacks = useCalendarStore(s => s.stacks);
    const sessions = useCalendarStore(s => s.sessions);

    if (!isMounted) return <div className="w-full h-[701px] bg-card"></div>

    const calendarSelectorProps = {
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
    }

    return (
        <section>
            <SectionHeader text="Calendar" />
            <div
                className="w-full mt-16 flex flex-col gap-4 items-center">
                    <CalendarSelectors {...calendarSelectorProps} />
                    <div
                        className="w-full bg-card p-8 pb-16 flex items-center justify-center">
                            <div
                                className="w-[var(--content-width)] h-fit relative">
                                    <div
                                        className="absolute w-full h-full top-6 left-6 3xl:top-8 3xl:left-8 z-0 rounded-2xl border-[2px] border-primary-foreground">

                                    </div>
                                    <div
                                        className="relative w-full bg-background min-h-[768px] h-fit max-h-[1000px] overflow-auto scrollbar-thin scroll-thumb-gray rounded-2xl z-10 flex"
                                        style={{
                                            padding: `${calendarPy}px ${calendarPx}px`,
                                            gap: `${hoursDaysGap}px`,
                                        }}>
                                            <div
                                                ref={hoursRef}
                                                className="flex flex-col h-fit"
                                                style={{
                                                    margin: `calc(${calendarPy}px + ${daysHeight}px) 0`,
                                                    padding: `${hoursPy}px 0`,
                                                    gap: `${hoursGap}px`
                                                }}>
                                                {hours.map((hour, index) => {

                                                    const topPosition = ((rowHeight + hoursGap) * index) + daysHeight + rowHeight / 2 + calendarPy + daysHeight;

                                                    return (
                                                    <Fragment key={hour}>
                                                        {hours[index] === 24 ? <p className={`font-body text-sm 3xl:text-base relative`}>00:00</p> : <p className={`font-body text-sm 3xl:text-base relative`}>{hour < 10 ? `0${hour}` : hour}:00</p>}
                                                        {index === hours.length - 1 ? <div className="absolute bg-white outline-dashed outline-[1px] opacity-20" style={{ top: `calc(${topPosition}px)`, left: `calc(${calendarPx}px + ${hoursWidth}px + ${hoursDaysGap}px)`, width: `calc(${dayCellWidth}px * ${daysOfTheWeekArray.length})`}}></div> : <div className="absolute bg-white outline-dashed outline-[1px] opacity-20" style={{ top: `${topPosition}px`, left: `calc(${calendarPx}px + ${hoursWidth}px + ${hoursDaysGap}px)`, width: `calc(${dayCellWidth}px * ${daysOfTheWeekArray.length})`}}></div>}
                                                    </Fragment>
                                                )})}
                                            </div>
                                            <div
                                                className="flex-1 relative">
                                                <div
                                                    ref={daysRef}
                                                    className="flex items-center justify-between py-4">
                                                        {Object.values(daysArray).map((day, index) => {

                                                            const date = new Date(day);

                                                            const stackIds = newDaysArray[day]?.stackIds ?? [];
                                                            const totalCalendarGridHeight = hoursHeight + calendarPy + daysHeight + rowHeight * 2.5;
                                                            const dayOfTheWeek = days[getISODay(date)]
                                                            const dayDisplay = Number(day.split("-")[2])
                                                            
                                                            return (
                                                                <div key={day} className="absolute" 
                                                                    style={{
                                                                        top: calendarPy,
                                                                        left: index !== 0 ? (dayCellWidth - classGap) * index  : dayCellWidth * index
                                                                    }}>
                                                                        <CalendarDayHeader width={dayCellWidth} day={dayDisplay} dayOfTheWeek={dayOfTheWeek} />
                                                                        <YDashLine index={index} height={totalCalendarGridHeight} />
                                                                    <div
                                                                        className="relative h-fit">
                                                                        {stackIds.map(stackId => {
                                                                            const stackLength = stacks[stackId].sessionIds.length
                                                                            if (stackLength > 6) {
                                                                                return <StackLayout stack={stacks[stackId]} sessions={sessions} rowHeight={rowHeight} hoursGap={hoursGap} hours={hours} classGap={classGap} dayCellWidth={dayCellWidth} index={index} selectedClass={selectedClass} setSelectedClass={setSelectedClass} />
                                                                            }
                                                                            else {
                                                                                return stacks[stackId].sessionIds.map((sessionId, sessionIndex) => (
                                                                                    <SessionLayout session={sessions[sessionId]} rowHeight={rowHeight} hoursGap={hoursGap} hours={hours} classGap={classGap} dayCellWidth={dayCellWidth} index={sessionIndex} stackLength={stackLength} selectedClass={selectedClass} setSelectedClass={setSelectedClass} />
                                                                                ))
                                                                            }
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                </div>
                                            </div>
                                    </div>
                            </div>
                            
                    </div>
            </div>
        </section>
    )
}