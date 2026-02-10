import { createClient } from "@/lib/supabase/server";
import { SliderWrapper } from "../components/sliderwrapper";
import { Class } from "@/lib/constants/class-type";
import { h2Settings } from "@/lib/constants/classes-tw/h2-settings";
import { HeaderHr } from "../../headerhr";

export async function Clase() {

    const supabase = await createClient();

    const { data: classes } = await supabase.from("Class_types").select("*").order("duration_default", { ascending: false});

    return(
        <SliderWrapper title="Clase">
            {classes?.map((item: Class, index: number) => {
                const classNameProcessed = item.name.toLowerCase().replace(" ", "");
                return (
                    <div
                        className="w-full relative">
                        <img src={`/images/landing-page/${classNameProcessed}.jpg`} alt={`${item.name} class image`} className="w-full rounded-[24px] object-cover select-none" />
                        <div
                            className="w-full h-full absolute top-0 flex items-center justify-center">
                                <div
                                    className="flex h-fit flex-col max-md:gap-2 items-center justify-center">
                                    <img src={`/icons/classes/${classNameProcessed}.svg`} alt={`${item.name} class icon`} />   
                                    <h2 className={`${h2Settings} 3xl:text-5xl !mt-0 text-secondary-foreground`}>{item.name.toUpperCase()}</h2>
                                    <HeaderHr size={"sm"} color={classNameProcessed}/>
                                </div>
                            
                        </div>
                        
                    </div>
            )})}
        </SliderWrapper>
    )
}