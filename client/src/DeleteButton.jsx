function DeleteButton() {
    const handleSubmit = async () => {
        const res = await fetch("http://localhost:8000/database", {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            credentials: "include",
        });
        const data = await res.json();
        console.log("Drop DB:", data);
        return data;
    };

    return (
        <div className="DeleteButton">
            <form action="submit" onSubmit={handleSubmit}>
                <button className="btn btn-outline-danger" type="submit">
                    Clear Database
                </button>
            </form>
        </div>
    );
}

export default DeleteButton;
