package middlewares

import (
	"github.com/AKHIL-GIREESH/Webweaver/model"
	"github.com/gofiber/fiber/v3"
)

func JWTMiddleware(jwtService *model.JWTService) fiber.Handler {
	return func(c fiber.Ctx) error {
		// Get the Authorization header
		authHeader := c.Get("Authorization")
		if authHeader == "" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "Authorization header required",
			})
		}

		// Check if the header is in the correct format (Bearer token)
		if len(authHeader) < 7 || authHeader[:7] != "Bearer " {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "Invalid authorization format, expected 'Bearer {token}'",
			})
		}

		// Extract the token
		tokenString := authHeader[7:]

		// Validate the token
		claims, err := jwtService.ValidateToken(tokenString)
		if err != nil {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "Invalid or expired token",
			})
		}

		// Set the user ID in locals for use in handlers
		c.Locals("userID", claims.UserID)

		return c.Next()
	}
}
