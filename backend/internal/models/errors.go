package models

import "errors"

var (
	ErrEmailTaken               = errors.New("email already taken")
	ErrUsernameTaken            = errors.New("username already taken")
	ErrNoSuchEmailRegistered    = errors.New("no such email registered")
	ErrNoSuchUsernameRegistered = errors.New("no such username registered")

	ErrIncorrectPassword = errors.New("incorrect password")

	ErrInternalServer = errors.New("internal server error")
)
