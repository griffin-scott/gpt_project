import { useState, useEffect } from "react";
import ChatHistory from "./ChatHistory";
import DeleteButton from "./DeleteButton";

function ChatBar() {
    const [inputValue, setInputValue] = useState("");
    const [response, setResponse] = useState("");
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
            const res = await send_request();
            console.log(res);
            setResponse(res.message);

            let chatObject = { role: "assistant", content: res.message };
            setHistory([...res.history, chatObject]);

            setInputValue("");
        }
    };

    const send_request = async () => {
        const res = await fetch("http://localhost:8000/prompt", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            credentials: "include",

            body: JSON.stringify({ prompt: inputValue }),
        });
        const data = await res.json();
        setIsLoading(false);
        console.log("data", data);
        return data;
    };

    function updateScroll(){
        let element = document.getElementById("chatHistory");
        element.scrollTop = element.scrollHeight;
    }

    useEffect(() => {
        updateScroll()
    }, [inputValue, isLoading, history]);

    return (
        <div className="ChatBar h-100 w-100 d-flex flex-column justify-content-center align-items-center">

            <div className="d-flex justify-content-end py-2">
                <DeleteButton />
            </div>

            <ChatHistory response={response} history={history} isLoading={isLoading} prompt={inputValue}/>

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
