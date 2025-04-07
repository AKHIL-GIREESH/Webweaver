package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Asset struct {
	ID         primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	URL        string             `bson:"url" json:"url"`
	UploadedBy primitive.ObjectID `bson:"uploadedBy" json:"uploadedBy"`
	Filename   string             `bson:"filename" json:"filename"`
}
