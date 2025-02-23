import "./App.css";
// import ChatBar from "./ChatBar";
// import UserForm from "./UserForm";
import TestBar from "./TestBar";
import LoginModal from "./LogInModal";
import LoginButtons from "./LoginButtons";

import {useState, useEffect} from "react";

function App() {
    const [user, setUser] = useState(null);

    return (
        <div className="App h-100">
            <LoginButtons user={user} setUser={setUser} />
            {/* <ChatBar /> */}
            {/* <UserForm /> */}
            <TestBar />
            <LoginModal user={user} setUser={setUser} />
        </div>
    );
}

export default App;
