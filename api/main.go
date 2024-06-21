package main

import (
    "log"
    "net/http"
    "api/handlers"
)

func main() {
    http.HandleFunc("/llista", handlers.GetTwitchStreams)
    log.Println("Server started at :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
