package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Website struct {
	ID        primitive.ObjectID     `bson:"_id,omitempty" json:"_id,omitempty"`
	Title     string                 `bson:"title,omitempty" json:"title,omitempty"`
	Thumbnail string                 `bson:"thumbnail,omitempty" json:"thumbnail,omitempty"`
	Author    primitive.ObjectID     `bson:"author,omitempty" json:"author,omitempty"`
	Like      int                    `bson:"like,omitempty" json:"like,omitempty"`
	Tags      []string               `bson:"tags,omitempty" json:"tags,omitempty"`
	Code      map[string]interface{} `bson:"code,omitempty" json:"code,omitempty"`
	Kind      string                 `bson:"kind,omitempty" json:"kind,omitempty"`
}

type WebsiteUser struct {
	ID        primitive.ObjectID `bson:"_id" json:"_id"`
	Title     string             `bson:"title" json:"title"`
	Thumbnail string             `bson:"thumbnail" json:"thumbnail"`
	Tags      []string           `bson:"tags,omitempty" json:"tags,omitempty"`
}

type WebsiteForComponent struct {
	WebsiteUser
	Code map[string]interface{} `bson:"code,omitempty" json:"code,omitempty"`
}
