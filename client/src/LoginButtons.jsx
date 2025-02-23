function LoginButtons({ user, setUser }) {
    return (
        <div className="LoginButtons container-fluid d-flex justify-content-end p-3">
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Login
            </button>
        </div>
    );
}

export default LoginButtons;
