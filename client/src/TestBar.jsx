import { useState } from "react";

function TestBar() {
    const [chat, setChat] = useState("");

    function handleOnChange(e) {
        setChat(e.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const res = await send_request(chat, "abcdef");
        console.log("res", res);
        setChat(chat);
    }


    const send_request = async (prompt, user_id) => {
        const res = await fetch("http://localhost:8000/users/abcdef/chats", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            credentials: "include",

            body: JSON.stringify({ prompt: prompt, user_id: user_id }),
        });
        const data = await res.json();
        return data;
    };

    return (
        <div className="TestBar h-100 d-flex justify-content-center align-items-center">
            <form className="col-6" onSubmit={handleSubmit}>
                <input type="text" name="email" className="form-control" onChange={handleOnChange} />
                <button type="submit" className="btn btn-primary">
                    Create Chat
                </button>
            </form>
        </div>
    );
}

export default TestBar;
