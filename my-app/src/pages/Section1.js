import React from 'react';
import './Section1.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Section1() {
  return (
    <>
      <header>
        <div className="logo">
          <h1>SonicGLow<br />Cube</h1>
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
        <div className="button-container">
          <Link to="/Predefined" className="pattern-button">Pre Defined<br />Patterns</Link>
          <Link to="/Userdefined" className="pattern-button">User Defined<br />Patterns</Link>
        </div>
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

export default Section1;