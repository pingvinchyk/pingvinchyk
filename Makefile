
env-up:
	docker compose -f docker-compose.yml --env-file .env up -d

env-down:
	docker compose -f docker-compose.yml --env-file .env down

restart: env-down env-up build 

build:
	docker exec backend go build -o /bin/pg-app-server ./backend/cmd/main.go

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
