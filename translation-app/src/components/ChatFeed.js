import MyMessage from "./MyMessage";
import TheirMessage from "./TheirMessage";
import TheirTranslation from "./TheirTranslation";
import MessageForm from "./MessageForm";
import { useEffect } from "react";

// import { Transaction } from "firebase/firestore";

// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const genAI = new GoogleGenerativeAI(config.APIKEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const ChatFeed = (props) => {
    const { chats, activeChat, userName, messages } = props;

    const chat = chats && chats[activeChat];

    

    useEffect(() => {

        // Ensure googleTranslateElementInit is defined globally
        window.googleTranslateElementInit = function() {
            new window.google.translate.TranslateElement(
                { pageLanguage: 'en' },
                'google_translate_element'
            );
        };

        // Load Google Translate API script
        const script = document.createElement("script");
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.head.appendChild(script);

        return () => {
            // Clean up if needed
            document.head.removeChild(script);
            window.googleTranslateElementInit = null; // Optional cleanup
        };
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

            // if (!isMyMessage) {
            //     var prompt = `I am speaking to my doctor. Use json format to respond. The field topTranslation should contain only the best translation. Field idioms is an array of dictionaries that contain additional explainations for translated phrases that may not have direct translations like slang or idioms. Translate the following to German: ${message.text}.`
            //     const result = await model.generateContent(prompt)
            //     const response = result.response;
            //     const text = response.text();
            //     console.log(text)
            //     const regex = /```json([\s\S]*?)```/;
            //     const match = text.match(regex);
            //     // console.log(match[1])
            //     const json = JSON.parse(match[1]);
            //     console.log(json.topTranslation);
            //     translation.text = json.topTranslation;
            // }

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
