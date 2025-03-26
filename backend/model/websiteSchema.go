package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Website struct {
	ID        primitive.ObjectID     `bson:"_id,omitempty" json:"id,omitempty"`
	Title     string                 `bson:"title" json:"title"`
	Thumbnail string                 `bson:"thumbnail" json:"thumbnail"`
	Author    primitive.ObjectID     `bson:"author,omitempty" json:"author,omitempty"`
	Like      int                    `bson:"like" json:"like"`
	Tags      []string               `bson:"tags,omitempty" json:"tags,omitempty"`
	Code      map[string]interface{} `bson:"code" json:"code"`
}

type WebsiteUser struct {
	ID        primitive.ObjectID `bson:"id" json:"id"`
	Title     string             `bson:"title" json:"title"`
	Thumbnail string             `bson:"thumbnail" json:"thumbnail"`
}
