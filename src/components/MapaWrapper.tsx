"use client";

import dynamic from "next/dynamic";

const MapaExMoradores = dynamic(() => import("@/components/MapaExMoradores"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 flex items-center justify-center bg-gray-100 dark:bg-gray-900 rounded-2xl">
      <div className="text-gray-500 dark:text-gray-400 animate-pulse">Carregando mapa...</div>
    </div>
  ),
});

export default function MapaWrapper() {
  return <MapaExMoradores />;
}
