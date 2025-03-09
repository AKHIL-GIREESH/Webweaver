package routes

import (
	"fmt"

	"github.com/AKHIL-GIREESH/Webweaver/controllers"
	"github.com/AKHIL-GIREESH/Webweaver/middlewares"
	"github.com/gofiber/fiber/v3"
	"go.mongodb.org/mongo-driver/mongo"
)

func AuthRoutes(app *fiber.App, userCollection *mongo.Collection) {
	app.Get("/me", middlewares.JWTMiddleware(), func(c fiber.Ctx) error {
		fmt.Println("check")
		return controllers.GetSelf(c)
	})
	app.Post("/signup", func(c fiber.Ctx) error {
		return controllers.SignUp(c, userCollection)
	})
	app.Post("/login", func(c fiber.Ctx) error {
		return controllers.Login(c, userCollection)
	})
}
