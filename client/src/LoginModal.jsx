import UserContext from "./UserContext";
import { useContext } from "react";

function LoginModal() {
    const { user, setUser } = useContext(UserContext);

    const attemptLogin = async (username, password) => {
        let res = await fetch("http://localhost:8000/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        let data = await res.json();

        if (data.status === 200) {
            document.getElementById("closeLoginModal").click();
            setUser(data.user_id);
        }
        else {
            console.log(data.message);
        }
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const username = document.getElementById("username");
        const password = document.getElementById("password");

        if (!username.value || !password.value) {
            alert("Please fill out all fields");
            return;
        }

        let res = await attemptLogin(username.value, password.value);

        username.value = "";
        password.value = "";
    };

    return (
        <div
            className="LoginModal modal fade"
            id="login_modal"
            tabIndex="-1"
            aria-labelledby="login_modalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="login_modalLabel">
                            Log In
                        </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeLoginModal"></button>
                    </div>
                    <div className="modal-body">
                        <form action="submit" onSubmit={handleOnSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">
                                    Username
                                </label>
                                <input type="username" className="form-control" id="username" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <input type="password" className="form-control" id="password" />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={handleOnSubmit} className="btn btn-primary">
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginModal;
