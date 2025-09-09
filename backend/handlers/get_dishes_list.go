package handlers

import (
	. "backend/database"
	. "backend/logger"
	"backend/types"
	. "backend/utils"
	"encoding/json"
	"fmt"
	"net/http"
)

func GetDishesList(w http.ResponseWriter, r *http.Request) {
	SetupCORS(&w)
	if r.Method != http.MethodGet {
		msg := "A GET request is required"
		Logger.Warn(msg)
		http.Error(w, msg, http.StatusMethodNotAllowed)
		return
	}
	w.Header().Set("Content-Type", "application/json")

	dishesCategory := r.URL.Query().Get("category")
	dishesAvailable := r.URL.Query().Get("available")

	// Get data from the database

	sqlQueryPart := ""
	if dishesAvailable != "-1" {
		sqlQueryPart = fmt.Sprintf(" AND dish_available='%s'", dishesAvailable)
	}

	sqlQuery := fmt.Sprintf("SELECT * FROM dish WHERE dish_category='%s'%s ORDER BY dish_name;", dishesCategory, sqlQueryPart)
	Logger.Info(sqlQueryPart)
	Logger.Info(sqlQuery)
	if rows, err := DB.Query(sqlQuery); err != nil {
		msg := "Error getting dishes list from the database: " + err.Error()
		Logger.Error(msg)
		http.Error(w, msg, http.StatusInternalServerError)
		return
	} else {
		Logger.Info("Success. Received dishes list")
		// Serialize data and send it in response
		var dishesList []types.Dish
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
			dishesList = append(dishesList, dish)
		}
		jsonData, err := json.Marshal(dishesList)
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
