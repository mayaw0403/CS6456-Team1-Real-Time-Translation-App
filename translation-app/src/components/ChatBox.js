import React, { useState } from 'react';
import { translate } from './translate';

function ChatBox({ messages, addMessage }) {
  const [input, setInput] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('en');

  const handleSend = () => {
    if (input.trim()) {
      const translatedText = translate(input, targetLanguage);
      addMessage({ text: input, translated: translatedText });
      setInput('');
    }
  };

  return (
    <div className="ChatBox">
      <div className="Messages">
        {messages.map((msg, index) => (
          <div key={index} className="Message">
            <p><strong>Original:</strong> {msg.text}</p>
            <p><strong>Translated:</strong> {msg.translated}</p>
          </div>
        ))}
      </div>
      <div className="InputArea">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message"
        />
        <select
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          {/* Add more languages as needed */}
        </select>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatBox;