package utils

import (
	"errors"
	"regexp"
)

func IsText(s string) (*bool, error) {
	result, err := regexp.MatchString("^[a-zA-Z\\s]+$", s)
	if err != nil {
		return nil, errors.New("Error checking that string consist only of letters and space/tab/enter symbols: " + err.Error())
	}
	return &result, nil
}

func IsTextOrNumbers(s string) (*bool, error) {
	result, err := regexp.MatchString("^[a-zA-Z0-9\\s]+$", s)
	if err != nil {
		return nil, errors.New("Error checking that string consist only of letters, numbers and space/tab/enter symbols: " + err.Error())
	}
	return &result, nil
}
