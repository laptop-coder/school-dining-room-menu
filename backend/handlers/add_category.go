package handlers

import (
	. "backend/database"
	. "backend/logger"
	. "backend/utils"
	"fmt"
	"net/http"
)

func AddCategory(w http.ResponseWriter, r *http.Request) {
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

	// Regular expressions checks
	// Category name
	isText, err := CheckStringSecurity(categoryName)
	if err != nil {
		Logger.Error(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if !(*isText) {
		msg := "Error. Found forbidden symbols in POST parameter \"categoryName\"."
		Logger.Error(msg)
		http.Error(w, msg, http.StatusBadRequest)
		return
	}

	sqlQuery := fmt.Sprintf(`
	INSERT INTO category (
		category_name
	) VALUES (
		'%s'
	);
	`, categoryName)
	if _, err := DB.Exec(sqlQuery); err != nil {
		msg := "Error adding new category: " + err.Error()
		Logger.Error(msg)
		http.Error(w, msg, http.StatusInternalServerError)
		return
	}

	msg := "Success. Added new category"
	Logger.Info(msg)
	w.Write([]byte(msg))
}
