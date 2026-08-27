import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useLanguage } from "@/i18n";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Interactive Map — Kriopigi Shore Guide" },
      { name: "description", content: "Spatial story of Kriopigi Beach — meadows, springs, and shorelines mapped along the Kassandra coast." },
      { property: "og:title", content: "Interactive Map — Kriopigi Shore Guide" },
      { property: "og:description", content: "A cinematic, mobile-first map of Kriopigi's habitats and history." },
    ],
  }),
  component: MapPage,
});

mapboxgl.accessToken = "pk.eyJ1IjoieHJpc3NvdWxhIiwiYSI6ImNtcDBwaDZncjAwOW4ycW9ka2d0MDRucWMifQ.y-Ww8U9N4YjufwIFYyGtFQ";

function MapPage() {
  const { t, lang } = useLanguage();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    map.current?.remove();

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [23.505, 40.038],
      zoom: 13,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    new mapboxgl.Marker({ color: "#d66a3a" })
      .setLngLat([23.483278, 40.042083])
      .setPopup(
        new mapboxgl.Popup({ offset: 18, maxWidth: "220px" }).setHTML(`
          <div style="max-width:220px; max-height:35vh; overflow:hidden; font-family:Georgia, serif; color:#1f2d2f;">
            <img
              src="/assets/posidonia-oceanica.jpg"
              alt="Posidonia oceanica"
              style="width:100%; height:90px; object-fit:cover; border-radius:8px; margin-bottom:8px; display:block;"
            />
            <h3 style="margin:0 0 4px; font-size:13px; font-weight:600; letter-spacing:0.01em; color:#12343b;">${t("Posidonia Meadow")}</h3>
            <p style="font-size:11.5px; line-height:1.45; margin:0 0 6px; color:#3a4a4d;">
              ${t("Endemic seagrass meadows stabilize sediment and shelter juvenile fish across the Aegean shelf.")}
            </p>
            <div style="font-size:9.5px; letter-spacing:0.08em; text-transform:uppercase; opacity:0.6;">${t("Ecology · Marine · Coast")}</div>
          </div>
        `)
      )
      .addTo(map.current);

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [lang, t]);

  return (
    <SiteLayout>
      <div className="px-5 max-w-5xl mx-auto pt-4">
        <p className="text-[10px] uppercase tracking-[0.25em] text-accent">{t("Spatial story")}</p>
        <h1 className="font-serif text-3xl text-foreground">{t("The Cove, Mapped")}</h1>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {t("A field map of Kriopigi where geology, water, vegetation, marine life, and human history meet.")}
        </p>
      </div>

      <div className="px-5 max-w-5xl mx-auto mt-5">
        <div
          ref={mapContainer}
          style={{
            width: "100%",
            height: "70vh",
            minHeight: "500px",
            borderRadius: "24px",
            overflow: "hidden",
          }}
        />
      </div>
    </SiteLayout>
  );
}
