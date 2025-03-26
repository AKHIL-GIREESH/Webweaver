package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Website struct {
	ID        primitive.ObjectID     `bson:"_id,omitempty" json:"_id,omitempty"`
	Title     string                 `bson:"title" json:"title"`
	Thumbnail string                 `bson:"thumbnail" json:"thumbnail"`
	Author    primitive.ObjectID     `bson:"author,omitempty" json:"author,omitempty"`
	Like      int                    `bson:"like" json:"like"`
	Tags      []string               `bson:"tags,omitempty" json:"tags,omitempty"`
	Code      map[string]interface{} `bson:"code" json:"code"`
	Kind      string                 `bson:"kind" json:"kind"`
}

type WebsiteUser struct {
	ID        primitive.ObjectID `bson:"_id" json:"_id"`
	Title     string             `bson:"title" json:"title"`
	Thumbnail string             `bson:"thumbnail" json:"thumbnail"`
}
