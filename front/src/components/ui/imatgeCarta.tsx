'use client'

import * as React from "react";
const { useState, useEffect } = React;

import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

const ImatgeCarta = React.forwardRef<
  HTMLDivElement,
  { src: string; alt: string; viewers: number; className?: string }
>(({ src, alt, viewers, className }, ref) => {
  // Estat per controlar si la imatge s'ha carregat
  const [imatgeCarregada, setImatgeCarregada] = useState(false);

  // useEffect per gestionar la càrrega de la imatge
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setImatgeCarregada(true);
    img.onerror = () => console.error('Error carregant la imatge');
  }, [src]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {!imatgeCarregada && <Skeleton className="w-full aspect-[55/31]" />}
      <img
        src={src}
        alt={alt}
        className={`w-full h-auto ${imatgeCarregada ? 'block' : 'hidden'}`}
        onLoad={ () => {setImatgeCarregada(true); console.log("Imatge carregada")}}
      />
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-sm px-1.5 py-0.5 rounded-sm">
            {viewers === 1 ? "1 espectador" : `${viewers} espectadors`}
          </div>
          <div className="absolute top-2 left-2 bg-red-600 text-white text-sm px-1.5 py-0.5 rounded-sm">
            DIRECTE
          </div>
    </div>
  );
});
ImatgeCarta.displayName = "CardImageWithOverlay";

export { ImatgeCarta };