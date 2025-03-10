package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Website struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Title     string             `bson:"title" json:"title"`
	Thumbnail string             `bson:"thumbnail" json:"thumbnail"`
	Author    FollowUser         `bson:"author,omitempty" json:"author,omitempty"`
	Like      int                `bson:"like" json:"like"`
	// Tags	string
}

type WebsiteUser struct {
	ID        primitive.ObjectID `bson:"id" json:"id"`
	Title     string             `bson:"title" json:"title"`
	Thumbnail string             `bson:"thumbnail" json:"thumbnail"`
}
