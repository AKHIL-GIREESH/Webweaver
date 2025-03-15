package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type FollowUser struct {
	ID         primitive.ObjectID `bson:"id" json:"id"`
	Username   string             `bson:"username" json:"username"`
	ProfilePic string             `bson:"profile_pic" json:"profile_pic"`
}

type User struct {
	ID          primitive.ObjectID   `bson:"_id,omitempty" json:"id"`
	Username    string               `bson:"username" json:"username" validate:"required,min=3,max=30"`
	Email       string               `bson:"email" json:"email" validate:"required,email"`
	Password    string               `bson:"password" json:"password" validate:"required,min=3,max=30"`
	Description string               `bson:"description,omitempty" json:"description,omitempty"`
	ProfilePic  string               `bson:"pfp,omitempty" json:"pfp,omitempty"`
	Banner      string               `bson:"banner,omitempty" json:"banner,omitempty"`
	Liked       []primitive.ObjectID `bson:"liked,omitempty" json:"liked,omitempty"`
	Following   []primitive.ObjectID `bson:"following,omitempty" json:"following,omitempty"`
	Followers   []primitive.ObjectID `bson:"followers,omitempty" json:"followers,omitempty"`
	Websites    []primitive.ObjectID `bson:"websites,omitempty" json:"websites,omitempty"`
}

type ReqUser struct {
	ID          primitive.ObjectID   `bson:"_id,omitempty" json:"id"`
	Username    string               `bson:"username" json:"username" validate:"required,min=3,max=30"`
	Email       string               `bson:"email" json:"email" validate:"required,email"`
	Description string               `bson:"description,omitempty" json:"description,omitempty"`
	ProfilePic  string               `bson:"pfp,omitempty" json:"pfp,omitempty"`
	Banner      string               `bson:"banner,omitempty" json:"banner,omitempty"`
	Liked       []primitive.ObjectID `bson:"liked,omitempty" json:"liked,omitempty"`
	Following   []primitive.ObjectID `bson:"following,omitempty" json:"following,omitempty"`
	Followers   []primitive.ObjectID `bson:"followers,omitempty" json:"followers,omitempty"`
	Websites    []primitive.ObjectID `bson:"websites,omitempty" json:"websites,omitempty"`
}
