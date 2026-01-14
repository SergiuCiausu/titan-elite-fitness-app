import { navLinks } from "@/lib/constants/nav-links";
import { HeroCTA } from "./ui/landing-page/hero/herocta";
import { HeroHeader } from "./ui/landing-page/hero/heroheader";
import { HeroPerks } from "./ui/landing-page/hero/heroPerks";
import { Navbar } from "./ui/landing-page/nav/navbar";

export function Hero() {

  return (
    <section
      className="h-screen relative">
        <div
          className="w-screen">
          <Navbar navLinks={navLinks} />
        </div>
      <div
        className="relative w-full h-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute z-1 top-0 left-0 w-full h-full bg-black/80"></div>
        <div
          className="relative z-5 w-full h-full flex flex-col items-center justify-center mx-auto">
            <div
              className="w-screen md:max-w-[600px] max-md:px-8 3xl:max-w-[691px] flex flex-col items-center justify-center gap-8 3xl:gap-16">
              <HeroHeader />
              <HeroCTA />
            </div>
            <div
              className="absolute max-md:hidden bottom-16">
                <HeroPerks />
            </div>
        </div>
      </div>
    </section>
  );
}
