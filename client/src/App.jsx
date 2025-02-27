import "./App.css";
import "./Modal.css"
import ChatBar from "./ChatBar";
// import UserForm from "./UserForm";
// import TestBar from "./TestBar";
import LoginModal from "./LogInModal";
import LoginButtons from "./LoginButtons";

import { useState } from "react";

import UserContext from "./UserContext";
import SignupModal from "./SignupModal";

function App() {
    const [user, setUser] = useState(null);
    const value = { user, setUser };


    return (
        <div className="App h-100">

            <UserContext.Provider value={value}>
                <LoginButtons />
                <ChatBar />
                {/* <UserForm /> */}
                {/* <TestBar /> */}
                <LoginModal user={user} setUser={setUser} />
                <SignupModal user={user} setUser={setUser} />
            </UserContext.Provider>

        </div>
    );
}

export default App;
