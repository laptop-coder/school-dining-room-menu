package config

import (
	"backend/types"
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

const prefixDevEnv = "DEV"

func newConfig() *types.Config {
	return &types.Config{
		App: types.AppConfig{
			DevMode: getEnv("SCHOOL_DINING_ROOM_MENU_DEV_MODE"),
		},
		DB: types.DBConfig{
			PathTo: getEnv("PATH_TO_DB"),
		},
		Env: types.EnvConfig{
			PathTo: getEnv("PATH_TO_ENV"),
		},
		Logs: types.LogsConfig{
			PathToBackend: filepath.Join(
				getEnv("PATH_TO_LOGS"),
				getEnv("BACKEND_LOG"),
			),
		},
		RSA: types.RSAConfig{
			PathToPrivateKey: filepath.Join(
				getEnv("PATH_TO_ENV"),
				getEnv("RSA_PRIVATE_KEY"),
			),
			PathToPublicKey: filepath.Join(
				getEnv("PATH_TO_ENV"),
				getEnv("RSA_PUBLIC_KEY"),
			),
		},
		SSL: types.SSLConfig{
			PathToCert: filepath.Join(
				getEnv("PATH_TO_ENV"),
				getEnv("DEV_SSL_CERT"),
			),
			PathToKey: filepath.Join(
				getEnv("PATH_TO_ENV"),
				getEnv("DEV_SSL_KEY"),
			),
		},
		Storage: types.StorageConfig{
			PathTo: getEnv("PATH_TO_STORAGE"),
		},
	}
}

// Read environment variable by the key or panic if it doesn't exist
func getEnv(key string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	if strings.HasPrefix(key, prefixDevEnv) {
		return ""
	}
	panic(fmt.Sprintf("The required environment variable \"%s\" is not set", key))
}

var Cfg = newConfig()
