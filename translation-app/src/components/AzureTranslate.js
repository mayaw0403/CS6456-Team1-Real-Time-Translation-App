import React, { useState, useEffect } from 'react';
import axios from 'axios';
import languages from './languages'; // Import languages

const Translation = ({ message, lastMessage, defaultLanguage }) => {

    const isFirstMessageByUser = !lastMessage || lastMessage.sender.username !== message.sender.username;
  const [translation, setTranslation] = useState('');
  const [language, setLanguage] = useState(defaultLanguage); // Default language to German

  useEffect(() => {
    const fetchTranslation = async () => {
      if (message && language) {
        try {
          const response = await axios.get(`https://api.mymemory.translated.net/get?q=${message.text}&langpair=en|${language}`);
          console.log('Translation response:', response.data);
          setTranslation(response.data.responseData.translatedText);
        } catch (error) {
          console.error('Error translating message:', error);
        }
      }
    };

    fetchTranslation();
  }, [message, language]);

  return (
    <div>
      <div>
        <select className='dropdown' value={language} onChange={(e) => setLanguage(e.target.value)}>
          {Object.keys(languages).map((lang) => (
            <option key={lang} value={lang}>
              {languages[lang]}
            </option>
          ))}
        </select>
      </div>
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
            {translation || 'Translating...'}
          </div>
        )}
    </div>
    </div>
  );
};

export default Translation;
