package controllers

import (
	"context"
	"log"
	"time"

	"github.com/gofiber/fiber/v3"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func LikeProject(c fiber.Ctx, collection *mongo.Collection) error {
	userID := c.Locals("userID")
	LikeIDString := c.Params("id")

	LikeID, err := primitive.ObjectIDFromHex(LikeIDString)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid follow ID"})
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	updateUser := bson.M{"$addToSet": bson.M{"liked": LikeID}}
	userResult, err := collection.UpdateOne(ctx, bson.M{"_id": userID}, updateUser)
	if err != nil {
		log.Println("Error updating user's liked list:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Could not follow user"})
	}

	// updateFollowedUser := bson.M{"$addToSet": bson.M{"followers": userID}}
	// followResult, err := collection.UpdateOne(ctx, bson.M{"_id": followID}, updateFollowedUser)
	// if err != nil {
	// 	log.Println("Error updating followed user's followers list:", err)
	// 	return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Could not update followers"})
	// }

	return c.JSON(fiber.Map{
		"message":      "User liked successfully",
		"modifiedUser": userResult,
	})
}

func DislikeProject(c fiber.Ctx, collection *mongo.Collection) error {
	userID := c.Locals("userID")
	DislikeIDString := c.Params("id")

	DislikeID, err := primitive.ObjectIDFromHex(DislikeIDString)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid follow ID"})
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	updateUser := bson.M{"$pull": bson.M{"liked": DislikeID}}
	userResult, err := collection.UpdateOne(ctx, bson.M{"_id": userID}, updateUser)
	if err != nil {
		log.Println("Error updating user's liked list:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Could not follow user"})
	}

	// updateFollowedUser := bson.M{"$pull": bson.M{"followers": userID}}
	// followResult, err := collection.UpdateOne(ctx, bson.M{"_id": followID}, updateFollowedUser)
	// if err != nil {
	// 	log.Println("Error updating followed user's followers list:", err)
	// 	return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Could not update followers"})
	// }

	return c.JSON(fiber.Map{
		"message":      "User disliked successfully",
		"modifiedLike": userResult,
	})
}
