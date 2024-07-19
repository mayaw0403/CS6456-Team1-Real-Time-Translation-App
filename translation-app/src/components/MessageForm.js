import { useEffect, useState } from 'react';
import { SendOutlined, PictureOutlined, AudioOutlined, AudioFilled } from '@ant-design/icons';
import { sendMessage, isTyping } from 'react-chat-engine';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const MessageForm = (props) => {
  const [value, setValue] = useState('');
  const { chatId, creds } = props;

  const language = 'ru';

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    setValue(transcript)
  }, [transcript]);

  const handleVoice = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      setValue(transcript);
    } else {
      SpeechRecognition.startListening({ language: language });
    }
  }

  const handleChange = (event) => {
    setValue(event.target.value);
    isTyping(props, chatId);
  };

  const handleSubmit = (event) => {
    console.log("here")
    SpeechRecognition.stopListening();
    resetTranscript();

    event.preventDefault();
    const text = value.trim();
    if (text.length > 0) {
      sendMessage(creds, chatId, { text });
    }
    setValue('');
  };

  const handleUpload = (event) => {
    sendMessage(creds, chatId, { files: event.target.files, text: '' });
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        className="message-input"
        placeholder="Send a message..."
        value={value}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <label htmlFor="upload-button">
        <span className="image-button">
          <PictureOutlined className="picture-icon" />
        </span>
      </label>
      <input
        type="file"
        multiple={false}
        id="upload-button"
        style={{ display: 'none' }}
        onChange={handleUpload.bind(this)}
      />
      {browserSupportsSpeechRecognition &&
        <button type="button" onClick={handleVoice} className="send-button">
          {
            listening ? <AudioFilled className="speech-icon" /> : <AudioOutlined className="speech-icon" />
          }
        </button>
      }
      <button type="submit" className="send-button">
        <SendOutlined className="send-icon" />
      </button>
    </form>
  );
};

export default MessageForm;