import { useState, useEffect } from "react";
import ChatHistory from "./ChatHistory";
import DeleteButton from "./DeleteButton";

import UserContext from "./UserContext";
import { useContext } from "react";

function ChatBar() {
    const [inputValue, setInputValue] = useState("");
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user, setUser } = useContext(UserContext);

    const handleOnChange = (e) => {
        if (!isLoading) {
            const val = e.target.value;
            setInputValue(val);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputValue && !isLoading) {
            setIsLoading(true);
            const res = await send_request(inputValue, user);
            console.log("res: ", res);

            setHistory(res);

            setInputValue("");
        }
    };

    const send_request = async (prompt, user_id) => {
        const res = await fetch("http://localhost:8000/users/chats", {
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
        console.log("data", data)
        setIsLoading(false)
        return data;
    };

    function updateScroll(){
        let element = document.getElementById("chatHistory");
        element.scrollTop = element.scrollHeight;
    };

    const getUserChats = async (user_id) => {
        const res = await fetch(`http://localhost:8000/users/${user_id}/chats`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            credentials: "include",
        });
        const data = await res.json();
        console.log("data", data)
        if (data.length === 0) {
            setHistory([{ content: "Hello. How can I help you today?", role: "assistant" }]);
        }
        else {
            setHistory(data);
        }
    };

    useEffect(() => {
        updateScroll();

        if (user === "clear_history") {
            setHistory([]);
            setUser(null)
        }

        else if(user && history.length === 0){
            getUserChats(user);
        }

    }, [inputValue, isLoading, history, user, setUser]);

    return (
        <div className="ChatBar w-100 d-flex flex-column justify-content-center align-items-center">

            <div className="d-flex justify-content-end py-2">
                <DeleteButton />
            </div>

            <ChatHistory history={history} isLoading={isLoading} prompt={inputValue}/>

            <form className="d-flex col-8 p-2" onSubmit={handleSubmit}>
                <div className="col-10 pb-5 ">
                    <input
                        onChange={handleOnChange}
                        value={inputValue}
                        type="text"
                        className="form-control"
                        placeholder="Hello. How can I help you today?"
                    />
                </div>
                <div className="col-2">
                    <button type="submit" className="form-control btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ChatBar;
