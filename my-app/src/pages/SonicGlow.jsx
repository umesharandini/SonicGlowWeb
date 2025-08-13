import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SonicGlow() {
  const navigator = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);
  const [socialIconErrors, setSocialIconErrors] = useState({});

  const handleNavigation = (path) => {
    console.log(`Navigate to: ${path}`);
    navigator(path);
  };

  const handleSocialIconError = (iconIndex) => {
    setSocialIconErrors(prev => ({ ...prev, [iconIndex]: true }));
  };

  const features = [
    {
      title: "Multiple Control Options",
      description: "Physical long press switch, remote control, and web interface for versatile operation",
      icon: "🎛️"
    },
    {
      title: "Dynamic Patterns",
      description: "Pre-programmed patterns and animations for continuous visual entertainment",
      icon: "✨"
    },
    {
      title: "Custom Text Display",
      description: "Display personalized messages and text with ease through the web interface",
      icon: "📝"
    },
    {
      title: "Compact & Portable",
      description: "Innovative design that's perfect for any space - decorative and functional",
      icon: "📦"
    }
  ];

  const specifications = [
    { label: "Dimensions", value: "20cm × 20cm × 20cm" },
    { label: "Display Type", value: "3D LED Matrix" },
    { label: "Controller", value: "Advanced Microcontroller" },
    { label: "Power Supply", value: "12V DC Adapter" },
    { label: "Control Methods", value: "Switch, Remote, Web" },
    { label: "Applications", value: "Home, Hotel, Events" },
    { label: "Design", value: "Portable & Compact" },
    { label: "Features", value: "Text Display & Patterns" }
  ];

  const galleryImages = [
    {
      src: "/images/cube1.jpg",
      alt: "SonicGlow Cube Front View",
      caption: "Front View Display"
    },
    {
      src: "/images/cube2.jpg", 
      alt: "SonicGlow Cube Side View",
      caption: "Side View Angle"
    },
    {
      src: "/images/cube3.jpg",
      alt: "SonicGlow Cube LED Pattern",
      caption: "LED Pattern Display"
    },
    {
      src: "/images/cube4.jpg",
      alt: "SonicGlow Cube Remote Control",
      caption: "Remote Control Interface"
    },
    {
      src: "/images/cube5.jpg",
      alt: "SonicGlow Cube Web Interface",
      caption: "Web Control Panel"
    },
    {
      src: "/images/cube6.jpg",
      alt: "SonicGlow Cube in Environment",
      caption: "Perfect for Any Space"
    }
  ];

  const socialLinks = [
    { 
      href: "https://www.facebook.com/", 
      text: "FB", 
      alt: "Facebook",
      icon: "/images/fb.png"
    },
    { 
      href: "https://www.youtube.com/", 
      text: "YT", 
      alt: "YouTube",
      icon: "/images/youtube.png"
    },
    { 
      href: "https://www.linkedin.com/", 
      text: "LI", 
      alt: "LinkedIn",
      icon: "/images/linkedin.png"
    },
    { 
      href: "https://www.instagram.com/", 
      text: "IG", 
      alt: "Instagram",
      icon: "/images/inst.png"
    }
  ];

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
          }

          /* Hero Section */
          .hero-section {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6rem;
            align-items: center;
            margin-bottom: 8rem;
            min-height: 70vh;
          }

          .hero-content {
            color: white;
          }

          .hero-title {
            font-size: 3.5rem;
            font-weight: 700;
            line-height: 1.1;
            margin-bottom: 2rem;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          }

          .title-highlight {
            background: linear-gradient(to bottom, #1b1430, #4d4364);
            -webkit-background-clip: text;
            -webkit-text-fill-color: #0f43d4;
            background-clip: text;
          }

          .hero-description {
            font-size: 1.3rem;
            line-height: 1.8;
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 3rem;
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
          }

          .hero-stats {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
            margin-bottom: 3rem;
          }

          .stat-item {
            background: rgba(59, 130, 246, 0.1);
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 1rem;
            padding: 1.5rem;
            text-align: center;
            backdrop-filter: blur(10px);
          }

          .stat-number {
            font-size: 2.5rem;
            font-weight: 700;
            color: #60a5fa;
            margin-bottom: 0.5rem;
          }

          .stat-label {
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.8);
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          /* Product Showcase */
          .product-showcase {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
          }

          .cube-container {
            position: relative;
            max-width: 500px;
            width: 100%;
          }

          .cube-bg {
            position: absolute;
            top: -3rem;
            left: -3rem;
            right: -3rem;
            bottom: -3rem;
            background: linear-gradient(45deg, rgba(59, 130, 246, 0.15), rgba(147, 197, 253, 0.08));
            border-radius: 2rem;
            backdrop-filter: blur(20px);
            border: 1px solid rgba(59, 130, 246, 0.3);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            animation: float 6s ease-in-out infinite;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(2deg); }
          }

          .cube-container:hover .cube-bg {
            background: linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(147, 197, 253, 0.12));
            transform: scale(1.05) rotate(-3deg);
          }

          .cube-img {
            position: relative;
            z-index: 2;
            width: 100%;
            height: auto;
            border-radius: 1.5rem;
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .cube-container:hover .cube-img {
            transform: scale(1.08) rotate(3deg);
            box-shadow: 0 40px 80px rgba(0, 0, 0, 0.5);
          }

          /* Features Section */
          .features-section {
            margin-bottom: 8rem;
          }

          .section-title {
            font-size: 3rem;
            font-weight: 700;
            color: white;
            text-align: center;
            margin-bottom: 4rem;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          }

          .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 3rem;
          }

          .feature-card {
            background: rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(59, 130, 246, 0.2);
            border-radius: 1.5rem;
            padding: 3rem;
            text-align: center;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            cursor: pointer;
          }

          .feature-card::before {
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

          .feature-card:hover::before {
            opacity: 1;
          }

          .feature-card:hover {
            transform: translateY(-10px) scale(1.02);
            border-color: rgba(59, 130, 246, 0.5);
            box-shadow: 0 25px 50px rgba(59, 130, 246, 0.3);
          }

          .feature-icon {
            font-size: 4rem;
            margin-bottom: 2rem;
            filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
            transition: transform 0.3s ease;
          }

          .feature-card:hover .feature-icon {
            transform: scale(1.2) rotate(10deg);
          }

          .feature-title {
            font-size: 1.8rem;
            font-weight: 700;
            color: white;
            margin-bottom: 1.5rem;
            position: relative;
            z-index: 2;
          }

          .feature-description {
            color: rgba(255, 255, 255, 0.8);
            line-height: 1.6;
            position: relative;
            z-index: 2;
          }

          /* Specifications Section */
          .specs-section {
            background: rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(59, 130, 246, 0.2);
            border-radius: 2rem;
            padding: 4rem;
            margin-bottom: 6rem;
          }

          .specs-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
          }

          .spec-item {
            background: rgba(59, 130, 246, 0.1);
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 1rem;
            padding: 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.3s ease;
          }

          .spec-item:hover {
            background: rgba(59, 130, 246, 0.15);
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(59, 130, 246, 0.2);
          }

          .spec-label {
            font-weight: 600;
            color: rgba(255, 255, 255, 0.9);
          }

          .spec-value {
            font-weight: 700;
            color: #60a5fa;
            text-align: right;
          }

          /* Gallery Section */
          .gallery-section {
            margin-bottom: 6rem;
          }

          .gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
          }

          .gallery-item {
            background: rgba(0, 0, 0, 0.3);
            border-radius: 1.5rem;
            overflow: hidden;
            transition: transform 0.3s ease;
            border: 1px solid rgba(59, 130, 246, 0.2);
          }

          .gallery-item:hover {
            transform: scale(1.05);
            box-shadow: 0 20px 40px rgba(59, 130, 246, 0.3);
          }

          .gallery-img {
            width: 100%;
            height: 250px;
            object-fit: cover;
          }

          .gallery-placeholder {
            width: 100%;
            height: 250px;
            background: linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(147, 197, 253, 0.1));
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 3rem;
          }

          .gallery-caption {
            padding: 1.5rem;
            color: white;
            text-align: center;
            font-weight: 600;
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
            color: white;
            font-weight: bold;
            font-size: 0.8rem;
          }

          .social-link:hover {
            background: rgba(59, 130, 246, 0.2);
            transform: translateY(-5px) scale(1.1);
            box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
          }

          .social-icon {
            width: 1.8rem;
            height: 1.8rem;
            transition: all 0.3s ease;
          }

          .social-text {
            font-size: 0.8rem;
            font-weight: 700;
            color: white;
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
            .hero-section {
              grid-template-columns: 1fr;
              gap: 4rem;
              text-align: center;
            }

            .features-grid {
              grid-template-columns: 1fr;
              gap: 2rem;
            }

            .specs-grid {
              grid-template-columns: 1fr;
            }

            .gallery-grid {
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

            .hero-title {
              font-size: 2.5rem;
            }

            .section-title {
              font-size: 2.5rem;
            }

            .main-content {
              padding: 3rem 1rem;
            }

            .hero-stats {
              grid-template-columns: 1fr;
              gap: 1rem;
            }

            .social-links {
              gap: 1rem;
            }

            .gallery-grid {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 480px) {
            .brand-title {
              font-size: 2.2rem;
            }

            .hero-title {
              font-size: 2rem;
            }

            .section-title {
              font-size: 2rem;
            }

            .nav-list {
              flex-direction: column;
            }

            .nav-button {
              padding: 1rem;
            }

            .feature-card, .specs-section {
              padding: 2rem;
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
                  { path: "/resources", label: "Resources" },
                  { path: "/cube", label: "SonicGlow Cube", active: true },
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
          {/* Hero Section */}
          <section className="hero-section">
            <div className="hero-content">
              <h2 className="hero-title">
                The Ultimate <span className="title-highlight">3D LED</span> Display
              </h2>
              <p className="hero-description">
                The Sonic Glow Cube is a three dimensional LED display designed to combine 
                functionality with aesthetic appeal. Perfect for homes, hotels, and event spaces, 
                it displays dynamic patterns, animations, and customizable text.
              </p>
              
              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-number">3</div>
                  <div className="stat-label">Control Methods</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">∞</div>
                  <div className="stat-label">Pattern Options</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Portable</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">✓</div>
                  <div className="stat-label">Custom Text</div>
                </div>
              </div>
            </div>

            {/* Product Showcase */}
            <div className="product-showcase">
              <div className="cube-container">
                <div className="cube-bg"></div>
                <img 
                  src="/images/soniccube1.png" 
                  alt="SonicGlow LED Cube"
                  className="cube-img"
                />
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="features-section">
            <h3 className="section-title">Key Features</h3>
            <div className="features-grid">
              {features.map((feature, idx) => (
                <div 
                  key={idx} 
                  className="feature-card"
                  onClick={() => setActiveFeature(idx)}
                >
                  <div className="feature-icon">{feature.icon}</div>
                  <h4 className="feature-title">{feature.title}</h4>
                  <p className="feature-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Specifications Section */}
          <section className="specs-section">
            <h3 className="section-title">Technical Specifications</h3>
            <div className="specs-grid">
              {specifications.map((spec, idx) => (
                <div key={idx} className="spec-item">
                  <span className="spec-label">{spec.label}</span>
                  <span className="spec-value">{spec.value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Gallery Section */}
          <section className="gallery-section">
            <h3 className="section-title">Product Gallery</h3>
            <div className="gallery-grid">
              {galleryImages.map((image, idx) => (
                <div key={idx} className="gallery-item">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="gallery-img"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="gallery-placeholder" style={{display: 'none'}}>
                    📷
                  </div>
                  <div className="gallery-caption">{image.caption}</div>
                </div>
              ))}
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
                {socialLinks.map((social, idx) => (
                  <a 
                    key={idx}
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link"
                    title={social.alt}
                  >
                    {!socialIconErrors[idx] ? (
                      <img 
                        src={social.icon} 
                        alt={social.alt}
                        className="social-icon"
                        onError={() => handleSocialIconError(idx)}
                      />
                    ) : (
                      <span className="social-text">{social.text}</span>
                    )}
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

export default SonicGlow;