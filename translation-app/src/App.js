import { ChatEngine } from "react-chat-engine";

import ChatFeed from "./components/ChatFeed";
import LoginForm from "./components/LoginForm";
import OptionsSettings from "./components/ChatOptions";
import ChatSettings from "./components/ChatSettings";
import ChatList from "./components/ChatList";
import "./App.css";

const projectID = "5e8be1ce-98b7-404a-838f-823e9670f22b";

const App = () => {
    if (!localStorage.getItem("username")) return <LoginForm />;

    return (
        <ChatEngine
            height="100vh"
            projectID={projectID}
            userName={localStorage.getItem("username")}
            userSecret={localStorage.getItem("password")}
            onNewMessage={() =>
                new Audio(
                    "https://chat-engine-assets.s3.amazonaws.com/click.mp3"
                ).play()
            }
            renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
            renderChatSettings={(chatAppState) => (
                <ChatSettings {...chatAppState} />
            )}
            renderChatList={(chatAppProps) => <ChatList {...chatAppProps} />}
            renderOptionsSettings={(creds, chat) => <OptionsSettings />}
        />
    );
};

// infinite scroll, logout, more customizations...

export default App;
