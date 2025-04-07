package routes

import (
	"github.com/AKHIL-GIREESH/Webweaver/controllers"
	"github.com/gofiber/fiber/v3"
	"go.mongodb.org/mongo-driver/mongo"
)

func AssetsRoutes(app *fiber.App, assetsCollection *mongo.Collection) {
	// app.Post("/assets/upload/:id", controllers.UploadAsset())
	app.Post("/assets/upload/:id", func(c fiber.Ctx) error {
		return controllers.UploadAsset(c, assetsCollection)
	})
	app.Get("/assets/:id", func(c fiber.Ctx) error {
		return controllers.GetAssets(c, assetsCollection)
	})
}

// func GetAllAssets()
