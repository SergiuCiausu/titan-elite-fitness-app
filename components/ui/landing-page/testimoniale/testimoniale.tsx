import { getTestimonials } from "@/lib/functions/get-testimonials"
import { HeaderHr } from "../../headerhr";
import { Star } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { UUID } from "@/lib/constants/uuid";
import { getSmartDateDiff } from "@/lib/functions/get-smart-date-diff";
import { SliderWrapper } from "../components/sliderwrapper";

type Subscription = {
    user_id: UUID,
    start_date: string,
    end_date: string
}

function getOldestMembershipPerUser(subscriptions: Subscription[]) {
  const map = new Map();

  for (const sub of subscriptions) {
    const existing = map.get(sub.user_id);

    if (
      !existing ||
      new Date(sub.start_date) < new Date(existing.start_date)
    ) {
      map.set(sub.user_id, sub);
    }
  }

  return Array.from(map.values());
}

export async function Testimoniale() {

    const supabase = await createClient();

    const testimonials = await getTestimonials();

    const members = testimonials.map(testimonial => testimonial.user_id);

    const { data, error } = await supabase.from("Subscriptions").select("user_id, start_date, end_date").in("user_id", members);

    let memberSubscriptions: Subscription[]  = [];

    if (error) throw error;

    if (!data) {
        memberSubscriptions = [];
    } else {
        memberSubscriptions = getOldestMembershipPerUser(data);
    }

    const memberDuration: {[key: UUID]: string} = {};

    memberSubscriptions.forEach(member => {
        memberDuration[member.user_id] = getSmartDateDiff(new Date(member.start_date));
    });

    return (
        <SliderWrapper title="Testimoniale">
                {testimonials.map(testimonial => {
                    return (
                        <div
                            key={testimonial.id}
                            className="bg-card flex flex-col justify-between gap-8 p-8 rounded-2xl" style={{ minWidth: 304, height: 364 }}>
                                <div
                                    className="flex flex-col gap-2">
                                    <p
                                        className="text-sm 3xl:text-base text-primary-foreground">
                                        {testimonial.text}
                                    </p>
                                    <div
                                        className="flex gap-1 items-center">
                                        <Star className="fill-accent text-accent w-4 h-4" />
                                        <Star className="fill-accent text-accent w-4 h-4" />
                                        <Star className="fill-accent text-accent w-4 h-4" />
                                        <Star className="fill-accent text-accent w-4 h-4" />
                                        <Star className="fill-accent text-accent w-4 h-4" />
                                    </div>
                                </div>
                                <div
                                    className="flex flex-col gap-2">
                                    <HeaderHr size="sm" color="primary" />
                                    <div>
                                        <p className="text-primary-foreground text-sm 3xl:text-base font-bold">{testimonial.first_name} {testimonial.last_name}</p>
                                        <p className="text-primary-foreground opacity-50">Membru de {memberDuration[testimonial.user_id]}</p>
                                    </div>   
                                </div>
                        </div>
                    )
                })}
        </SliderWrapper>
    )
}