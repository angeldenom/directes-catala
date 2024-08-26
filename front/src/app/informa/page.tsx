"use client"
import { useEffect } from 'react';

export default function Informa() {
    useEffect(() => {
        // Assegura't que el codi de Tally s'executi després que el component es carrega
        const script = document.createElement('script');
        script.src = "https://tally.so/widgets/embed.js";
        script.async = true;
        document.body.appendChild(script);
    
        return () => {
          // Elimina el script quan el component es desmunti
          document.body.removeChild(script);
        };
      }, []);
    return (
        <main className="px-4 mx-auto my-12 max-w-6xl">
            <iframe
        data-tally-src="https://tally.so/embed/npGXD1?alignLeft=1&transparentBackground=1&dynamicHeight=1"
        loading="lazy"
        width="100%"
        height="387"
        title="Informar de canal inadequat"
        className="rounded-xl"
      ></iframe>
        </main>
    )
}