package models

type RegisterRequest struct {
	Username string `json:"username" binding:"required,min=3,max=50"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=8,max=100"`
}

type LoginRequest struct {
	EmailOrUsername string `json:"emailOrUsername" binding:"required"`
	Password        string `json:"password" binding:"required"`
}
