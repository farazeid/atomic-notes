from fastapi import FastAPI

app = FastAPI()

array = ["note1", "note2", "note3"]


@app.get("/")
def read_root():
    print("Hello World")
    return {"Hello": "World"}


@app.get("/qwerty")
def read_root():
    print("Hello", "array")
    return "qwerty"


@app.post("/create-note/{note}")
def create_note(note: str):
    return {"note": note}
