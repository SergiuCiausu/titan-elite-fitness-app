"use client";

import { SectionHeader } from "../../components/sectionheader";
import { useEffect, useState } from "react";
import { getUserLocation } from "@/lib/functions/getuserlocation";
import { selectSettings } from "@/lib/constants/classes-tw/select-settings";
import { Check, ChevronDown, CircleDollarSign } from "lucide-react";
import { CURRENCIES, SubscriptionPlan } from "@/lib/constants/subscription-plan-type";
import { h3Settings } from "@/lib/constants/classes-tw/h3-settings";

export function ClientAbonamente({ abonamente }: { abonamente: SubscriptionPlan[] }) {

    const [currency, setCurrency] = useState("RON"); 
    const [isCurrencyMounted, setIsCurrencyMounted] = useState(false);

    useEffect(() => {

        const fetchCurrency = async () => {
            setIsCurrencyMounted(false);

            const userLocation = await getUserLocation();

            if (!userLocation) return;

            const getCurrency = userLocation.country === "RO" ? "RON" : "EUR"

            setCurrency(getCurrency);

            setIsCurrencyMounted(true);
        }

        fetchCurrency();
    }, [])

    const abonamenteGap = 20;

    const totalGap = (abonamente.length - 1) * abonamenteGap

    const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrency(e.target.value);
    }

    return (
            <div
                className="w-full h-fit">
                <SectionHeader text="Abonamente" />
                        <div
                            className="w-[var(--content-width)] mx-auto flex flex-row-reverse my-8">
                            {isCurrencyMounted 
                            ?
                                <div
                                    className="flex items-center gap-2">
                                    <CircleDollarSign size={24} strokeWidth={2.5} className="text-accent 3xl:w-6 3xl:h-6" />
                                    <select value={currency} onChange={handleCurrencyChange} name="currency-subscription" id="currency-subscription-select" className={`${selectSettings.select} !text-base 3xl:!text-xl`}>
                                        {CURRENCIES.map(curr => (
                                            <option key={curr} value={curr} className={`${selectSettings.option} text-sm 3xl:!text-base`}>
                                                {curr}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown size={24} strokeWidth={3} className="3xl:w-6 3xl:h-6" />
                                </div>
                            :
                                <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                                    <div className="h-8 rounded-2xl bg-accent" style={{ width: 116 }} />
                                </div>
                            }
                        </div>
                        <div
                            className={`w-[var(--content-width)] flex flex-wrap items-center justify-center mx-auto`}
                            style={{
                                gap: abonamenteGap
                            }}>
                            {abonamente.map((abonament, index) => {

                                const isPrimarySubscription = abonament.name === "Titan full access"

                                const textColor = isPrimarySubscription ? "text-secondary-foreground" : "text-primary-foreground";

                                return (
                                    <div
                                        key={abonament.id}
                                        className={`rounded-2xl p-8 flex flex-col items-center justify-between ${isPrimarySubscription ? "bg-primary": "bg-card"}`}
                                        style={{
                                            width: `calc((var(--content-width) - ${totalGap}px) / ${abonamente.length})`,
                                            height: 580
                                        }}>
                                            <div
                                                className="flex flex-col gap-2">
                                                <h3
                                                    className={`!text-2xl text-center ${textColor}`}
                                                    style={{
                                                        fontFamily: "var(--header-font)"
                                                    }}>
                                                    {abonament.name}
                                                </h3>
                                                <p
                                                    className={`${textColor} ${isPrimarySubscription ? "" : "opacity-50"} text-[13px] leading-tight text-center`}
                                                    style={{
                                                        height: 36,
                                                    }}>
                                                    {abonament.landing_page_pentru}
                                                </p>
                                            </div>
                                            <div
                                                className="flex items-end gap-1">
                                                <p 
                                                    className={`${h3Settings} !text-accent !font-bold`}>
                                                        {abonament.base_price[CURRENCIES.findIndex(curr => curr === currency)]} {currency}
                                                </p>
                                                <p className={`text-[13px] opacity-75 ${textColor}`}>/lună</p>
                                            </div>
                                            <div
                                                className="flex flex-col gap-2"
                                                style={{
                                                    height: 184
                                                }}>
                                                {abonament.landing_page_benefits!.map((benefit, benefitIndex) => (
                                                    <div
                                                        className="flex gap-1">
                                                            <div
                                                                className="w-4 h-4">
                                                                <Check size={16} strokeWidth={4} className="!w-4 !h-4 text-accent mt-1" />
                                                            </div>
                                                        <p className={`text-sm ${textColor}`}>{benefit} {index > 0 && benefitIndex === 0 ? <span>{abonamente[index - 1].name}</span> : ""}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            <div
                                                className="text-center flex flex-col items-center gap-1">
                                                <p className={`text-sm font-bold ${textColor}`}>Ideal pentru:</p>
                                                <p className={`text-[13px] leading-tight ${isPrimarySubscription ? "opacity-75" : "opacity-50"} ${textColor}`}>{abonament.landing_page_ideal_pentru!}</p>
                                            </div>
                                            <button
                                                className={`py-4 w-full text-center font-body font-bold uppercase rounded-2xl ${isPrimarySubscription ? "bg-accent": "bg-primary"} ${textColor} ${isPrimarySubscription ? "hover:bg-accent-foreground" : "hover:bg-primary-hover"} transition-colors duration-150`}>
                                                Cumpără abonament
                                            </button>
                                    </div>
                                )
                            })}
                        </div>
            </div>
    )
}