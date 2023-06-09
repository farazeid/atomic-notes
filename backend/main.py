from fastapi import FastAPI

app = FastAPI()

array = ["note1", "note2", "note3"]


@app.get("/qwerty")
def read_root():
    return {"Hello": array}


@app.post("/create-note/{note}")
def create_note(note: str):
    return {"note": note}
