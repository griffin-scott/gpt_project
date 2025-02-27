import os
from dotenv import load_dotenv
import pymongo


load_dotenv()
uri = os.environ.get("MONGODB_URI")

import util
import gpt

#----------- CREATE User -----------#
def create_user(fields):

    print("\nInside user_db\n", fields, "\n\n")

    client = pymongo.MongoClient(uri)
    database = client["DB"]
    collection = database["users"]

    hashed_password = util.hash_string( fields["password"] )

    insert_result = collection.insert_one(
        {
            "user_id": util.generate_random_string(),
            "username": fields["username"],
            "email": fields["email"],
            "password": hashed_password, # Hashed
        }
    )

    client.close()

    uid = insert_result.inserted_id

    login_result = user_login(fields["username"], fields["password"])

    return {"login_result": login_result, "signup_result": f"inserted user with id {uid}"}

#----------- GET User -----------#
def get_user(user_id):
    client = pymongo.MongoClient(uri)
    database = client["DB"]
    collection = database["users"]

    user = collection.find_one({ 'user_id': user_id })

    client.close()

    return user


#----------- GET Chats -----------#
def get_chats(user_id):
    client = pymongo.MongoClient(uri)
    database = client["DB"]
    collection = database["chats"]

    chat_history = list(collection.find({ 'user_id': user_id }, { '_id': 0}))

    client.close()
    return chat_history


#----------- CREATE Chat (user) -----------#
def create_chat(prompt, user_id):
    client = pymongo.MongoClient(uri)
    database = client["DB"]
    collection = database["chats"]

    insert_result = collection.insert_one(
        {
            "role": "user",
            "content": prompt,
            "user_id": user_id
        }
    )

    client.close()

    return {"result": "user chat inserted successfully"}


#----------- CREATE Chat (assistant) -----------#
def create_res(response, user_id):
    client = pymongo.MongoClient(uri)
    database = client["DB"]
    collection = database["chats"]

    insert_result = collection.insert_one(
        {
            "role": "assistant",
            "content": response,
            "user_id": user_id
        }
    )

    client.close()

    return {"result": "assistant chat inserted successfully"}


#----------- DROP DB -----------#
def drop_db():
    client = pymongo.MongoClient(uri)
    database = client["DB"]
    collection = database["chats"]

    res = collection.drop()

    client.close()

    return res

def user_login(username, password):
    client = pymongo.MongoClient(uri)
    database = client["DB"]
    collection = database["users"]

    user = collection.find_one({ 'username': username }, {'_id': 0})

    print("\n\n\n\n\nuser:", user, "\n\n\n\n\n\n")

    if (user):
        hashed_password = util.hash_string( password )
        if (hashed_password == user['password']):
            return { "status": 200, "user_id": user['user_id'] }
        else:
            return { "status": 404, "message": "password is incorrect"}
    else:
        return { "status": 404, "message": "user does not exist" }
