package handlers

import (
	. "backend/database"
	. "backend/logger"
	"backend/types"
	. "backend/utils"
	"database/sql"
	"encoding/json"
	"net/http"
)

func GetDishData(w http.ResponseWriter, r *http.Request) {
	SetupCORS(&w)
	if r.Method != http.MethodGet {
		msg := "A GET request is required"
		Logger.Warn(msg)
		http.Error(w, msg, http.StatusMethodNotAllowed)
		return
	}
	w.Header().Set("Content-Type", "application/json")

	dishId := r.URL.Query().Get("dish_id")

	// Get data from the database

	var rows *sql.Rows
	var err error
	rows, err = DB.Query(
		"SELECT * FROM dish WHERE dish_id=?;",
		dishId,
	)

	if err != nil {
		msg := "Error getting dish data from the database: " + err.Error()
		Logger.Error(msg)
		http.Error(w, msg, http.StatusInternalServerError)
		return
	} else {
		Logger.Info("Success. Received dish data")
		// Serialize data and send it in response
		var dish types.Dish
		for rows.Next() {
			if err := rows.Scan(
				&dish.DishId,
				&dish.DishCategory,
				&dish.DishName,
				&dish.DishDescription,
				&dish.DishAvailable,
			); err != nil {
				msg := "Error (\"dish\" object): " + err.Error()
				Logger.Error(msg)
				http.Error(w, msg, http.StatusInternalServerError)
				return
			}
		}
		jsonData, err := json.Marshal(dish)
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
