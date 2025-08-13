import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function About() {
  const navigator = useNavigate();
  const [activeTeamMember, setActiveTeamMember] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  const [socialIconErrors, setSocialIconErrors] = useState({});

  const handleNavigation = (path) => {
    console.log(`Navigate to: ${path}`);
    navigator(path);
  };

  const handleImageError = (memberIndex) => {
    setImageErrors(prev => ({ ...prev, [memberIndex]: true }));
  };

  const handleSocialIconError = (iconIndex) => {
    setSocialIconErrors(prev => ({ ...prev, [iconIndex]: true }));
  };

 const teamMembers = [
    {
      name: "Manusha",
      image: "/images/manusha.jpg",
      description: "Specializes in power supply assembly and LED layer connectivity. Responsible for 3D modeling and user input pattern recognition systems.",
      skills: ["Power Supply Assembly", "LED Layer Connection", "3D Modeling", "Pattern Recognition"],
      contact: "manusha@hardwarehackers.uom.lk"
    },
    {
      name: "Vishmi",
      image: "/images/vishmi.jpg",
      description: "Focuses on PCB design and assembly, control switch implementation, and user input pattern recognition for seamless cube operation.",
      skills: ["PCB Design", "Circuit Assembly", "Switch Control", "Pattern Recognition"],
      contact: "vishmi@hardwarehackers.uom.lk"
    },
    {
      name: "Umesha",
      image: "/images/umesha.jpg",
      description: "Handles NodeMCU configuration and programming, LED cube construction, and web interface development for remote control.",
      skills: ["NodeMCU Programming", "LED Cube Construction", "Web Development", "Interface Design"],
      contact: "umesha@hardwarehackers.uom.lk"
    },
    {
      name: "Sailendra",
      image: "/images/saile.jpg",
      description: "Manages Arduino board configuration, remote controller setup, pattern creation, and web interface implementation.",
      skills: ["Arduino Programming", "Remote Control", "Pattern Creation", "Web Interface"],
      contact: "sailendra@hardwarehackers.uom.lk"
    }
  ];

  const projectStats = [
    { number: "4", label: "Team Members" },
    { number: "1st", label: "Year Project" },
    { number: "512", label: "LEDs Managed" },
    { number: "100+", label: "Hours Invested" }
  ];

  const achievements = [
    {
      title: "Innovation Award",
      description: "Best Hardware Project - Faculty of IT 2025",
      icon: "🏆"
    },
    {
      title: "Technical Excellence",
      description: "Outstanding Use of LED Matrix Technology",
      icon: "⚡"
    },
    {
      title: "Team Collaboration",
      description: "Exemplary Teamwork in Hardware Development",
      icon: "🤝"
    },
    {
      title: "Creative Design",
      description: "Most Creative Visual Display System",
      icon: "🎨"
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
            text-align: center;
            margin-bottom: 8rem;
          }

          .hero-title {
            font-size: 3.5rem;
            font-weight: 700;
            line-height: 1.1;
            margin-bottom: 2rem;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            color: white;
          }

          .title-highlight {
            background: linear-gradient(to bottom, #1b1430, #4d4364);
            -webkit-background-clip: text;
            -webkit-text-fill-color: #0f43d4;
            background-clip: text;
          }

          .hero-subtitle {
            font-size: 1.5rem;
            color: #60a5fa;
            font-weight: 600;
            margin-bottom: 1rem;
          }

          .hero-description {
            font-size: 1.3rem;
            line-height: 1.8;
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 3rem;
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
          }

          .university-info {
            background: rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(59, 130, 246, 0.2);
            border-radius: 2rem;
            padding: 3rem;
            margin-bottom: 4rem;
            text-align: center;
          }

          .university-name {
            font-size: 1.8rem;
            font-weight: 700;
            color: white;
            margin-bottom: 1rem;
          }

          .faculty-name {
            font-size: 1.2rem;
            color: #60a5fa;
            font-weight: 600;
            margin-bottom: 0.5rem;
          }

          .project-info {
            color: rgba(255, 255, 255, 0.8);
            font-size: 1.1rem;
          }

          /* Stats Section */
          .stats-section {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            margin-bottom: 6rem;
          }

          .stat-card {
            background: rgba(59, 130, 246, 0.1);
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 1.5rem;
            padding: 2.5rem;
            text-align: center;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
          }

          .stat-card:hover {
            background: rgba(59, 130, 246, 0.15);
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(59, 130, 246, 0.2);
          }

          .stat-number {
            font-size: 3rem;
            font-weight: 700;
            color: #60a5fa;
            margin-bottom: 1rem;
          }

          .stat-label {
            font-size: 1rem;
            color: rgba(255, 255, 255, 0.8);
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          /* Team Section */
          .team-section {
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

          .team-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 3rem;
          }

          .member-card {
            background: rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(59, 130, 246, 0.2);
            border-radius: 2rem;
            padding: 3rem;
            text-align: center;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            cursor: pointer;
          }

          .member-card::before {
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

          .member-card:hover::before {
            opacity: 1;
          }

          .member-card:hover {
            transform: translateY(-10px) scale(1.02);
            border-color: rgba(59, 130, 246, 0.5);
            box-shadow: 0 25px 50px rgba(59, 130, 246, 0.3);
          }

          .member-avatar {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin: 0 auto 2rem;
            background: linear-gradient(45deg, #3b82f6, #60a5fa);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
            color: white;
            font-weight: 700;
            transition: all 0.3s ease;
            position: relative;
            z-index: 2;
            overflow: hidden;
          }

          .member-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
          }

          .member-card:hover .member-avatar {
            transform: scale(1.1) rotate(10deg);
            box-shadow: 0 15px 30px rgba(59, 130, 246, 0.4);
          }

          .member-name {
            font-size: 1.8rem;
            font-weight: 700;
            color: white;
            margin-bottom: 0.5rem;
            position: relative;
            z-index: 2;
          }

          .member-role {
            font-size: 1.1rem;
            color: #60a5fa;
            font-weight: 600;
            margin-bottom: 1.5rem;
            position: relative;
            z-index: 2;
          }

          .member-description {
            color: rgba(255, 255, 255, 0.8);
            line-height: 1.6;
            margin-bottom: 2rem;
            position: relative;
            z-index: 2;
          }

          .member-skills {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            justify-content: center;
            margin-bottom: 1.5rem;
            position: relative;
            z-index: 2;
          }

          .skill-tag {
            background: rgba(59, 130, 246, 0.2);
            color: #60a5fa;
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            border: 1px solid rgba(59, 130, 246, 0.3);
          }

          .member-contact {
            color: rgba(255, 255, 255, 0.6);
            font-size: 0.9rem;
            position: relative;
            z-index: 2;
          }

          .contact-link {
            color: #60a5fa;
            text-decoration: none;
            transition: color 0.3s ease;
          }

          .contact-link:hover {
            color: #3b82f6;
          }

          /* Achievements Section */
          .achievements-section {
            background: rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(59, 130, 246, 0.2);
            border-radius: 2rem;
            padding: 4rem;
            margin-bottom: 6rem;
          }

          .achievements-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
          }

          .achievement-card {
            background: rgba(59, 130, 246, 0.1);
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 1.5rem;
            padding: 2rem;
            text-align: center;
            transition: all 0.3s ease;
          }

          .achievement-card:hover {
            background: rgba(59, 130, 246, 0.15);
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(59, 130, 246, 0.2);
          }

          .achievement-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
          }

          .achievement-title {
            font-size: 1.3rem;
            font-weight: 700;
            color: white;
            margin-bottom: 0.5rem;
          }

          .achievement-description {
            color: rgba(255, 255, 255, 0.8);
            font-size: 0.9rem;
          }

          /* Project Timeline */
          .timeline-section {
            margin-bottom: 6rem;
          }

          .timeline-container {
            background: rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(59, 130, 246, 0.2);
            border-radius: 2rem;
            padding: 4rem;
          }

          .timeline-items {
            display: grid;
            gap: 2rem;
            margin-top: 3rem;
          }

          .timeline-item {
            display: grid;
            grid-template-columns: 150px 1fr;
            gap: 2rem;
            align-items: center;
            padding: 2rem;
            background: rgba(59, 130, 246, 0.05);
            border-radius: 1rem;
            border-left: 4px solid #60a5fa;
          }

          .timeline-date {
            font-weight: 700;
            color: #60a5fa;
            font-size: 1.1rem;
          }

          .timeline-content {
            color: rgba(255, 255, 255, 0.9);
          }

          .timeline-title {
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: white;
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
            .team-grid {
              grid-template-columns: 1fr;
            }

            .achievements-grid {
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            }

            .stats-section {
              grid-template-columns: repeat(2, 1fr);
            }

            .timeline-item {
              grid-template-columns: 1fr;
              text-align: center;
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

            .stats-section {
              grid-template-columns: 1fr;
            }

            .university-info, .achievements-section, .timeline-container {
              padding: 2rem;
            }

            .social-links {
              gap: 1rem;
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

            .member-card {
              padding: 2rem;
            }

            .member-avatar {
              width: 120px;
              height: 120px;
              font-size: 2.5rem;
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
          {/* Hero Section */}
          <section className="hero-section">
            <h2 className="hero-title">
              Meet the <span className="title-highlight">Hardware Hackers</span>
            </h2>
            <p className="hero-subtitle">First-Year Innovators | University of Moratuwa</p>
            <p className="hero-description">
              We are a passionate team of four first-year undergraduate students from the 
              Faculty of Information Technology, University of Moratuwa. Our mission is to 
              push the boundaries of hardware innovation through creative problem-solving 
              and cutting-edge technology.
            </p>
            
            <div className="university-info">
              <h3 className="university-name">University of Moratuwa</h3>
              <p className="faculty-name">Faculty of Information Technology</p>
              <p className="project-info">First-Year Hardware Project • 3D LED Cube Innovation</p>
            </div>
          </section>

          {/* Stats Section */}
          <section className="stats-section">
            {projectStats.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </section>

          {/* Team Section */}
          <section className="team-section">
            <h3 className="section-title">Our Team</h3>
            <div className="team-grid">
              {teamMembers.map((member, idx) => (
                <div 
                  key={idx} 
                  className="member-card"
                  onClick={() => setActiveTeamMember(idx)}
                >
                  <div className="member-avatar">
                    {!imageErrors[idx] ? (
                      <img 
                        src={member.image} 
                        alt={member.name}
                        onError={() => handleImageError(idx)}
                      />
                    ) : (
                      member.name.split(' ').map(n => n[0]).join('')
                    )}
                  </div>
                  <h4 className="member-name">{member.name}</h4>
                  <p className="member-role">{member.role}</p>
                  <p className="member-description">{member.description}</p>
                  <div className="member-skills">
                    {member.skills.map((skill, skillIdx) => (
                      <span key={skillIdx} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                  <div className="member-contact">
                    <a href={`mailto:${member.contact}`} className="contact-link">
                      {member.contact}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Achievements Section */}
          <section className="achievements-section">
            <h3 className="section-title">Our Achievements</h3>
            <div className="achievements-grid">
              {achievements.map((achievement, idx) => (
                <div key={idx} className="achievement-card">
                  <div className="achievement-icon">{achievement.icon}</div>
                  <h4 className="achievement-title">{achievement.title}</h4>
                  <p className="achievement-description">{achievement.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Project Timeline */}
          <section className="timeline-section">
            <h3 className="section-title">Project Journey</h3>
            <div className="timeline-container">
              <div className="timeline-items">
                <div className="timeline-item">
                  <div className="timeline-date">Week 1-2</div>
                  <div className="timeline-content">
                    <div className="timeline-title">Concept & Planning</div>
                    <div>Initial brainstorming, research, and project scope definition</div>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">Week 3-6</div>
                  <div className="timeline-content">
                    <div className="timeline-title">Design & Prototyping</div>
                    <div>Circuit design, 3D modeling, and component selection</div>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">Week 7-10</div>
                  <div className="timeline-content">
                    <div className="timeline-title">Development & Assembly</div>
                    <div>Hardware assembly, firmware development, and initial testing</div>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">Week 11-14</div>
                  <div className="timeline-content">
                    <div className="timeline-title">Testing & Refinement</div>
                    <div>Software optimization, pattern creation, and final adjustments</div>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">Week 15-16</div>
                  <div className="timeline-content">
                    <div className="timeline-title">Launch & Documentation</div>
                    <div>Project presentation, documentation, and web interface completion</div>
                  </div>
                </div>
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

export default About;