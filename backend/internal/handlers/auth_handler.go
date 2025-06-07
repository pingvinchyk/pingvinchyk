package handlers

import (
	"errors"
	"log"
	"pingvinchyk/backend/internal/models"
	"pingvinchyk/backend/internal/services"

	"github.com/gin-gonic/gin"
)

type AuthHandler struct {
	userService *services.UserService
}

func NewAuthHandler(userService *services.UserService) *AuthHandler {
	return &AuthHandler{
		userService: userService,
	}
}

// RegisterUser godoc
//
//	@Summary      Register a new user
//	@Description  Register a new user with email, username, and password
//	@Tags         auth
//	@Accept       json
//	@Produce      json
//	@Success      200 {object} models.SuccessResponse
//	@Failure      400 {object} models.ErrorResponse
//	@Failure      409 {object} models.ErrorResponse
//	@Router       /auth/register [post]
func (h *AuthHandler) RegisterUser(ctx *gin.Context) {
	var registerData models.RegisterRequest
	if err := ctx.ShouldBindJSON(&registerData); err != nil {
		ctx.JSON(400, models.ErrorResponse{Message: "Invalid input"})
		return
	}

	err := h.userService.CreateUser(ctx, registerData.Email, registerData.Username, registerData.Password)
	if err != nil {
		log.Printf("Error creating user: %v", err)
		switch {
		case errors.Is(err, models.ErrEmailTaken):
			ctx.JSON(409, models.ErrorResponse{Message: "Email already taken"})
		case errors.Is(err, models.ErrUsernameTaken):
			ctx.JSON(409, models.ErrorResponse{Message: "Username already taken"})
		default:
			ctx.JSON(400, models.ErrorResponse{Message: "Internal server error"})
		}
		return
	}

	ctx.JSON(200, models.SuccessResponse{Message: "User registered successfully"})
}

// LoginUser godoc
//
//	@Summary      Login a user
//	@Description  Login a user with email/username and password
//	@Tags         auth
//	@Accept       json
//	@Produce      json
//	@Success      200 {object} models.SuccessResponse
//	@Failure      400 {object} models.ErrorResponse
//	@Failure      409 {object} models.ErrorResponse
//	@Router       /auth/login [post]
func (h *AuthHandler) LoginUser(ctx *gin.Context) {
	var loginData models.LoginRequest
	if err := ctx.ShouldBindJSON(&loginData); err != nil {
		ctx.JSON(400, models.ErrorResponse{Message: "Invalid input"})
		return
	}

	err := h.userService.LoginUser(ctx, loginData.EmailOrUsername, loginData.Password)
	if err != nil {
		log.Printf("Error authenticating user: %v", err)
		switch {
		case errors.Is(err, models.ErrNoSuchEmailRegistered):
			ctx.JSON(400, models.ErrorResponse{Message: "No such email registered"})
		case errors.Is(err, models.ErrNoSuchUsernameRegistered):
			ctx.JSON(400, models.ErrorResponse{Message: "No such username registered"})
		case errors.Is(err, models.ErrIncorrectPassword):
			ctx.JSON(400, models.ErrorResponse{Message: "Incorrect password"})
		default:
			ctx.JSON(400, models.ErrorResponse{Message: "Internal server error"})
		}
		return
	}

	ctx.JSON(200, models.SuccessResponse{Message: "Login successful"})
}
