package handlers

import (
	. "backend/database"
	. "backend/logger"
	. "backend/utils"
	"net/http"
)

func DeleteCategory(w http.ResponseWriter, r *http.Request) {
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
	categoryName := r.FormValue("categoryName")
	if categoryName == "" {
		msg := "Error. A POST parameter \"categoryName\" is required"
		Logger.Error(msg)
		http.Error(w, msg, http.StatusBadRequest)
		return
	}
	if _, err := DB.Exec(
		"DELETE FROM category WHERE category_name=?; DELETE FROM dish WHERE dish_category=?;",
		categoryName,
		categoryName,
	); err != nil {
		msg := "Error deleting category: " + err.Error()
		Logger.Error(msg)
		http.Error(w, msg, http.StatusInternalServerError)
		return
	}

	msg := "Success. If a category with the passed \"categoryName\" existed, it has been deleted"
	Logger.Info(msg)
	w.Write([]byte(msg))

	BroadcastTVMenuUpdate()
	msg = "Success. Broacasted menu updates to the WebSocket clients"
	Logger.Info(msg)
	w.Write([]byte(msg))
}
