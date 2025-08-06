import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const styles = {
    // Reset and base styles
    global: {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      lineHeight: 1.6,
      color: '#333',
      backgroundColor: '#f8f9fa'
    },

    // Header Styles
    mainHeader: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
    },

    headerContainer: {
      position: 'relative',
      padding: '2rem 0',
      textAlign: 'center',
      overflow: 'hidden'
    },

    headerBg: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      opacity: 0.3,
      zIndex: 0
    },

    brandTitle: {
      position: 'relative',
      zIndex: 1
    },

    brandTitleH1: {
      fontSize: '3.5rem',
      fontWeight: 300,
      letterSpacing: '0.05em',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
      marginBottom: 0
    },

    bold: {
      fontWeight: 700,
      color: '#ffd700',
      textShadow: '2px 2px 8px rgba(255, 215, 0, 0.5)'
    },

    // Navigation Styles
    mainNavigation: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.2)',
      padding: 0,
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
    },

    navList: {
      display: 'flex',
      justifyContent: 'center',
      listStyle: 'none',
      margin: 0,
      padding: 0
    },

    navItem: {
      margin: 0
    },

    navLink: {
      display: 'block',
      padding: '1.2rem 2rem',
      color: '#333',
      textDecoration: 'none',
      fontWeight: 500,
      fontSize: '1.1rem',
      transition: 'all 0.3s ease',
      borderBottom: '3px solid transparent'
    },

    navLinkHover: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      transform: 'translateY(-2px)',
      borderBottomColor: '#ffd700'
    },

    navLinkActive: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      borderBottomColor: '#ffd700'
    },

    // Main Content Styles
    mainContent: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '4rem',
      maxWidth: '1200px',
      margin: '4rem auto',
      padding: '0 2rem',
      alignItems: 'center',
      minHeight: '60vh'
    },

    welcomeSection: {
      padding: '2rem 0'
    },

    welcomeText: {
      maxWidth: '600px'
    },

    sectionTitle: {
      fontSize: '2.8rem',
      fontWeight: 700,
      color: '#2c3e50',
      marginBottom: '1.5rem',
      lineHeight: 1.2,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },

    sectionDescription: {
      fontSize: '1.2rem',
      lineHeight: 1.8,
      color: '#555',
      marginBottom: '2.5rem',
      textAlign: 'justify'
    },

    descriptionStrong: {
      color: '#667eea',
      fontWeight: 600
    },

    getStartedContainer: {
      marginTop: '2rem'
    },

    getStartedButton: {
      display: 'inline-block',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '1rem 2.5rem',
      textDecoration: 'none',
      borderRadius: '50px',
      fontWeight: 600,
      fontSize: '1.1rem',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },

    getStartedButtonHover: {
      transform: 'translateY(-3px)',
      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
      background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)'
    },

    // Cube Showcase Styles
    cubeShowcase: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem 0'
    },

    cubeImage: {
      textAlign: 'center',
      position: 'relative'
    },

    cubeImg: {
      maxWidth: '100%',
      height: 'auto',
      borderRadius: '20px',
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      filter: 'drop-shadow(0 10px 20px rgba(102, 126, 234, 0.2))'
    },

    cubeImgHover: {
      transform: 'scale(1.05) rotate(2deg)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
    },

    // Footer Styles
    mainFooter: {
      background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
      color: 'white',
      marginTop: '4rem',
      padding: '3rem 0 2rem'
    },

    footerContent: {
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      gap: '3rem',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 2rem',
      alignItems: 'center'
    },

    footerSection: {
      textAlign: 'center'
    },

    footerLeft: {
      textAlign: 'left'
    },

    footerRight: {
      textAlign: 'right'
    },

    footerTitle: {
      fontSize: '1.8rem',
      fontWeight: 700,
      marginBottom: '1rem',
      color: '#ffd700'
    },

    footerDescription: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#bdc3c7'
    },

    socialSection: {
      display: 'flex',
      justifyContent: 'center'
    },

    socialStickers: {
      display: 'flex',
      gap: '1.5rem',
      justifyContent: 'center'
    },

    socialLink: {
      display: 'block',
      padding: '0.8rem',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '50%',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)'
    },

    socialLinkHover: {
      background: 'rgba(255, 255, 255, 0.2)',
      transform: 'translateY(-3px) scale(1.1)',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)'
    },

    socialIcon: {
      width: '30px',
      height: '30px',
      objectFit: 'contain',
      filter: 'brightness(0) invert(1)'
    },

    contactInfo: {
      fontSize: '1rem',
      marginBottom: '0.5rem',
      color: '#bdc3c7'
    },

    contactLink: {
      color: '#ffd700',
      textDecoration: 'none',
      fontWeight: 500,
      transition: 'all 0.3s ease'
    },

    contactLinkHover: {
      color: '#fff',
      textShadow: '0 0 5px #ffd700'
    },

    copyright: {
      fontSize: '0.9rem',
      color: '#95a5a6',
      fontWeight: 300
    }
  };

  // Media queries handled through JavaScript
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 968 && window.innerWidth > 768;

  // Responsive style adjustments
  if (isMobile) {
    styles.mainContent.gridTemplateColumns = '1fr';
    styles.mainContent.textAlign = 'center';
    styles.mainContent.gap = '2rem';
    styles.footerContent.gridTemplateColumns = '1fr';
    styles.footerContent.gap = '2rem';
    styles.footerContent.textAlign = 'center';
    styles.footerLeft.textAlign = 'center';
    styles.footerRight.textAlign = 'center';
    styles.brandTitleH1.fontSize = '2.5rem';
    styles.sectionTitle.fontSize = '2.2rem';
    styles.navList.flexDirection = 'column';
  }

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
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f9fa;
          }
          .nav-link:hover {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
            color: white !important;
            transform: translateY(-2px) !important;
            border-bottom-color: #ffd700 !important;
          }
          .get-started-button:hover {
            transform: translateY(-3px) !important;
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4) !important;
            background: linear-gradient(135deg, #764ba2 0%, #667eea 100%) !important;
          }
          .cube-img:hover {
            transform: scale(1.05) rotate(2deg) !important;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
          }
          .social-link:hover {
            background: rgba(255, 255, 255, 0.2) !important;
            transform: translateY(-3px) scale(1.1) !important;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2) !important;
          }
          .contact-link:hover {
            color: #fff !important;
            text-shadow: 0 0 5px #ffd700 !important;
          }
          @media (max-width: 968px) {
            .main-content {
              grid-template-columns: 1fr !important;
              text-align: center !important;
              gap: 2rem !important;
            }
            .footer-content {
              grid-template-columns: 1fr !important;
              gap: 2rem !important;
              text-align: center !important;
            }
            .footer-left, .footer-right {
              text-align: center !important;
            }
          }
          @media (max-width: 768px) {
            .brand-title h1 {
              font-size: 2.5rem !important;
            }
            .nav-list {
              flex-direction: column !important;
            }
            .section-title {
              font-size: 2.2rem !important;
            }
            .main-content {
              padding: 0 1rem !important;
              margin: 2rem auto !important;
            }
            .social-stickers {
              gap: 1rem !important;
            }
          }
          @media (max-width: 480px) {
            .brand-title h1 {
              font-size: 2rem !important;
            }
            .section-title {
              font-size: 1.8rem !important;
            }
            .section-description {
              font-size: 1rem !important;
            }
            .get-started-button {
              padding: 0.8rem 2rem !important;
              font-size: 1rem !important;
            }
          }
        `}
      </style>

      <header style={styles.mainHeader} className="main-header">
        <div style={styles.headerContainer} className="header-container">
          
          <div style={styles.brandTitle} className="brand-title">
            <h1 style={styles.brandTitleH1}>
              <span style={styles.bold} className="bold">SonicG</span>Low<br />
              <span style={styles.bold} className="bold">Cube</span>
            </h1>
          </div>
        </div>
        
        <nav style={styles.mainNavigation} className="main-navigation">
          <ul style={styles.navList} className="nav-list">
            <li style={styles.navItem} className="nav-item">
              <Link to="/" style={styles.navLink} className="nav-link">Home</Link>
            </li>
            <li style={styles.navItem} className="nav-item">
              <Link to="/resources" style={styles.navLink} className="nav-link">Resources</Link>
            </li>
            <li style={styles.navItem} className="nav-item">
              <Link to="/cube" style={styles.navLink} className="nav-link">SonicGlow Cube</Link>
            </li>
            <li style={styles.navItem} className="nav-item">
              <Link to="/about" style={{...styles.navLink, ...styles.navLinkActive}} className="nav-link active">About Us</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main style={styles.mainContent} className="main-content">
        <section style={styles.welcomeSection} className="welcome-section">
          <div style={styles.welcomeText} className="welcome-text">
            <h2 style={styles.sectionTitle} className="section-title">Welcome to SonicGlow Cube</h2>
            <p style={styles.sectionDescription} className="section-description">
              <strong style={styles.descriptionStrong}>SonicGlow Cube</strong> is an innovative 3D LED display system 
              designed to light up your world with dynamic patterns, animations, and custom text.
              <br /><br />
              Explore pre-designed effects or create your own using our web interface!
            </p>
            <div style={styles.getStartedContainer} className="get-started-container">
              <Link to="/Section1" style={styles.getStartedButton} className="get-started-button">
                Get Started
              </Link>
            </div>
          </div>
        </section>

        <section style={styles.cubeShowcase} className="cube-showcase">
          <div style={styles.cubeImage} className="cube-image">
            <img 
              src="/images/soniccube1.png" 
              alt="SonicGlow LED Cube" 
              style={styles.cubeImg}
              className="cube-img"
            />
          </div>
        </section>
      </main>

      <footer style={styles.mainFooter} className="main-footer">
        <div style={styles.footerContent} className="footer-content">
          <div style={{...styles.footerSection, ...styles.footerLeft}} className="footer-section footer-left">
            <h3 style={styles.footerTitle} className="footer-title">SonicGlow Cube</h3>
            <p style={styles.footerDescription} className="footer-description">
              Created by Hardware Hackers<br />
              University of Moratuwa – First-Year Hardware Project
            </p>
          </div>

          <div style={{...styles.footerSection, ...styles.socialSection}} className="footer-section social-section">
            <div style={styles.socialStickers} className="social-stickers">
              <a 
                href="https://www.facebook.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.socialLink}
                className="social-link"
              >
                <img src="/images/fb.png" alt="Facebook" style={styles.socialIcon} className="social-icon" />
              </a>
              <a 
                href="https://www.youtube.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.socialLink}
                className="social-link"
              >
                <img src="/images/youtube.png" alt="YouTube" style={styles.socialIcon} className="social-icon" />
              </a>
              <a 
                href="https://www.linkedin.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.socialLink}
                className="social-link"
              >
                <img src="/images/linkedin.png" alt="LinkedIn" style={styles.socialIcon} className="social-icon" />
              </a>
              <a 
                href="https://www.instagram.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.socialLink}
                className="social-link"
              >
                <img src="/images/inst.png" alt="Instagram" style={styles.socialIcon} className="social-icon" />
              </a>
            </div>
          </div>

          <div style={{...styles.footerSection, ...styles.footerRight}} className="footer-section footer-right">
            <p style={styles.contactInfo} className="contact-info">
              Contact us: 
              <a 
                href="mailto:hardwarehackers@uom.lk" 
                style={styles.contactLink}
                className="contact-link"
              >
                hardwarehackers@uom.lk
              </a>
            </p>
            <p style={styles.copyright} className="copyright">
              © 2025 SonicGlow Cube | All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;