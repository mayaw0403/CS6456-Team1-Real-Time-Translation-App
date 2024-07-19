/**
 * Internal translation handler
 * Uses caching to reduce the number of calls to Gemini
 * Uses Gemini to translate between two individuals with context
 * Uses Gemini to transcribe images and translate the transcription
 */

const { onCall } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
var mime = require("mime-types");
var axios = require("axios");
var config = require("./Config")

// Initialize firebase and firestore
initializeApp();
const db = getFirestore('translations');

// convert image to base64
async function urlContentToDataUri(url) {
  let image = await axios.get(url, { responseType: 'arraybuffer' });
  let returnedB64 = Buffer.from(image.data).toString('base64');
  return returnedB64;
}

const { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(config.GEMINI_KEY);
const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE, },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE, },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE, },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE, },];
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", safetySettings });

async function runGemini(prompt) {
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  const regex = /```json([\s\S]*?)```/;
  const match = text.match(regex);
  const json = JSON.parse(match[1]);

  return json;
}

const directionA = `I want to translate a message on behalf of Person 1 to Person 2.`;
const directionB = `I want to translate a message on behalf of Person 2 to Person 1.`;
const field1 = `Field translation should contain only the best translation.`;
const field2 = `Field explanation should contain explanations for anything that may not have direct translations like slang or idioms. This should also be translated.`;
const format = `Use the json format to respond. ${field1} ${field2}`;

exports.translateImage = onCall(
  async (request) => {
    const { messageId, chatId, url, language } = request.data;

    // gets the database
    const index = `${chatId}${language}${messageId}`;
    const messageDoc = await db.collection('translations').doc(index).get();
    if (messageDoc.exists) {
      console.log("found entry")
      return messageDoc.data();
    }

    let base64 = await urlContentToDataUri(url);
    const mimeType = mime.lookup(url.split('?')[0]);

    const image = {
      inlineData: {
        data: base64,
        mimeType: mimeType,
      },
    };

    console.log("translating image!")
    const prompt = `What is this image of. Summarize the important details. The entire response should be in the language ${language}.`;
    const result = await model.generateContent([prompt, image])
    const response = result.response;
    const text = response.text();
    const json = { translation: text, explanation: "None" };
    db.collection('translations').doc(index).set(json);
    return { translation: text };
  });

// convert image to base64
async function translate(data, direction) {
  const { messageId, chatId, genderA, ageA, genderB, ageB, descriptionB, language, message } = data;

  // gets the database
  const index = `${chatId}${language}${messageId}`;
  const messageDoc = await db.collection('translations').doc(index).get();
  if (messageDoc.exists) {
    console.log("found entry")
    return messageDoc.data();
  }

  // creates custom prompt
  console.log("translating!");
  const personA = `Person 1's gender is ${genderA} and age is ${ageA}.`;
  const personB = `Person 2's gender is ${genderB} and age is ${ageB}.`;
  const relationship = `Person 1 describes Person 2 as ${descriptionB}.`;
  const translate = `Translate the following into ${language}: ${message}.`;
  const prompt = `${direction} ${personA} ${personB} ${relationship} ${format} ${translate}`;

  const json = await runGemini(prompt);
  db.collection('translations').doc(index).set(json);

  return json;
}

exports.translateTextAtoB = onCall({ cors: true },
  async (request) => {
    const json = await translate(request.data, directionA);
    return json;
  }
);

exports.translateTextBtoA = onCall({ cors: true },
  async (request) => {
    const json = await translate(request.data, directionB);
    return json;
  }
);