import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Section1() {
  const navigator = useNavigate();
  const [cubeConnected, setCubeConnected] = useState(false);
  const [lastConnectionTime, setLastConnectionTime] = useState(null);
  const [lastDisconnectionTime, setLastDisconnectionTime] = useState(null);

  // WebSocket connection
  useEffect(() => {
    let ws = null;
    let reconnectInterval = null;

    const connectWebSocket = () => {
      try {
        ws = new WebSocket('ws://192.168.134.191:5000'); // Update this IP
        
        ws.onopen = () => {
          console.log('✅ Connected to WebSocket server');
        };

        ws.onmessage = (event) => {
          console.log('📨 WebSocket message:', event.data);
          
          try {
            const data = JSON.parse(event.data);
            console.log('📦 Parsed data:', data);
            
            // 🔌 DEVICE CONNECTED - Any of these means device is active
            if (data.command === 'device_startup' || 
                data.command === 'sensor_data' || 
                (data.command === 'device_status_update' && data.device_connected === true)) {
              
              console.log('🟢 DEVICE CONNECTED EVENT - Source:', data.command);
              setCubeConnected(true);
              setLastConnectionTime(Date.now());
            }
            
            // ❌ DEVICE DISCONNECTED - Any of these means device is offline
            else if (data.command === 'device_disconnected' || 
                     data.command === 'device_inactive' || 
                     (data.command === 'device_status_update' && data.device_connected === false)) {
              
              console.log('🔴 DEVICE DISCONNECTED EVENT - Source:', data.command);
              setCubeConnected(false);
              setLastDisconnectionTime(Date.now());
            }
            
          } catch (e) {
            // Handle plain text messages
            if (event.data.includes('NodeMCU ready') || event.data.includes('startup')) {
              console.log('🟢 DEVICE CONNECTED (plain text)');
              setCubeConnected(true);
              setLastConnectionTime(Date.now());
            }
          }
        };

        ws.onclose = () => {
          console.log('❌ WebSocket connection closed');
          
          if (!reconnectInterval) {
            reconnectInterval = setInterval(() => {
              console.log('🔄 Attempting to reconnect...');
              connectWebSocket();
            }, 5000);
          }
        };

        ws.onerror = (error) => {
          console.error('🚨 WebSocket error:', error);
        };

      } catch (error) {
        console.error('❌ Failed to connect to WebSocket:', error);
      }
    };

    connectWebSocket();

    return () => {
      if (reconnectInterval) clearInterval(reconnectInterval);
      if (ws) ws.close();
    };
  }, []);

  // HTTP Status Check (backup method) - DISABLED FOR DEBUGGING
  /*
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch('http://192.168.134.191:5000/device-status'); // Update this IP
        const data = await response.json();
        
        console.log('🌐 HTTP status check:', data);
        
        // Only trust HTTP if we haven't had recent WebSocket activity
        const timeSinceLastWS = Math.min(
          lastConnectionTime ? Date.now() - lastConnectionTime : Infinity,
          lastDisconnectionTime ? Date.now() - lastDisconnectionTime : Infinity
        );
        
        if (timeSinceLastWS > 10000) { // No WebSocket activity for 10 seconds
          if (data.connected) {
            console.log('🟢 HTTP: Device connected');
            setCubeConnected(true);
          } else {
            console.log('🔴 HTTP: Device disconnected');
            setCubeConnected(false);
          }
        }
        
      } catch (error) {
        console.log('❌ HTTP check failed:', error);
      }
    };

    // Check every 15 seconds
    const interval = setInterval(checkStatus, 15000);
    checkStatus(); // Initial check

    return () => clearInterval(interval);
  }, [lastConnectionTime, lastDisconnectionTime]);
  */

  // Timeout disconnection (if no activity for too long)
  useEffect(() => {
    if (!cubeConnected) return;

    const timeout = setTimeout(() => {
      console.log('⏰ Connection timeout - no activity for 15 seconds');
      setCubeConnected(false);
      setLastDisconnectionTime(Date.now());
    }, 15000); // 15 seconds timeout instead of 45

    return () => clearTimeout(timeout);
  }, [lastConnectionTime, cubeConnected]);

  // Debug logging
  useEffect(() => {
    console.log('🔄 CUBE STATE CHANGED:', cubeConnected ? 'CONNECTED' : 'DISCONNECTED');
  }, [cubeConnected]);

  const handleNavigation = (path) => {
    console.log(`Navigate to: ${path}`);
    navigator(path);
  };

  return (
    <>
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #2d3748;
            background: #ffffff;
          }

          .app {
            min-height: 100vh;
            background: linear-gradient(135deg, #1a1a1a 0%, #2d3748 100%);
            position: relative;
          }

          .app::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
              radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(147, 197, 253, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.05) 0%, transparent 50%);
            pointer-events: none;
          }

          /* Header */
          .header {
            position: relative;
            z-index: 10;
            background: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .header-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
            text-align: center;
          }

          .brand-title {
            font-size: 4rem;
            font-weight: 800;
            color: white;
            text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            letter-spacing: -0.02em;
            margin-bottom: 2rem;
          }

          .brand-accent {
            background: linear-gradient(45deg, #3b82f6, #60a5fa);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: none;
          }

          /* Status Indicator */
          .status-indicator {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            margin-top: 1rem;
            padding: 1rem;
            background: rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          .status-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            animation: pulse 2s infinite;
          }

          .status-dot.connected {
            background: #10b981;
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
          }

          .status-dot.disconnected {
            background: #ef4444;
            box-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
          }

          .status-text {
            color: white;
            font-weight: 600;
            font-size: 1.1rem;
          }

          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }

          /* Debug Corner */
          .debug-info {
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 10px;
            border-radius: 8px;
            font-size: 12px;
            font-family: monospace;
            z-index: 1000;
            border: 1px solid #333;
          }

          /* Navigation */
          .nav {
            background: rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
            border-top: 1px solid rgba(255, 255, 255, 0.05);
          }

          .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
          }

          .nav-list {
            display: flex;
            justify-content: center;
            list-style: none;
            gap: 0;
          }

          .nav-button {
            padding: 1.5rem 2.5rem;
            background: none;
            border: none;
            color: white;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
          }

          .nav-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent);
            transition: left 0.5s;
          }

          .nav-button:hover::before {
            left: 100%;
          }

          .nav-button:hover {
            background: rgba(59, 130, 246, 0.2);
            transform: translateY(-2px);
          }

          .nav-button.active {
            background: rgba(59, 130, 246, 0.3);
            box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
          }

          /* Main Content */
          .main-content {
            position: relative;
            z-index: 5;
            max-width: 1200px;
            margin: 0 auto;
            padding: 6rem 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 70vh;
          }

          .button-container {
            display: flex;
            gap: 4rem;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
          }

          .pattern-button {
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            width: 280px;
            height: 200px;
            background: linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 197, 253, 0.05));
            backdrop-filter: blur(20px);
            border: 2px solid rgba(59, 130, 246, 0.2);
            border-radius: 24px;
            color: white;
            text-decoration: none;
            font-size: 1.5rem;
            font-weight: 700;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            cursor: pointer;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
          }

          .pattern-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.4), transparent);
            transition: left 0.6s ease;
          }

          .pattern-button:hover {
            transform: translateY(-10px) scale(1.05);
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(29, 78, 216, 0.9) 100%);
            border: 2px solid rgba(96, 165, 250, 0.6);
            box-shadow: 0 25px 50px rgba(59, 130, 246, 0.5);
            color: white;
          }

          .pattern-button:hover::before {
            left: 100%;
          }

          .pattern-button:active {
            transform: translateY(-5px) scale(1.02);
          }

          /* Disconnected Message */
          .disconnected-message {
            text-align: center;
            padding: 4rem 2rem;
            background: rgba(239, 68, 68, 0.1);
            backdrop-filter: blur(20px);
            border: 2px solid rgba(239, 68, 68, 0.3);
            border-radius: 24px;
            max-width: 600px;
            margin: 0 auto;
          }

          .disconnected-icon {
            font-size: 4rem;
            margin-bottom: 2rem;
            opacity: 0.7;
          }

          .disconnected-title {
            font-size: 2rem;
            font-weight: 700;
            color: #ef4444;
            margin-bottom: 1rem;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          }

          .disconnected-text {
            font-size: 1.2rem;
            color: rgba(255, 255, 255, 0.9);
            line-height: 1.6;
            margin-bottom: 2rem;
          }

          .power-instruction {
            font-size: 1.1rem;
            color: #fbbf24;
            font-weight: 600;
            background: rgba(251, 191, 36, 0.1);
            padding: 1rem 2rem;
            border-radius: 12px;
            border: 1px solid rgba(251, 191, 36, 0.3);
          }

          /* Footer */
          .footer {
            position: relative;
            z-index: 10;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(20px);
            color: white;
            margin-top: 4rem;
            border-top: 1px solid rgba(59, 130, 246, 0.2);
          }

          .footer-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 4rem 2rem 2rem;
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            gap: 4rem;
            align-items: center;
          }

          .footer-section {
            text-align: center;
          }

          .footer-left { text-align: left; }
          .footer-right { text-align: right; }

          .footer-title {
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: 1rem;
            background: linear-gradient(45deg, #3b82f6, #60a5fa);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .footer-description {
            color: rgba(255, 255, 255, 0.8);
            line-height: 1.6;
          }

          .social-links {
            display: flex;
            gap: 1.5rem;
            justify-content: center;
          }

          .social-link {
            width: 3.5rem;
            height: 3.5rem;
            background: rgba(59, 130, 246, 0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(59, 130, 246, 0.2);
          }

          .social-link:hover {
            background: rgba(59, 130, 246, 0.2);
            transform: translateY(-5px) scale(1.1);
            box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
          }

          .social-icon {
            width: 1.8rem;
            height: 1.8rem;
            filter: brightness(0) invert(1);
            transition: all 0.3s ease;
          }

          .contact-info {
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 1rem;
            font-size: 1.1rem;
          }

          .contact-link {
            color: #60a5fa;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
          }

          .contact-link:hover {
            color: #3b82f6;
            text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
          }

          .copyright {
            color: rgba(255, 255, 255, 0.6);
            font-size: 0.9rem;
          }

          /* Responsive Design */
          @media (max-width: 968px) {
            .footer-content {
              grid-template-columns: 1fr;
              gap: 3rem;
              text-align: center;
            }

            .footer-left, .footer-right {
              text-align: center;
            }
          }

          @media (max-width: 768px) {
            .brand-title {
              font-size: 3rem;
            }

            .nav-list {
              flex-wrap: wrap;
              justify-content: center;
            }

            .nav-button {
              padding: 1rem 1.5rem;
              font-size: 0.9rem;
            }

            .button-container {
              flex-direction: column;
              gap: 2rem;
            }
            
            .pattern-button {
              width: 260px;
              height: 180px;
              font-size: 1.3rem;
            }

            .main-content {
              padding: 3rem 1rem;
            }

            .social-links {
              gap: 1rem;
            }

            .disconnected-message {
              margin: 0 1rem;
            }
          }

          @media (max-width: 480px) {
            .brand-title {
              font-size: 2.2rem;
            }

            .pattern-button {
              width: 240px;
              height: 160px;
              font-size: 1.2rem;
            }

            .nav-list {
              flex-direction: column;
            }

            .nav-button {
              padding: 1rem;
            }

            .footer-content {
              padding: 3rem 1rem 2rem;
            }

            .disconnected-title {
              font-size: 1.5rem;
            }

            .disconnected-text {
              font-size: 1rem;
            }
          }
        `}
      </style>

      <div className="app">
        {/* Debug Info */}
        <div className="debug-info">
          STATUS: {cubeConnected ? 'CONNECTED' : 'DISCONNECTED'}
        </div>

        {/* Header */}
        <header className="header">
          <div className="header-content">
            <h1 className="brand-title">
              <span className="brand-accent">SonicG</span>Low<br/>
              <span className="brand-accent">Cube</span>
            </h1>
            
            {/* Status Indicator */}
            <div className="status-indicator">
              <div className={`status-dot ${cubeConnected ? 'connected' : 'disconnected'}`}></div>
              <span className="status-text">
                {cubeConnected ? 'Cube Connected' : 'Cube Disconnected'}
              </span>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="nav">
            <div className="nav-container">
              <ul className="nav-list">
                {[
                  { path: "/", label: "Home" },
                  { path: "/resources", label: "Resources" },
                  { path: "/cube", label: "SonicGlow Cube" },
                  { path: "/about", label: "About Us", active: true }
                ].map((item, idx) => (
                  <li key={idx}>
                    <button 
                      onClick={() => handleNavigation(item.path)}
                      className={`nav-button ${item.active ? 'active' : ''}`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="main-content">
          {cubeConnected ? (
            <div className="button-container">
              <button 
                onClick={() => handleNavigation("/Predefined")}
                className="pattern-button"
              >
                Pre Defined<br />Patterns
              </button>
              <button 
                onClick={() => handleNavigation("/Userdefined")}
                className="pattern-button"
              >
                User Defined<br />Patterns
              </button>
            </div>
          ) : (
            <div className="disconnected-message">
              <div className="disconnected-icon">🔌</div>
              <h2 className="disconnected-title">Cube is Not Powered On</h2>
              <p className="disconnected-text">
                Your SonicGlow Cube is not currently connected to the system.
              </p>
              <div className="power-instruction">
                📋 Press and hold the power switch to turn on the cube
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            {/* Brand Info */}
            <div className="footer-section footer-left">
              <h3 className="footer-title">SonicGlow Cube</h3>
              <p className="footer-description">
                Created by Hardware Hackers<br/>
                University of Moratuwa – First-Year Hardware Project
              </p>
            </div>

            {/* Social Links */}
            <div className="footer-section">
              <div className="social-links">
                {[
                  { href: "https://www.facebook.com/", src: "/images/fb.png", alt: "Facebook" },
                  { href: "https://www.youtube.com/", src: "/images/youtube.png", alt: "YouTube" },
                  { href: "https://www.linkedin.com/", src: "/images/linkedin.png", alt: "LinkedIn" },
                  { href: "https://www.instagram.com/", src: "/images/inst.png", alt: "Instagram" }
                ].map((social, idx) => (
                  <a 
                    key={idx}
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    <img src={social.src} alt={social.alt} className="social-icon" />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="footer-section footer-right">
              <p className="contact-info">
                Contact us: 
                <a 
                  href="mailto:hardwarehackers@uom.lk" 
                  className="contact-link"
                >
                  hardwarehackers@uom.lk
                </a>
              </p>
              <p className="copyright">
                © 2025 SonicGlow Cube | All rights reserved
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Section1;