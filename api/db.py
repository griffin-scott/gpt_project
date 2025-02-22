import os
from dotenv import load_dotenv
import pymongo

load_dotenv()
uri = os.environ.get("MONGODB_URI")

# try:
#     client = pymongo.MongoClient(uri)
#     database = client["ChatHistory"]
#     collection = database["chats"]

#     results = collection.find_one()

#     client.close()

# except Exception as e:
#     raise Exception(
#         "the following error occured: ", e)



def query_db(prompt):
    client = pymongo.MongoClient(uri)
    database = client["ChatHistory"]
    collection = database["chats"]

    insert_result = collection.insert_one(
        {
            "role": "user",
            "content": prompt
        }
    )

    results = list(collection.find())
    for r in results:
        del r["_id"]

    client.close()

    return results



def insert_res(response):
    client = pymongo.MongoClient(uri)
    database = client["ChatHistory"]
    collection = database["chats"]

    insert_result = collection.insert_one(
        {
            "role": "assistant",
            "content": response
        }
    )

    client.close()

    return


def drop_db():
    client = pymongo.MongoClient(uri)
    database = client["ChatHistory"]
    collection = database["chats"]

    res = collection.drop()

    client.close()

    return res
