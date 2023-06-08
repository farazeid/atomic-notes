from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/create-note/{note}")
def create_note(note: str):
    return {"note": note}
