import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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


export default function Home() {
  return (
    <main>
      hola
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>

    </main>
  );
}
