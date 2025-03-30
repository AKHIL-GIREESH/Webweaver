package routes

import (
	"github.com/AKHIL-GIREESH/Webweaver/controllers"
	"github.com/gofiber/fiber/v3"
	"go.mongodb.org/mongo-driver/mongo"
)

func ProjectRoutes(app *fiber.App, projectCollection *mongo.Collection, userCollection *mongo.Collection) {

	app.Get("/project/", func(c fiber.Ctx) error {
		return controllers.GetAllProjects(c, projectCollection, userCollection)
	})
	app.Post("/project/", func(c fiber.Ctx) error {
		return controllers.CreateProject(c, projectCollection, userCollection)
	})
	app.Patch("/project/:id", func(c fiber.Ctx) error {
		return controllers.EditAProject(c, projectCollection)
	})
	app.Delete("/project/:id", func(c fiber.Ctx) error {
		return controllers.DeleteAProject(c, projectCollection)
	})
	app.Get("/project/:id", func(c fiber.Ctx) error {
		return controllers.GetAProject(c, projectCollection)
	})
	app.Get("/project/user/:id", func(c fiber.Ctx) error {
		return controllers.GetWebsiteUsers(c, projectCollection, userCollection)
	})
}
