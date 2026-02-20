import { Button } from "@/components/ui/button";
import { profesieAntrenori } from "@/components/ui/landing-page/antrenori/antrenori";
import { CoachClassSpecialties } from "@/components/ui/landing-page/antrenori/components/client-antrenor-components/coach-class-specialties";
import { h1Settings } from "@/lib/constants/classes-tw/h1-settings";
import { Coach, getCoaches } from "@/lib/functions/get-coaches";
import { Check } from "lucide-react";
import { notFound } from "next/navigation";
import { PageProps } from "../page";

export async function CoachPage({ params }: PageProps ){

    const { name } = await params

    const coach: Coach[] = await getCoaches({ names: [name]})

    if (!coach) notFound();

    const fullName = `${coach[0].first_name} ${coach[0].last_name}`
    const imgSrcName = `${coach[0].first_name.toLowerCase()}-${coach[0].last_name.toLowerCase()}`

    const specialties = ["TRX", "Bodybuilding", "Calisthenics", "Pilates", "Yoga", "Cardio", "Plyometrics", "Siluetă", "Exploziv", "Forță", "Echilibru", "Vindecare accidentări", "Tonifiere"];

    return (
        <div
            className="w-[var(--content-width)] py-[100px] mt-16 flex items-center gap-16 mx-auto">
            <div
                className="w-[686px] flex flex-col gap-8">
                    <div
                        className="flex flex-col gap-4">
                        <div
                            className="flex flex-col gap-1">
                            <p className="font-body text-sm">Antrenor personal <span className="text-accent">Titan Elite Fitness</span></p>
                            <h1 className={`${h1Settings} text-primary-foreground`}>{coach[0].first_name} {coach[0].last_name}</h1>
                        </div>
                        <p>Antrenor personal cu peste 10 ani de experiență în crearea de programe de antrenament personalizate și flexibile. {profesieAntrenori[fullName]}</p>
                    </div>
                    <div
                        className="flex items-center gap-1 flex-wrap">
                        <CoachClassSpecialties coachSpecialties={coach[0].Coach_specialties} />
                    </div>
                    <Button variant={"CTA"} size={"lg"} className="uppercase">Contactează antrenor</Button>
                    <div
                        className="flex gap-2 flex-wrap">
                        {specialties.map(specialty => (
                            <div
                                key={specialty}
                                className="flex items-center gap-1">
                                    <Check size={16} strokeWidth={4} className="text-accent" />
                                    <p className="font-bold text-base">{specialty}</p>
                            </div>
                        ))}
                    </div>
            </div>
            <div
                className="flex-1 h-[524px]">
                    <img src={`/images/coaches/${imgSrcName}.jpg`} alt={`${fullName} image`} className="w-full h-full rounded-[32px] object-cover"/>
            </div>
        </div>
    )
}