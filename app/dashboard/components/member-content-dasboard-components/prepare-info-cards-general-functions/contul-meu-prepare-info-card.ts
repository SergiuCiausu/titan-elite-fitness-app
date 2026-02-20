import { SupabaseClient } from "@supabase/supabase-js";
import { InfoCardsGeneral } from "../info-cards-general";
import { getLastUserSubscription } from "@/lib/functions/get-last-user-subscription";
import { getFavoriteUserLocation } from "@/lib/functions/get-favorite-user-location";
import { getScorSaptamanal } from "@/lib/functions/get-scor-saptamanal";

export async function contulMeuPrepareInfoCard(supabase: SupabaseClient, user_id: string, subscription: string) {
    const lastSubscription = await getLastUserSubscription(supabase, user_id);
    const favoriteLocations = await getFavoriteUserLocation(supabase, user_id);
    const scorActivitate = await getScorSaptamanal(supabase, user_id);
    
    InfoCardsGeneral["Contul meu"] = InfoCardsGeneral["Contul meu"].map(card => ({
        ...card,
        info: card.info.map(info => 
            info.infoLabel === "Status abonament"
            ? 
                {
                    ...info,
                    infoContent: subscription ? "Activ" : "Inactiv"
                }
            : info.infoLabel === "Nivel membru"
                ?
                    {
                        ...info,
                        infoContent: lastSubscription ? lastSubscription.Subscription_plans.name : "Niciun abonament"
                    }
                : info.infoLabel === "Locația preferată" 
                    ?
                        {
                            ...info,
                            infoContent: favoriteLocations ? favoriteLocations[0].name : "Nicio locație"
                        }
                    : info.infoLabel === "Scor de activitate săptămânală"
                    ?
                        {
                            ...info,
                            infoContent: `${scorActivitate}/100`
                        }
                    : info
        )
    }))
}