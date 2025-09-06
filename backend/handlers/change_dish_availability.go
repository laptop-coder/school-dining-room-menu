package handlers

import (
	. "backend/database"
	. "backend/logger"
	. "backend/utils"
	"fmt"
	"net/http"
)

func ChangeDishAvailability(w http.ResponseWriter, r *http.Request) {
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
	newAvailabilityValue := r.FormValue("newAvailabilityValue")
	if dishId == "" || newAvailabilityValue == "" {
		msg := "Error. POST parameters \"dishId\" and \"newAvailabilityValue\" are required"
		Logger.Error(msg)
		http.Error(w, msg, http.StatusBadRequest)
		return
	}
	if newAvailabilityValue != "0" && newAvailabilityValue != "1" {
		msg := "Error. POST parameter \"newAvailabilityValue\" should be \"0\" or \"1\""
		Logger.Error(msg)
		http.Error(w, msg, http.StatusBadRequest)
		return
	}
	sqlQuery := fmt.Sprintf(`
	UPDATE dish SET dish_available='%s' WHERE dish_id='%s';
	`, newAvailabilityValue, dishId)
	if _, err := DB.Exec(sqlQuery); err != nil {
		msg := "Error changing dish availability: " + err.Error()
		Logger.Error(msg)
		http.Error(w, msg, http.StatusInternalServerError)
		return
	}

	msg := "Success. If a dish with the passed \"dishId\" exists, its availability has been updated"
	Logger.Info(msg)
	w.Write([]byte(msg))
}
