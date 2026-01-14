
import { Hero } from "@/components/hero";
import { Locatii } from "@/components/ui/landing-page/locatii/locatii";
import { Suspense } from "react";


export default function Home() {
  return (
    <main>
      <Hero />
      <Suspense>
        <Locatii />
      </Suspense>
    </main>
  );
}
