package controllers

import (
	"context"

	"github.com/AKHIL-GIREESH/Webweaver/model"
	"github.com/gofiber/fiber/v3"
	"go.mongodb.org/mongo-driver/mongo"
)

func NewJWTService(config model.JWTConfig) *model.JWTService {
	return &model.JWTService{
		Config: config,
	}
}

func SignUp(c fiber.Ctx, collection *mongo.Collection) error {

	var users []model.User
	cursor, err := collection.Find(context.Background(), nil)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to retrieve users"})
	}
	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var user model.User
		if err := cursor.Decode(&user); err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Error decoding user data"})
		}
		users = append(users, user)
	}

	return c.JSON(users)

}
