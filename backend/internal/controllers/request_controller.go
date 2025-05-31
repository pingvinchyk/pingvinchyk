package controllers

import (
	"net/http"
	"pingvinchyk/backend/internal/models"

	"github.com/gin-gonic/gin"
)

type RequestController struct{}

func NewRequestController() *RequestController {
	return &RequestController{}
}

// HelloWorld godoc
//
//	@Summary      Returns a Hello message
//	@Description  Simple hello endpoint
//	@Tags         hello
//	@Accept       json
//	@Produce      json
//	@Success      200 {object} models.HelloResponse
//	@Router       /hello [get]
func (c *RequestController) HelloWorld(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, models.HelloResponse{
		Message: "Hello world from go",
	})
}

