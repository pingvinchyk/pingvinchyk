# 🐧 Pingvinchyk

**Pingvinchyk** is a simple full-stack web application with a Go backend and a React frontend. It’s designed as a template for beginner-level web projects with clean architecture, Dockerized setup, and easy local development.

---

## 📦 Technologies Used

- **Frontend**: React + Vite
- **Backend**: Go (Gin framework)
- **Containerization**: Docker & Docker Compose

---

## 🛠 Project Structure

```
pingvinchyk/
├── backend/             # Go backend source code
├── frontend/            # React frontend source code
├── .env                 # Environment variables
├── docker-compose.yml   # Docker Compose config
├── Makefile             # Project automation
```

---

## 🚀 Getting Started

### 1. **Clone the Repository**

```bash
git clone https://github.com/your-username/pingvinchyk.git
cd pingvinchyk
```

### 2. **Setup Environment**

Create a `.env` file in the root directory. Here's a basic example:

```env
NVIRONMENT="development"
POSTGRES_USER="user"
POSTGRES_PASSWORD="pass"
POSTGRES_DB="pingvinchyk"
POSTGRES_DSN="postgresql://pg_user:pass@postgres:5433/pingvinchyk?sslmod"
TLS_CERTIFICATES_DIR=""
PORT=":8080"
HOSTS="localhost"
```

### 3. **Start the Project Locally**

Make sure you have **Docker** and **Make** installed, then run:

```bash
make env-up      # Start backend and frontend containers
make build       # Build the Go backend binary
make backend-start   # Run backend processes
make frontend-start   # Run frontend processes
```

After a few seconds:

- Open the frontend at [http://localhost](http://localhost)
- The backend will be running at [http://localhost:8080](http://localhost:8080)

---

## 🧪 Testing the API

You can check if the backend works:

```bash
curl http://localhost:8080/hello
```

Expected output:

```json
{"message": "Hello World"}
```

---

## 🛑 Stopping the App

To stop the backend and frontend processes gracefully:

```bash
make backend-stop
make frontend-stop
```

To stop and remove containers completely:

```bash
make env-down
```

---

## ❓ Troubleshooting

- If port `80` or `8080` is already used, change them in `docker-compose.yml`.
- Make sure you are in the `docker` group to avoid `permission denied` errors:
  ```bash
  sudo usermod -aG docker $USER
  newgrp docker
  ```

---
