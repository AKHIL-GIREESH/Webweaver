package routes

import (
	"github.com/AKHIL-GIREESH/Webweaver/controllers"
	"github.com/AKHIL-GIREESH/Webweaver/middlewares"
	"github.com/gofiber/fiber/v3"
	"go.mongodb.org/mongo-driver/mongo"
)

func UserRoutes(app *fiber.App, userCollection *mongo.Collection) {
	UserGroup := app.Group("/user", middlewares.JWTCheckMiddleware())

	app.Get("/", func(c fiber.Ctx) error {
		return controllers.GetUsers(c, userCollection)
	})
	UserGroup.Patch("/follow/:id", func(c fiber.Ctx) error {
		return controllers.FollowUser(c, userCollection)
	})
	UserGroup.Patch("/unfollow/:id", func(c fiber.Ctx) error {
		return controllers.UnfollowUser(c, userCollection)
	})
}
