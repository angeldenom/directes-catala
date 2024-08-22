import { SwitchObrir } from "@/components/switchObrir"
import { TabProvider, useTab } from "@/components/tab-provider";
import {
  Card2,
  CardContent2,
  CardDescription2,
  CardFooter2,
  CardHeader2,
  CardTitle2,
  CardImageWithOverlay,
} from "@/components/ui/card2"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ImatgeCarta } from "@/components/ui/imatgeCarta"
import Enllac from "@/components/enllac";

interface Stream {
  title: string;
  viewersCount: number;
  previewImageURL: string;
  broadcaster: {
      login: string;
      displayName: string;
      profileImageURL: string;
      primaryColorHex: string;
  };
  game: {
      displayName: string;
  };
  FreeformTags: {
      name: string;
  }[];
  }
  
  async function obteLlista(): Promise<Stream[]> {
  const result = await fetch(
      'http://api:8080/llista',
      //'http://localhost:8080/llista',
      { cache: "no-store" }
  );
  const data = await result.json()
  
  //await new Promise(resolve => setTimeout(resolve, 3000))
  
  return data.data
  }
  
  interface QuadriculaProps {
      atribut: any;
    }

export default async function Home() {

    const llista = await obteLlista()

    const badgeContainerStyle = {
        maxHeight: '3rem',
        overflow: 'hidden',
    };

  return (
    <main className="px-4 mx-auto my-12 max-w-6xl">
        <TabProvider>
          <SwitchObrir />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {llista.map((stream) => (
          <div key={stream.broadcaster.login}>
          <Enllac streamer={stream.broadcaster.login}>
          <Card2 className="flex flex-col justify-start hover:scale-105 transition">
            <ImatgeCarta src={stream.previewImageURL} alt="Descripció de la imatge" viewers={stream.viewersCount} />
            <CardHeader2 className="flex-row gap-4 mb-0.5">
              <Avatar>
                <AvatarImage src={stream.broadcaster.profileImageURL} alt={stream.broadcaster.displayName} />
                <AvatarFallback>{stream.broadcaster.displayName[0]}</AvatarFallback>
              </Avatar>
              <div style={{ marginTop: 0 }}>
                <CardTitle2>{stream.title}</CardTitle2>
                <CardDescription2>{stream.broadcaster.displayName}</CardDescription2>
                <CardDescription2>{stream.game.displayName}</CardDescription2>
                <div className="mb-0" style={badgeContainerStyle}>
                  {stream.FreeformTags.map((tag) => (
                    <Badge variant="outline" key={tag.name} className="mr-2 mb-0">{ tag.name }</Badge>
                  ))}
                </div>
              </div>
            </CardHeader2>
          </Card2>
          </Enllac></div>
        ))}
      </div>
        </TabProvider>
    </main>
  );
}
