# Game Collection Manager

A simple web application to manage your personal video-game collection.

## Features

- View all games
- Add a game
- Edit a game
- Delete a game
- Mark a game as `Playing`, `Completed`, `Backlog`, or `Dropped`
- Search games
- Filter games by status
- See basic collection statistics

## Architecture

The application follows a standard three-tier architecture:

1. **Frontend**: React application built with Vite
2. **Backend**: REST API built with Python FastAPI
3. **Database**: SQLite for data persistence

## Technologies Used

- **Frontend**: React, Vite, Axios
- **Backend**: Python, FastAPI, SQLAlchemy, Pydantic
- **Database**: SQLite
- **DevOps**: Docker, Docker Compose, GitHub Actions

## Local Setup

### Prerequisites

- Python 3.9+
- Node.js 18+
- npm

### Backend

1. Navigate to the `backend` directory
2. Install dependencies: `pip install -r requirements.txt`
3. Start the server: `uvicorn app.main:app --reload`
   - The API will be available at `http://localhost:8000`

### Frontend

1. Navigate to the `frontend` directory
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
   - The application will be available at `http://localhost:3000`

## Docker Setup

To run the entire application using Docker Compose:

```bash
docker compose up --build
```

This will start:
- Backend API at `http://localhost:8000`
- Frontend application at `http://localhost:3000`

## API Endpoints

- `GET /health` - Health check
- `GET /api/games` - Get all games
- `GET /api/games/{id}` - Get a specific game
- `POST /api/games` - Create a new game
- `PUT /api/games/{id}` - Update a game
- `DELETE /api/games/{id}` - Delete a game
- `GET /api/stats` - Get collection statistics

## Running Tests

### Backend Tests

```bash
cd backend
pytest
```

### Frontend Build

```bash
cd frontend
npm run build
```

## GitHub Actions Pipeline

The project includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that runs on every push and pull request to the `main` branch.

The pipeline performs the following steps:

1. Checkout code
2. Set up Python 3.9
3. Install backend dependencies
4. Run backend tests with pytest
5. Set up Node.js 18
6. Install frontend dependencies
7. Build the frontend for production
8. Build the Docker image for the backend

The workflow will fail if any of these steps fail.

## Example Screenshots

*(Placeholder for screenshots)*

![Game Collection Manager Dashboard](https://via.placeholder.com/800x450?text=Dashboard+Screenshot)
![Add Game Form](https://via.placeholder.com/800x450?text=Add+Game+Form)

## Environment Variables

The frontend can be configured using the following environment variable:

- `VITE_API_URL`: The base URL for the API (default: `http://localhost:8000/api`)

When running with Docker Compose, this is automatically set to `http://backend:8000/api`.

## License

This project is open source and available under the [MIT License](LICENSE).