from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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


array = ["note1", "note2", "note3"]


@app.get("/")
def read_root():
    print("/")
    return {"Hello": "World"}


@app.get("/qwerty")
def read_root():
    print("/qwerty")
    return {"q": array}


@app.post("/create-note/{note}")
def create_note(note: str):
    print(f"/create-note/{note}")
    return {"note": note}
