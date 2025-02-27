import { useState } from "react";

import UserContext from "./UserContext";
import { useContext } from "react";

function SignupModal() {
    const [inputs, setInputs] = useState({});
    const { setUser } = useContext(UserContext);

    function handleOnChange(e) {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
        console.log(inputs);
    }

    async function handleOnSubmit(event) {
        event.preventDefault();

        if (!inputs.username || !inputs.password || !inputs.email) {
            alert("Please fill out all fields");
            return;
        }

        const res = await send_request(inputs);
        console.log("res", res);

        document.getElementById("closeSignupModal").click();
        setUser(res.login_result.user_id);

        setInputs({});
    }

    const send_request = async (fields) => {
        const res = await fetch("http://localhost:8000/users", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            credentials: "include",

            body: JSON.stringify({ fields: fields }),
        });
        const data = await res.json();
        return data;
    };

    return (
        <div
            className="SignupModal modal fade"
            id="signup_modal"
            tabIndex="-1"
            aria-labelledby="signup_modalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="signup_modalLabel">
                            Sign Up
                        </h1>
                        <button id="closeSignupModal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form action="submit" onSubmit={handleOnSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input type="email" className="form-control" id="email" name="email" onChange={handleOnChange}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">
                                    Username
                                </label>
                                <input type="username" className="form-control" id="username" name="username" onChange={handleOnChange}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <input type="password" className="form-control" id="password" name="password" onChange={handleOnChange}/>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={handleOnSubmit} className="btn btn-primary">
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupModal;
