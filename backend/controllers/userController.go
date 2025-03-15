package controllers

import (
	"context"
	"log"

	"github.com/AKHIL-GIREESH/Webweaver/model"
	"github.com/gofiber/fiber/v3"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
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

func GetSelf(c fiber.Ctx, collection *mongo.Collection) error {
	userID := c.Locals("userID")

	user := new(model.ReqUser)

	filter := bson.M{"_id": userID}
	projection := bson.M{"password": 0}
	err := collection.FindOne(context.Background(), filter, options.FindOne().SetProjection(projection)).Decode(&user)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "Invalid credentials",
			})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Database error",
		})
	}

	//reqUser = &model.ReqUser{ID:user.ID,Username:user.Username,Email:user.Email,}

	return c.Status(200).JSON(fiber.Map{
		"message": "Protected endpoint working",
		"user":    user,
	})
}

func FollowUser(c fiber.Ctx, collection *mongo.Collection) {

}
