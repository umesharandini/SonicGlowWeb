import React from 'react';
import './Userdefined.css';
import { Link } from 'react-router-dom';

function Userdefined() {
  return (
    <div>
      <header>
        <div className="logo">
          <h1>SonicGLow<br />Cube</h1>
        </div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/resources">Resources</Link></li>
            <li><Link to="/cube">SonicGlow Cube</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <div className="button-container">
          <Link to="/UserText" className="main-button">Text And numbers</Link>
          <Link to="/UserPattern" className="main-button">User Defined Pattern</Link>
        </div>
      </main>
    </div>
  );
}

export default Userdefined;
