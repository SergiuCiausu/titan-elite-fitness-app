import { UnauthorizedLayout } from "@/app/unauthorized/unauthorizedLayout";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { getUser } from "./get-user";
import { redirect } from "next/navigation";
import { checkUserSubscription, UserSubscription } from "./check-user-subscription";
import { getAllUserSubscriptions } from "./get-all-user-subscriptions";

type AuthResult =
  | { user: User; subscription: UserSubscription[] }
  | { error: React.ReactNode };

export async function authorizeUser(supabase: SupabaseClient): Promise<AuthResult> {
  const user = await getUser(supabase);
  if (!user) redirect("/unauthorized");

  const subscription = await checkUserSubscription(supabase, user.id);
  if (!subscription) {
    const all = await getAllUserSubscriptions(supabase, user.id);
    if (!all) {
      return {
        error: (
          <UnauthorizedLayout
            text="Nu ai niciun abonament creat."
            btn="Alege abonament"
            src="/icons/errors/subscription-expired.png"
            route="/abonament/creeaza-abonament"
          />
        ),
      };
    }
  }

  return { user, subscription: subscription as UserSubscription[] };
}