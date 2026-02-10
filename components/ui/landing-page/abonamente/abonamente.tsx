"use server";

import { getSubscriptions } from "@/lib/functions/get-subscriptions";
import { ClientAbonamente } from "./components/clientAbonamente";

export async function Abonamente() {

    const abonamente = await getSubscriptions({ type: "landing-page" })

    return <ClientAbonamente abonamente={abonamente} />
}