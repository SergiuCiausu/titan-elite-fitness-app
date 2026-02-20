import { SupabaseClient } from "@supabase/supabase-js";
import { contulMeuPrepareInfoCard } from "./prepare-info-cards-general-functions/contul-meu-prepare-info-card";
import { urmatoareaClasaRezervataPrepareInfoCard } from "./prepare-info-cards-general-functions/clasa-urmatoare-rezervata-prepare-info-cards";

export async function prepareInfoCardsGeneral(supabase: SupabaseClient, user_id: string, subscription: string ) {
    await contulMeuPrepareInfoCard(supabase, user_id, subscription);
    await urmatoareaClasaRezervataPrepareInfoCard(supabase, user_id);
    
}