import React, { useState, } from "react";
import languages from './languages';
import { firebaseConfig } from "./Config"

import { getFunctions, httpsCallable } from "firebase/functions";
import { initializeApp } from "firebase/app";
import { connectFunctionsEmulator } from "firebase/functions";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);
connectFunctionsEmulator(functions, '127.0.0.1', 5001);
const setProfile = httpsCallable(functions, "setProfile");

const UserSettings = () => {
    const [gender, setGender] = useState(localStorage.getItem("gender") || "");
    const [age, setAge] = useState(localStorage.getItem("age") || "");
    const [language, setLanguage] = useState(localStorage.getItem("language") || "en-GB");
    const username = localStorage.getItem("username");

    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };

    const handleAgeChange = (e) => {
        setAge(e.target.value);
    };

    const handleSubmit = () => {
        localStorage.setItem("gender", gender);
        localStorage.setItem("age", age);
        localStorage.setItem("language", language);
        
        setProfile({username: localStorage.getItem("username"), gender: gender, age: age, language: language});
    };

    return (
        <div style={styles.content}>
            <h2>User Settings</h2>
            <h3 style={{ color: "#3e435d" }}>Welcome, {username}</h3>

            <form style={styles.form}>
                <label style={styles.label}>
                    Gender
                    <select
                        style={styles.input}
                        value={gender}
                        onChange={handleGenderChange}
                    >
                        <option value="" disabled>
                            Select
                        </option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                    </select>
                </label>
                <label style={styles.label}>
                    Age
                    <input
                        style={styles.input}
                        type="number"
                        value={age}
                        onChange={handleAgeChange}
                    />
                </label>
                <label style={styles.label}>
                    Language
                    <select className='dropdown'
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        style={styles.input}
                    >
                        {Object.keys(languages).map((lang) => (
                            <option key={lang} value={lang}>
                                {languages[lang]}
                            </option>
                        ))}
                    </select>
                </label>
            </form>
            <div>
                <button onClick={handleSubmit} style={styles.submit}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default UserSettings;

const styles = {
    content: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#eef6fb",
        padding: "20px",
        borderRadius: "5px",
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
        width: "700px",
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
        transition: "background-color 0.3s ease",
    },
};
