import { SupabaseClient } from "@supabase/supabase-js";
import { contulMeuPrepareInfoCard } from "./prepare-info-cards-general-functions/contul-meu-prepare-info-card";
import { urmatoareaClasaRezervataPrepareInfoCard } from "./prepare-info-cards-general-functions/clasa-urmatoare-rezervata-prepare-info-card";
import { urmatorulAntrenamentRezervatPrepareInfoCard } from "./prepare-info-cards-general-functions/antrenamentul-urmator-prepare-info-card";
import { progresSaptamanalPrepareInfoCard } from "./prepare-info-cards-general-functions/progres-saptamanal-prepare-info-card";

export async function prepareInfoCardsGeneral(supabase: SupabaseClient, user_id: string, subscription: string ) {
    await contulMeuPrepareInfoCard(supabase, user_id, subscription);
    await urmatoareaClasaRezervataPrepareInfoCard(supabase, user_id);
    await urmatorulAntrenamentRezervatPrepareInfoCard(supabase, user_id);
    await progresSaptamanalPrepareInfoCard(supabase, user_id);
}