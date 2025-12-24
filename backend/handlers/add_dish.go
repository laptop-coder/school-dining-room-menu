package handlers

import (
	. "backend/database"
	. "backend/logger"
	. "backend/utils"
	"github.com/google/uuid"
	"net/http"
)

func AddDish(w http.ResponseWriter, r *http.Request) {
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
	dishName := r.FormValue("dishName")
	dishCategory := r.FormValue("dishCategory")
	dishDescription := r.FormValue("dishDescription")
	dishPhoto := r.FormValue("dishPhoto")
	if dishName == "" || dishCategory == "" {
		msg := "Error. POST parameters \"dishName\" and \"dishCategory\" are required"
		Logger.Error(msg)
		http.Error(w, msg, http.StatusBadRequest)
		return
	}

	// Regular expressions checks
	// Dish name
	isSecure, err := CheckStringSecurity(dishName)
	if err != nil {
		Logger.Error(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if !(*isSecure) {
		msg := "Error. Found forbidden symbols in POST parameter \"dishName\"."
		Logger.Error(msg)
		http.Error(w, msg, http.StatusBadRequest)
		return
	}

	// Dish category
	isSecure, err = CheckStringSecurity(dishCategory)
	if err != nil {
		Logger.Error(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if !(*isSecure) {
		msg := "Error. Found forbidden symbols in POST parameter \"dishCategory\"."
		Logger.Error(msg)
		http.Error(w, msg, http.StatusBadRequest)
		return
	}

	// Dish description
	isSecureOrNumbers, err := CheckStringSecurity(dishDescription)
	if err != nil {
		Logger.Error(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if !(*isSecureOrNumbers) {
		msg := "Error. Found forbidden symbols in POST parameter \"dishDescription\"."
		Logger.Error(msg)
		http.Error(w, msg, http.StatusBadRequest)
		return
	}

	dishId := uuid.New().String()
	if _, err := DB.Exec(
		"INSERT INTO dish (dish_id, dish_category, dish_name, dish_description) VALUES (?, ?, ?, ?);",
		dishId,
		dishCategory,
		dishName,
		dishDescription,
	); err != nil {
		msg := "Error adding new dish: " + err.Error()
		Logger.Error(msg)
		http.Error(w, msg, http.StatusInternalServerError)
		return
	}

	if dishPhoto != "" {
		if err := SaveDishPhotoToStorage(dishPhoto, dishId); err != nil {
			msg := "Error saving dish photo to storage: " + err.Error()
			Logger.Error(msg)
			http.Error(w, msg, http.StatusInternalServerError)
			return
		}
	}

	msg := "Success. Added new dish"
	Logger.Info(msg)
	w.Write([]byte(msg))

	BroadcastTVMenuUpdate()
	msg = "Success. Broadcasted menu updates to the WebSocket TV clients"
	Logger.Info(msg)
	w.Write([]byte(msg))
}
