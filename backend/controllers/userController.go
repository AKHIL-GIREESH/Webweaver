package controllers

import (
	"context"
	"log"
	"time"

	"github.com/AKHIL-GIREESH/Webweaver/model"
	"github.com/gofiber/fiber/v3"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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

func FollowUser(c fiber.Ctx, collection *mongo.Collection) error {
	userID := c.Locals("userID")
	followIDString := c.Params("id")

	followID, err := primitive.ObjectIDFromHex(followIDString)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid follow ID"})
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	updateUser := bson.M{"$addToSet": bson.M{"following": followID}}
	userResult, err := collection.UpdateOne(ctx, bson.M{"_id": userID}, updateUser)
	if err != nil {
		log.Println("Error updating user's following list:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Could not follow user"})
	}

	updateFollowedUser := bson.M{"$addToSet": bson.M{"followers": userID}}
	followResult, err := collection.UpdateOne(ctx, bson.M{"_id": followID}, updateFollowedUser)
	if err != nil {
		log.Println("Error updating followed user's followers list:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Could not update followers"})
	}

	return c.JSON(fiber.Map{
		"message":        "User followed successfully",
		"modifiedUser":   userResult,
		"modifiedFollow": followResult,
	})
}

func UnfollowUser(c fiber.Ctx, collection *mongo.Collection) error {
	userID := c.Locals("userID")
	followIDString := c.Params("id")

	followID, err := primitive.ObjectIDFromHex(followIDString)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid follow ID"})
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	updateUser := bson.M{"$pull": bson.M{"following": followID}}
	userResult, err := collection.UpdateOne(ctx, bson.M{"_id": userID}, updateUser)
	if err != nil {
		log.Println("Error updating user's following list:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Could not follow user"})
	}

	updateFollowedUser := bson.M{"$pull": bson.M{"followers": userID}}
	followResult, err := collection.UpdateOne(ctx, bson.M{"_id": followID}, updateFollowedUser)
	if err != nil {
		log.Println("Error updating followed user's followers list:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Could not update followers"})
	}

	return c.JSON(fiber.Map{
		"message":        "User followed successfully",
		"modifiedUser":   userResult,
		"modifiedFollow": followResult,
	})
}
