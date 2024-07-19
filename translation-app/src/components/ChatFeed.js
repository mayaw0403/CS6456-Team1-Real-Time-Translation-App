import React, { useContext } from "react";
import MyMessage from "./MyMessage";
import TheirMessage from "./TheirMessage";
import TheirTranslation from "./TheirTranslation";
import MessageForm from "./MessageForm";
import AzureTranslation from "./AzureTranslate";

const ChatFeed = (props) => {
    const { chats, activeChat, userName, messages } = props;

    const chat = chats && chats[activeChat];
    

    const renderReadReceipts = (message, isMyMessage) =>
        chat.people.map(
            (person, index) =>
                person.last_read === message.id && (
                    <div
                        key={`read_${index}`}
                        className="read-receipt"
                        style={{
                            float: isMyMessage ? "right" : "left",
                            backgroundImage:
                                person.person.avatar &&
                                `url(${person.person.avatar})`,
                        }}
                    />
                )
        );

    const renderMessages = () => {
        const keys = Object.keys(messages);

        return keys.map((key, index) => {
            const message = messages[key];
            const lastMessageKey = index === 0 ? null : keys[index - 1];
            const isMyMessage = userName === message.sender.username;
            var translation = message;

            return (
                <div key={`msg_${index}`} style={{ width: "100%" }}>
                    <div className="message-block">
                        {isMyMessage ? (
                            <MyMessage message={message} />
                        ) : (
                            <div>
                                <TheirMessage
                                    message={message}
                                    lastMessage={messages[lastMessageKey]}
                                />
                                <TheirTranslation
                                    message={translation}
                                    lastMessage={messages[lastMessageKey]}
                                    activeChat={activeChat}
                                />
                                {/* <AzureTranslation
                                    message={message}
                                    lastMessage={messages[lastMessageKey]}
                                    defaultLanguage="en-US"
                                /> */}
                            </div>
                        )}
                    </div>
                    <div
                        className="read-receipts"
                        style={{
                            marginRight: isMyMessage ? "18px" : "0px",
                            marginLeft: isMyMessage ? "0px" : "68px",
                        }}
                    >
                        {renderReadReceipts(message, isMyMessage)}
                    </div>
                </div>
            );
        });
    };

    if (!chat) return <div />;

    return (
        <div className="chat-feed">
            <div className="chat-title-container">
                <div className="chat-title">{chat?.title}</div>
                <div className="chat-subtitle">
                    {chat.people.map((person) => ` ${person.person.username}`)}
                </div>
            </div>
            {renderMessages()}
            <div style={{ height: "100px" }} />
            <div className="message-form-container">
                <MessageForm {...props} chatId={activeChat} />
            </div>
        </div>
    );
};

export default ChatFeed;
