from pydantic import BaseModel
from typing import Optional

class GameBase(BaseModel):
    title: str
    platform: str
    genre: str
    status: str
    rating: int
    release_year: int
    cover_url: str

class GameCreate(GameBase):
    pass

class GameUpdate(GameBase):
    pass

class Game(GameBase):
    id: int

    class Config:
        orm_mode = True