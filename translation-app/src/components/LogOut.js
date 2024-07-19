import React from "react";
import img from "../log-out.png";

const LogOut = () => {
    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        window.location.reload();
    };

    return (
        <div className="logout-container">
            <button onClick={handleLogout} className="logout-btn">
                <img
                    src={img}
                    alt="Button Image"
                    style={{ width: "2rem", height: "auto" }}
                />
            </button>
        </div>
    );
};

export default LogOut;
