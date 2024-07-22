import React from "react";
import LogOut from "./LogOut";
import UserSettings from "./UserSettings";
import chat_img from "../chat.png";
import settings_img from "../settings.png";
import { Avatar } from "react-chat-engine";

const NavOptions = {
    CHAT: "chat",
    SETTINGS: "settings",
};
const NavBar = ({ select, onSelect }) => {
    const username = localStorage.getItem("username");

    return (
        <div className="navbar">
            <div className="bar">
                <div className="user-avatar">
                    <Avatar username={username} />
                </div>
                <div style={{ padding: "1rem" }}>
                    <button
                        className="chat-btn"
                        onClick={() => onSelect(NavOptions.CHAT)}
                    >
                        <img
                            src={chat_img}
                            alt="Chat Image"
                            className="chat-icon"
                        />
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => onSelect(NavOptions.SETTINGS)}
                        className="user-settings-btn"
                    >
                        <img
                            src={settings_img}
                            alt="Button Image"
                            style={{ width: "2rem", height: "auto" }}
                        />
                    </button>
                </div>
                <div style={{ padding: "1rem" }}>
                    <LogOut />
                </div>
            </div>
        </div>
    );
};

export default NavBar;