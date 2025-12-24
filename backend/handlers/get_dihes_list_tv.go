package handlers

import (
	. "backend/logger"
	. "backend/utils"
	"encoding/json"
	"net/http"
)

func GetDishesListTV(w http.ResponseWriter, r *http.Request) {
	SetupCORS(&w)
	if r.Method != http.MethodGet {
		msg := "A GET request is required"
		Logger.Warn(msg)
		http.Error(w, msg, http.StatusMethodNotAllowed)
		return
	}
	w.Header().Set("Content-Type", "application/json")

	dishesList, err := GetMenuItemsTV()
	if err != nil {
		msg := "Error getting dishes list (TV) from the database: " + err.Error()
		Logger.Error(msg)
		http.Error(w, msg, http.StatusInternalServerError)
		return
	} else {
		Logger.Info("Success. Received dishes list")
		// Serialize data and send it in response
		jsonData, err := json.Marshal(dishesList)
		if err != nil {
			msg := "JSON serialization error (dishes list for TV): " + err.Error()
			Logger.Error(msg)
			http.Error(w, msg, http.StatusInternalServerError)
			return
		}
		w.Write(jsonData)
		return
	}
}
