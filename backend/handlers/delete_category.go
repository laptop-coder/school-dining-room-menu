package handlers

import (
	. "backend/database"
	. "backend/logger"
	. "backend/utils"
	"fmt"
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
	sqlQuery := fmt.Sprintf(`
	DELETE FROM category WHERE category_name='%s';
	`, categoryName)
	if _, err := DB.Exec(sqlQuery); err != nil {
		msg := "Error deleting category: " + err.Error()
		Logger.Error(msg)
		http.Error(w, msg, http.StatusInternalServerError)
		return
	}

	msg := "Success. If a category with the passed \"categoryName\" existed, it has been deleted"
	Logger.Info(msg)
	w.Write([]byte(msg))
}
