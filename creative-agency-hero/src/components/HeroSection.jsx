import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, useGLTF, Text } from '@react-three/drei';
import ThreeScene from './ThreeScene';
import '../styles/HeroSection.css';

const HeroSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalScrollHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="hero-wrapper">
      {/* 3D Canvas Background */}
      <div className="hero-canvas-container">
        <Canvas
          ref={canvasRef}
          camera={{ position: [0, 2, 5], fov: 75 }}
          className="hero-canvas"
        >
          <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={75} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 10, 7]} intensity={0.8} />
          <directionalLight position={[-5, 5, -7]} intensity={0.4} />
          <ThreeScene scrollProgress={scrollProgress} />
        </Canvas>
      </div>

      {/* Hero Content */}
      <section className="hero-content">
        <nav className="navbar">
          <div className="nav-logo">
            <span className="star">★</span>
            <span className="brand">AURELIA</span>
            <sup className="registered">®</sup>
          </div>
          <ul className="nav-menu">
            <li><a href="#home">HOME</a></li>
            <li><a href="#about">ABOUT US</a></li>
            <li><a href="#services">OUR SERVICES</a></li>
            <li><a href="#portfolio">PORTFOLIO</a></li>
            <li><a href="#pages">PAGES</a></li>
            <li><a href="#contact">CONTACT US</a></li>
          </ul>
          <div className="nav-contact">
            <span className="phone-icon">☎</span>
            <span className="phone-text">PHONE NUMBER<br />+43 073 5073 3076</span>
          </div>
        </nav>

        <div className="hero-main">
          <div className="stats-column">
            <div className="stat-item">
              <span className="stat-label">THE EXPERT TEAM BEHIND A CREATIVE VISION</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-name">HAPPY CLIENT</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">125+</span>
              <span className="stat-name">PROJECT DONE</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">450+</span>
              <span className="stat-name">MEDIA FEATURED</span>
            </div>
          </div>

          <div className="hero-center">
            <div 
              className="text-creative" 
              style={{ 
                opacity: scrollProgress < 0.4 ? scrollProgress / 0.4 : 1
              }}
            >
              CREATIVE
            </div>
            <div 
              className="text-agency" 
              style={{ 
                opacity: scrollProgress > 0.4 ? (scrollProgress - 0.4) / 0.6 : 0,
                textShadow: scrollProgress > 0.4 
                  ? `0 0 ${20 + (scrollProgress - 0.4) / 0.6 * 30}px #00ff99, 0 0 ${10 + (scrollProgress - 0.4) / 0.6 * 15}px #00ff99`
                  : '0 0 0px transparent'
              }}
            >
              AGENCY
            </div>
          </div>

          <div className="cta-column">
            <p className="hero-description">
              Lorem ipsum sit consectetur sit ut ut lorem eros est proinso lorem utt et lorem utis purus ultricium fuquin leo sem.
            </p>
            <button className="cta-button">
              GET STARTED
              <span className="arrow">→</span>
            </button>
            <div className="play-icon">▶</div>
          </div>
        </div>

        <div className="hero-footer">
          <span className="footer-text">BRANDING + GRAPHIC DESIGN + WEB DESIGN + DIGITAL MARKETING + UX/UI DESIGN</span>
        </div>
      </section>

      {/* Scroll Content */}
      <section className="scroll-content">
        <h2>Experience Our Work</h2>
        <p>As you scroll, watch the 3D model move across the screen while the camera rotates and text effects come into play. This is just the beginning of what we can create for your brand.</p>
        <div style={{ marginTop: '4rem' }}>
          <h3>Our Services</h3>
          <p>We specialize in creating immersive digital experiences that captivate and engage your audience through cutting-edge 3D animation, parallax effects, and interactive design.</p>
        </div>
      </section>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <span>{Math.round(scrollProgress * 100)}%</span>
      </div>
    </div>
  );
};

export default HeroSection;
