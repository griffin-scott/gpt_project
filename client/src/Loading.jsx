let Loading = ({ isLoading, prompt }) => {
    console.log("in Loading", prompt)
    if (isLoading) {
        return (
            <>
                <div className="row rounded my-2 userDiv">
                    <div className="chatBox p-2">
                        <div className="display-6 mb-1 userName">user</div>
                        <div className="lead fs-6 rounded p-2 ms-auto userBg">
                            {prompt}
                        </div>
                    </div>
                </div>
                <div className="row rounded my-2 assistantDiv">
                    <div className="chatBox p-2">
                        <div className="display-6 mb-1 assistantName">assistant</div>
                        <div className="lead fs-6 rounded p-2 assistantBg d-flex justify-content-center">
                            <img src="spinner.gif" alt="" />
                        </div>
                    </div>
                </div>
            </>
        );
    }
    return <></>;
};

export default Loading;
