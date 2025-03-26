package controllers

import (
	"context"
	"fmt"
	"log"

	"github.com/AKHIL-GIREESH/Webweaver/model"
	"github.com/gofiber/fiber/v3"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func CreateProject(c fiber.Ctx, collection *mongo.Collection) error {
	project := new(model.Website)
	if err := c.Bind().JSON(project); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}

	insertProject, err := collection.InsertOne(context.Background(), project)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to insert project"})
	}

	project.ID, _ = insertProject.InsertedID.(primitive.ObjectID)

	return c.JSON(fiber.Map{
		"website": project,
	})
}

func GetAllProjects(c fiber.Ctx, collection *mongo.Collection) error {
	var projects []model.Website
	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		log.Printf("Error retrieving projects: %v", err)
		return c.Status(500).JSON(fiber.Map{"error": "Failed to retrieve projects"})
	}
	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var project model.Website
		if err := cursor.Decode(&project); err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Error decoding project data"})
		}
		projects = append(projects, project)
	}

	return c.JSON(projects)
}

func GetAProject(c fiber.Ctx, collection *mongo.Collection) error {

	projectID := c.Params("id")
	project := new(model.Website)

	objectID, _ := primitive.ObjectIDFromHex(projectID)

	fmt.Println(projectID)
	filter := bson.M{"_id": objectID}
	err := collection.FindOne(context.Background(), filter).Decode(&project)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "No such project found",
			})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Database error",
		})
	}

	return c.JSON(fiber.Map{
		"Website": project,
	})
}
