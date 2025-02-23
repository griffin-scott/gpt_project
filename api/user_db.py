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

    return {"result": f"inserted user with id {uid}"}

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

    chat_history = list(collection.find({ 'user_id': user_id }))

    client.close()
    # might have to sort array
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

    user = collection.find_one({ 'username': username })

    print("\n\n\n\n\nuser:", user, "\n\n\n\n\n\n")

    if (user):
        hashed_password = util.hash_string( password )
        if (hashed_password == user['password']):
            return "user login successful"
        else:
            return "password is incorrect"
    else:
        return "user does not exist"
