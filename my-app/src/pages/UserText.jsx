import { useState } from "react";

const Text = () => {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setIsLoading(true);
    
    const upperCaseText = inputText.toUpperCase();
    console.log("Submitted text:", upperCaseText);

    try {
      const result = await fetch("http://localhost:3000/send-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: upperCaseText }),
      });
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setInputText(e.target.value.toUpperCase());
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Arial', sans-serif;
        }

        .text-page-container {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          position: relative;
        }

        .text-page-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #2d3748;
          backdrop-filter: blur(1px);
        }

        .text-form-wrapper {
          background: rgba(255, 255, 255, 0.95);
          padding: 40px;
          border-radius: 20px;
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.15),
            0 10px 20px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          max-width: 500px;
          width: 100%;
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          animation: slideUp 0.8s ease-out;
        }

        .text-form-wrapper:hover {
          transform: translateY(-5px);
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.2),
            0 15px 30px rgba(0, 0, 0, 0.15);
        }

        .text-form-title {
          text-align: center;
          margin-bottom: 30px;
          color: #333;
          font-size: 28px;
          font-weight: bold;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .text-form-title .highlight {
          color: #667eea;
          text-shadow: 0 0 10px rgba(102, 126, 234, 0.3);
        }

        .text-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .text-form-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #555;
          font-size: 16px;
          letter-spacing: 0.5px;
        }

        .text-form-input {
          width: 100%;
          padding: 15px 20px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
          background: rgba(255, 255, 255, 0.9);
          color: #333;
          transition: all 0.3s ease;
          outline: none;
        }

        .text-form-input::placeholder {
          color: #999;
          font-weight: 400;
        }

        .text-form-input:focus {
          border-color: #667eea;
          box-shadow: 
            0 0 0 3px rgba(102, 126, 234, 0.1),
            0 8px 16px rgba(102, 126, 234, 0.15);
          background: rgba(255, 255, 255, 1);
          transform: translateY(-2px);
          animation: glow 2s infinite alternate;
        }

        .text-form-input:hover {
          border-color: #888;
          background: rgba(255, 255, 255, 1);
        }

        .text-submit-button {
          padding: 15px 30px;
          font-size: 18px;
          font-weight: 600;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
          position: relative;
          overflow: hidden;
        }

        .text-submit-button:disabled {
          opacity: 0.8;
          cursor: not-allowed;
        }

        .text-submit-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .text-submit-button:hover:not(:disabled)::before {
          left: 100%;
        }

        .text-submit-button:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 12px 24px rgba(102, 126, 234, 0.4);
          background: linear-gradient(135deg, #7c8cea 0%, #8659b2 100%);
        }

        .text-submit-button:active:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 12px rgba(102, 126, 234, 0.3);
        }

        .text-submit-button.loading::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 20px;
          height: 20px;
          margin: -10px 0 0 -10px;
          border: 2px solid transparent;
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glow {
          from {
            box-shadow: 
              0 0 0 3px rgba(102, 126, 234, 0.1),
              0 8px 16px rgba(102, 126, 234, 0.15);
          }
          to {
            box-shadow: 
              0 0 0 3px rgba(102, 126, 234, 0.2),
              0 8px 16px rgba(102, 126, 234, 0.25);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .text-page-container {
            padding: 15px;
          }
          
          .text-form-wrapper {
            padding: 30px 20px;
            border-radius: 15px;
          }
          
          .text-form-title {
            font-size: 24px;
            margin-bottom: 25px;
          }
          
          .text-form-input {
            padding: 12px 15px;
            font-size: 14px;
          }
          
          .text-submit-button {
            padding: 12px 25px;
            font-size: 16px;
          }
        }

        @media (max-width: 480px) {
          .text-form-wrapper {
            padding: 25px 15px;
          }
          
          .text-form-title {
            font-size: 22px;
          }
          
          .text-form-input {
            padding: 10px 12px;
          }
          
          .text-submit-button {
            padding: 10px 20px;
            font-size: 14px;
          }
        }
      `}</style>
      
      <div className="text-page-container">
        <div className="text-form-wrapper">
          <h2 className="text-form-title">
            <span className="highlight">SonicGlow</span> Text Input
          </h2>
          <div className="text-form">
            <label htmlFor="inputText" className="text-form-label">
              Enter Text for LED Display:
            </label>
            <input
              type="text"
              id="inputText"
              name="inputText"
              value={inputText}
              onChange={handleChange}
              required
              className="text-form-input"
              placeholder="TYPE YOUR MESSAGE HERE..."
            />
            <button 
              type="button" 
              onClick={handleSubmit}
              className={`text-submit-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send to Cube'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Text;