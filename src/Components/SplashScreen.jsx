import React, { useEffect, useState } from 'react';
import '../styles/Splash.css';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3500); // Show splash for 3.5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="splash-container">
      {/* Animated gradient background */}
      <div className="splash-gradient-bg"></div>

      {/* Floating particles */}
      <div className="splash-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`particle particle-${i % 5}`}></div>
        ))}
      </div>

      {/* Main content */}
      <div className="splash-content">
        {/* Cinematic bars effect */}
        <div className="cinema-bars">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        {/* Logo/Icon with glow */}
        <div className="splash-logo">
          <div className="logo-glow"></div>
          <div className="logo-core">
            <span className="logo-text">🎬</span>
          </div>
        </div>

        {/* Title with letter animation */}
        <h1 className="splash-title">
          {'ScreenFlix'.split('').map((letter, i) => (
            <span key={i} className="title-letter" style={{ animationDelay: `${i * 0.05}s` }}>
              {letter}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p className="splash-subtitle">EXPLORE THE WORLD OF CINEMA</p>

        {/* Animated line */}
        <div className="splash-line"></div>

        {/* Progress bar with gradient */}
        <div className="splash-progress">
          <div className="progress-fill"></div>
        </div>

        {/* Loading text */}
        <p className="loading-text">LOADING...</p>
      </div>

      {/* Bottom accent */}
      <div className="splash-footer">
        <div className="footer-accent"></div>
      </div>
    </div>
  );
}
