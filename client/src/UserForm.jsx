import { useState } from 'react';


function UserForm() {
    const [inputs, setInputs] = useState({});

    function handleOnChange(e) {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
        console.log(inputs);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const res = await send_request(inputs);
        console.log("res", res);
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
    }

    return (
        <div className="UserForm h-100 d-flex justify-content-center align-items-center">
            <form className="col-6" onSubmit={handleSubmit}>
                <div className="form-group">

                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" className="form-control" onChange={handleOnChange}/>

                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" className="form-control" onChange={handleOnChange}/>

                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" className="form-control" onChange={handleOnChange}/>

                </div>

                <button type="submit" className="btn btn-primary">
                    Create User
                </button>
            </form>
        </div>
    );
}

export default UserForm;
