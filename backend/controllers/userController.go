package controllers

import (
	"context"
	"time"

	"github.com/AKHIL-GIREESH/Webweaver/database"
	"github.com/gofiber/fiber/v3"
	"go.mongodb.org/mongo-driver/bson"
)

type User struct {
	Name string `json:"name" bson:"name"`
}

// GetUsers fetches all users from MongoDB
func GetUsers(c fiber.Ctx) error {
	collection, err := database.ConnectDB() // Correct import for db connection
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to retrieve collection"})
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to retrieve users"})
	}
	defer cursor.Close(ctx)

	var users []bson.M
	if err = cursor.All(ctx, &users); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to parse users"})
	}

	return c.Status(200).JSON(users)
}

// CreateUser inserts a new user into MongoDB
func CreateUser(c fiber.Ctx) error {
	collection, err := database.ConnectDB() // Correct import for db connection
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to retrieve collection"})
	}

	user := new(User)
	if err := c.Bind().JSON(user); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}

	insertUser, err := collection.InsertOne(context.Background(), user)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to insert user"})
	}

	return c.Status(200).JSON(insertUser)
}
