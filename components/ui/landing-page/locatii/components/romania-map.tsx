import { useMap } from "@/components/ui/map"; // mapcn hook
import { useEffect } from "react";
import romaniaRaw from '@/lib/constants/romania-geo.json';
import { FeatureCollection, Polygon } from 'geojson';
import Color from "color";

export function RomaniaLayer() {
  const { map, isLoaded } = useMap();

    const romaniaGeoJSON = romaniaRaw as FeatureCollection<Polygon>;

    const borderColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--primary')
    .trim();

    const borderColorWrapper = `hsl(${borderColor})`

    const borderColorHex = Color(borderColorWrapper).hex();

  useEffect(() => {
    if (!map || !isLoaded) return;

    if (!map.getSource("romania")) {
      map.addSource("romania", {
        type: "geojson",
        data: romaniaGeoJSON,
      });

      map.addLayer({
        id: "romania-border",
        type: "line",
        source: "romania",
        paint: {
          "line-color": borderColorHex,
          "line-width": 3,
        },
      });
    }

    return () => {
      if (!map || !isLoaded) return;
      if (map.getLayer("romania-border")) {
        map.removeLayer("romania-border");
      }
      if (map.getSource("romania")) {
        map.removeSource("romania");
      }
    };
  }, [map, isLoaded]);

  return null;
}
