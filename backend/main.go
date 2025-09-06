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

	http.HandleFunc("/category/add", handlers.AddCategory)
	http.HandleFunc("/category/delete", handlers.DeleteCategory)
	http.HandleFunc("/categories/get_list", handlers.GetCategoriesList)
	http.HandleFunc("/dish/add", handlers.AddDish)
	http.HandleFunc("/dish/change_availability", handlers.ChangeDishAvailability)
	http.HandleFunc("/dish/delete", handlers.DeleteDish)
	http.HandleFunc("/dishes/get_list", handlers.GetDishesList)

	Logger.Info("Starting server")
	err := http.ListenAndServeTLS(":443", Cfg.SSL.PathToCert, Cfg.SSL.PathToKey, nil)
	if err != nil {
		Logger.Error("Error starting the server: " + err.Error())
	}
}
