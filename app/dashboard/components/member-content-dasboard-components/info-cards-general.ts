import { Calendar, Clock8, Contact, MapPin } from "lucide-react";
import { InfoLayout } from "../content-dashboard-components/dashboardInfoCard";

export let InfoCardsGeneral: Record<string, InfoLayout[]> = {
    "Contul meu": [{
        type: "col",
        info: [
            {   
                infoLabel: "Status abonament",
                infoHeader: "Status abonament",
                infoContent: "" 
            },
            {   
                infoLabel: "Nivel membru",
                infoHeader: "Nivel membru",
                infoContent: "" 
            },
            {   
                infoLabel: "Locația preferată",
                infoHeader: "Locația preferată",
                infoContent: "" 
            },
            {   
                infoLabel: "Scor de activitate săptămânală",
                infoHeader: "Scor de activitate săptămânală",
                infoContent: "" 
            },
        ]
    }],
    "Următoarea clasă rezervată": [{
        type: "row-gap",
        info: [
            {
                infoLabel: "clasa",
                icon: "",
                infoContent: ""
            },
            {
                infoLabel: "data",
                icon: Calendar,
                infoContent: ""
            },
            {
                infoLabel: "antrenor",
                icon: Contact,
                infoContent: ""
            },
            {
                infoLabel: "locatia",
                icon: MapPin,
                infoContent: ""
            },
            {
                infoLabel: "durata",
                icon: Clock8,
                infoContent: ""
            },
        ]
    }],
    "Următorul antrenament": [{
        type: "row-gap",
        info: [
            {
                infoLabel: "antrenament",
                icon: "",
                infoContent: "",
            },
            {
                infoLabel: "data",
                icon: Calendar,
                infoContent: "",
            },
            {
                infoLabel: "antrenor",
                icon: Contact,
                infoContent: "",
            },
            {
                infoLabel: "locatia",
                icon: MapPin,
                infoContent: "",
            },
            {
                infoLabel: "muschi",
                icon: "/icons/general/muscles-worked",
                infoContent: "",
            },
            {
                infoLabel: "durata",
                icon: Clock8,
                infoContent: "",
            },
        ]
    }],
    "Progres săptămânal": [{
        type: "pie-chart",
        info: [
            {
                infoLabel: "antrenamente per saptamana",
                infoContent: ""
            }
        ]
    }]
}