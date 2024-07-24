import React, { useContext, useEffect, useState, useRef } from "react";
import { ChatEngineContext } from "react-chat-engine";
import SettingsBlock from "./SettingsBlock";
import { firebaseConfig } from "./Config"
import { getFunctions, httpsCallable } from "firebase/functions";
import { initializeApp } from "firebase/app";
import { connectFunctionsEmulator } from "firebase/functions";
import TextareaAutosize from 'react-textarea-autosize';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);
// connectFunctionsEmulator(functions, '127.0.0.1', 5001);
const fireSetDescription = httpsCallable(functions, "setDescription");
const fireGetDescription = httpsCallable(functions, "getDescription");

const OptionsSettings = () => {
    const { conn, chats, activeChat } = useContext(ChatEngineContext);
    const chat = chats && chats[activeChat];


    const [description, setDescription] = useState("");
    const [saved, setSaved] = useState(false);

    const timeoutIdRef = useRef();

    const handleChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = (e) => {
        fireSetDescription({ chatId: activeChat, description: description });
        setSaved(true);
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = setTimeout(() => {
            setSaved(false);
        }, 3000);
    };

    useEffect(() => {
        async function fetchData() {
            const resp = await fireGetDescription({ chatId: activeChat });
            setDescription(resp.data.description);
        }

        fetchData();
    }, [activeChat]);

    if (!chat || !conn || conn === null) return <></>;

    return (
        <div style={{ borderTop: "1px solid #f0f0f0" }}>
            <SettingsBlock id="ce-options-drop-down" label="AI Customization">
                <div>
                    <div style={{ height: "8px" }} />
                    <div style={{ paddingBottom: "10px" }}>

                        <label style={styles.label}>
                            Optional: Describe how you know this person
                            <TextareaAutosize
                                maxRows={5}
                                defaultValue="Just a single line..."
                                style={styles.input}
                                onChange={handleChange}
                                value={description}
                            />
                        </label>
                        <div style={styles.center}>
                            <button onClick={handleSubmit} style={styles.submit}>
                                {saved ? "Saved!" : "Submit"}
                            </button>
                        </div>
                    </div>
                </div>
            </SettingsBlock>
        </div>
    );
};

export default OptionsSettings;

const styles = {
    content: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#eef6fb",
        padding: "20px",
        borderRadius: "20px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        overflow: "auto",
        height: "100%",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        margin: "3rem",
        borderColor: "none",
    },
    label: {
        display: "flex",
        flexDirection: "column",
        fontFamily: "Avenir",
        margin: "1rem",
        gap: "1rem",
    },
    input: {
        fontFamily: "Avenir",
        fontSize: "1rem",
        padding: "5px",
        marginLeft: "5px",
        backgroundColor: "#f9f9f9",
        borderColor: "none",
        borderRadius: "8px",
        border: "none",
        height: "53px",
    },
    submit: {
        color: "white",
        backgroundColor: "#6e00ff",
        fontFamily: "Avenir",
        fontSize: "1rem",
        borderRadius: "8px",
        border: "none",
        width: "8rem",
        height: "3rem",
        transition: "background-color 0.10s ease",
    },
    row: {
        display: "flex",
        flexDirection: "row",
    },
    column: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
    },
    center: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
};
