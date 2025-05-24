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
	UserGroup.Patch("/like/:id", func(c fiber.Ctx) error {
		return controllers.LikeProject(c, userCollection)
	})
	UserGroup.Patch("/dislike/:id", func(c fiber.Ctx) error {
		return controllers.DislikeProject(c, userCollection)
	})
	app.Get("/getfollow/:id", func(c fiber.Ctx) error {
		return controllers.GetAllFollowers(c, userCollection)
	})
	app.Get("/u/:id", func(c fiber.Ctx) error {
		return controllers.GetAUser(c, userCollection)
	})
	app.Get("/uid/:id", func(c fiber.Ctx) error {
		return controllers.GetUserByID(c, userCollection)
	})
	app.Patch("/editSelf/:id", func(c fiber.Ctx) error {
		return controllers.UpdateProfile(c, userCollection)
	})

	// app.Get("/editSelf",func(c fiber.Ctx) error{

	// })
}
