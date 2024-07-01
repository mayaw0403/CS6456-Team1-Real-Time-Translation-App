import React, { useState } from 'react';
import ChatBox from './components/ChatBox';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <div className="App">
      <ChatBox messages={messages} addMessage={addMessage} />
    </div>
  );
}

export default App;