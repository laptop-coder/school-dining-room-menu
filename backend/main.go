package main

import (
	. "backend/config"
	. "backend/database"
	"backend/handlers"
	. "backend/logger"
	"net/http"
)

func main() {
	defer DB.Close()

	http.HandleFunc("/get_dishes_list", handlers.GetDishesList)

	Logger.Info("Starting server")
	err := http.ListenAndServeTLS(":443", Cfg.SSL.PathToCert, Cfg.SSL.PathToKey, nil)
	if err != nil {
		Logger.Error("Error starting the server: " + err.Error())
	}
}
