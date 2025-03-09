package routes

import (
	"github.com/AKHIL-GIREESH/Webweaver/controllers"
	"github.com/gofiber/fiber/v3"
	"go.mongodb.org/mongo-driver/mongo"
)

func UserRoutes(app *fiber.App, userCollection *mongo.Collection) {
	app.Get("/", func(c fiber.Ctx) error {
		return controllers.GetUsers(c, userCollection)
	})
	// app.Post("/signup", func(c fiber.Ctx) error {
	// 	return controllers.SignUp(c, userCollection)
	// })
	// app.Post("/login", func(c fiber.Ctx) error {
	// 	return controllers.Login(c, userCollection)
	// })
}
