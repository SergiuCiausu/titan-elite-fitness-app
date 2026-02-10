import { UUID } from "../constants/uuid";
import { createClient } from "../supabase/server";

export type Testimonial = {
    id: UUID,
    user_id: UUID,
    first_name: string,
    last_name: string,
    text: string
}

export async function getTestimonials(){
    const supabase = await createClient();

    const { data, error } = await supabase.from('Testimonials').select("id, user_id, first_name, last_name, text").order("id", { ascending: true }) as { data: Testimonial[], error: any };

    if (error) throw error;

    if (!data) return [];

    return data;
}