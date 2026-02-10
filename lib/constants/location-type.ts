import { UUID } from "@/lib/constants/uuid";

export type Location = {
    id: UUID,
    name: string,
    name_unaccent: string,
    province: string,
    province_unaccent: string,
    city: string,
    city_unaccent: string,
    address: string,
    first_image: string,
    opening_at: string,
    closing_at: string,
    manual_override_until: string | null,
    manual_override_reason: string | null,
    manual_override_status: string | null,
    created_at: string,
    updated_at: string,
    href: string,
    lng: number,
    lat: number,
}