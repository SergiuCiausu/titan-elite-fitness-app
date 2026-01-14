import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";
import { CircleUser } from "lucide-react";

export async function AuthButton() {
  const supabase = await createClient();

  // You can also use getUser() which will be slower.
  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"CTA"}>
        <Link href="/auth/sign-up" className="uppercase !border-[2px] border-[var(--border-cta-nav)] !rounded-md cta-shadow-sm"><span>Cumpără abonament</span></Link>
      </Button>
      <Button asChild size="sm" variant={"no_bg"}>
        <Link href="/auth/login" className="flex items-center gap-2">
          <CircleUser />
          <p>Intră în cont</p>
        </Link>
      </Button>
    </div>
  );
}
