import { SupabaseClient } from "@supabase/supabase-js";
import { UUID } from "../constants/uuid";
import { EntryAttemptsResultEnum } from "../constants/entry-attempts-result-type";

export type EntryAttemptCheck = {
    id: UUID,
    result: EntryAttemptsResultEnum,
    ip_address: string,
    attempted_at: string,
}

const WINDOW_HOURS = 3;
const windowStart = new Date(Date.now() - WINDOW_HOURS * 60 * 60 * 1000);

function restrictManyIpAddress(entries: EntryAttemptCheck[]) {
    const ipSet = new Set(entries.map(e => e.ip_address));
    return ipSet.size < 4;
}

async function blockUserEntryAttempts(supabase: SupabaseClient, user_id: string) {

    const { data, error } = await supabase
    .from("Entry_attempts")
    .update({ result: "blocked" })
    .eq("user_id", user_id)
    .gte("attempted_at", windowStart.toISOString());

    if (error) throw error;
}

async function isMoreUserIdsOnDeviceId(supabase: SupabaseClient, deviceId: string) {
    const { data, error } = await supabase
    .from("Entry_attempts")
    .select("id, user_id, device_id")
    .eq("device_id", deviceId)
    .eq("result", "pending");

    if (error) throw error;

    if (!data || data.length === 0) return false;

    const entriesOnSameDeviceId = data.filter(entry => entry.device_id === deviceId)

    const users = new Set(entriesOnSameDeviceId.map(entry => entry.user_id));

    if (users.size <= 3) return false;

    return true;
}

export async function isUserEntryAttemptsOk({ supabase, user_id } : { supabase: SupabaseClient, user_id: string }) {

    const { data, error } = await supabase
    .from("Entry_attempts")
    .select("id, result, ip_address, attempted_at")
    .eq("user_id", user_id)
    .gte("attempted_at", windowStart.toISOString()) as { data: EntryAttemptCheck[], error: any };

    if (error) throw error;

    if (!data || data.length === 0) return true;

    if (data.length > 6) return false;

    const isIpAddressOk = restrictManyIpAddress(data);

    if (!isIpAddressOk) {
        await blockUserEntryAttempts(supabase, user_id);
        return false;
    }

    const isAnyResultSuccess = data.filter(
        entry =>
        entry.result === "success"
    );

    if (isAnyResultSuccess.length > 0) {
        const entries = data;
        const ipAddresses = Array.from(new Set(entries.map(entry => entry.ip_address)));

        if (ipAddresses.length > 1) {
            const lastSuccess = isAnyResultSuccess.sort(
            (a, b) =>
                new Date(b.attempted_at).getTime() -
                new Date(a.attempted_at).getTime()
            )[0];

            const allowedIp = lastSuccess.ip_address;

            const { data: updated, error } = await supabase
            .from("Entry_attempts")
            .update({ result: "blocked" })
            .eq("user_id", user_id)
            .eq("result", "pending")
            .neq("ip_address", allowedIp)
            .gte("attempted_at", windowStart.toISOString());

            if (error) throw error;
            return false;
        }
    }

    return true;
}