package controllers

import (
	"fmt"
	"time"

	"github.com/AKHIL-GIREESH/Webweaver/model"
	"github.com/golang-jwt/jwt/v5"
)

func NewJWTService(config model.JWTConfig) *model.JWTService {
	return &model.JWTService{
		Config: config,
	}
}

func (s *model.JWTService) GenerateToken(user *model.User) (string, error) {
	claims := &model.Claims{
		UserID: user.ID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(s.Config.TokenExp)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			Subject:   fmt.Sprintf("%d", user.ID),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(s.Config.TokenSecret))
}
