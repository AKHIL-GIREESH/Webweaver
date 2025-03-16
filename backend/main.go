package main

import (
	"log"
	"os"

	"github.com/AKHIL-GIREESH/Webweaver/database"
	"github.com/AKHIL-GIREESH/Webweaver/routes"
	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
)

func main() {
	database.ConnectDB()

	app := fiber.New()

	app.Use(cors.New())

	userCollection := database.Client.Database(os.Getenv("DB_NAME")).Collection(os.Getenv("DB_COLLECTION"))

	routes.AuthRoutes(app, userCollection)
	routes.UserRoutes(app, userCollection)

	log.Fatal(app.Listen(":3000"))
}
