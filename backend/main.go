package main

import (
	. "backend/config"
	. "backend/database"
	"backend/handlers"
	. "backend/logger"
	"backend/utils"
	"net/http"
)

func main() {
	//TODO: refactor handlers
	defer DB.Close()
	utils.GenKeysIfNotExist()

	mux := http.NewServeMux()

	// For all users
	mux.Handle("/categories/get_list", http.HandlerFunc(handlers.GetCategoriesList))
	mux.Handle("/dishes/get_list", http.HandlerFunc(handlers.GetDishesList))
	mux.Handle("/admin/register", http.HandlerFunc(handlers.AdminRegister))
	mux.Handle("/admin/login", http.HandlerFunc(handlers.AdminLogin))

	// For admin
	mux.Handle("/category/add", utils.AuthMiddleware(http.HandlerFunc(handlers.AddCategory)))
	mux.Handle("/category/delete", utils.AuthMiddleware(http.HandlerFunc(handlers.DeleteCategory)))
	mux.Handle("/dish/add", utils.AuthMiddleware(http.HandlerFunc(handlers.AddDish)))
	mux.Handle("/dish/change_availability", utils.AuthMiddleware(http.HandlerFunc(handlers.ChangeDishAvailability)))
	mux.Handle("/dish/delete", utils.AuthMiddleware(http.HandlerFunc(handlers.DeleteDish)))

	switch Cfg.App.DevMode {
	case "true":
		Logger.Info("Starting server in the DEVELOPMENT mode via HTTP...")
	case "false":
		Logger.Info("Starting server in the PRODUCTION mode via HTTP...")
	}
	err := http.ListenAndServe(":14536", mux)
	if err != nil {
		Logger.Error("Error starting the server: " + err.Error())
	}
}
