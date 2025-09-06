package handlers

import (
	. "backend/database"
	. "backend/logger"
	. "backend/utils"
	"fmt"
	"net/http"
)

func DeleteDish(w http.ResponseWriter, r *http.Request) {
	SetupCORS(&w)
	if r.Method != http.MethodPost {
		msg := "A POST request is required"
		Logger.Warn(msg)
		http.Error(w, msg, http.StatusMethodNotAllowed)
		return
	}
	if err := r.ParseForm(); err != nil {
		msg := "Error. Can't parse form: " + err.Error()
		Logger.Error(msg)
		http.Error(w, msg, http.StatusBadRequest)
		return
	}
	dishId := r.FormValue("dishId")
	if dishId == "" {
		msg := "Error. A POST parameter \"dishId\" is required"
		Logger.Error(msg)
		http.Error(w, msg, http.StatusBadRequest)
		return
	}
	sqlQuery := fmt.Sprintf(`
	DELETE FROM dish WHERE dish_id='%s';
	`, dishId)
	if _, err := DB.Exec(sqlQuery); err != nil {
		msg := "Error deleting dish: " + err.Error()
		Logger.Error(msg)
		http.Error(w, msg, http.StatusInternalServerError)
		return
	}

	msg := "Success. If a dish with the passed \"dishId\" existed, it has been deleted"
	Logger.Info(msg)
	w.Write([]byte(msg))
}
