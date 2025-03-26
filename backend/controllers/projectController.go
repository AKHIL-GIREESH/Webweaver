package controllers

import (
	"context"

	"github.com/AKHIL-GIREESH/Webweaver/model"
	"github.com/gofiber/fiber/v3"
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
