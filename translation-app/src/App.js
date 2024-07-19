import { ChatEngine } from "react-chat-engine";
import { useState } from "react";
import ChatFeed from "./components/ChatFeed";
import LoginForm from "./components/LoginForm";
import OptionsSettings from "./components/ChatOptions";
import ChatSettings from "./components/ChatSettings";
import ChatList from "./components/ChatList";
import NavBar from "./components/NavBar";
import UserSettings from "./components/UserSettings";

import "./App.css";

const projectID = "5e8be1ce-98b7-404a-838f-823e9670f22b";
const NavOptions = {
    CHAT: "chat",
    SETTINGS: "settings",
};
const App = () => {
    const [selected, setSelected] = useState(NavOptions.SETTINGS);
    if (!localStorage.getItem("username")) return <LoginForm />;

    return (
        <div style={styles.container}>
            <NavBar selected={selected} onSelect={setSelected} />
            <div style={styles.content}>
                {selected === NavOptions.CHAT && (
                    <ChatEngine
                        height="100vh"
                        width="100%"
                        projectID={projectID}
                        userName={localStorage.getItem("username")}
                        userSecret={localStorage.getItem("password")}
                        onNewMessage={() =>
                            new Audio(
                                "https://chat-engine-assets.s3.amazonaws.com/click.mp3"
                            ).play()
                        }
                        renderChatFeed={(chatAppProps) => (
                            <ChatFeed {...chatAppProps} />
                        )}
                        renderChatSettings={(chatAppState) => (
                            <ChatSettings {...chatAppState} />
                        )}
                        renderChatList={(chatAppProps) => (
                            <ChatList {...chatAppProps} />
                        )}
                        renderOptionsSettings={(creds, chat) => (
                            <OptionsSettings />
                        )}
                    />
                )}
                {selected === NavOptions.SETTINGS && (
                    <div style={styles.settings}>
                        <UserSettings />
                    </div>
                )}
            </div>
        </div>
    );
};

// infinite scroll, logout, more customizations...

export default App;

const styles = {
    container: {
        display: "flex",
        height: "100vh",
        width: "100vw",
    },
    content: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
    },
    settings: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "auto",
        padding: "20px",
        boxSizing: "border-box",
    },
};
