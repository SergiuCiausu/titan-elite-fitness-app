import { h3Settings } from "@/lib/constants/classes-tw/h3-settings"
import { ArrowBigUp, LucideProps, PartyPopper, ReceiptText } from "lucide-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"

type Benefit = {
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
    header: string,
    text: string,
}

export function FinalBenefits() {

    const benefits : Benefit[] = [
        {
            icon: ReceiptText,
            header: "Fără contracte pe termen lung",
            text: "Plătește lună de lună cu posibilitatea de a anula oricând. Poți schimba abonamentul oricând."
        }, 
        {
           icon: PartyPopper,
           header: "Primul antrenament gratuit",
           text: "Asigură-te de calitatea serviciilor și a atmosferei din sălile Titan Elite Fitness înainte de a plăti un abonament.", 
        },
        {
            icon: ArrowBigUp,
            header: "Aplicația Titan Elite Fitness",
            text: "Plătește lunar, cu libertatea de a anula oricând. Abonamentul poate fi reînnoit automat în fiecare lună."
        }
    ]

    return (
        <div
            className="w-[var(--content-width)] flex items-center justify-between my-16 mx-auto">
                {benefits.map((benefit, index) => {

                    const Icon = benefit.icon
                    
                    return (
                    <div
                        key={`final-benefit-${index}`}
                        className="w-[304px] flex flex-col items-center gap-2">
                            <Icon size={32} className="text-accent" />
                            <div
                                className="flex flex-col gap-1 text-center">
                                    <h3 className={`${h3Settings} !text-2xl`}>{benefit.header}</h3>
                                    <p
                                        className="text-primary-foreground opacity-50">
                                        {benefit.text}
                                    </p>
                            </div>
                    </div>
                )})}
        </div>
    )
}