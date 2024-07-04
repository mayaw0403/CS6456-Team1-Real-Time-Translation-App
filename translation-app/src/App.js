import { ChatEngine } from 'react-chat-engine';

import ChatFeed from './components/ChatFeed';
import LoginForm from './components/LoginForm';
import './App.css';

const projectID = 'f9be336d-56b8-4e3d-b4e2-9b58157fd2ad';

const App = () => {
	if (!localStorage.getItem('username')) return <LoginForm />;

	return (
		<ChatEngine
			height="100vh"
			projectID={projectID}
			userName={localStorage.getItem('username')}
			userSecret={localStorage.getItem('password')}
			onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}

			// Render Custom Components
			// renderChatList={(chatAppState) => {}}
			// renderChatCard={(chat, index) => {}}
			// renderNewChatForm={(creds) => {}}
			renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
		// renderChatHeader={(chat) => {}}
		// renderMessageBubble={(creds, chat, lastMessage, message, nextMessage) => {}}
		// renderIsTyping={(typers) => {}}
		// renderNewMessageForm={(creds, chatId) => {}}
		// renderChatSettings={(chatAppState) => {}}
		// renderChatSettingsTop={(creds, chat) => {}}
		// renderPeopleSettings={(creds, chat) => {}}
		// renderPhotosSettings={(chat) => {}}
		// renderOptionsSettings={(creds, chat) => {}}
		/>
	);
};

// infinite scroll, logout, more customizations...

export default App;