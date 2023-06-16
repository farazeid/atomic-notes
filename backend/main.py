from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from pydantic import BaseModel
import numpy as np
import os
from fastapi.encoders import jsonable_encoder
import uuid


@asynccontextmanager
async def lifespan(app: FastAPI):
    global note_all
    file_path = "db.npy"
    if os.path.getsize(file_path) == 0:
        note_all = np.array([])
    else:
        note_all = np.load(file_path, allow_pickle=True)
    print(f"startup, {note_all}")
    yield
    np.save("db.npy", note_all)
    print(f"shutdown, {note_all}")


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


@app.get("/")
async def read_root() -> None:
    print("/", note_all)

    return


@app.get("/get-note-all")
async def get_note_all() -> dict:
    # print(f"/get-note-all, {len(note_all)}")
    print(f"/get-note-all, {note_all}")

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
