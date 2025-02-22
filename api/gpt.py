from openai import OpenAI
from dotenv import load_dotenv
import os

import db

load_dotenv()

client = OpenAI()



def create_request(prompt):
    history = db.query_db(prompt)
    print("History: \n---------------", history, "\n---------------")
    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=history
    )
    response = completion.choices[0].message.content

    db.insert_res(response)

    print("\n" + response, "\n")
    print("\n-------------------------\n")
    return {"response": response, "history": history}


# import pprint
    # print("\n",  pprint.pprint(dict(completion)), "\n")
    # print("\n-------------------------\n")
