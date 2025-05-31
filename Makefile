
env-up:
	docker compose -f docker-compose.yml --env-file .env up -d

env-down:
	docker compose -f docker-compose.yml --env-file .env down

restart: env-down env-up build 

build:
	docker exec backend go build -o /bin/pg-app-server ./backend/cmd/v1/main.go

backend-start:
	docker exec backend pg-app-server

frontend-start:
	docker exec frontend npm run dev


env-restart: env-down env-up

backend-stop:
	docker exec backend pkill pg-app-server || echo "pg-app-server already stopped"

frontend-stop:
	docker exec frontend pkill node || echo "frontend process already stopped"

app-stop: backend-stop frontend-stop

swagger-gen:
	swag init -g backend/cmd/v1/main.go -o backend/cmd/v1/docs

cli-create:
	npx openapi-typescript-codegen \
  	--input backend/cmd/v1/docs/swagger.json \
  	--output frontend/src/api \
  	--client fetch

cli-update: swagger-gen cli-create

install-swag:
	go install github.com/swaggo/swag/cmd/swag@latest
	export PATH=$$PATH:$(go env GOPATH)/bin
	source ~/.bashrc
