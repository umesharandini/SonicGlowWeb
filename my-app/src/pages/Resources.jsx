import React from 'react';
import { useNavigate } from 'react-router-dom';

function Resources() {
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
            padding: 4rem 2rem;
            min-height: 70vh;
          }

          .page-title {
            font-size: 3.5rem;
            font-weight: 700;
            line-height: 1.1;
            margin-bottom: 3rem;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            text-align: center;
            color: white;
          }

          .title-highlight {
            background: linear-gradient(to bottom, #1b1430, #4d4364);
            -webkit-background-clip: text;
            -webkit-text-fill-color: #0f43d4;
            background-clip: text;
          }

          .resources-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 3rem;
            margin-bottom: 4rem;
          }

          .resource-card {
            background: rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(59, 130, 246, 0.2);
            border-radius: 1.5rem;
            padding: 3rem;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
          }

          .resource-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, rgba(59, 130, 246, 0.1), transparent);
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .resource-card:hover::before {
            opacity: 1;
          }

          .resource-card:hover {
            transform: translateY(-8px);
            border-color: rgba(59, 130, 246, 0.4);
            box-shadow: 0 20px 40px rgba(59, 130, 246, 0.2);
          }

          .card-icon {
            width: 4rem;
            height: 4rem;
            background: linear-gradient(45deg, #3b82f6, #60a5fa);
            border-radius: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 2rem;
            transition: transform 0.3s ease;
          }

          .resource-card:hover .card-icon {
            transform: rotate(10deg) scale(1.1);
          }

          .card-icon-text {
            font-size: 1.5rem;
            font-weight: 700;
            color: white;
          }

          .card-title {
            font-size: 1.8rem;
            font-weight: 700;
            color: white;
            margin-bottom: 1rem;
            position: relative;
            z-index: 2;
          }

          .card-description {
            color: rgba(255, 255, 255, 0.8);
            line-height: 1.6;
            margin-bottom: 2rem;
            position: relative;
            z-index: 2;
          }

          .card-button {
            background: linear-gradient(45deg, #3b82f6, #1d4ed8);
            color: white;
            padding: 0.8rem 2rem;
            border: none;
            border-radius: 50px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
            position: relative;
            z-index: 2;
            overflow: hidden;
          }

          .card-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, #1d4ed8, #3b82f6);
            transition: left 0.3s;
          }

          .card-button:hover::before {
            left: 0;
          }

          .card-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
          }

          .card-button span {
            position: relative;
            z-index: 1;
          }

          /* Downloads Section */
          .downloads-section {
            background: rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(59, 130, 246, 0.2);
            border-radius: 2rem;
            padding: 4rem;
            margin-bottom: 4rem;
          }

          .section-title {
            font-size: 2.5rem;
            font-weight: 700;
            color: white;
            margin-bottom: 2rem;
            text-align: center;
          }

          .downloads-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
          }

          .download-item {
            background: rgba(59, 130, 246, 0.1);
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 1rem;
            padding: 2rem;
            text-align: center;
            transition: all 0.3s ease;
          }

          .download-item:hover {
            background: rgba(59, 130, 246, 0.15);
            transform: translateY(-4px);
            box-shadow: 0 10px 30px rgba(59, 130, 246, 0.2);
          }

          .download-title {
            font-size: 1.3rem;
            font-weight: 600;
            color: white;
            margin-bottom: 1rem;
          }

          .download-description {
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 1.5rem;
            font-size: 0.9rem;
          }

          .download-button {
            background: linear-gradient(45deg, #10b981, #059669);
            color: white;
            padding: 0.8rem 2rem;
            border: none;
            border-radius: 50px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
          }

          .download-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
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
            .resources-grid {
              grid-template-columns: 1fr;
              gap: 2rem;
            }

            .downloads-grid {
              grid-template-columns: 1fr;
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

            .page-title {
              font-size: 2.5rem;
            }

            .main-content {
              padding: 3rem 1rem;
            }

            .resource-card {
              padding: 2rem;
            }

            .downloads-section {
              padding: 3rem 2rem;
            }

            .social-links {
              gap: 1rem;
            }
          }

          @media (max-width: 480px) {
            .brand-title {
              font-size: 2.2rem;
            }

            .page-title {
              font-size: 2rem;
            }

            .nav-list {
              flex-direction: column;
            }

            .nav-button {
              padding: 1rem;
            }

            .resource-card {
              padding: 1.5rem;
            }

            .downloads-section {
              padding: 2rem 1rem;
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
                  { path: "/", label: "Home" },
                  { path: "/resources", label: "Resources", active: true },
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
          <h2 className="page-title">
            <span className="title-highlight">Resources</span> & Documentation
          </h2>

          {/* Resource Cards */}
          <div className="resources-grid">
            <div className="resource-card">
              <div className="card-icon">
                <span className="card-icon-text">📚</span>
              </div>
              <h3 className="card-title">User Manual</h3>
              <p className="card-description">
                Complete guide to setting up and operating your SonicGlow Cube. 
                Includes assembly instructions, software setup, and troubleshooting tips.
              </p>
              <button className="card-button" onClick={() => handleNavigation("/manual")}>
                <span>View Manual</span>
              </button>
            </div>

            <div className="resource-card">
              <div className="card-icon">
                <span className="card-icon-text">🎨</span>
              </div>
              <h3 className="card-title">Pattern Library</h3>
              <p className="card-description">
                Explore our collection of pre-designed LED patterns and animations. 
                From simple effects to complex displays, find inspiration for your cube.
              </p>
              <button className="card-button" onClick={() => handleNavigation("/patterns")}>
                <span>Browse Patterns</span>
              </button>
            </div>

            <div className="resource-card">
              <div className="card-icon">
                <span className="card-icon-text">💻</span>
              </div>
              <h3 className="card-title">API Documentation</h3>
              <p className="card-description">
                Developer documentation for integrating with SonicGlow Cube. 
                Create custom applications and control your cube programmatically.
              </p>
              <button className="card-button" onClick={() => handleNavigation("/api-docs")}>
                <span>API Docs</span>
              </button>
            </div>

            <div className="resource-card">
              <div className="card-icon">
                <span className="card-icon-text">🛠️</span>
              </div>
              <h3 className="card-title">Hardware Specs</h3>
              <p className="card-description">
                Technical specifications, circuit diagrams, and component details. 
                Perfect for enthusiasts who want to understand the hardware design.
              </p>
              <button className="card-button" onClick={() => handleNavigation("/hardware")}>
                <span>View Specs</span>
              </button>
            </div>

            <div className="resource-card">
              <div className="card-icon">
                <span className="card-icon-text">🎓</span>
              </div>
              <h3 className="card-title">Tutorials</h3>
              <p className="card-description">
                Step-by-step video tutorials covering basic operations, 
                pattern creation, and advanced customization techniques.
              </p>
              <button className="card-button" onClick={() => handleNavigation("/tutorials")}>
                <span>Watch Tutorials</span>
              </button>
            </div>

            <div className="resource-card">
              <div className="card-icon">
                <span className="card-icon-text">💬</span>
              </div>
              <h3 className="card-title">Community Forum</h3>
              <p className="card-description">
                Join our community of makers and developers. Share your creations, 
                get help, and collaborate on new ideas and improvements.
              </p>
              <button className="card-button" onClick={() => window.open("https://forum.sonicglowcube.com", "_blank")}>
                <span>Join Forum</span>
              </button>
            </div>
          </div>

          {/* Downloads Section */}
          <section className="downloads-section">
            <h3 className="section-title">Downloads</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', textAlign: 'center', marginBottom: '2rem' }}>
              Get the latest software, firmware, and documentation for your SonicGlow Cube
            </p>
            
            <div className="downloads-grid">
              <div className="download-item">
                <h4 className="download-title">Control Software v2.1</h4>
                <p className="download-description">
                  Desktop application for Windows, macOS, and Linux
                </p>
                <button className="download-button">Download</button>
              </div>

              <div className="download-item">
                <h4 className="download-title">Firmware v1.8.3</h4>
                <p className="download-description">
                  Latest firmware with improved performance and new features
                </p>
                <button className="download-button">Download</button>
              </div>

              <div className="download-item">
                <h4 className="download-title">Mobile App</h4>
                <p className="download-description">
                  Control your cube from your smartphone (iOS/Android)
                </p>
                <button className="download-button">Download</button>
              </div>

              <div className="download-item">
                <h4 className="download-title">3D Models & CAD Files</h4>
                <p className="download-description">
                  STL files for 3D printing custom enclosures and accessories
                </p>
                <button className="download-button">Download</button>
              </div>

              <div className="download-item">
                <h4 className="download-title">Source Code</h4>
                <p className="download-description">
                  Open source code repository for developers
                </p>
                <button className="download-button">Download</button>
              </div>

              <div className="download-item">
                <h4 className="download-title">Pattern Pack</h4>
                <p className="download-description">
                  Collection of 50+ premium LED patterns and animations
                </p>
                <button className="download-button">Download</button>
              </div>
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

export default Resources;