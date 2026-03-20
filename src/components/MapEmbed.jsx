"use client";

import { useEffect, useRef } from "react";

export default function MapEmbed() {
  const mapRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // If already initialized, just return
    if (instanceRef.current) return;

    import("leaflet").then((L) => {
      // Guard again inside async in case of strict mode double-fire
      if (instanceRef.current) return;

      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current, {
        center: [37.7749, -122.4194],
        zoom: 12,
        zoomControl: false,
        scrollWheelZoom: false,
        dragging: false,
        attributionControl: false,
      });

      L.tileLayer(
        "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",
        { maxZoom: 20 }
      ).addTo(map);

      const icon = L.divIcon({
        className: "",
        html: `<div style="
          width: 12px; height: 12px;
          background: #c8501a;
          border: 2px solid #fff;
          border-radius: 50%;
          box-shadow: 0 0 0 3px rgba(200,80,26,0.25);
        "></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      });

      L.marker([37.7749, -122.4194], { icon }).addTo(map);
      instanceRef.current = map;
    });

    return () => {
      if (instanceRef.current) {
        instanceRef.current.remove();
        instanceRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <div ref={mapRef} style={{ width: "100%", height: "320px" }} />
    </>
  );
}
