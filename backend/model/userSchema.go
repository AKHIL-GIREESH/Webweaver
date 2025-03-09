package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID          primitive.ObjectID   `bson:"_id,omitempty" json:"id"`
	Username    string               `bson:"username" json:"username" validate:"required,min=3,max=30"`
	Email       string               `bson:"email" json:"email" validate:"required,email"`
	Description string               `bson:"description,omitempty" json:"description,omitempty"`
	Following   []primitive.ObjectID `bson:"following,omitempty" json:"following,omitempty"`
	Followers   []primitive.ObjectID `bson:"followers,omitempty" json:"followers,omitempty"`
	Websites    []primitive.ObjectID `bson:"websites,omitempty" json:"websites,omitempty"`
}
