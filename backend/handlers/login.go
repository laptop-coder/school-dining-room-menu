// SEE https://pkg.go.dev/golang.org/x/crypto/bcrypt
package handlers

import (
	. "backend/database"
	. "backend/logger"
	"backend/types"
	. "backend/utils"
	"database/sql"
	"encoding/json"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"time"
)

func AdminLogin(w http.ResponseWriter, r *http.Request) {
	SetupCORS(&w)
	const bcryptCost = 15 // minimal is 4, maximum is 31, default is 10

	if r.Method != http.MethodPost {
		msg := "A POST request is required"
		Logger.Warn(msg)
		http.Error(w, msg, http.StatusMethodNotAllowed)
		return
	}

	if err := r.ParseForm(); err != nil {
		msg := "Error. Can't parse form: " + err.Error()
		Logger.Error(msg)
		http.Error(w, msg, http.StatusInternalServerError)
		return
	}
	username, password :=
		r.FormValue("username"),
		r.FormValue("password")
	if username == "" || password == "" {
		msg := "error: the \"username\" and \"password\" parameters are required"
		Logger.Error(msg)
		http.Error(w, msg, http.StatusBadRequest)
		return
	}

	if err := ValidatePassword(password); err != nil {
		msg := "Error validating password: " + err.Error()
		Logger.Error(msg)
		http.Error(w, msg, http.StatusBadRequest)
		return
	}

	row := DB.QueryRow(
		"SELECT * FROM admin WHERE username=?;",
		username,
	)
	var adminAccountData types.AdminAccountAuthorizationData
	err := row.Scan(
		&adminAccountData.Username,
		&adminAccountData.PasswordHash,
	)
	switch {
	case err == sql.ErrNoRows:
		msg := "Admin account with this username was not found"
		Logger.Warn(msg)
		http.Error(w, msg, http.StatusUnauthorized)
		return
	case err != nil:
		msg := "Error logging in: " + err.Error()
		Logger.Error(msg)
		http.Error(w, msg, http.StatusInternalServerError)
		return
	default:
		err := bcrypt.CompareHashAndPassword([]byte(adminAccountData.PasswordHash), []byte(password))
		if err != nil {
			msg := "Passwords don't match"
			Logger.Warn(msg)
			http.Error(w, msg, http.StatusUnauthorized)
			return
		}

		// JWT

		privateKey, _, err := GetPrivateKey()
		if err != nil {
			msg := "Error getting private key: " + err.Error()
			Logger.Error(msg)
			http.Error(w, msg, http.StatusInternalServerError)
			return
		}

		accessToken, err := CreateJWTAccess(&adminAccountData.Username, privateKey)
		if err != nil {
			msg := "Error creating new JWT pair: " + err.Error()
			Logger.Error(msg)
			http.Error(w, msg, http.StatusInternalServerError)
			return
		}

		// TODO: "Secure: true"
		http.SetCookie(
			w,
			&http.Cookie{
				Name:     "jwt_access",
				Value:    *accessToken,
				HttpOnly: true,
				Path:     "/",                                 // TODO: is it OK?
				Expires:  time.Now().Add(time.Hour * 24 * 30), // 30 days
				// Partitioned: true,
				// SameSite:    http.SameSiteNoneMode,
				// Domain:      "localhost",
			},
		)
		http.SetCookie(
			w,
			&http.Cookie{
				Name:     "authorized",
				Value:    "true",
				HttpOnly: false,
				Path:     "/",                                 // TODO: is it OK?
				Expires:  time.Now().Add(time.Hour * 24 * 30), // 30 days
				// Partitioned: true,
				// SameSite:    http.SameSiteNoneMode,
				// Domain:      "localhost",
			},
		)

		jsonData, err := json.Marshal(accessToken)
		if err != nil {
			msg := "JSON serialization error: " + err.Error()
			Logger.Error(msg)
			http.Error(w, msg, http.StatusInternalServerError)
			return
		}
		w.Write(jsonData)
		Logger.Info("Success. Logged in")
		return
	}
}
