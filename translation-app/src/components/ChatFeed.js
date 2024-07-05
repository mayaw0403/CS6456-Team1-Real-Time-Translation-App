import MyMessage from "./MyMessage";
import TheirMessage from "./TheirMessage";
import TheirTranslation from "./TheirTranslation";
import MessageForm from "./MessageForm";
import { useEffect } from "react";

const ChatFeed = (props) => {
    const { chats, activeChat, userName, messages } = props;
    const chat = chats && chats[activeChat];

    useEffect(() => {
        // Ensure googleTranslateElementInit is defined globally
        window.googleTranslateElementInit = function() {
            if (!document.getElementById('google_translate_element').hasChildNodes()) {
                new window.google.translate.TranslateElement(
                    { pageLanguage: 'en' },
                    'google_translate_element'
                );
            }
        };

        // Load Google Translate API script if not already loaded
        if (!document.querySelector("script[src='//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit']")) {
            const script = document.createElement("script");
            script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            script.async = true;
            document.head.appendChild(script);
        } else {
            window.googleTranslateElementInit();
        }
    }, [activeChat]);

    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        window.location.reload();
    };

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
                                />
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
            <div className="logout-container">
                <button onClick={handleLogout} className="logout-btn">
                    Log Out
                </button>
            </div>
            <div className="chat-title-container">
                <div className="chat-title">{chat?.title}</div>
                <div className="chat-subtitle">
                    {chat.people.map((person) => ` ${person.person.username}`)}
                </div>
                <div id="google_translate_element"></div>
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
