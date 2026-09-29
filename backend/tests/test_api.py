import sys
from pathlib import Path
sys.path.append(str(Path(__file__).parent.parent))

from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.database import Base, get_db
from app.models import Game

# Create an in-memory SQLite database for testing
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Override the dependency
def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

# Create the tables
Base.metadata.create_all(bind=engine)

client = TestClient(app)

def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}

def test_create_game():
    response = client.post(
        "/api/games",
        json={
            "title": "Test Game",
            "platform": "PC",
            "genre": "Action",
            "status": "Backlog",
            "rating": 8,
            "release_year": 2022,
            "cover_url": "http://example.com/image.jpg"
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Test Game"
    assert "id" in data
    return data["id"]

def test_read_games():
    response = client.get("/api/games")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0

def test_read_game():
    game_id = test_create_game()
    response = client.get(f"/api/games/{game_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == game_id
    assert data["title"] == "Test Game"

def test_update_game():
    game_id = test_create_game()
    response = client.put(
        f"/api/games/{game_id}",
        json={
            "title": "Updated Game",
            "platform": "PC",
            "genre": "Action",
            "status": "Playing",
            "rating": 9,
            "release_year": 2023,
            "cover_url": "http://example.com/updated.jpg"
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Updated Game"
    assert data["status"] == "Playing"

def test_delete_game():
    game_id = test_create_game()
    response = client.delete(f"/api/games/{game_id}")
    assert response.status_code == 200
    assert response.json() == {"ok": True}
    # Verify it's deleted
    response = client.get(f"/api/games/{game_id}")
    assert response.status_code == 404

def test_stats():
    response = client.get("/api/stats")
    assert response.status_code == 200
    data = response.json()
    assert "total" in data
    assert "playing" in data
    assert "completed" in data
    assert "backlog" in data
    # We know there is at least one game from the create test, but we don't know the exact count.
    # We'll just check that the values are non-negative integers.
    assert isinstance(data["total"], int) and data["total"] >= 0
    assert isinstance(data["playing"], int) and data["playing"] >= 0
    assert isinstance(data["completed"], int) and data["completed"] >= 0
    assert isinstance(data["backlog"], int) and data["backlog"] >= 0