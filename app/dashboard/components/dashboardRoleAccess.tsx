import { createClient } from "@/lib/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { MemberContentDashboard } from "./memberContentDashboard";
import { CoachContentDashboard } from "./coachContentDashboard";
import { AdminContentDashboard } from "./adminContentDashboard";
import { UnauthorizedLayout } from "@/app/unauthorized/unauthorizedLayout";
import { JSX } from "react";

async function getUserRole(supabase: SupabaseClient, user: string) {
    const { data, error } = await supabase.from("roles").select("role").eq("user_id", user).single();

    if (error) throw error;

    return data.role;
}

    const dashboards: Record<string, JSX.Element> = {
        member: <MemberContentDashboard />,
        coach: <CoachContentDashboard />,
        admin: <AdminContentDashboard />,
    }


export async function DashboardRoleAccess() {

    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    const role = await getUserRole(supabase, user.id);

    return (
        dashboards[role] ?? (
            <UnauthorizedLayout
                text="Nu ești autorizat pe această pagină."
                btn="Întoarce-te pe pagina principală"
                route="/"
                src="/icons/errors/unauthorized.png"
            />
        )
    );
}