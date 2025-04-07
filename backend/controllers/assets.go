package controllers

import (
	"context"
	"log"
	"time"

	"github.com/AKHIL-GIREESH/Webweaver/model"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/feature/s3/manager"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/gofiber/fiber/v3"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func UploadAsset(c fiber.Ctx, assetCollection *mongo.Collection) error {
	file, err := c.FormFile("upload")
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "Failed to retrieve file",
		})
	}

	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to load AWS config",
		})
	}

	uploadFile, err := file.Open()
	if err != nil {
		log.Printf("error: %v", err)
		return c.Status(400).JSON(fiber.Map{
			"error": "Failed to open file",
		})
	}
	defer uploadFile.Close()

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
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to upload file",
		})
	}

	// userID := c.Locals("userID")
	userID := c.Params("id")

	objectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid user ID"})
	}

	asset := model.Asset{
		URL:        result.Location,
		UploadedBy: objectID,
		Filename:   file.Filename,
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	insertAsset, err := assetCollection.InsertOne(ctx, asset)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to insert asset"})
	}

	asset.ID, _ = insertAsset.InsertedID.(primitive.ObjectID)

	// updateUser := bson.M{"$addToSet": bson.M{"liked": LikeID}}
	// userResult, err := collection.UpdateOne(ctx, bson.M{"_id": userID}, updateUser)
	// if err != nil {
	// 	log.Println("Error updating user's liked list:", err)
	// 	return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Could not follow user"})
	// }

	return c.Status(200).JSON(asset)
}

func GetAssets(c fiber.Ctx, assetCollection *mongo.Collection) error {
	userID := c.Params("id")

	// Convert string ID to ObjectID
	userObjID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid user ID",
		})
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Query the assets by uploadedBy
	cursor, err := assetCollection.Find(ctx, bson.M{"uploadedBy": userObjID})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch assets",
		})
	}
	defer cursor.Close(ctx)

	var assets []*model.Asset
	for cursor.Next(ctx) {
		var asset model.Asset
		if err := cursor.Decode(&asset); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Error decoding asset",
			})
		}
		assets = append(assets, &asset)
	}

	return c.Status(fiber.StatusOK).JSON(assets)
}
