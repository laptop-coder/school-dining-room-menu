package utils

import (
	. "backend/logger"
	"errors"
	_ "image/png"
	"os"
)

func DeleteDishPhotoFromStorageIfExists(pathToPhoto string) error {
	if _, err := os.Stat(pathToPhoto); err != nil {
		if os.IsNotExist(err) {
			Logger.Info("Photo of this dish doesn't exist, skipping deletion")
			return nil
		}
		msg := "error checking dish photo existence: " + err.Error()
		return errors.New(msg)
	}
	if err := os.Remove(pathToPhoto); err != nil {
		msg := "error deleting dish photo: " + err.Error()
		return errors.New(msg)
	}
	Logger.Info("Success. The photo of this dish has been deleted")
	return nil
}
