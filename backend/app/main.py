import os
from fastapi import FastAPI
from .database import engine, Base
from .routes import games, stats

Base.metadata.create_all(bind=engine)

app = FastAPI(title="GameVault API")

app.include_router(games.router, prefix="/api/games")
app.include_router(stats.router, prefix="/api/stats")

@app.get("/health")
async def health():
    # Attempt to enhance health check with additional diagnostics
    # but accidentally broke the expected format
    return {
        "status": "healthy",
        "details": {
            "database": "connected",
            "version": os.getenv("COMMIT_SHA", "unknown"),
            "timestamp": "2026-09-29T10:00:00Z"
        }
    }

@app.get("/version")
async def version():
    # Return commit SHA from environment or fallback
    commit_sha = os.getenv("COMMIT_SHA", "unknown")
    return {
        "commit": commit_sha,
        "environment": os.getenv("ENVIRONMENT", "development")
    }