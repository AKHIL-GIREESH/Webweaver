package routes

// import (
// 	"github.com/AKHIL-GIREESH/Webweaver/controllers"
// 	"github.com/AKHIL-GIREESH/Webweaver/middlewares"
// 	"github.com/gofiber/fiber/v3"
// 	"go.mongodb.org/mongo-driver/mongo"
// )

// func ProtectedRoutes(app *fiber.App, userCollection *mongo.Collection) {
// 	authGroup := app.Group("/protected", middlewares.JWTCheckMiddleware())

// 	app.Post("/signup", func(c fiber.Ctx) error {
// 		return controllers.SignUp(c, userCollection)
// 	})
// 	app.Post("/login", func(c fiber.Ctx) error {
// 		return controllers.Login(c, userCollection)
// 	})
// }
