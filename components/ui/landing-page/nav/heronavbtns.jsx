import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Suspense } from "react";

export function HeroNavBtns() {
  return (
    <div className="flex gap-8 items-center">
      <Suspense>
        <AuthButton />
      </Suspense>
      <ThemeSwitcher />
    </div>
  );
}
