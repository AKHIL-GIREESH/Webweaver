package routes

import (
	"github.com/AKHIL-GIREESH/Webweaver/controllers"
	"github.com/AKHIL-GIREESH/Webweaver/middlewares"
	"github.com/gofiber/fiber/v3"
	"go.mongodb.org/mongo-driver/mongo"
)

func ProjectRoutes(app *fiber.App, projectCollection *mongo.Collection) {

	app.Get("/project/", middlewares.JWTCheckMiddleware(), func(c fiber.Ctx) error {
		return controllers.GetAllProjects(c, projectCollection)
	})
	app.Post("/project/", func(c fiber.Ctx) error {
		return controllers.CreateProject(c, projectCollection)
	})
	app.Patch("/project/:id", func(c fiber.Ctx) error {
		return controllers.EditAProject(c, projectCollection)
	})
	app.Delete("/project/:id", func(c fiber.Ctx) error {
		return controllers.Login(c, projectCollection)
	})
	app.Get("/project/:id", func(c fiber.Ctx) error {
		return controllers.GetAProject(c, projectCollection)
	})
}
