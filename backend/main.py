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
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


array = ["note1", "note2", "note3"]


@app.get("/")
def read_root():
    print("Hello World")
    return {"Hello": "World"}


@app.get("/qwerty")
def read_root():
    print("Hello", "array")
    return {"q": array}


@app.post("/create-note/{note}")
def create_note(note: str):
    return {"note": note}
