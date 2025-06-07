package services

import (
	"context"
	"database/sql"
	"errors"
	"log"
	"pingvinchyk/backend/internal/db"
	"pingvinchyk/backend/internal/models"
	"pingvinchyk/backend/internal/storage/dbs"
	"strings"

	"github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

type UserService struct {
	repository *db.Repository
}

func NewUserService(repository *db.Repository) *UserService {
	return &UserService{
		repository: repository,
	}
}

func (s *UserService) CreateUser(ctx context.Context, email string, username string, rawPassword string) error {
	hashed, err := bcrypt.GenerateFromPassword([]byte(rawPassword), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	err = s.repository.Queries().CreateUser(ctx, dbs.CreateUserParams{
		Email:        email,
		Username:     username,
		PasswordHash: string(hashed),
	})

	pgErr, ok := err.(*pq.Error)
	if ok {
		if pgErr.Code == "23505" {
			switch pgErr.Constraint {
			case "users_email_key":
				return models.ErrEmailTaken
			case "users_username_key":
				return models.ErrUsernameTaken
			}
		}
	}

	log.Printf("Error creating user: %v", err)
	return err
}

func (s *UserService) GetUserByUsername(ctx context.Context, username string) (*models.User, error) {
	dbUser, err := s.repository.Queries().GetUserByUsername(ctx, username)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, models.ErrNoSuchUsernameRegistered
	} else if err != nil {
		return nil, err
	}
	return &models.User{
		Email:        dbUser.Email,
		Username:     dbUser.Username,
		PasswordHash: dbUser.PasswordHash,
	}, nil
}

func (s *UserService) GetUserByEmail(ctx context.Context, email string) (*models.User, error) {
	dbUser, err := s.repository.Queries().GetUserByEmail(ctx, email)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, models.ErrNoSuchEmailRegistered
	} else if err != nil {
		return nil, err
	}
	return &models.User{
		Email:        dbUser.Email,
		Username:     dbUser.Username,
		PasswordHash: dbUser.PasswordHash,
	}, nil
}

func (s *UserService) DeleteUser(ctx context.Context, username string) error {
	return s.repository.Queries().DeleteUser(ctx, username)
}

func (s *UserService) LoginUser(ctx context.Context, emailOrUsername string, password string) error {
	var user *models.User
	var err error
	// Check if the input is an email or username
	if strings.Contains(emailOrUsername, "@") {
		user, err = s.GetUserByEmail(ctx, emailOrUsername)
		if err != nil {
			return err
		}

	} else {
		user, err = s.GetUserByUsername(ctx, emailOrUsername)
		if err != nil {
			return err
		}
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(password))
	if err != nil {
		return models.ErrIncorrectPassword
	}
	return nil
}
