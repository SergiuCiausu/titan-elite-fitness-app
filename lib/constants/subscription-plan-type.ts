import { UUID } from "./uuid";

export const CURRENCIES = ["RON", "EUR"] as const;
type Currency = typeof CURRENCIES[number][];

export type SubscriptionPlan = {
    id: UUID,
    name: string,
    opening_hour: string | null,
    closing_hour: string | null,
    base_price: number[],
    currency: Currency[],
    landing_page_benefits?: string[],
    landing_page_ideal_pentru?: string,
    landing_page_pentru?: string,
}