import { useState } from "react";

const Predefined = () => {
  const [selectedPattern, setSelectedPattern] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Define available patterns
  const patterns = [
   { id: 0, name: "Rain Effect", description: "Falling droplets animation" },
{ id: 1, name: "Snake", description: "Moving snake pattern" },
{ id: 2, name: "Pingpong", description: "Bouncing back and forth pattern" },
{ id: 3, name: "Fireworks", description: "Random bursts of light" },
{ id: 4, name: "Breathing", description: "Fade in/out effect" },
{ id: 5, name: "Countdown", description: "Countdown timer display" },
{ id: 6, name: "Random Sparkle", description: "Random LED twinkle" },
{ id: 7, name: "Spiral", description: "Rotating spiral pattern" },
{ id: 8, name: "Wave", description: "Sine wave animation" },
{ id: 9, name: "Cube Rotate", description: "Rotating cube outline" }
  ];

  const handleSubmit = async () => {
    if (!selectedPattern) {
      alert("Please select a pattern first!");
      return;
    }

    setIsLoading(true);
    
    try {
      console.log("Sending pattern:", selectedPattern);
      
      const data = {
        pattern: parseInt(selectedPattern),
        timestamp: Date.now()
      };

      const result = await fetch("http://localhost:3000/send-pattern", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (result.ok) {
        const response = await result.json();
        console.log("Pattern sent successfully:", response);
        alert(`Pattern ${selectedPattern} sent to cube!`);
      } else {
        throw new Error(`HTTP error! status: ${result.status}`);
      }
    } catch (error) {
      console.error("Error sending pattern:", error);
      alert("Failed to send pattern to cube. Please check connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePatternChange = (e) => {
    setSelectedPattern(e.target.value);
  };

  const selectedPatternInfo = patterns.find(p => p.id === parseInt(selectedPattern));

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

        .predefined-container {
          background: linear-gradient(to bottom, #1b1430, #0b172cff);
          min-height: 100vh;
          padding: 20px;
          position: relative;
        }

        .predefined-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #2d3748;
          backdrop-filter: blur(1px);
        }

        .predefined-form-container {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          animation: slideUp 0.8s ease-out;
        }

        .predefined-title {
          text-align: center;
          color: white;
          margin-bottom: 30px;
          font-size: 32px;
          font-weight: bold;
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }

        .predefined-title .highlight {
          color: #ffd700;
          text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
        }

        .predefined-form {
          background: rgba(255, 255, 255, 0.95);
          padding: 30px;
          border-radius: 20px;
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.15),
            0 10px 20px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          margin-bottom: 30px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .predefined-form:hover {
          transform: translateY(-5px);
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.2),
            0 15px 30px rgba(0, 0, 0, 0.15);
        }

        .predefined-label {
          display: block;
          margin-bottom: 10px;
          font-weight: 600;
          font-size: 16px;
          color: #555;
          letter-spacing: 0.5px;
        }

        .predefined-select {
          width: 100%;
          padding: 15px 20px;
          margin-bottom: 20px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          font-size: 16px;
          background: rgba(255, 255, 255, 0.9);
          cursor: pointer;
          transition: all 0.3s ease;
          outline: none;
        }

        .predefined-select:focus {
          border-color: #667eea;
          box-shadow: 
            0 0 0 3px rgba(102, 126, 234, 0.1),
            0 8px 16px rgba(102, 126, 234, 0.15);
          background: rgba(255, 255, 255, 1);
          transform: translateY(-2px);
        }

        .predefined-select:hover {
          border-color: #888;
          background: rgba(255, 255, 255, 1);
        }

        .predefined-pattern-info {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 20px;
          border: 1px solid rgba(102, 126, 234, 0.2);
          backdrop-filter: blur(5px);
        }

        .predefined-pattern-name {
          margin: 0 0 8px 0;
          color: #667eea;
          font-size: 20px;
          font-weight: bold;
        }

        .predefined-pattern-description {
          margin: 0;
          color: #666;
          font-size: 14px;
          line-height: 1.5;
        }

        .predefined-button {
          width: 100%;
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

        .predefined-button:disabled {
          opacity: 0.8;
          cursor: not-allowed;
        }

        .predefined-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .predefined-button:hover:not(:disabled)::before {
          left: 100%;
        }

        .predefined-button:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 12px 24px rgba(102, 126, 234, 0.4);
          background: linear-gradient(135deg, #7c8cea 0%, #8659b2 100%);
        }

        .predefined-button.loading::after {
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

        .predefined-pattern-grid {
          background: rgba(255, 255, 255, 0.95);
          padding: 30px;
          border-radius: 20px;
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.15),
            0 10px 20px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .predefined-pattern-grid:hover {
          transform: translateY(-5px);
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.2),
            0 15px 30px rgba(0, 0, 0, 0.15);
        }

        .predefined-grid-title {
          margin-bottom: 20px;
          color: #333;
          text-align: center;
          font-size: 24px;
          font-weight: bold;
        }

        .predefined-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }

        .predefined-pattern-card {
          padding: 20px;
          border: 2px solid rgba(224, 224, 224, 0.8);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: rgba(250, 250, 250, 0.8);
          text-align: center;
          backdrop-filter: blur(5px);
        }

        .predefined-pattern-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 16px rgba(102, 126, 234, 0.2);
          border-color: rgba(102, 126, 234, 0.5);
        }

        .predefined-selected-card {
          border-color: #667eea;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
          transform: scale(1.02);
          box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
        }

        .predefined-pattern-number {
          font-size: 28px;
          font-weight: bold;
          color: #667eea;
          margin-bottom: 8px;
          text-shadow: 0 2px 4px rgba(102, 126, 234, 0.2);
        }

        .predefined-card-name {
          font-size: 16px;
          font-weight: bold;
          color: #333;
          margin-bottom: 5px;
        }

        .predefined-card-description {
          font-size: 12px;
          color: #666;
          line-height: 1.4;
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

        /* Responsive Design */
        @media (max-width: 768px) {
          .predefined-container {
            padding: 15px;
          }
          
          .predefined-form, .predefined-pattern-grid {
            padding: 20px;
            border-radius: 15px;
          }
          
          .predefined-title {
            font-size: 28px;
            margin-bottom: 25px;
          }
          
          .predefined-select {
            padding: 12px 15px;
            font-size: 14px;
          }
          
          .predefined-button {
            padding: 12px 25px;
            font-size: 16px;
          }

          .predefined-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 12px;
          }
        }

        @media (max-width: 480px) {
          .predefined-form, .predefined-pattern-grid {
            padding: 15px;
          }
          
          .predefined-title {
            font-size: 24px;
          }
          
          .predefined-select {
            padding: 10px 12px;
          }
          
          .predefined-button {
            padding: 10px 20px;
            font-size: 14px;
          }
        }
      `}</style>
      
      <div className="predefined-container">
        <div className="predefined-form-container">
          <h2 className="predefined-title">
            <span className="highlight">SonicGlow</span> Pattern Control
          </h2>
          
          <div className="predefined-form">
            <label htmlFor="patternSelect" className="predefined-label">
              Select Pattern:
            </label>
            
            <select
              id="patternSelect"
              name="patternSelect"
              value={selectedPattern}
              onChange={handlePatternChange}
              className="predefined-select"
              disabled={isLoading}
            >
              <option value="">-- Choose a Pattern --</option>
              {patterns.map((pattern) => (
                <option key={pattern.id} value={pattern.id}>
                  {pattern.id}. {pattern.name}
                </option>
              ))}
            </select>

            {selectedPatternInfo && (
              <div className="predefined-pattern-info">
                <h4 className="predefined-pattern-name">{selectedPatternInfo.name}</h4>
                <p className="predefined-pattern-description">{selectedPatternInfo.description}</p>
              </div>
            )}

            <button 
              onClick={handleSubmit}
              className={`predefined-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send to Cube"}
            </button>
          </div>

          <div className="predefined-pattern-grid">
            <h3 className="predefined-grid-title">Available Patterns:</h3>
            <div className="predefined-grid">
              {patterns.map((pattern) => (
                <div 
                  key={pattern.id} 
                  className={`predefined-pattern-card ${
                    parseInt(selectedPattern) === pattern.id ? 'predefined-selected-card' : ''
                  }`}
                  onClick={() => setSelectedPattern(pattern.id.toString())}
                >
                  <div className="predefined-pattern-number">{pattern.id}</div>
                  <div className="predefined-card-name">{pattern.name}</div>
                  <div className="predefined-card-description">{pattern.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Predefined;