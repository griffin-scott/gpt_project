import Loading from "./Loading";

function ChatHistory({ history, isLoading, prompt }) {
    return (
        <div className="ChatHistory p-3 col-8 mx-auto overflow-scroll" id="chatHistory">
            { history.map((chat) => (
                <div className={ "row rounded my-2 " + (chat.role === "user" ? "userDiv" : "assistantDiv") } key={chat.content}>
                    <div className="chatBox p-2">
                        <div className={"display-6 mb-1 " + (chat.role === "user" ? "userName" : "assistantName") }>{chat.role}</div>
                        <div className={"lead fs-6 rounded p-2 ms-auto " + (chat.role === "user" ? "userBg" : "assistantBg") }>{chat.content}</div>
                    </div>
                </div>
            ))}

            <Loading isLoading={isLoading} prompt={prompt}/>
        </div>
    );
}

export default ChatHistory;
