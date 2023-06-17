from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from contextlib import asynccontextmanager
import numpy as np
import os

import uuid


@asynccontextmanager
async def lifespan(app: FastAPI):
    global note_all
    file_path = "db.npy"
    if not os.path.exists(file_path) or os.path.getsize(file_path) == 0:
        note_all = np.array([])
    else:
        note_all = np.load(file_path, allow_pickle=True)

    print(f"startup, {len(note_all)} note(s)")

    yield

    np.save("db.npy", note_all)

    print(f"shutdown, {len(note_all)} note(s)")


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*"
        # "http://localhost",
        # "http://localhost:19006",
    ],
    # allow_origin_regex=[], // e.g. "https://.*\.example\.org"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/get-note-all")
async def get_note_all() -> dict:
    print(f"/get-note-all, {len(note_all)} note(s)")

    return {"note_all": note_all.tolist()}


class NoteCreate(BaseModel):
    note: str


@app.post("/post-note")
async def create_note(note: NoteCreate) -> dict:
    print(f"/post-note, {note.note}")

    global note_all
    note_all = np.append(
        note_all,
        {
            "id": uuid.uuid4(),
            "note": note.note,
        },
    )
    return {"message": "success"}
