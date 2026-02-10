import { MapPin } from "lucide-react";
import { MapMarker, MarkerContent } from "./map";

type MarkerProps = {
    id: string;
    name: string;
    lng: number;
    lat: number;
    [key: string]: unknown;
}& Record<string, unknown>

export function MapMarkers({ markers }: { markers : MarkerProps[]}) {
    return(
        <>
            {markers.map(marker => {

                return (
                <MapMarker 
                    key={marker.id}
                    longitude={marker.lat}
                    latitude={marker.lng}
                >
                    <MarkerContent className="group">
                        <MapPin
                            className="fill-foreground stroke-secondary-foreground transition-colors duration-250 dark:fill-primary group-hover:fill-primary-foreground dark:group-hover:fill-primary-hover"
                            size={32}
                        />
                    </MarkerContent>
                </MapMarker>
            )})}
        </>
    )
}