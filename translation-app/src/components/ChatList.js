// src/components/ChatList.js
import React from "react";
import { ChatCard, NewChatForm } from "react-chat-engine";
import LogOut from "./LogOut";
import UserSettings from "./UserSettings";

const ChatList = (props) => {
    const { chats, setActiveChat } = props;

    return (
        <div class="ce-chat-list">
            <div class="ce-chats-container">
                <NewChatForm {...props} />
                {chats &&
                    Object.keys(chats)
                        .reverse()
                        .map((chatId, index) => {
                            const chat = chats[chatId];
                            return (
                                <div
                                    key={index}
                                    onClick={() => setActiveChat(chat.id)}
                                >
                                    <ChatCard {...props} chat={chat} />
                                </div>
                            );
                        })}
                <div style={styles.controlsContainer}>
                    <div style={styles.subContainer}>
                        <UserSettings />
                        <LogOut />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatList;

const styles = {
    controlsContainer: {
        display: "flex",
        alignItems: "end",
        justifyContent: "end",
    },
    subContainer: {
        width: "30%",
        display: "flex",
        justifyContent: "space-between",
        margin: "1rem",
    },
};
