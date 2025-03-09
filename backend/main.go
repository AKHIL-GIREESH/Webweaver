package main

import (
	"log"
	"os"

	"github.com/AKHIL-GIREESH/Webweaver/database"
	"github.com/AKHIL-GIREESH/Webweaver/routes"
	"github.com/gofiber/fiber/v3"
)

func main() {
	database.ConnectDB() // Initialize MongoDB connection

	app := fiber.New()

	// Access the collection directly when needed
	userCollection := database.Client.Database(os.Getenv("DB_NAME")).Collection(os.Getenv("DB_COLLECTION"))

	routes.UserRoutes(app, userCollection)

	routes.AuthRoutes(app, userCollection)

	log.Fatal(app.Listen(":3000"))
}
