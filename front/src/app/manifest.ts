import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "twitch.cat",
    short_name: "twitch.cat",
    description: "El portal dels directes en català.",
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
    scope: "/",
    start_url: "/",
    lang: "ca",
    icons: [
        {
            purpose: "maskable",
            sizes: "512x512",
            src: "icon512_maskable.png",
            type: "image/png"
        },
        {
            purpose: "any",
            sizes: "512x512",
            src: "icon512_rounded.png",
            type: "image/png"
        }
    ]
  }
}