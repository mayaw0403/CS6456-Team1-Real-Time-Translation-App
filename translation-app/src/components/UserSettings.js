import React, { useState, useMemo } from "react";
import countryList from "react-select-country-list";

const UserSettings = () => {
    const username = localStorage.getItem("username");
    const countryOptions = useMemo(() => countryList().getData(), []);
    const [gender, setGender] = useState(localStorage.getItem("gender") || "");
    const [age, setAge] = useState(localStorage.getItem("age") || "");
    const [country, setCountry] = useState(
        localStorage.getItem("country") || ""
    );

    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };

    const handleAgeChange = (e) => {
        setAge(e.target.value);
    };

    const handleCountryChange = (e) => {
        setCountry(e.target.value);
    };

    const handleSubmit = () => {
        localStorage.setItem("gender", gender);
        localStorage.setItem("age", age);
        localStorage.setItem("country", country);
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
                    Country
                    <select
                        style={styles.input}
                        value={country}
                        onChange={handleCountryChange}
                    >
                        <option value="" disabled>
                            Select
                        </option>
                        {countryOptions.map((country, index) => (
                            <option key={index} value={country.label}>
                                {country.label}
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
        transition: "background-color 0.10s ease",
    },
};
