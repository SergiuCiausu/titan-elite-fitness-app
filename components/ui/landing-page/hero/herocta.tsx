import { Button } from "../../button";
import { ChevronRight } from "lucide-react";

export function HeroCTA() {
    return (
        <div
            className="flex flex-col items-center justify-center gap-8 w-full">
                <p className="text-primary-foreground text-center text-base 3xl:text-xl">Antrenori dedicați, echipamente premium Panatta & LifeFitness și programe personalizate pentru orice nivel.</p>
                <div
                    className="max-md:w-full flex max-md:flex-col items-center md:gap-6 3xl:gap-8">
                        <div
                            className="md:hidden">
                            <Button variant={"CTA"} size={"lg"} className="uppercase">
                                <span>Alătură-te acum</span>
                            </Button>
                        </div>
                        <div
                            className="max-md:hidden">
                            <Button variant={"CTA"} size={"xl"} className="uppercase">
                                <span>Alătură-te acum</span>
                            </Button>
                        </div>
                        <div
                            className="md:hidden">
                            <Button variant={"outline"} size={"lg"}>
                                <span className="!font-normal">Vezi oferte</span>
                                <ChevronRight />
                            </Button>
                        </div>
                        <div
                            className="max-md:hidden">
                            <Button variant={"outline"} size={"xl"}>
                                <span className="!font-normal">Vezi oferte</span>
                                <ChevronRight />
                            </Button>
                        </div>
                    
                </div>
        </div>
    )
}