import React, { useEffect, useState } from "react";
import { config } from "./Config"
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import * as mime from 'react-native-mime-types';

const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE, },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE, },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE, },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE, },];

const genAI = new GoogleGenerativeAI(config.APIKEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", safetySettings });

function urlContentToDataUri(url) {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*', // This is typically set by the server
    },
    mode: 'cors', // Enable CORS
  })
    .then(response => response.blob())
    .then(blob => new Promise((resolve) => {
      let reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(blob);
    }));
}

const TheirTranslation = ({ lastMessage, message }) => {
  const isFirstMessageByUser = !lastMessage || lastMessage.sender.username !== message.sender.username;

  const [translation, setTranslation] = useState("Translating");
  const [translating, setTranslating] = useState(false);

  var language = `DE`;

  useEffect(() => {
    async function fetchData() {
      try {
        if (translating) {
          if (message.attachments && message.attachments.length > 0) {
            let base64 = await urlContentToDataUri(message.attachments[0].file);
            const mimeType = mime.lookup(message.attachments[0].file.split('?')[0]);
            console.log(mimeType);

            const image = {
              inlineData: {
                data: base64,
                mimeType: "image/jpeg",
              },
            };

            const prompt = `What is this image of and summarize the important details. The entire response should be in the language corresponding to the ISO code ${language}.`
            const result = await model.generateContent([prompt, image])
            const response = result.response;
            const text = response.text();
            console.log(text)
            setTranslation(() => text);
          } else {
            const prompt = `I am speaking to my doctor. Use json format to respond. The field topTranslation should contain only the best translation. Field idioms is an array of dictionaries that contain additional explainations for translated phrases that may not have direct translations like slang or idioms. Translate the following to German: ${message.text}.`
            const result = await model.generateContent(prompt)
            const response = result.response;
            const text = response.text();
            console.log(text)
            const regex = /```json([\s\S]*?)```/;
            const match = text.match(regex);
            const json = JSON.parse(match[1]);
            console.log(json.topTranslation);
            setTranslation(() => json.topTranslation);
          }

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
      <div className="message" style={{ float: 'left', backgroundColor: '#55FF55', marginLeft: '48px' }}>
        {translation}
      </div>
    </div>
  );
};

export default TheirTranslation;