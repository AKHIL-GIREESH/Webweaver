package controllers

import (
	"context"
	"log"

	"github.com/AKHIL-GIREESH/Webweaver/model"
	"github.com/gofiber/fiber/v3"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetUsers(c fiber.Ctx, collection *mongo.Collection) error {
	var users []model.User
	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		log.Printf("Error retrieving users: %v", err)
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

func GetSelf(c fiber.Ctx) error {
	userID := c.Locals("userID")
	return c.JSON(fiber.Map{
		"message": "Protected endpoint working",
		"user_id": userID,
	})
}

// func CreateUser(c fiber.Ctx, collection *mongo.Collection) error {
// 	user := new(model.User)
// 	if err := c.Bind().JSON(user); err != nil {
// 		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
// 	}

// 	insertUser, err := collection.InsertOne(context.Background(), user)
// 	if err != nil {
// 		return c.Status(500).JSON(fiber.Map{"error": "Failed to insert user"})
// 	}

// 	user.ID, _ = insertUser.InsertedID.(primitive.ObjectID)

// 	return c.Status(200).JSON(user)
// }
