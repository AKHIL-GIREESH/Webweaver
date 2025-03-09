package controllers

import (
	"context"
	"os"
	"time"

	"github.com/AKHIL-GIREESH/Webweaver/model"
	"github.com/gofiber/fiber/v3"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func NewJWTService(config model.JWTConfig) *model.JWTService {
	return &model.JWTService{
		Config: config,
	}
}

func SignUp(c fiber.Ctx, collection *mongo.Collection) error {

	jwtService := &model.JWTService{
		Config: model.JWTConfig{
			TokenSecret: os.Getenv("SECRET_KEY"),
			TokenExp:    24 * time.Hour,
		},
	}

	user := new(model.User)
	if err := c.Bind().JSON(user); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}

	insertUser, err := collection.InsertOne(context.Background(), user)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to insert user"})
	}

	user.ID, _ = insertUser.InsertedID.(primitive.ObjectID)

	token, err := jwtService.GenerateToken(user)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to generate token",
		})
	}

	return c.JSON(fiber.Map{
		"token": token,
		"user":  user,
	})

}
