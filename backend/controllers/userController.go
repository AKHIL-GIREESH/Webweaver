package controllers

import (
	"context"
	"log"
	"strings"
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

func GetAllFollowers(c fiber.Ctx, collection *mongo.Collection) error {
	objectID := c.Params("id")
	user := new(model.User)

	userID, err := primitive.ObjectIDFromHex(objectID)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid follow ID"})
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err = collection.FindOne(ctx, bson.M{"_id": userID}).Decode(&user)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "User not found"})
	}

	var followingUsers []model.FollowUser
	if len(user.Following) > 0 {
		cursor1, err := collection.Find(ctx, bson.M{"_id": bson.M{"$in": user.Following}})
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error fetching following users"})
		}
		defer cursor1.Close(ctx)

		for cursor1.Next(ctx) {
			var user model.User
			if err := cursor1.Decode(&user); err != nil {
				log.Println("Error decoding user:", err)
				return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error decoding following users"})
			}
			followingUsers = append(followingUsers, model.FollowUser{
				ID:         user.ID,
				Username:   user.Username,
				ProfilePic: user.ProfilePic,
			})
		}
	}

	var followedUsers []model.FollowUser
	if len(user.Followers) > 0 {
		cursor2, err := collection.Find(ctx, bson.M{"_id": bson.M{"$in": user.Followers}})
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error fetching follower users"})
		}
		defer cursor2.Close(ctx)

		for cursor2.Next(ctx) {
			var user model.User
			if err := cursor2.Decode(&user); err != nil {
				log.Println("Error decoding user:", err)
				return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error decoding follower users"})
			}
			followedUsers = append(followedUsers, model.FollowUser{
				ID:         user.ID,
				Username:   user.Username,
				ProfilePic: user.ProfilePic,
			})
		}
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"followers": followedUsers,
		"following": followingUsers,
	})
}

func GetAUser(c fiber.Ctx, collection *mongo.Collection) error {
	userName := c.Params("id")
	user := new(model.User)

	userName = strings.ReplaceAll(userName, "%20", " ")

	// fmt.Println(userName)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err := collection.FindOne(ctx, bson.M{"username": userName}).Decode(&user)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "User not found"})
	}

	return c.JSON(fiber.Map{
		"message": "User fetched successfully",
		"user":    user,
	})
}

func GetUserByID(c fiber.Ctx, collection *mongo.Collection) error {
	userID := c.Params("id")
	user := new(model.User)

	objID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid user ID",
		})
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err = collection.FindOne(ctx, bson.M{"_id": objID}).Decode(&user)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "User not found",
		})
	}

	return c.JSON(fiber.Map{
		"message": "User fetched successfully",
		"user":    user,
	})
}

func UpdateProfile(c fiber.Ctx, collection *mongo.Collection) error {
	userID := c.Params("id")
	updateData := new(model.ReqUser)

	// Parse the request body
	if err := c.Bind().JSON(updateData); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	objID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid user ID",
		})
	}

	// Update the user with the entire request body
	result, err := collection.UpdateOne(
		context.Background(),
		bson.M{"_id": objID},
		bson.M{"$set": updateData},
	)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to update profile",
		})
	}

	if result.MatchedCount == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "User not found",
		})
	}

	// Fetch and return the updated user
	var updatedUser model.ReqUser
	err = collection.FindOne(context.Background(), bson.M{"_id": objID}).Decode(&updatedUser)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch updated profile",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Profile updated successfully",
		"user":    updatedUser,
	})
}
