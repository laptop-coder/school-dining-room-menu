package handlers

import (
	. "backend/database"
	. "backend/logger"
	. "backend/utils"
	"encoding/json"
	"net/http"
)

func GetCategoriesList(w http.ResponseWriter, r *http.Request) {
	SetupCORS(&w)
	if r.Method != http.MethodGet {
		msg := "A GET request is required"
		Logger.Warn(msg)
		http.Error(w, msg, http.StatusMethodNotAllowed)
		return
	}
	w.Header().Set("Content-Type", "application/json")

	// Get data from the database

	sqlQuery := "SELECT * FROM category ORDER BY category_name;"
	if rows, err := DB.Query(sqlQuery); err != nil {
		msg := "Error getting categories list from the database: " + err.Error()
		Logger.Error(msg)
		http.Error(w, msg, http.StatusInternalServerError)
		return
	} else {
		Logger.Info("Success. Received categories list")
		// Serialize data and send it in response
		var categoriesList []string
		var categoryName string
		for rows.Next() {
			if err := rows.Scan(
				&categoryName,
			); err != nil {
				msg := "Error (\"categoryName\" object): " + err.Error()
				Logger.Error(msg)
				http.Error(w, msg, http.StatusInternalServerError)
				return
			}
			categoriesList = append(categoriesList, categoryName)
		}
		jsonData, err := json.Marshal(categoriesList)
		if err != nil {
			msg := "JSON serialization error: " + err.Error()
			Logger.Error(msg)
			http.Error(w, msg, http.StatusInternalServerError)
			return
		}
		w.Write(jsonData)
		return
	}
}
