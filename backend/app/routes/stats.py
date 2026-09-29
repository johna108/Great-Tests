from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import database, models

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def get_stats(db: Session = Depends(get_db)):
    total = db.query(models.Game).count()
    playing = db.query(models.Game).filter(models.Game.status == "Playing").count()
    completed = db.query(models.Game).filter(models.Game.status == "Completed").count()
    backlog = db.query(models.Game).filter(models.Game.status == "Backlog").count()
    # Note: Dropped is not required in the stats per the spec, but we can include if needed.
    # The spec says: Total Games, Currently Playing, Completed, Backlog.
    return {
        "total": total,
        "playing": playing,
        "completed": completed,
        "backlog": backlog
    }