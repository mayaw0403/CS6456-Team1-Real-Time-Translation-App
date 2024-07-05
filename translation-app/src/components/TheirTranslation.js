import React, { useEffect, useState } from "react";
import { config } from "./Config"

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(config.APIKEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const TheirTranslation = ({ lastMessage, message }) => {
  const isFirstMessageByUser = !lastMessage || lastMessage.sender.username !== message.sender.username;

  const [translation, setTranslation] = useState("Translating");
  const [translating, setTranslating] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        if (translating) {
          var prompt = `I am speaking to my doctor. Use json format to respond. The field topTranslation should contain only the best translation. Field idioms is an array of dictionaries that contain additional explainations for translated phrases that may not have direct translations like slang or idioms. Translate the following to German: ${message.text}.`
          const result = await model.generateContent(prompt)
          const response = result.response;
          const text = response.text();
          console.log(text)
          const regex = /```json([\s\S]*?)```/;
          const match = text.match(regex);
          const json = JSON.parse(match[1]);
          console.log(json.topTranslation);
          setTranslation(() => json.topTranslation);
          setTranslating(false);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  });

  return (
    <div className="message-row">
      {isFirstMessageByUser && (
        <div
          className="message-avatar"
          style={{ backgroundImage: message.sender && `url(${message.sender.avatar})` }}
        />
      )}
      {message.attachments && message.attachments.length > 0
        ? (
          <img
            src={message.attachments[0].file}
            alt="message-attachment"
            className="message-image"
            style={{ marginLeft: isFirstMessageByUser ? '4px' : '48px' }}
          />
        )
        : (
          <div className="message" style={{ float: 'left', backgroundColor: '#CABCDC', marginLeft: isFirstMessageByUser ? '4px' : '48px' }}>
            {translation}
          </div>
        )}
    </div>
  );
};

export default TheirTranslation;