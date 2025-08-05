import React from 'react';
import './Home.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <header>
        <div className="header-container">
          <img src="/images/header background.jpg" alt="Header Background" className="header-bg" />
          <h1>
            <span className="bold">SonicG</span>Low<br />
            <span className="bold">Cube</span>
          </h1>
        </div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/resources">Resources</Link></li>
            <li><Link to="/cube">SonicGlow Cube</Link></li>
            <li><Link to="/about" className="active">About Us</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="welcome-text">
          <h2>Welcome to SonicGlow Cube</h2>
          <p>
            <strong>SonicGlow Cube</strong> is an innovative 3D LED display system designed to light up your world with dynamic patterns, animations, and custom text.
            <br /><br />
            Explore pre-designed effects or create your own using our web interface!
          </p>
          <div className="get-started-container">
            <Link to="/Section1" className="get-started-button">Get Started</Link>
          </div>
        </section>

        <section className="cube-image">
          <img src="/images/soniccube1.png" alt="SonicGlow LED Cube" />
        </section>
      </main>

      <footer>
        <div className="footer-content">
          <div className="footer-left">
            <h3>SonicGlow Cube</h3>
            <p>Created by Hardware Hackers<br />University of Moratuwa – First-Year Hardware Project</p>
          </div>
          <div className="social-stickers">
            <a href="https://www.facebook.com/" target="_blank"><img src="/images/fb.png" alt="Facebook" /></a>
            <a href="https://www.youtube.com/" target="_blank"><img src="/images/youtube.png" alt="YouTube" /></a>
            <a href="https://www.linkedin.com/" target="_blank"><img src="/images/linkedin.png" alt="LinkedIn" /></a>
            <a href="https://www.instagram.com/" target="_blank"><img src="/images/inst.png" alt="Instagram" /></a>
          </div>
          <div className="footer-right">
            <p>Contact us: <a href="mailto:hardwarehackers@uom.lk">hardwarehackers@uom.lk</a></p>
            <p>© 2025 SonicGlow Cube | All rights reserved</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;