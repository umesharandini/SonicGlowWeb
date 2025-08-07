import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ added

function Userdefined() {
  const navigate = useNavigate(); // ✅ added

  const handleNavigation = (path) => {
    navigate(path); // ✅ changed from console.log to actual navigation
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

          .main-content {
            position: relative;
            z-index: 5;
            max-width: 1200px;
            margin: 0 auto;
            padding: 6rem 2rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 70vh;
          }

          .page-title {
            font-size: 3rem;
            font-weight: 800;
            color: white;
            text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            letter-spacing: -0.02em;
            margin-bottom: 1rem;
            text-align: center;
          }

          .page-subtitle {
            font-size: 1.2rem;
            color: rgba(255, 255, 255, 0.8);
            text-align: center;
            margin-bottom: 4rem;
            max-width: 600px;
          }

          .button-container {
            display: flex;
            gap: 4rem;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
          }

          .main-button {
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            width: 300px;
            height: 220px;
            background: linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 197, 253, 0.05));
            backdrop-filter: blur(20px);
            border: 2px solid rgba(59, 130, 246, 0.2);
            border-radius: 24px;
            color: white;
            text-decoration: none;
            font-size: 1.6rem;
            font-weight: 700;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            cursor: pointer;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
            line-height: 1.3;
          }

          .main-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.4), transparent);
            transition: left 0.6s ease;
          }

          .main-button:hover {
            transform: translateY(-10px) scale(1.05);
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(29, 78, 216, 0.9) 100%);
            border: 2px solid rgba(96, 165, 250, 0.6);
            box-shadow: 0 25px 50px rgba(59, 130, 246, 0.5);
            color: white;
          }

          .main-button:hover::before {
            left: 100%;
          }

          .main-button:active {
            transform: translateY(-5px) scale(1.02);
          }

          .back-button {
            position: absolute;
            top: 2rem;
            left: 2rem;
            padding: 1rem 2rem;
            background: linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(147, 197, 253, 0.1));
            backdrop-filter: blur(20px);
            border: 2px solid rgba(59, 130, 246, 0.3);
            border-radius: 12px;
            color: white;
            text-decoration: none;
            font-size: 1rem;
            font-weight: 600;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
          }

          .back-button:hover {
            transform: translateY(-2px);
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(29, 78, 216, 0.3));
            box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
          }

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

            .page-title {
              font-size: 2.5rem;
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
            
            .main-button {
              width: 280px;
              height: 200px;
              font-size: 1.4rem;
            }

            .main-content {
              padding: 3rem 1rem;
            }

            .social-links {
              gap: 1rem;
            }

            .back-button {
              top: 1rem;
              left: 1rem;
              padding: 0.8rem 1.5rem;
              font-size: 0.9rem;
            }
          }

          @media (max-width: 480px) {
            .brand-title {
              font-size: 2.2rem;
            }

            .page-title {
              font-size: 2rem;
            }

            .main-button {
              width: 260px;
              height: 180px;
              font-size: 1.3rem;
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
          }
        `}
      </style>

      <div className="app">
        <button onClick={() => handleNavigation("/")} className="back-button">← Back to Home</button>

        <header className="header">
          <div className="header-content">
            <h1 className="brand-title">
              <span className="brand-accent">SonicG</span>Low<br/>
              <span className="brand-accent">Cube</span>
            </h1>
          </div>

          <nav className="nav">
            <div className="nav-container">
              <ul className="nav-list">
                {[
                  { path: "/", label: "Home" },
                  { path: "/resources", label: "Resources" },
                  { path: "/cube", label: "SonicGlow Cube" },
                  { path: "/about", label: "About Us" }
                ].map((item, idx) => (
                  <li key={idx}>
                    <button onClick={() => handleNavigation(item.path)} className="nav-button">
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </header>

        <main className="main-content">
          <h2 className="page-title">User Defined Patterns</h2>
          <p className="page-subtitle">
            Create your own custom patterns and text displays for the SonicGlow Cube. 
            Choose between text/number displays or design your own unique light patterns.
          </p>

          <div className="button-container">
            <button onClick={() => handleNavigation("/UserText")} className="main-button">
              Text And<br />Numbers
            </button>
            <button onClick={() => handleNavigation("/UserPattern")} className="main-button">
              User Defined<br />Pattern
            </button>
          </div>
        </main>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section footer-left">
              <h3 className="footer-title">SonicGlow Cube</h3>
              <p className="footer-description">
                Created by Hardware Hackers<br/>
                University of Moratuwa – First-Year Hardware Project
              </p>
            </div>
            <div className="footer-section">
              <div className="social-links">
                {[
                  { href: "https://www.facebook.com/", src: "/images/fb.png", alt: "Facebook" },
                  { href: "https://www.youtube.com/", src: "/images/youtube.png", alt: "YouTube" },
                  { href: "https://www.linkedin.com/", src: "/images/linkedin.png", alt: "LinkedIn" },
                  { href: "https://www.instagram.com/", src: "/images/inst.png", alt: "Instagram" }
                ].map((social, idx) => (
                  <a key={idx} href={social.href} target="_blank" rel="noopener noreferrer" className="social-link">
                    <img src={social.src} alt={social.alt} className="social-icon" />
                  </a>
                ))}
              </div>
            </div>
            <div className="footer-section footer-right">
              <p className="contact-info">
                Contact us: 
                <a href="mailto:hardwarehackers@uom.lk" className="contact-link">hardwarehackers@uom.lk</a>
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

export default Userdefined;
