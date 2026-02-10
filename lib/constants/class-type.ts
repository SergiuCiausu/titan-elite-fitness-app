import { UUID } from "@/lib/constants/uuid";

export type Class = {
    id: UUID,
    tier_id: UUID,
    name: string,
    icon: string,
    duration_default: number,
    capacity: number
}