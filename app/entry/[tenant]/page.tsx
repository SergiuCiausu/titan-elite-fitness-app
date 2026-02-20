import { UUID } from "@/lib/constants/uuid"
import { Suspense } from "react"
import { TenantEntry } from "./components/tenantEntry"
import { FallbackTenantEntry } from "./components/fallbackTenantEntry"

export type EntryPageProps = {
    params: {
        tenant: UUID
    }
}

export default function page({ params }: EntryPageProps) {
    return <Suspense fallback={<FallbackTenantEntry />}><TenantEntry params={params} /></Suspense>
}