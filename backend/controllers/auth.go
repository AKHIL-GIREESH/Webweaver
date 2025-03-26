package controllers

import (
	"context"
	"os"
	"time"

	"github.com/AKHIL-GIREESH/Webweaver/model"
	"github.com/gofiber/fiber/v3"
	"go.mongodb.org/mongo-driver/bson"
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
			TokenExp:    240 * time.Hour,
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

	reqUser := &model.ReqUser{ID: user.ID, Username: user.Username, Email: user.Email, Description: user.Description, ProfilePic: user.ProfilePic, Banner: user.Banner, Liked: user.Liked, Following: user.Following, Followers: user.Followers, Websites: user.Websites}

	return c.JSON(fiber.Map{
		"token": token,
		"user":  reqUser,
	})

}

func Login(c fiber.Ctx, collection *mongo.Collection) error {

	jwtService := &model.JWTService{
		Config: model.JWTConfig{
			TokenSecret: os.Getenv("SECRET_KEY"),
			TokenExp:    24 * time.Hour,
		},
	}

	loginCreds := new(model.LoginSchema)
	if err := c.Bind().JSON(loginCreds); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}

	user := new(model.User)

	filter := bson.M{"email": loginCreds.Email}
	err := collection.FindOne(context.Background(), filter).Decode(&user)

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

	if user.Password != loginCreds.Password {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Invalid credentials",
		})
	}

	token, err := jwtService.GenerateToken(user)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to generate token",
		})
	}

	reqUser := &model.ReqUser{ID: user.ID, Username: user.Username, Email: user.Email, Description: user.Description, ProfilePic: user.ProfilePic, Banner: user.Banner, Liked: user.Liked, Following: user.Following, Followers: user.Followers, Websites: user.Websites}

	return c.JSON(fiber.Map{
		"token": token,
		"user":  reqUser,
	})
}
