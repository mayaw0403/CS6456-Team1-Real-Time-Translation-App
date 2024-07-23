import React, { useEffect } from "react";
import AzureTranslation from "./AzureTranslate"; // Import your translation components
import TheirTranslation from "./TheirTranslation"; // Import your translation components

const HandleTranslation = ({ message, messages, lastMessageKey, isChatOpen }) => {
    useEffect(() => {
        console.log(isChatOpen); // Check if isVisible is correctly set
    }, [isChatOpen]); // Use isChatOpen instead of isVisible

    return (
        <>
            {isChatOpen && (
                <div>
                    <TheirTranslation
                        message={message} // Pass the correct message
                        lastMessage={messages[lastMessageKey]}
                    />
                    <AzureTranslation
                        message={message} // Pass the correct message
                        lastMessage={messages[lastMessageKey]}
                        defaultLanguage="en-US"
                    />
                </div>
            )}
        </>
    );
};

export default HandleTranslation;
