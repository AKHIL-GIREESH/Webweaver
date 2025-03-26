package routes

import (
	"github.com/AKHIL-GIREESH/Webweaver/controllers"
	"github.com/AKHIL-GIREESH/Webweaver/middlewares"
	"github.com/gofiber/fiber/v3"
	"go.mongodb.org/mongo-driver/mongo"
)

func ProjectRoutes(app *fiber.App, userCollection *mongo.Collection) {

	app.Get("/project/", middlewares.JWTCheckMiddleware(), func(c fiber.Ctx) error {
		return controllers.GetSelf(c, userCollection)
	})
	app.Post("/project/:id", func(c fiber.Ctx) error {
		return controllers.SignUp(c, userCollection)
	})
	app.Patch("/project/:id", func(c fiber.Ctx) error {
		return controllers.Login(c, userCollection)
	})
	app.Delete("/project/:id", func(c fiber.Ctx) error {
		return controllers.Login(c, userCollection)
	})
	app.Get("/project/:id", func(c fiber.Ctx) error {
		return controllers.Login(c, userCollection)
	})
}
