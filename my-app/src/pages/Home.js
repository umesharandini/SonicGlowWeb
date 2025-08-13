import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigator = useNavigate();

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
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6rem;
            align-items: center;
            min-height: 70vh;
          }

          .welcome-section {
            color: white;
          }

          .section-title {
            font-size: 3.5rem;
            font-weight: 700;
            line-height: 1.1;
            margin-bottom: 5rem;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            text-align: left;
          }

          .title-highlight {
            background: linear-gradient(to bottom, #1b1430, #4d4364);
            -webkit-background-clip: text;
            -webkit-text-fill-color: #0f43d4;
            background-clip: text;
          }

          .section-description {
            font-size: 1.2rem;
            line-height: 1.8;
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 3rem;
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
          }

          .description-strong {
            color: #60a5fa;
            font-weight: 700;
          }

          .cta-container {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
          }

          .get-started-btn {
            background: linear-gradient(45deg, #3b82f6, #1d4ed8);
            color: white;
            padding: 1.2rem 3rem;
            border: none;
            border-radius: 50px;
            font-weight: 700;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            position: relative;
            overflow: hidden;
          }

          .get-started-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, #1d4ed8, #3b82f6);
            transition: left 0.3s;
          }

          .get-started-btn:hover::before {
            left: 0;
          }

          .get-started-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 35px rgba(59, 130, 246, 0.5);
          }

          .get-started-btn span {
            position: relative;
            z-index: 1;
          }

          /* Cube Showcase */
          .cube-showcase {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .cube-container {
            position: relative;
            max-width: 500px;
            width: 100%;
          }

          .cube-bg {
            position: absolute;
            top: -2rem;
            left: -2rem;
            right: -2rem;
            bottom: -2rem;
            background: linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 197, 253, 0.05));
            border-radius: 2rem;
            backdrop-filter: blur(20px);
            border: 1px solid rgba(59, 130, 246, 0.2);
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .cube-container:hover .cube-bg {
            transform: rotate(-2deg) scale(1.02);
            background: linear-gradient(45deg, rgba(59, 130, 246, 0.15), rgba(147, 197, 253, 0.08));
          }

          .cube-img {
            position: relative;
            z-index: 2;
            width: 100%;
            height: auto;
            border-radius: 1.5rem;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .cube-container:hover .cube-img {
            transform: scale(1.05) rotate(1deg);
            box-shadow: 0 35px 70px rgba(0, 0, 0, 0.4);
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
            .main-content {
              grid-template-columns: 1fr;
              gap: 4rem;
              text-align: center;
              padding: 4rem 2rem;
            }

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

            .section-title {
              font-size: 2.5rem;
            }

            .main-content {
              padding: 3rem 1rem;
            }

            .social-links {
              gap: 1rem;
            }
          }

          @media (max-width: 480px) {
            .brand-title {
              font-size: 2.2rem;
            }

            .section-title {
              font-size: 2rem;
            }

            .section-description {
              font-size: 1rem;
            }

            .get-started-btn {
              padding: 1rem 2rem;
              font-size: 1rem;
            }

            .nav-list {
              flex-direction: column;
            }

            .nav-button {
              padding: 1rem;
            }
          }
        `}
      </style>

      <div className="app">
        {/* Header */}
        <header className="header">
          <div className="header-content">
            <h1 className="brand-title">
              <span className="brand-accent">SonicG</span>Low<br/>
              <span className="brand-accent">Cube</span>
            </h1>
          </div>
          
          {/* Navigation */}
          <nav className="nav">
            <div className="nav-container">
              <ul className="nav-list">
                {[
                  { path: "/", label: "Home", active: true },
                  { path: "/resources", label: "Resources" },
                  { path: "/cube", label: "SonicGlow Cube" },
                  { path: "/about", label: "About Us" }
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
          {/* Welcome Section */}
          <section className="welcome-section">
            <h2 className="section-title">
              Welcome to <span className="title-highlight">SonicGlow Cube</span>
            </h2>
            <p className="section-description">
              <strong className="description-strong">SonicGlow Cube</strong> is an innovative 3D LED display system 
              designed to light up your world with dynamic patterns, animations, and custom text.
              <br/><br/>
              Explore pre-designed effects or create your own using our web interface!
            </p>
            <div className="cta-container">
              <button 
                onClick={() => navigator("/Section1")}
                className="get-started-btn"
              >
                <span>Get Started</span>
              </button>
            </div>
          </section>

          {/* Cube Showcase */}
          <section className="cube-showcase">
            <div className="cube-container">
              <div className="cube-bg"></div>
              <img 
                src="/images/soniccube1.png" 
                alt="SonicGlow LED Cube"
                className="cube-img"
              />
            </div>
          </section>
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

export default Home;