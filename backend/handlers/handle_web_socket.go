package handlers

import (
	. "backend/logger"
	. "backend/utils"
	"fmt"
	"net/http"
)

func HandleWebSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := Upgrader.Upgrade(w, r, nil)
	if err != nil {
		Logger.Error("Error upgrading HTTP connection to WebSocket: " + err.Error())
		return
	}
	defer conn.Close()
	// Register new client
	TVClientsLock.Lock()
	TVClients[conn] = true
	TVClientsLock.Unlock()

	Logger.Info(fmt.Sprintf("New TV client has been connected. Now %d clients are connected.", len(TVClients)))
	for {
		// you can use this loop for ping-pong and other messages
		_, _, err := conn.ReadMessage()
		if err != nil {
			// Client was disconnected
			TVClientsLock.Lock()
			delete(TVClients, conn)
			TVClientsLock.Unlock()
			Logger.Info(fmt.Sprintf("TV client has been disconnected. Now %d clients are connected.", len(TVClients)))
			break
		}
	}
}
