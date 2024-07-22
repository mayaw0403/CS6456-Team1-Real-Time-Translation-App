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
var config = require("./Config");

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
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function runGemini(prompt) {
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  const regex = /```json([\s\S]*?)```/;
  const match = text.match(regex);
  const json = JSON.parse(match[1]);

  return json;
}

exports.setProfile = onCall(
  async (request) => {
    const { username, gender, age, language } = request.data;
    db.collection('profiles').doc(username).set({ gender: gender, age: age, language: language });
  });

exports.getProfile = onCall(
  async (request) => {
    const { username } = request.data;
    const messageDoc = await db.collection('profiles').doc(username).get();
    if (messageDoc.exists) {
      return messageDoc.data();
    } else {
      return { gender: "", age: "", language: "" };
    }
  });

exports.setDescription = onCall(
  async (request) => {
    const { chatId, description } = request.data;
    db.collection('descriptions').doc(chatId).set({ description: description });
  });

exports.translateImage = onCall(
  async (request) => {
    const { messageId, chatId, url, language } = request.data;

    try {
      // gets the database
      const index = `${chatId}${language}${messageId}`;
      const messageDoc = await db.collection('translations').doc(index).get();
      if (messageDoc.exists) {
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

      const prompt = `What is this image of. Summarize the important details. The entire response should be in the language ${language}.`;
      const result = await model.generateContent([prompt, image])
      const response = result.response;
      const text = response.text();
      const json = { translation: text, explanation: "None" };
      db.collection('translations').doc(index).set(json);
      return { success: true, translation: text };

    } catch (error) {
      return { success: false, translation: "" };
    }
  });

// convert image to base64
async function translate(messageId, chatId, thisPerson, otherPerson, isOwner, message) {

  const thisProfile = await db.collection('profiles').doc(thisPerson).get();
  const language = thisProfile.exists ? thisProfile.data().language : "en-US";

  // gets the database
  const index = `${chatId}${language}${messageId}`;
  const messageDoc = await db.collection('translations').doc(index).get();
  if (messageDoc.exists) {
    return messageDoc.data();
  }

  const otherProfile = await db.collection('profiles').doc(thisPerson).get();
  const chatDescription = await db.collection('descriptions').doc(`${chatId}`).get();

  const genderA = thisProfile.exists ? thisProfile.data().gender : "unknown";
  const ageA = thisProfile.exists ? thisProfile.data().age : "unknown";
  const genderB = otherProfile.exists ? otherProfile.data().gender : "unknown";
  const ageB = otherProfile.exists ? otherProfile.data().age : "unknown";
  const description = chatDescription.exists ? chatDescription.data().description : "unknown";


  // creates custom prompt
  const direction = `I want to translate a received message from ${otherPerson}.`;
  const personA = `${thisPerson}'s gender is ${genderA} and age is ${ageA}. `;
  const personB = `${otherPerson}'s gender is ${genderB} and age is ${ageB}. `;
  const relationship = isOwner ?
    `${thisPerson} describes ${otherPerson} as ${description}. ` :
    `${otherPerson} describes ${thisPerson} as ${description}. `;
  const field1 = `Field translation should contain a translation into ${language}`;
  const field2 = `Field explanation should contain an explanations written in ${language} for anything that may not have direct translations`;
  const format = `Use the json format to respond. ${field1} ${field2}`;
  const translate = `Translate the following message: ${message}.`;
  const prompt = `${direction} ${personA} ${personB} ${relationship} ${format} ${translate}`;

  const json = await runGemini(prompt);
  db.collection('translations').doc(index).set(json);

  return json;
}

exports.translateText = onCall(
  async (request) => {

    const { messageId, chatId, thisPerson, otherPerson, isOwner, message } = request.data;

    try {
      const json = await translate(messageId, chatId, thisPerson, otherPerson, isOwner, message);
      return { success: true, translation: json.translation, explanation: json.explanation };
    } catch (error) {
      return { success: false, translation: "", explanation: "" };
    }
  }
);
