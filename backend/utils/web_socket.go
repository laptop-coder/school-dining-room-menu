package utils

import (
	. "backend/config"
	. "backend/logger"
	"encoding/json"
	"github.com/gorilla/websocket"
	"net/http"
	"sync"
)

var (
	Clients     = make(map[*websocket.Conn]bool)
	ClientsLock sync.Mutex
	Upgrader    = websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			origin := r.Header.Get("Origin")
			// TODO: use slices.Contains instead of loop
			for _, allowed := range Cfg.App.Origins {
				if origin == allowed {
					return true
				}
			}
			Logger.Error("Forbidden origin: " + origin) // TODO: is it normal to write origin to log?
			return false
		},
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
	}
)

func BroadcastMenuUpdate() {
	items, err := GetMenuItemsTV()
	if err != nil {
		Logger.Error("Error getting dishes list for broadcasting to TVs: " + err.Error())
		return
	}
	data, err := json.Marshal(items)
	if err != nil {
		Logger.Error("Error converting dishes list (for broadcasting to TVs) to JSON: " + err.Error())
		return
	}
	ClientsLock.Lock()
	defer ClientsLock.Unlock()
	for client := range Clients {
		err := client.WriteMessage(websocket.TextMessage, data)
		if err != nil {
			Logger.Error("Error sending new dishes list to client (TV): " + err.Error())
			client.Close()
			delete(Clients, client)
		}
	}
	Logger.Info("New dishes list was broadcast to all clients (TVs)")
}
