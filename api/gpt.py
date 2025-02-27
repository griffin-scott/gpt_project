from openai import OpenAI
from dotenv import load_dotenv
import os

import db

load_dotenv()

client = OpenAI()



def create_request(prompt, user_id):
    history = db.query_db(prompt, user_id)
    print("History: \n---------------", history, "\n---------------")
    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=history
    )
    response = completion.choices[0].message.content

    print("\n" + response, "\n")
    print("\n-------------------------\n")
    return {"response": response, "history": history}
