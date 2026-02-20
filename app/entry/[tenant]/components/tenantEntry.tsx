import { EntryPageProps } from "../page";
import { searchLocation } from "@/lib/functions/search-locations";
import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import { getIpAddress } from "@/lib/functions/get-ip-address";
import { BlockedUserLayout } from "./blockedUserLayout";
import { UnauthorizedLayout } from "../../../unauthorized/unauthorizedLayout";
import { validateEntry } from "@/lib/functions/user-entry-gym/validate-entry";
import EntryConfirmationLayout from "./confirmationEntryLayout";

export async function TenantEntry({ params }: EntryPageProps) {

    const { tenant } = await params;

    const supabase = await createClient();

    const isLocation = await searchLocation({supabase, id: tenant});

    if (!isLocation) {
        notFound();
    } 

    const { data: { user }} = await supabase.auth.getUser();

    if (!user) {
        redirect(`/auth/login?next=/entry/${tenant}`);
    }

    const ip = await getIpAddress();

    const result = await validateEntry({ supabase, user_id: user.id.trim(), tenant_id: tenant, ip_address: ip ?? "unknown" })

    if (!result.ok) {
        switch (result.reason) {
            case "UNEXPECTED_ERROR":
            return <UnauthorizedLayout text="Ne pare rău, s-a produs o eroare." btn="Întoarce-te la panoul de control" src="/images/landing-page/no-coaches-light.png" route="/dashboard"/>;

            case "UNEXPECTED_ERROR_ENTRY":
            return <UnauthorizedLayout text="Ne pare rău, s-a produs o eroare la adăugarea permisiunii de intrare în sală." btn="Întoarce-te la panoul de control" src="/images/landing-page/no-coaches-light.png" route="/dashboard"/>

            case "UNEXPECTED_ERROR_SYSTEM":
            return <UnauthorizedLayout text="Ne pare rău, s-a produs o eroare de sistem." btn="Întoarce-te la panoul de control" src="/images/landing-page/no-coaches-light.png" route="/dashboard"/>

            case "SUBSCRIPTION_EXPIRED":
            return <UnauthorizedLayout text="Abonamentul tău a expirat." btn="Reînnoiește abonament" src="/icons/errors/subscription-expired.png" route="/abonament/gestioneaza-abonament/reinnoieste-abonament"/>

            case "TENANT_CLOSED":
            return <UnauthorizedLayout text="Ne pare rău, dar această sală este închisă." btn="Întoarce-te la panoul de control" src="/icons/errors/subscription-expired.png" route="/dashboard" />

            case "BLOCKED":
            return <BlockedUserLayout />

            default:
            return <UnauthorizedLayout text="Ne pare rău, s-a produs o eroare." btn="Întoarce-te la panoul de control" src="/images/landing-page/no-coaches-light.png" route="/dashboard" />;
        }
    }

    return <EntryConfirmationLayout />
}