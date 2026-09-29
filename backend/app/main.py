from fastapi import FastAPI
from .database import engine, Base
from .routes import games, stats

Base.metadata.create_all(bind=engine)

app = FastAPI(title="GameVault API")

app.include_router(games.router, prefix="/api/games")
app.include_router(stats.router, prefix="/api/stats")

@app.get("/health")
async def health():
    return {"status": "healthy"}