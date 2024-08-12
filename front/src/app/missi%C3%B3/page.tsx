"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const shareText = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Comparteix twitch.cat',
          text: "Ser streamer en català és complicat: Twitch no té interfície en el nostre idioma i és difícil ser descobert. Twitch.cat vol fer més fàcil trobar directes en català, creant una xarxa d'oferta i demanda. Afegeix https://twitch.cat als teus marcadors i comparteix-ho amb els teus amics. Escampem la paraula!",
        });
      } catch (error) {}
    } else {
        try {
            await navigator.clipboard.writeText("Ser streamer en català és complicat: Twitch no té interfície en el nostre idioma i és difícil ser descobert. Twitch.cat vol fer més fàcil trobar directes en català, creant una xarxa d'oferta i demanda. Afegeix https://twitch.cat als teus marcadors i comparteix-ho amb els teus amics. Escampem la paraula!");
            alert('El text s\'ha copiat al porta-retalls. Comparteix-lo.');
          } catch (error) {
            alert('No s\'ha pogut compartir.');
          }
    }
  };

export default function Missio() {
    return (
        <main className="px-4 mx-auto my-12 max-w-6xl">
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Missió</h2>
                <p className="text-lg">Ser streamer en català és complicat. Per començar, ni tan sols pots tindre la interfície en el teu idioma. És quasi impossible que apareguis com a recomanació a la teva potencial audiència. Segurament qui et descobrirà és perquè ha filtrat expressament per idioma, una opció una mica amagada i que comporta uns quants clics. Et pots fer conèixer d’altres maneres, però sempre costa que l’audiència canviï de plataforma.</p>
                <p className="text-lg">L’objectiu d’aquesta pàgina és facilitar la consulta dels streams en català. I d’aquesta manera obrir un cercle d’oferta i demanda. La situació es pot revertir si ho fem servir i escampem la paraula. És per això que et recomano afegir twitch.cat als marcadors del teu navegador. Si saps programar pots donar un cop de mà a <a href="https://twitch.cat/codi-obert" className="text-gray-500 underline">twitch.cat/codi-obert</a>. I sobretot, comparteix la pàgina als teus amics.</p>
                <Card><CardHeader>
                <CardTitle className="text-xl">Text a difondre</CardTitle></CardHeader><CardContent><p className="-mt-4 mb-4">Ser streamer en català és complicat: Twitch no té interfície en el nostre idioma i és difícil ser descobert. Twitch.cat vol fer més fàcil trobar directes en català, creant una xarxa d'oferta i demanda. Afegeix https://twitch.cat als teus marcadors i comparteix-ho amb els teus amics. Escampem la paraula!</p>
                <Button className="w-full" onClick={shareText}>Compartir</Button>
                </CardContent></Card>
            </div>
        </main>
    )
}