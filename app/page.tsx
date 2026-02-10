import { Hero } from "@/components/hero";
import { Abonamente } from "@/components/ui/landing-page/abonamente/abonamente";
import { Antrenori } from "@/components/ui/landing-page/antrenori/antrenori";
import { Calendar } from "@/components/ui/landing-page/calendar/calendar";
import { Clase } from "@/components/ui/landing-page/clase/clase";
import { EchipamenteFacilitati } from "@/components/ui/landing-page/echipamente-facilitati/echipamenteFacilitati";
import { FinalBenefits } from "@/components/ui/landing-page/final-benefits/FinalBenefits";
import { Footer } from "@/components/ui/landing-page/footer/Footer";
import { GalerieFoto } from "@/components/ui/landing-page/galerie-foto/galeriefoto";
import { Locatii } from "@/components/ui/landing-page/locatii/locatii";
import { Testimoniale } from "@/components/ui/landing-page/testimoniale/testimoniale";
import { Suspense } from "react";


export default function Home() {
  return (
    <main>
      <Hero />
      <Suspense>
        <Locatii />
      </Suspense>
      <GalerieFoto />
      <Suspense>
        <Clase />
      </Suspense>
      <Suspense>
        <Calendar />
      </Suspense>
      <EchipamenteFacilitati />
      <Suspense>
        <Antrenori />
      </Suspense>
      <Suspense>
        <Testimoniale />
      </Suspense>
      <Suspense>
        <Abonamente />
      </Suspense>
      <FinalBenefits />
      <Footer />
    </main>
  );
}
