import { ChatEngine } from 'react-chat-engine';

import ChatFeed from './components/ChatFeed';
import LoginForm from './components/LoginForm';
import OptionsSettings from './components/ChatOptions';
import ChatSettings from './components/ChatSettings';
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
			renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
            renderChatSettings={(chatAppState) => <ChatSettings {...chatAppState} />}
			// renderOptionsSettings={(creds, chat) => <OptionsSettings />}
		/>
	);
};

// infinite scroll, logout, more customizations...

export default App;