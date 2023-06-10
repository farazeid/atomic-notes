from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uuid

app = FastAPI()

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


note_all = []


@app.get("/")
async def read_root() -> None:
    print("/")

    return


@app.get("/get-note-all")
async def get_note_all() -> dict:
    print(f"/get-note-all, {len(note_all)}")

    return {"note_all": note_all}


class NoteCreate(BaseModel):
    note: str


@app.post("/post-note")
async def create_note(note: NoteCreate) -> dict:
    print(f"/post-note, {note.note}")

    # num_notes += 1
    note_all.append(
        {
            "id": uuid.uuid4(),
            "note": note.note,
        }
    )
    return {"message": "success"}
