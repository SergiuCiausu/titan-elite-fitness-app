import { UUID } from "@/lib/constants/uuid"
import { SupabaseClient } from "@supabase/supabase-js"
import { isUserEntryAttemptsOk } from "../get-entry-attempts"
import { insertEntryAttempt } from "../insert-entry-attempt"
import { checkUserSubscription } from "../check-user-subscription"
import { setFailedEntryAttempt } from "../set-failed-entry-attempt"
import { checkTenantOpen } from "../check-tenant-open"
import { checkUserOpenEntries } from "../check-user-open-entries"
import { insertEntry } from "../insert-entry"
import { setRejectedEntry } from "../set-rejected-entry"
import { setEntryAttemptSuccess } from "../set-entry-attempt-success"

type ValidateEntryProps = {
    supabase: SupabaseClient,
    user_id: string,
    tenant_id: UUID,
    ip_address: string | null,
}

export async function validateEntry({
    supabase,
    user_id,
    tenant_id,
    ip_address,
}: ValidateEntryProps) {
    const testUserEntryAttempts = await isUserEntryAttemptsOk({ supabase, user_id })

    if (!testUserEntryAttempts) {
        return { ok: false, reason: "BLOCKED"}
    }

    const entryAttempt = await insertEntryAttempt({ supabase, user_id, tenant_id, ip_address: ip_address ?? ""})

    if (!entryAttempt) return { ok: false, reason: "UNEXPECTED_ERROR" };

    const hasUserSubscription = await checkUserSubscription(supabase, user_id);

    if (!hasUserSubscription) {
        await setFailedEntryAttempt(supabase, entryAttempt.id, "Abonamentul tău a expirat.");
        return { ok: false, reason: "SUBSCRIPTION_EXPIRED" }
    }

    const isTenantOpen = await checkTenantOpen(supabase, tenant_id);

    if (!isTenantOpen) {
        await setFailedEntryAttempt(supabase, entryAttempt.id, "Ne pare rău, dar această sală este închisă.");
        return { ok: false, reason: "TENANT_CLOSED" }
    } 

    const isUserOpenEntries = await checkUserOpenEntries(supabase, user_id);

    if (isUserOpenEntries) {
        await setFailedEntryAttempt(supabase, entryAttempt.id, "Ne pare rău, s-a produs o eroare.");
        return { ok: false, reason: "UNEXPECTED_ERROR"}
    }

    const insertUserEntry = await insertEntry(supabase, entryAttempt.id, user_id, hasUserSubscription[0].id, tenant_id, "active");

    if (!insertUserEntry) {
        await setRejectedEntry(supabase, entryAttempt.id);
        return { ok: false,  reason: "UNEXPECTED_ERROR_ENTRY"}
    }

    const setSuccessEntryAttempt = await setEntryAttemptSuccess(supabase, entryAttempt.id);

    if (!setSuccessEntryAttempt) {
        await setFailedEntryAttempt(supabase, entryAttempt.id, "Ne pare rău, s-a produs o eroare de sistem.");
        return { ok: false, reason: "UNEXPECTED_ERROR_SYSTEM"}
    }

    return { ok: true, entry_id: insertUserEntry.id }
}