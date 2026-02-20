import { Navbar } from "@/components/ui/landing-page/nav/navbar";
import { navLinks } from "@/lib/constants/nav-links";
import { CoachPage } from "./components/coachPage";
import { Suspense } from "react";
import { CoachLocations } from "./components/locationsCoach";
import { CoachCalendar } from "./components/calendarCoach";
import { Footer } from "@/components/ui/landing-page/footer/Footer";

export type PageProps = {
    params: {
        name: string
    }
}

export default async function page({ params }: PageProps){

    return (
        <div>
            <Navbar navLinks={navLinks} />
            <Suspense>
                <CoachPage params={params} />
            </Suspense>
            <Suspense>
                <CoachLocations params={params} />
            </Suspense>
            <Suspense>
                <CoachCalendar params={params} />
            </Suspense>
            <Footer />
        </div>
    )
}