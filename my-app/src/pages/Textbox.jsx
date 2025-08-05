import { useState } from "react";

const Text = () => {
  const [inputText, setInputText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const upperCaseText = inputText.toUpperCase(); // Convert to uppercase

    console.log("Submitted text:", upperCaseText);

    const result = await fetch("http://localhost:3000/send-test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: upperCaseText }),
    });

    console.log(result);
  };

  const handleChange = (e) => {
    // Always keep inputText in uppercase
    setInputText(e.target.value.toUpperCase());
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor="inputText" style={styles.label}>
          Enter Text:
        </label>
        <input
          type="text"
          id="inputText"
          name="inputText"
          value={inputText}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f0f2f5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  form: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  label: {
    display: "block",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
    textTransform: "uppercase", // Makes typed text appear uppercase in UI
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Text;
