import React, { useState } from 'react';
import { translate } from './translate'; // Adjust import path based on your project structure

const TranslateComponent = () => {
  const [word, setWord] = useState('hello'); // Default word to translate
  const [targetLanguage, setTargetLanguage] = useState('es'); // Default target language (Spanish)

  const handleTranslate = () => {
    const translatedWord = translate(word.toLowerCase(), targetLanguage); // Ensure word is lowercased for consistency
    console.log(translatedWord); // Check translated word in console
  };

  const handleWordChange = (e) => {
    setWord(e.target.value); // Update word state based on user input
  };

  const handleLanguageChange = (e) => {
    setTargetLanguage(e.target.value); // Update target language state based on dropdown selection
  };

  return (
    <div>
      <label htmlFor="wordInput">Word to Translate:</label>
      <input type="text" id="wordInput" value={word} onChange={handleWordChange} />
      
      <label htmlFor="languageSelect">Select Language:</label>
      <select id="languageSelect" value={targetLanguage} onChange={handleLanguageChange}>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
      </select>
      
      <button onClick={handleTranslate}>Translate</button>
    </div>
  );
};

export default TranslateComponent;
