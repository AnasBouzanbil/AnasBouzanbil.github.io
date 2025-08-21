'use client';

import { useEffect, useState } from 'react';
import AIChat from "@/components/ai-chat";

export default function Home() {
  const [flickerText, setFlickerText] = useState('ANAS BOUZANBIL');
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const originalName = 'ANAS BOUZANBIL';
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?~`';
    
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchActive(true);
        let glitched = originalName.split('').map(char => {
          if (char === ' ') return ' ';
          return Math.random() > 0.8 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char;
        }).join('');
        setFlickerText(glitched);
        
        setTimeout(() => {
          setFlickerText(originalName);
          setGlitchActive(false);
        }, 100);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323:wght@400&family=Share+Tech+Mono:wght@400&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'VT323', 'Share Tech Mono', 'Courier New', monospace;
          background: 
            radial-gradient(circle at 20% 80%, #120458 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, #1a0845 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, #0a0320 0%, transparent 50%),
            linear-gradient(135deg, #2d1b69 0%, #11052c 100%);
          background-attachment: fixed;
          color: #00ff00;
          min-height: 100vh;
          overflow-x: hidden;
          line-height: 1.6;
        }

        .scanlines {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            transparent 50%,
            rgba(0, 255, 0, 0.03) 50%
          );
          background-size: 100% 4px;
          pointer-events: none;
          z-index: 1;
          animation: scanlines 0.1s linear infinite;
        }

        @keyframes scanlines {
          0% { background-position: 0 0; }
          100% { background-position: 0 4px; }
        }

        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 2rem;
          position: relative;
          z-index: 2;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
        }

        .retro-box {
          background: rgba(0, 0, 0, 0.85);
          border: 3px solid #00ff00;
          border-radius: 0;
          padding: 3rem 2.5rem;
          text-align: center;
          box-shadow: 
            0 0 30px rgba(0, 255, 0, 0.5),
            inset 0 0 30px rgba(0, 255, 0, 0.1),
            0 0 0 1px rgba(0, 255, 0, 0.2);
          max-width: 700px;
          width: 100%;
          position: relative;
          margin: 0 auto;
          backdrop-filter: blur(2px);
        }

        .retro-box::before {
          content: '';
          position: absolute;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          background: linear-gradient(45deg, 
            #00ff00 0%, 
            #ff0080 25%, 
            #0080ff 50%, 
            #ffff00 75%, 
            #00ff00 100%);
          z-index: -1;
          border-radius: 0;
          animation: borderGlow 3s linear infinite;
        }

        @keyframes borderGlow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .name {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: normal;
          color: #00ff00;
          text-shadow: 
            0 0 10px #00ff00, 
            0 0 20px #00ff00,
            0 0 30px #00ff00;
          margin-bottom: 2rem;
          letter-spacing: 3px;
          position: relative;
          font-family: 'VT323', monospace;
          line-height: 1.2;
        }

        .name.glitch {
          animation: glitch 0.1s;
          color: #ff0080;
          text-shadow: 
            -2px 0 #00ff00,
            2px 0 #0080ff,
            0 0 10px #ff0080;
        }

        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }

        .typewriter {
          font-size: clamp(1.2rem, 3.5vw, 1.6rem);
          color: #ffff00;
          margin-bottom: 2.5rem;
          border-right: 3px solid #ffff00;
          white-space: nowrap;
          overflow: hidden;
          animation: typewriter 4s steps(60) 1s forwards, blink 1s infinite;
          width: 0;
          margin-left: auto;
          margin-right: auto;
          font-family: 'VT323', monospace;
          text-shadow: 0 0 5px #ffff00;
          line-height: 1.4;
        }

        @keyframes typewriter {
          to { width: 100%; }
        }

        @keyframes blink {
          50% { border-color: transparent; }
        }

        .contact {
          font-size: clamp(1rem, 3vw, 1.3rem);
          color: #00ffff;
          margin-top: 2rem;
          padding: 1.5rem;
          border: 1px solid rgba(0, 255, 255, 0.3);
          background: rgba(0, 255, 255, 0.05);
          border-radius: 0;
          font-family: 'VT323', monospace;
          text-shadow: 0 0 5px #00ffff;
          line-height: 1.5;
        }

        .linkedin-link {
          color: #ff0080;
          text-decoration: none;
          font-weight: normal;
          text-shadow: 0 0 8px #ff0080;
          transition: all 0.3s ease;
          position: relative;
          padding: 0.2rem 0.5rem;
          border: 1px solid transparent;
        }

        .linkedin-link:hover {
          color: #00ff00;
          text-shadow: 0 0 15px #00ff00;
          animation: pulse 0.5s ease;
          border: 1px solid #00ff00;
          background: rgba(0, 255, 0, 0.1);
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .marquee {
          position: absolute;
          top: 1rem;
          left: 0;
          width: 100%;
          color: #ff0080;
          font-size: 0.9rem;
          white-space: nowrap;
          animation: scroll 20s linear infinite;
          font-family: 'VT323', monospace;
          text-shadow: 0 0 5px #ff0080;
          z-index: 3;
        }

        @keyframes scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }

        .blink {
          animation: blinkText 1.5s infinite;
          font-size: 1.2em;
          color: #00ff00;
          margin-right: 0.5rem;
        }

        @keyframes blinkText {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .retro-cursor {
          display: inline-block;
          background-color: #00ff00;
          animation: blink 1s infinite;
          width: 0.8rem;
          height: 1em;
          margin-left: 0.2rem;
        }

        .stars {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        .star {
          position: absolute;
          color: #ffffff;
          font-size: clamp(8px, 2vw, 12px);
          animation: twinkle 3s infinite;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; transform: scale(1.2); }
        }

        .crt-effect {
          position: relative;
        }

        .crt-effect::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            rgba(18, 16, 16, 0) 50%, 
            rgba(0, 0, 0, 0.25) 50%
          ), 
          linear-gradient(
            90deg,
            rgba(255, 0, 0, 0.06),
            rgba(0, 255, 0, 0.02),
            rgba(0, 0, 255, 0.06)
          );
          background-size: 100% 2px, 3px 100%;
          pointer-events: none;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .container {
            padding: 1rem;
            min-height: 100vh;
          }
          
          .retro-box {
            padding: 2rem 1.5rem;
            margin: 1rem 0;
          }
          
          .typewriter {
            white-space: normal;
            border-right: none;
            animation: none;
            width: auto;
            text-align: center;
          }
          
          .marquee {
            font-size: 0.7rem;
            top: 0.5rem;
          }

          .contact {
            padding: 1rem;
            margin-top: 1.5rem;
          }

          .name {
            letter-spacing: 2px;
            margin-bottom: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0.5rem;
          }
          
          .retro-box {
            padding: 1.5rem 1rem;
            margin: 0.5rem 0;
          }

          .marquee {
            font-size: 0.6rem;
          }

          .contact {
            padding: 0.8rem;
            margin-top: 1rem;
          }
        }

        /* High DPI displays */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .retro-box {
            border-width: 2px;
          }
          
          .retro-box::before {
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
          }
        }
      `}</style>

      <div className="scanlines"></div>
      
      <div className="stars">
        {Array.from({ length: 80 }, (_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            ★
          </div>
        ))}
      </div>

      <div className="marquee">
        *** Welcome to Anas Bouzanbil's HOME ***
      </div>

      <div className="container">
        <div className="retro-box crt-effect">
          <h1 className={`name ${glitchActive ? 'glitch' : ''}`}>
            {flickerText}<span className="retro-cursor">█</span>
          </h1>
          
          <div className="typewriter">
            Student • Mobile Developer • Web Developer
          </div>

          <div className="contact">
            <span className="blink">►</span>If you need anything, hit me up on{' '}
            <a 
              href="https://www.linkedin.com/in/anas-bouzanbil/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="linkedin-link"
            >
              LinkedIn
            </a>.
          </div>
        </div>
        <AIChat />
      </div>
    </>
  );
}