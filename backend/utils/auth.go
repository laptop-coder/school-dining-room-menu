package utils

import (
	. "backend/database"
	. "backend/logger"
	"crypto/rsa"
	"errors"
	"fmt"
	"github.com/golang-jwt/jwt/v5"
	"net/http"
	"time"
)

func CreateJWTAccess(username *string, privateKey *rsa.PrivateKey) (*string, error) {
	issuedAt := time.Now()
	accessToken, err := jwt.NewWithClaims(jwt.SigningMethodRS512, jwt.MapClaims{
		"sub": *username,
		"iat": issuedAt.Unix(),
		"exp": (issuedAt.Add(time.Hour * 24 * 30).Unix()), // 30 days
	}).SignedString(privateKey)
	if err != nil {
		return nil, err
	}
	return &accessToken, nil
}

func parseJWT(token *string, publicKey *rsa.PublicKey) (*jwt.Token, error) {
	keyFunc := func(token *jwt.Token) (any, error) {
		method, ok := (*token).Method.(*jwt.SigningMethodRSA)
		if !ok {
			return nil, errors.New("unexpected JWT signing method: " + token.Header["alg"].(string))
		}
		if method.Alg() != "RS512" {
			return nil, errors.New("unsupported algorithm: " + method.Alg())
		}
		return publicKey, nil
	}
	tokenParsed, err := jwt.Parse(*token, keyFunc)
	return tokenParsed, err
}

func VerifyJWTAccess(accessToken *string, publicKey *rsa.PublicKey) (*string, error) {
	parsedToken, err := parseJWT(accessToken, publicKey)
	switch {
	case parsedToken.Valid:
		sub, err := parsedToken.Claims.GetSubject()
		if err != nil {
			return nil, errors.New("can't get JWT refresh \"sub\" claim")
		}
		return &sub, nil
	case errors.Is(err, jwt.ErrTokenMalformed):
		return nil, errors.New("that's not a JWT access token: " + err.Error())
	case errors.Is(err, jwt.ErrTokenSignatureInvalid):
		return nil, errors.New("invalid signature of JWT access token: " + err.Error())
	case errors.Is(err, jwt.ErrTokenExpired) || errors.Is(err, jwt.ErrTokenNotValidYet):
		return nil, errors.New("JWT access token has expired or isn't active yet: " + err.Error())
	default:
		return nil, errors.New("couldn't handle JWT access token: " + err.Error())
	}
}

func checkAdminAccountExistence(username *string) (*bool, error) {
	exists := false
	sqlQuery := fmt.Sprintf("SELECT COUNT(*) FROM admin WHERE username='%s';", *username)
	row := DB.QueryRow(sqlQuery)
	var count int
	if err := row.Scan(&count); err != nil {
		return &exists, err
	}
	if count == 1 {
		exists = true
	}
	return &exists, nil
}

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		publicKey, _, err := GetPublicKey()
		if err != nil {
			msg := "Error getting public key: " + err.Error()
			Logger.Error(msg)
			http.Error(w, msg, http.StatusInternalServerError)
			return
		}

		var accessToken *string
		accessTokenCookie, err := r.Cookie("jwt_access")
		if err != nil {
			msg := "Can't get JWT access from the cookie: " + err.Error() + ". If you are not logged in to your account yet, please log in."
			Logger.Error(msg)
			http.Error(w, msg, http.StatusUnauthorized)
			return
		} else {
			accessToken = &accessTokenCookie.Value
		}

		adminUsername, err := VerifyJWTAccess(accessToken, publicKey)
		if err != nil {
			msg := "JWT access verification error: " + err.Error()
			Logger.Error(msg)
			http.Error(w, msg, http.StatusUnauthorized)
			return
		}

		exists, err := checkAdminAccountExistence(adminUsername)
		if err != nil {
			msg := "Error checking admin account existence: " + err.Error()
			Logger.Error(msg)
			http.Error(w, msg, http.StatusInternalServerError)
			return
		}
		if *exists == false {
			msg := "Admin account with the username from the JWT access token does not exist"
			Logger.Error(msg)
			http.Error(w, msg, http.StatusUnauthorized)
			return
		}

		next.ServeHTTP(w, r)
	})
}
