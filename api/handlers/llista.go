package handlers

import (
    "bytes"
    "encoding/json"
    "io/ioutil"
    "net/http"
	//"log" // Per a fer console.log
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


func GetTwitchStreams(w http.ResponseWriter, r *http.Request) {
    limit := 21
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

    // Creem una resposta en el format desitjat
    jsonResponse := map[string]interface{}{
        "status": "ok",
        "data":   customResponse,
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
