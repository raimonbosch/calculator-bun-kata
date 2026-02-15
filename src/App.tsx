import React, { useState } from "react";

export function App() {
    const [text, setText] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const endpoint = "http://localhost:3000/api/calculator"; // <-- change this

    const handleButtonClick = (value: string) => {
        if (value === "C") {
            setText("");
        } else {
            setText((prev) => prev + value);
        }
    };

    const handleSubmit = async () => {
        if (!text.trim()) return;

        setLoading(true);
        setResponse("");

        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content: text }),
            });

            const data = await res.json();
            setResponse(JSON.stringify(data, null, 2));
        } catch (err) {
            if (err instanceof Error) {
                setResponse("Error: " + err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.calculator}>
        <textarea
            style={styles.display}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter content..."
        />

                <div style={styles.grid}>
                    {["7","8","9",
                        "4","5","6",
                        "1","2","3",
                        "0",".","C"].map((btn) => (
                        <button
                            key={btn}
                            style={styles.button}
                            onClick={() => handleButtonClick(btn)}
                        >
                            {btn}
                        </button>
                    ))}

                    <button
                        style={{ ...styles.button, ...styles.sendButton }}
                        onClick={handleSubmit}
                    >
                        {loading ? "..." : "SEND"}
                    </button>
                </div>

                {response && (
                    <pre style={styles.response}>
            {response}
          </pre>
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1e1e1e",
    },
    calculator: {
        backgroundColor: "#2d2d2d",
        padding: "20px",
        borderRadius: "20px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
        width: "320px",
    },
    display: {
        width: "100%",
        height: "80px",
        marginBottom: "15px",
        fontSize: "18px",
        padding: "10px",
        borderRadius: "10px",
        border: "none",
        resize: "none",
        backgroundColor: "#000",
        color: "#0f0",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "10px",
    },
    button: {
        padding: "15px",
        fontSize: "18px",
        borderRadius: "12px",
        border: "none",
        cursor: "pointer",
        backgroundColor: "#444",
        color: "white",
        transition: "0.2s",
    },
    sendButton: {
        gridColumn: "span 3",
        backgroundColor: "#ff9500",
        fontWeight: "bold",
    },
    response: {
        marginTop: "15px",
        backgroundColor: "#111",
        color: "#0f0",
        padding: "10px",
        borderRadius: "10px",
        fontSize: "12px",
        maxHeight: "150px",
        overflowY: "auto",
    },
};

export default App;
