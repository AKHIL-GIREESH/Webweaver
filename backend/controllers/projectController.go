package controllers

import (
	"context"
	"log"
	"time"

	"github.com/AKHIL-GIREESH/Webweaver/model"
	"github.com/gofiber/fiber/v3"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func CreateProject(c fiber.Ctx, projectCollection *mongo.Collection, userCollection *mongo.Collection) error {
	project := new(model.Website)
	if err := c.Bind().JSON(project); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	insertProject, err := projectCollection.InsertOne(ctx, project)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to insert project"})
	}

	project.ID, _ = insertProject.InsertedID.(primitive.ObjectID)

	updateUser := bson.M{"$addToSet": bson.M{"websites": project.ID}}
	insertProjectIntoUser, err := userCollection.UpdateOne(ctx, bson.M{"_id": project.Author}, updateUser)
	if err != nil {
		log.Println("Error updating user's following list:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Could not follow user"})
	}

	return c.Status(200).JSON(fiber.Map{
		"author":  insertProjectIntoUser,
		"website": project,
	})
}

func GetAllProjects(c fiber.Ctx, websiteCollection *mongo.Collection, userCollection *mongo.Collection) error {
	userID := c.Params("id")
	objectID, _ := primitive.ObjectIDFromHex(userID)
	user := new(model.User)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err := userCollection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&user)
	if err != nil {
		return err
	}

	cursor, err := websiteCollection.Find(ctx, bson.M{"_id": bson.M{"$nin": user.Websites}})
	if err != nil {
		return err
	}
	defer cursor.Close(ctx)

	var websiteUsers []model.WebsiteUser
	for cursor.Next(ctx) {
		var website model.Website
		if err := cursor.Decode(&website); err != nil {
			log.Println("Error decoding website:", err)
			return err
		}

		websiteUsers = append(websiteUsers, model.WebsiteUser{
			ID:        website.ID,
			Title:     website.Title,
			Thumbnail: website.Thumbnail,
			Tags:      website.Tags,
		})
	}

	return c.Status(200).JSON(websiteUsers)

}

func GetAProject(c fiber.Ctx, collection *mongo.Collection) error {

	projectID := c.Params("id")
	project := new(model.Website)

	objectID, _ := primitive.ObjectIDFromHex(projectID)

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

func EditAProject(c fiber.Ctx, collection *mongo.Collection) error {
	projectID := c.Params("id")
	objectID, _ := primitive.ObjectIDFromHex(projectID)

	reqBody := new(model.Website)
	if err := c.Bind().JSON(reqBody); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}

	filter := bson.M{"_id": objectID}
	update := bson.M{
		"$set": reqBody,
	}

	project := new(model.Website)
	err := collection.FindOneAndUpdate(
		context.TODO(),
		filter,
		update,
		options.FindOneAndUpdate().SetReturnDocument(options.After),
	).Decode(&project)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"error": "Project not found",
			})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error updating project",
		})
	}
	return c.JSON(fiber.Map{
		"message": "Project updated successfully",
		"project": project,
	})
}

func DeleteAProject(c fiber.Ctx, collection *mongo.Collection) error {

	projectID := c.Params("id")
	if projectID == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Project ID is required",
		})
	}

	objectID, err := primitive.ObjectIDFromHex(projectID)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid ID format",
		})
	}

	filter := bson.M{"_id": objectID}

	deleteResult, err := collection.DeleteOne(context.TODO(), filter)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error deleting project",
		})
	}

	if deleteResult.DeletedCount == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Project not found",
		})
	}

	return c.JSON(fiber.Map{
		"message": "Project deleted successfully",
	})
}

func GetWebsiteUsers(c fiber.Ctx, websiteCollection *mongo.Collection, userCollection *mongo.Collection) error {
	userID := c.Params("id")
	objectID, _ := primitive.ObjectIDFromHex(userID)
	user := new(model.User)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err := userCollection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&user)
	if err != nil {
		return err
	}

	cursor, err := websiteCollection.Find(ctx, bson.M{"_id": bson.M{"$in": user.Websites}})
	if err != nil {
		return err
	}
	defer cursor.Close(ctx)

	var websiteUsers []model.WebsiteUser
	for cursor.Next(ctx) {
		var website model.Website
		if err := cursor.Decode(&website); err != nil {
			log.Println("Error decoding website:", err)
			return err
		}

		websiteUsers = append(websiteUsers, model.WebsiteUser{
			ID:        website.ID,
			Title:     website.Title,
			Thumbnail: website.Thumbnail,
			Tags:      website.Tags,
		})
	}

	return c.Status(200).JSON(websiteUsers)

}

func LiterallyGetAllProjects(c fiber.Ctx, websiteCollection *mongo.Collection) error {

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := websiteCollection.Find(ctx, bson.M{})
	if err != nil {
		return err
	}
	defer cursor.Close(ctx)

	var websiteUsers []model.WebsiteUser
	for cursor.Next(ctx) {
		var website model.Website
		if err := cursor.Decode(&website); err != nil {
			log.Println("Error decoding website:", err)
			return err
		}

		websiteUsers = append(websiteUsers, model.WebsiteUser{
			ID:        website.ID,
			Title:     website.Title,
			Thumbnail: website.Thumbnail,
			Tags:      website.Tags,
		})
	}

	return c.Status(200).JSON(websiteUsers)

}

func GetLikedProjects(c fiber.Ctx, websiteCollection *mongo.Collection, userCollection *mongo.Collection) error {
	userID := c.Params("id")
	objectID, _ := primitive.ObjectIDFromHex(userID)
	user := new(model.User)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err := userCollection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&user)
	if err != nil {
		return err
	}

	cursor, err := websiteCollection.Find(ctx, bson.M{"_id": bson.M{"$in": user.Liked}})
	if err != nil {
		return err
	}
	defer cursor.Close(ctx)

	var websiteUsers []model.WebsiteComponent
	for cursor.Next(ctx) {
		var website model.Website
		if err := cursor.Decode(&website); err != nil {
			log.Println("Error decoding website:", err)
			return err
		}

		websiteUsers = append(websiteUsers, model.WebsiteComponent{
			ID:    website.ID,
			Title: website.Title,
			Code:  website.Code,
		})
	}

	return c.Status(200).JSON(websiteUsers)

}
