import React, { useState, useRef, useEffect } from "react";

const UserSettings = () => {
    const [openUserSettings, setOpenUserSettings] = useState(false);
    const settingsRef = useRef(null);
    const [gender, setGender] = useState();
    const [age, setAge] = useState();

    const handleOpenSettings = () => {
        setOpenUserSettings(true);
    };

    const handleCloseSettings = () => {
        setOpenUserSettings(false);
    };

    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };

    const handleAgeChange = (e) => {
        setAge(e.target.value);
    };

    useEffect(() => {
        localStorage.setItem("gender", gender);
    }, [gender]);

    useEffect(() => {
        localStorage.setItem("age", age);
    }, [age]);

    return (
        <div className="user-settings-container">
            <button
                onClick={handleOpenSettings}
                className="user-settings-btn button-color"
            >
                Settings
            </button>
            {openUserSettings && (
                <div style={styles.modalContainer}>
                    <div ref={settingsRef} style={styles.content}>
                        <h2>User Settings</h2>
                        <form style={styles.form}>
                            <label style={styles.label}>
                                Gender:
                                <select
                                    style={styles.input}
                                    onChange={handleGenderChange}
                                >
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                </select>
                            </label>
                            <label style={styles.label}>
                                Age:
                                <input
                                    type="number"
                                    value={age}
                                    onChange={handleAgeChange}
                                    style={styles.input}
                                />
                            </label>
                        </form>
                        <button
                            className="button-color logout-btn"
                            onClick={handleCloseSettings}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserSettings;

const styles = {
    modalContainer: {
        position: "fixed",
        inset: "0",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    content: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "5px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        maxWidth: "80%",
        maxHeight: "80%",
        overflow: "auto",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        margin: "3rem",
    },
    label: {
        fontFamily: "Avenir",
        margin: "1rem",
    },
    input: {
        fontFamily: "Avenir",
        fontSize: "1rem",
        padding: "5px",
        marginLeft: "5px",
    },
};
