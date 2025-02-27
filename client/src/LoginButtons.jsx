import { useContext } from "react";
import UserContext from "./UserContext";


function LoginButtons() {
    const { user, setUser } = useContext(UserContext);

    const handleLogout = () => {
        setUser("clear_history");
    }

    // If no user is logged in
    if (!user) {
        return (
            <div className="LoginButtons container-fluid d-flex justify-content-end p-3">
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#login_modal">
                    Login
                </button>

                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#signup_modal">
                    Sign Up
                </button>
            </div>
        )
    }

    return (
        <div className="LoginButtons container-fluid d-flex justify-content-end p-3">
            <h2>Currently logged in: {user}</h2>
            <button onClick={handleLogout} type="button" className="btn btn-primary">
                Log out
            </button>
        </div>
    )

    // If a user is logged in
}

export default LoginButtons;
