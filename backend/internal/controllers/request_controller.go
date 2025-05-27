package controllers

import (
	"github.com/gin-gonic/gin"
)

type RequestController struct{}

func NewWebController() *RequestController {
	return &RequestController{}
}

func (c *RequestController) HelloWorld(ctx *gin.Context) {
	ctx.JSON(200, gin.H{
		"message": "Hello world from go",
	})
}
