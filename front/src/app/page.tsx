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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

/* Interface per a :

{"data":[{"title":"FINAL PRESENCIAL | IDE vs FSY | VALORANT | TIER 1 LlOP | SANT JUST DESVERN | ÒMNIUM CULTURAL","viewersCount":64,"previewImageURL":"https://static-cdn.jtvnw.net/previews-ttv/live_user_gamesportselectronics-440x248.jpg","broadcaster":{"login":"gamesportselectronics","displayName":"gamesportselectronics","profileImageURL":"https://static-cdn.jtvnw.net/jtv_user_pictures/126304ce-3c94-4bc8-9168-88859abcf18e-profile_image-50x50.png","primaryColorHex":"0B17E9"},"game":{"displayName":"VALORANT"},"FreeformTags":[{"name":"TOURNAMENT"},{"name":"català"},{"name":"Torneig"},{"name":"catalunya"},{"name":"riotgames"},{"name":"egames"},{"name":"Català"},{"name":"cultura"},{"name":"leagueoflegends"},{"name":"valorant"}]},{"title":"RECORD MUNDIAL DE HACER CROQUETAS EN 24H!!!!🤩  3 PANAS CHILLEANDO Y HACIENDO CROQUETAS","viewersCount":6,"previewImageURL":"https://static-cdn.jtvnw.net/previews-ttv/live_user_danivilardell-440x248.jpg","broadcaster":{"login":"danivilardell","displayName":"danivilardell","profileImageURL":"https://static-cdn.jtvnw.net/jtv_user_pictures/f515a9e1-80b2-493a-b9cc-f7666d4a987c-profile_image-50x50.png","primaryColorHex":null},"game":{"displayName":"Cooking Simulator: Pizza"},"FreeformTags":[{"name":"Cooking"},{"name":"Català"}]}

*/

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


export default async function Home() {

  const llista = await obteLlista()

  const badgeContainerStyle = {
    maxHeight: '3rem',
    overflow: 'hidden',
  };

  return (
    <main className="px-4 mx-auto my-12 max-w-6xl">
      <div className="flex items-center justify-center mb-6">
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Veure a twitch.tv</TabsTrigger>
            <TabsTrigger value="password">Veure aquí</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {llista.map((stream) => (
          <a href={"https://www.twitch.tv/" + stream.broadcaster.login} key={stream.broadcaster.login} rel="noopener noreferrer">
          <Card2 className="flex flex-col justify-start hover:scale-105 transition">
            <ImatgeCarta src={stream.previewImageURL} alt="Descripció de la imatge" viewers={stream.viewersCount} />
            <CardHeader2 className="flex-row gap-4"> {/* Modified className */}
              <Avatar>
                <AvatarImage src={stream.broadcaster.profileImageURL} alt={stream.broadcaster.displayName} />
                <AvatarFallback>{stream.broadcaster.displayName[0]}</AvatarFallback>
              </Avatar>
              <div style={{ marginTop: 0 }}>
                <CardTitle2>{stream.title}</CardTitle2>
                <CardDescription2>{stream.broadcaster.displayName}</CardDescription2>
                <CardDescription2>{stream.game.displayName}</CardDescription2>
                <div style={badgeContainerStyle}>
                  {stream.FreeformTags.map((tag) => (
                    <Badge variant="outline" key={tag.name} className="mr-2 mb-0">{ tag.name }</Badge>
                  ))}
                </div>
              </div>
            </CardHeader2>
          </Card2>
          </a>
        ))}
      </div>
    </main>
  );
}
