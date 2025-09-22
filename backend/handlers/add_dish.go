package handlers

import (
	. "backend/database"
	. "backend/logger"
	. "backend/utils"
	"fmt"
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
	isText, err := IsText(dishName)
	if err != nil {
		Logger.Error(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if !(*isText) {
		msg := "Error. A POST parameter \"dishName\" must consist only of letters and space/tab/enter symbols."
		Logger.Error(msg)
		http.Error(w, msg, http.StatusBadRequest)
		return
	}

	// Dish category
	isText, err = IsText(dishCategory)
	if err != nil {
		Logger.Error(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if !(*isText) {
		msg := "Error. A POST parameter \"dishName\" must consist only of letters and space/tab/enter symbols."
		Logger.Error(msg)
		http.Error(w, msg, http.StatusBadRequest)
		return
	}

	// Dish description
	isTextOrNumbers, err := IsTextOrNumbers(dishDescription)
	if err != nil {
		Logger.Error(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if !(*isTextOrNumbers) {
		msg := "Error. A POST parameter \"dishDescription\" must consist only of letters, numbers and space/tab/enter symbols."
		Logger.Error(msg)
		http.Error(w, msg, http.StatusBadRequest)
		return
	}

	dishId := uuid.New().String()
	sqlQuery := fmt.Sprintf(`
	INSERT INTO dish (
		dish_id,
		dish_category,
		dish_name,
		dish_description
	) VALUES (
		'%s',
		'%s',
		'%s',
		'%s'
	);
	`, dishId, dishCategory, dishName, dishDescription)
	if _, err := DB.Exec(sqlQuery); err != nil {
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
}
