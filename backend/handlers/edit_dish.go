package handlers

import (
	. "backend/database"
	. "backend/logger"
	. "backend/utils"
	"net/http"
)

func EditDish(w http.ResponseWriter, r *http.Request) {
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
	newDishName := r.FormValue("newDishName")
	newDishCategory := r.FormValue("newDishCategory")
	newDishDescription := r.FormValue("newDishDescription")
	newDishPhoto := r.FormValue("newDishPhoto")
	if dishId == "" || newDishName == "" || newDishCategory == "" {
		msg := "Error. POST parameters \"dishId\", \"newDishName\" and \"newDishCategory\" are required"
		Logger.Error(msg)
		http.Error(w, msg, http.StatusBadRequest)
		return
	}

	// Regular expressions checks
	// Dish id
	isSecure, err := CheckStringSecurity(dishId)
	if err != nil {
		Logger.Error(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if !(*isSecure) {
		msg := "Error. Found forbidden symbols in POST parameter \"dishId\"."
		Logger.Error(msg)
		http.Error(w, msg, http.StatusBadRequest)
		return
	}

	// New dish name
	isSecure, err = CheckStringSecurity(newDishName)
	if err != nil {
		Logger.Error(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if !(*isSecure) {
		msg := "Error. Found forbidden symbols in POST parameter \"newDishName\"."
		Logger.Error(msg)
		http.Error(w, msg, http.StatusBadRequest)
		return
	}

	// New dish category
	isSecure, err = CheckStringSecurity(newDishCategory)
	if err != nil {
		Logger.Error(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if !(*isSecure) {
		msg := "Error. Found forbidden symbols in POST parameter \"newDishCategory\"."
		Logger.Error(msg)
		http.Error(w, msg, http.StatusBadRequest)
		return
	}

	// New dish description
	isSecureOrNumbers, err := CheckStringSecurity(newDishDescription)
	if err != nil {
		Logger.Error(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if !(*isSecureOrNumbers) {
		msg := "Error. Found forbidden symbols in POST parameter \"newDishDescription\"."
		Logger.Error(msg)
		http.Error(w, msg, http.StatusBadRequest)
		return
	}

	if _, err := DB.Exec(
		"UPDATE dish SET dish_category=?, dish_name=?, dish_description=? WHERE dish_id=?;",
		newDishCategory,
		newDishName,
		newDishDescription,
		dishId,
	); err != nil {
		msg := "Error updating dish: " + err.Error()
		Logger.Error(msg)
		http.Error(w, msg, http.StatusInternalServerError)
		return
	}

	if newDishPhoto != "" {
		if err := SaveDishPhotoToStorage(newDishPhoto, dishId); err != nil {
			msg := "Error saving dish photo to storage: " + err.Error()
			Logger.Error(msg)
			http.Error(w, msg, http.StatusInternalServerError)
			return
		}
	}

	msg := "Success. Updated the dish"
	Logger.Info(msg)
	w.Write([]byte(msg))
}
