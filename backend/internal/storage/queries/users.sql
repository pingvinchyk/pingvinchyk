-- name: CreateUser :exec
INSERT INTO users (username, email, password_hash)
VALUES (@username, @email, @password_hash);

-- name: GetUserByID :one
SELECT * FROM users
WHERE id = @id;

-- name: GetUserByEmail :one
SELECT * FROM users
WHERE email = @email;

-- name: GetUserByUsername :one
SELECT * FROM users
WHERE username = @username;

-- name: ListUsers :many
SELECT * FROM users
ORDER BY id;

-- name: DeleteUser :exec
DELETE FROM users
WHERE username = @username;
