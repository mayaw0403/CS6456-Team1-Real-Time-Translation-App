import { useState } from "react";
import axios from "axios";
import { projectID } from "./Config"
import person from "../person-login.png";
import logo from "../logo.png";

const Modal = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const authObject = {
            "Project-ID": projectID,
            "User-Name": username,
            "User-Secret": password,
        };

        try {
            await axios.get("https://api.chatengine.io/chats", {
                headers: authObject,
            });

            localStorage.setItem("username", username);
            localStorage.setItem("password", password);

            window.location.reload();
            setError("");
        } catch (err) {
            setError("Oops, incorrect credentials.");
        }
    };

    return (
        <div className="wrapper">
            <img src={person} width={"250px"} alt="ellipse"></img>
            <div className="form">
                <div style={styles.intro}>
                    <h1 className="title" style={{ fontWeight: "bold" }}>
                        LinguaLink
                    </h1>
                    <p className="subtitle">
                        Sign in to continue your progress!
                    </p>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input"
                        placeholder="Username"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input"
                        placeholder="Password"
                        required
                    />
                    <div align="center">
                        <button type="submit" className="button">
                            <span>Start chatting</span>
                        </button>
                    </div>
                </form>
                <h1>{error}</h1>
            </div>
        </div>
    );
};

export default Modal;

const styles = {
    intro: {
        margin: "1rem",
    },
};
