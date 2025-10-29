package utils

import (
	"errors"
	"regexp"
)

/*
\p{L} - any letters of any languages
\p{Z} - any type of space characters or separators
\p{P} - any punctuation marks
\p{N} - any type of number marks of any languages
*/

func IsText(s string) (*bool, error) {
	result, err := regexp.MatchString("^[\\p{L}\\p{Z}\\p{P}\\t\\r\\n]+$", s)
	if err != nil {
		return nil, errors.New("Error checking that string consist only of letters and space/tab/enter symbols: " + err.Error())
	}
	return &result, nil
}

func IsTextOrNumbers(s string) (*bool, error) {
	result, err := regexp.MatchString("^[\\p{L}\\p{Z}\\p{P}\\p{N}\\t\\r\\n]+$", s)
	if err != nil {
		return nil, errors.New("Error checking that string consist only of letters, numbers and space/tab/enter symbols: " + err.Error())
	}
	return &result, nil
}
