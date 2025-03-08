package routes

import (
	"github.com/AKHIL-GIREESH/Webweaver/controllers"
	"github.com/gofiber/fiber/v3"
)

func UserRoutes(app *fiber.App) {
	app.Get("/", controllers.GetUsers)
	app.Post("/users", controllers.CreateUser)
}
