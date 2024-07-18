import React from "react";

const LogOut = () => {
    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        window.location.reload();
    };

    return (
        <div className="logout-container">
            <button onClick={handleLogout} className="logout-btn button-color">
                Log Out
            </button>
        </div>
    );
};

export default LogOut;
