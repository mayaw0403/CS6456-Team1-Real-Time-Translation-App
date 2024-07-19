import { ChatEngine } from 'react-chat-engine';

import ChatFeed from './components/ChatFeed';
import LoginForm from './components/LoginForm';
import OptionsSettings from './components/ChatOptions';
import ChatSettings from './components/ChatSettings';
import './App.css';

const projectID = 'b34fc922-e972-4a15-8691-3aab22e55aa3';

const App = () => {
	if (!localStorage.getItem('username')) return <LoginForm />;

	return (
		<ChatEngine
			height="100vh"
			projectID={projectID}
			userName={localStorage.getItem('username')}
			userSecret={localStorage.getItem('password')}
			onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
			renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
            renderChatSettings={(chatAppState) => <ChatSettings {...chatAppState} />}
			// renderOptionsSettings={(creds, chat) => <OptionsSettings />}
		/>
	);
};

// infinite scroll, logout, more customizations...

export default App;