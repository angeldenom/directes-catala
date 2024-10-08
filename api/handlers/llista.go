package handlers

import (
    "bytes"
    "encoding/json"
    "io/ioutil"
    "net/http"
	"log" // Per a fer console.log
    "bufio"
    "os"
)

const (
    twitchURL    = "https://gql.twitch.tv/gql"
    clientID     = "ue6666qo983tsx6so1t0vnawi233wa"     // Substitueix pel teu Client ID de Twitch
)

type TwitchRequest struct {
    OperationName string                 `json:"operationName"`
    Variables     map[string]interface{} `json:"variables"`
    Extensions    map[string]interface{} `json:"extensions"`
}

type TwitchResponse struct {
    Data struct {
        Streams struct {
            Edges []struct {
                Node TwitchNode `json:"node"`
            } `json:"edges"`
        } `json:"streams"`
    } `json:"data"`
}

type FreeformTag struct {
    Name        *string `json:"name"`
}

type TwitchGame struct {
    DisplayName *string `json:"displayName"`
}

type TwitchBroadcaster struct {
    Login            string `json:"login"`
    DisplayName      string `json:"displayName"`
    ProfileImageURL  string `json:"profileImageURL"`
    PrimaryColorHex  *string `json:"primaryColorHex"`
}

type TwitchNode struct {
    Title         string             `json:"title"`
    ViewersCount  int                `json:"viewersCount"`
    PreviewImageURL string           `json:"previewImageURL"`
    Broadcaster   TwitchBroadcaster `json:"broadcaster"`
    Game          TwitchGame        `json:"game"`
	Tags          *[]FreeformTag `json:"FreeformTags"`
}

// Funció per modificar el DisplayName dels jocs
func modifyGameDisplayNames(customResponse []TwitchNode, nameMappings map[string]string) {
    for i := range customResponse {
        game := &customResponse[i].Game
        if game.DisplayName != nil {
            if newName, exists := nameMappings[*game.DisplayName]; exists {
                game.DisplayName = &newName
            }
        }
    }
}

// Funció per eliminar els FreeformTag dels Tags
func removeTags(customResponse []TwitchNode, tagsToRemove []string) {
    tagsToRemoveMap := make(map[string]struct{})
    for _, tag := range tagsToRemove {
        tagsToRemoveMap[tag] = struct{}{}
    }

    for i := range customResponse {
        if customResponse[i].Tags != nil {
            filteredTags := []FreeformTag{}
            for _, tag := range *customResponse[i].Tags {
                if tag.Name != nil {
                    if _, exists := tagsToRemoveMap[*tag.Name]; !exists {
                        filteredTags = append(filteredTags, tag)
                    }
                }
            }
            customResponse[i].Tags = &filteredTags
        }
    }
}

// Funció per llegir la llista eliminats des d'un fitxer
func readLlistaEliminats(filename string) ([]string, error) {
    file, err := os.Open(filename)
    if err != nil {
        return nil, err
    }
    defer file.Close()

    var llistaEliminats []string
    scanner := bufio.NewScanner(file)
    for scanner.Scan() {
        llistaEliminats = append(llistaEliminats, scanner.Text())
    }

    if err := scanner.Err(); err != nil {
        return nil, err
    }

    return llistaEliminats, nil
}

func GetTwitchStreams(w http.ResponseWriter, r *http.Request) {
    limit := 21 // Aquí el límit de streams a retornar
    cursor := ""

    requestData := TwitchRequest{
        OperationName: "BrowsePage_Popular",
        Variables: map[string]interface{}{
            "imageWidth":         50,
            "includePreviewBlur": false,
            "sortTypeIsRecency":  false,
            "platformType":       "all",
            "limit":              limit,
            "options": map[string]interface{}{
                "recommendationsContext": map[string]interface{}{
                    "platform": "web",
                },
                "includeRestricted":   []string{"SUB_ONLY_LIVE"},
                "broadcasterLanguages": []string{"CA"},
                "requestID":           "JIRA-VXP-2397",
                "sort":                "RELEVANCE",
                "freeformTags":        nil,
                "tags":                []string{},
            },
            "cursor": cursor,
        },
        Extensions: map[string]interface{}{
            "persistedQuery": map[string]interface{}{
                "version":    1,
                "sha256Hash": "92922d263f6a120a9c28c9f98772be12d25e7f76ebcde22666a8c4195079d4df",
            },
        },
    }

    jsonData, err := json.Marshal(requestData)
    if err != nil {
        http.Error(w, "Failed to encode request data", http.StatusInternalServerError)
        return
    }

    req, err := http.NewRequest("POST", twitchURL, bytes.NewBuffer(jsonData))
    if err != nil {
        http.Error(w, "Failed to create request", http.StatusInternalServerError)
        return
    }

    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Client-ID", clientID)

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        http.Error(w, "Failed to make request", http.StatusInternalServerError)
        return
    }
    defer resp.Body.Close()

    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        http.Error(w, "Failed to read response", http.StatusInternalServerError)
        return
    }

	// Console log de body
	//log.Println(string(body))

    // Parsem la resposta original de Twitch
    var twitchResp TwitchResponse
    if err := json.Unmarshal(body, &twitchResp); err != nil {
        http.Error(w, "Failed to parse Twitch response", http.StatusInternalServerError)
        return
    }

    // Construïm la resposta personalitzada
    var customResponse []TwitchNode
    for _, edge := range twitchResp.Data.Streams.Edges {
        customResponse = append(customResponse, edge.Node)
    }

    // Defineix la llista de noms antics i nous
    nameMappings := map[string]string{
        "Just Chatting": "Xerrant",
        "Music": "Música",
        "Special Events": "Esdeveniments especials",
        "Sports": "Esports",
        "Talk Shows & Podcasts": "Xerrades i pòdcasts",
        "Software and Game Development": "Desenvolupament de programari i jocs",
        "Always On": "Sempre actiu",
        "Food & Drink": "Menjar i beguda",
        "Chess": "Escacs",
        "Pools, Hot Tubs, and Beaches": "Piscines, jacuzzis i platges",
        "Poker": "Pòquer",
        "Games + Demos": "Jocs + Demos",
        "Animals, Aquariums, and Zoos": "Animals, aquaris i zoològics",
        "Politics": "Política",
        "Fitness & Health": "Fitnes i salut",
        "Board Games": "Jocs de taula",
        "Makers & Crafting": "Manualitats i artesania",
        "Science & Technology": "Ciència i tecnologia",
        "Beauty & Body Art": "Bellesa i art corporal",
    }

    // Modifica els DisplayName dels jocs
    modifyGameDisplayNames(customResponse, nameMappings)

    // Defineix la llista de tags a eliminar
    tagsToRemove := []string{"Català", "català", "Catala", "catala", "Catalan", "catalan", "Catalán", "catalán", "Catalunya", "catalunya", "Catalonia", "catalonia", "Cataluña", "cataluña"}

    // Elimina els FreeformTag dels Tags
    removeTags(customResponse, tagsToRemove)

    // Defineix la llista eliminats de canals
    llistaEliminats, err := readLlistaEliminats("llista_eliminats.txt")
    if err != nil {
        log.Fatalf("Error llegint la llista eliminats: %v", err)
    }

    // Converteix la llista eliminats en un mapa per a una cerca ràpida
    llistaEliminatsMap := make(map[string]struct{})
    for _, login := range llistaEliminats {
        llistaEliminatsMap[login] = struct{}{}
    }

    // Filtra els canals que no estan a la llista eliminats
    filteredResponse := customResponse[:0]
    for _, canal := range customResponse {
        if _, found := llistaEliminatsMap[canal.Broadcaster.Login]; !found {
            filteredResponse = append(filteredResponse, canal)
        }
    }
    customResponse = filteredResponse

    // Defineix la llista altres de canals
    llistaAltres, err := readLlistaEliminats("llista_altres.txt")
    if err != nil {
        log.Fatalf("Error llegint la llista altres: %v", err)
    }

    // Converteix la llista altres en un mapa per a una cerca ràpida
    llistaAltresMap := make(map[string]struct{})
    for _, login := range llistaAltres {
        llistaAltresMap[login] = struct{}{}
    }

    // Inicialitza la llista de canals altres
    var customResponse2 []TwitchNode

    // Elimina de la llista de canals els que estan a la llista altres, i afegeix-los a la llista altres
    altresResponse := customResponse[:0]
    for _, canal := range customResponse {
        if _, found := llistaAltresMap[canal.Broadcaster.Login]; found {
            customResponse2 = append(customResponse2, canal)
        } else {
            altresResponse = append(altresResponse, canal)
        }
    }
    customResponse = altresResponse

    // Creem una resposta en el format desitjat
    jsonResponse := map[string]interface{}{
        "status": "ok",
        "data":   customResponse,
        "altres": customResponse2,
    }

    // Convertim la resposta a JSON
    responseData, err := json.Marshal(jsonResponse)
    if err != nil {
        http.Error(w, "Failed to encode response data", http.StatusInternalServerError)
        return
    }

    // Establim el capçalera Content-Type i retornem la resposta
    w.Header().Set("Content-Type", "application/json")
    w.Write(responseData)

}
