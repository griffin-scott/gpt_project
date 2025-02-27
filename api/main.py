from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import gpt
import db
import user_db

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def get_root():
    return {"Hello": "World"}

@app.get("/status")
def get_status():
    return {"status": "up and running"}

@app.post("/prompt/{user_id}")
def create_prompt(req: dict, user_id):
    r = gpt.create_request(req['prompt'], user_id)
    return {"message": r["response"], "history": r["history"]}

@app.delete("/database")
def delete_database():
    res = user_db.drop_db()
    return res

@app.post("/users")
def create_user(req: dict):
    fields = req['fields']
    res = user_db.create_user(fields)
    return res

@app.post("/users/chats")
def create_user_chat(req: dict):

    print("\n\n", req['prompt'], req['user_id'], "\n\n")

    r = gpt.create_request(req['prompt'], req['user_id'])
    user_db.create_chat(req['prompt'], req['user_id'])
    user_db.create_res(r['response'], req['user_id'])

    history = user_db.get_chats(req['user_id'])
    return history

@app.get("/users/{user_id}")
def get_user(user_id):
    user = user_db.get_user(user_id)

    return user

@app.get("/users/{user_id}/chats")
def get_user_chats(user_id):
    history = user_db.get_chats(user_id)
    return history

@app.post("/users/login")
def user_login(req: dict):
    res = user_db.user_login(req['username'], req['password'])
    return res
