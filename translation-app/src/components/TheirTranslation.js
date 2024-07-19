import React, { useEffect, useState } from "react";
import { firebaseConfig } from "./Config"
import Popup from './Popup';

import {
  getFunctions,
  httpsCallable
} from "firebase/functions";

import { initializeApp } from "firebase/app";
import { connectFunctionsEmulator } from "firebase/functions";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);
// connectFunctionsEmulator(functions, '127.0.0.1', 5001);
const translateImage = httpsCallable(functions, "translateImage");
const translateTextAtoB = httpsCallable(functions, "translateTextAtoB");

const TheirTranslation = ({ lastMessage, message, activeChat }) => {
  const isFirstMessageByUser = !lastMessage || lastMessage.sender.username !== message.sender.username;

  // test parameters
  var language = `German`;

  const [translation, setTranslation] = useState("Translating");
  const [explanation, setExplanation] = useState("Explanation");
  const [translating, setTranslating] = useState(true);

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {setIsHovered(true);};
  const handleMouseLeave = () => {setIsHovered(false);};
  const divStyle = {
    float: 'left',
    backgroundColor: isHovered ? '#00AA00' : '#55FF55',
    marginLeft: '48px'
  };

  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {setIsOpen(!isOpen);}

  useEffect(() => {
    async function fetchData() {
      try {
        if (translating) {
          if (message.attachments && message.attachments.length > 0) {
            const resp = await translateImage({
              messageId: message.id,
              chatId: activeChat,
              url: message.attachments[0].file,
              language: language
            });

            console.log(resp);
            setTranslation(() => resp.data.translation);
            setExplanation(() => "Images are transcribed and proved a direct translation.");
          } else {
            // messageId, chatId, genderA, ageA, genderB, ageB, descriptionB, language, message
            // const resp = await translateTextAtoB({
            //   messageId: 0,
            //   chatId: 1,
            //   genderA: "female",
            //   ageA: 25,
            //   genderB: "male",
            //   ageA: 17,
            //   description: "I am talking to my doctor",
            //   language: language,
            //   message: "I regret to inform you that you have cancer."
            // });

            // console.log(resp);
            // setTranslation(() => json.topTranslation);
          }

          setTranslating(false);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="message-row">
      <div className="message"
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
    </div>
  );
};

export default TheirTranslation;