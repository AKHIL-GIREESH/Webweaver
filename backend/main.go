package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/gofiber/fiber/v3"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type User struct {
	Name string `json:"name" bson:"name"`
}

// var users = []User{}

var client *mongo.Client

func connectDB() (*mongo.Collection, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var err error
	err = godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	clientOptions := options.Client().ApplyURI(os.Getenv("MONGODB_URI"))

	client, err = mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal("Failed to connect to MongoDB Atlas:", err)
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal("MongoDB Atlas not responding:", err)
	}

	fmt.Println("Connected to MongoDB Atlas")
	collection := client.Database(os.Getenv("DB_NAME")).Collection(os.Getenv("DB_COLLECTION"))
	return collection, nil

}

func main() {
	fmt.Println("Hello World")
	app := fiber.New()

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	collection, err := connectDB()
	if err != nil {
		log.Fatal("Failed to retrieve collection", err)
	}

	app.Get("/", func(c fiber.Ctx) error {
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

	})

	app.Post("/users", func(c fiber.Ctx) error {
		user := new(User)
		if err := c.Bind().JSON(user); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
		}

		insertUser, err := collection.InsertOne(context.Background(), user)
		if err != nil {
			return c.Status(400).JSON(fiber.Map{"error": err})
		}
		return c.Status(200).JSON(insertUser)

	})

	// app.Patch("/users/:id", func(c fiber.Ctx) error {
	// 	idStr := c.Params("id")
	// 	id, err := strconv.Atoi(idStr)
	// 	if err != nil {
	// 		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	// 	}

	// 	var user *User = nil

	// 	for i := range users {
	// 		if users[i].ID == id {
	// 			user = &users[i]
	// 			break
	// 		}
	// 	}

	// 	if user == nil {
	// 		return c.Status(404).JSON(fiber.Map{"error": "User not found"})
	// 	}

	// 	var updates User
	// 	if err := c.Bind().JSON(&updates); err != nil {
	// 		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	// 	}

	// 	if updates.Name != "" {
	// 		user.Name = updates.Name
	// 	}

	// 	return c.Status(200).JSON(user)
	// })

	log.Fatal(app.Listen(":" + os.Getenv("PORT")))
}
