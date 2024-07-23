import React, { useEffect, useState } from "react";
import { firebaseConfig } from "./Config"
import Popup from './Popup';

import { getFunctions, httpsCallable } from "firebase/functions";

import { initializeApp } from "firebase/app";
import { connectFunctionsEmulator } from "firebase/functions";
import AzureTranslation from "./AzureTranslate";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);
connectFunctionsEmulator(functions, '127.0.0.1', 5001);
const translateImage = httpsCallable(functions, "translateImage");
const translateText = httpsCallable(functions, "translateText");

const TheirTranslation = ({ lastMessage, message, isOwner, thisPerson, activeChat }) => {
  const language = localStorage.getItem("language");

  const [translation, setTranslation] = useState("Translating");
  const [explanation, setExplanation] = useState("Translating");

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => { setIsHovered(true); };
  const handleMouseLeave = () => { setIsHovered(false); };
  const divStyle = {
    backgroundColor: isHovered ? '#AAAAAA' : '#FFFFFF',
  };

  const handleClick = (event) => {
    event.stopPropagation();
  };

  const [isOpen, setIsOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const togglePopup = () => { setIsOpen(!isOpen); }

  useEffect(() => {
    async function fetchData() {
      try {
        setTranslation("Translating");
        setExplanation("Translating");
        if (message.attachments && message.attachments.length > 0) {
          const resp = await translateImage({
            messageId: message.id,
            chatId: activeChat,
            url: message.attachments[0].file,
            language: language
          });

          if (resp.data.success === false) {
            setFailed(true);
          } else {
            setTranslation(() => resp.data.translation);
            setExplanation(() => "Images are transcribed and proved a direct translation.");
          }
        } else {
          // messageId, chatId, thisPerson, otherPerson, isOwner, message
          const otherPerson = message.sender.username;
          const resp = await translateText({
            messageId: message.id,
            chatId: activeChat,
            thisPerson: thisPerson,
            otherPerson: otherPerson,
            isOwner: isOwner,
            message: message.text,
            language: language
          });

          if (resp.data.success === false) {
            setFailed(true);
          } else {
            setTranslation(() => resp.data.translation);
            setExplanation(() => resp.data.explanation);
          }

        }
      } catch (error) {
        setFailed(true);
        console.log(error);
      }
    }

    fetchData();
  }, [message]);

  return (
    !failed ? (
      <div className="message-row" onClick={handleClick}>
        <div className="translation"
          style={divStyle}
          onClick={togglePopup}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {translation}
        </div>
        {isOpen && <Popup
          content={<>
            {explanation}
          </>}
          handleClose={togglePopup}
        />}
      </div>) :
      (message.attachments && message.attachments.length > 0) ? <></> : (<AzureTranslation
        message={message}
        language={language}
      />)
  );
};

export default TheirTranslation;
