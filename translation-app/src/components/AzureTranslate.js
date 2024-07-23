import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AzureTranslation = ({ message, language }) => {

  const [translation, setTranslation] = useState('');
  const handleClick = (event) => {
    event.stopPropagation();
  };

  useEffect(() => {
    const fetchTranslation = async () => {
      if (message) {
        try {
          const response = await axios.get(`https://api.mymemory.translated.net/get?q=${message.text}&langpair=en-GB|${language}`);
          console.log('Translation response:', response.data);
          setTranslation(response.data.responseData.translatedText);
        } catch (error) {
          console.error('Error translating message:', error);
        }
      }
    };

    fetchTranslation();
  }, [message]);

  return (
    <div className="message-row" onClick={handleClick}>
      <div className="translation">
        {translation || 'Translating...'}
      </div>
    </div>
  );
};

export default AzureTranslation;