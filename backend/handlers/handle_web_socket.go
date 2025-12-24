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
	ClientsLock.Lock()
	Clients[conn] = true
	ClientsLock.Unlock()

	Logger.Info(fmt.Sprintf("New client has been connected. Now %d clients are connected.", len(Clients)))
	for {
		// you can use this loop for ping-pong and other messages
		_, _, err := conn.ReadMessage()
		if err != nil {
			// Client was disconnected
			ClientsLock.Lock()
			delete(Clients, conn)
			ClientsLock.Unlock()
			Logger.Info(fmt.Sprintf("Client has been disconnected. Now %d clients are connected.", len(Clients)))
			break
		}
	}
}
