package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/AKHIL-GIREESH/Webweaver/database"
	"github.com/AKHIL-GIREESH/Webweaver/routes"
	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/feature/s3/manager"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

func main() {
	database.ConnectDB()

	app := fiber.New()

	app.Use(cors.New())

	userCollection := database.Client.Database(os.Getenv("DB_NAME")).Collection(os.Getenv("DB_COLLECTION_USER"))
	projectCollection := database.Client.Database(os.Getenv("DB_NAME")).Collection(os.Getenv("DB_COLLECTION_PROJECT"))

	routes.AuthRoutes(app, userCollection)
	routes.UserRoutes(app, userCollection)
	routes.ProjectRoutes(app, projectCollection)

	app.Post("/upload", func(c fiber.Ctx) error {
		file, err := c.FormFile("upload")

		if err != nil {
			return c.Status(400).JSON(fiber.Map{
				"error": "Failed to retrieve file",
			})
		}

		fmt.Println("hi")

		cfg, err := config.LoadDefaultConfig(context.TODO())
		if err != nil {
			return c.Status(400).JSON(fiber.Map{
				"error": "Failed to retrieve file",
			})
		}

		uploadFile, err := file.Open()
		if err != nil {
			log.Printf("error: %v", err)
			return c.Status(400).JSON(fiber.Map{
				"error": "Failed to retrieve file",
			})
		}

		client := s3.NewFromConfig(cfg)

		uploader := manager.NewUploader(client)
		result, err := uploader.Upload(context.TODO(), &s3.PutObjectInput{
			Bucket:      aws.String("webweaver-users"),
			Key:         aws.String(file.Filename),
			Body:        uploadFile,
			ContentType: aws.String("image/jpeg"),
			ACL:         "public-read",
		})

		if err != nil {
			log.Printf("error: %v", err)
			return c.Status(400).JSON(fiber.Map{
				"error": "Failed to retrieve file",
			})
		}

		fmt.Println(result)

		return c.Status(200).JSON(fiber.Map{
			"imgUrl": result.Location,
		})
	})

	log.Fatal(app.Listen(":3000"))
}
