package handlers

import (
	. "backend/logger"
	. "backend/utils"
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
	w.Write([]byte("Dishes list"))
}
