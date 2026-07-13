import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Grainient from './components/Grainient';
import ThreeCanvas from './components/ThreeCanvas';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Shared WebGL Carousel states
  const [activeIndex, setActiveIndex] = useState(0);
  const targetRotation = useRef(0);

  // Enable Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* Background grain texture shader */}
      <div className="global-grainient-wrapper">
        <Grainient
          color1="#5e3acd"
          color2="#000000"
          color3="#d0a200"
          timeSpeed={0.95}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.08}
          grainScale={2}
          grainAnimated={false}
          contrast={1.4}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      </div>

      {/* 3D WebGL Canvas Layer (Fixed background) */}
      <ThreeCanvas 
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        targetRotation={targetRotation}
      />

      {/* Top indicator bar */}
      <motion.div
        className="progress-bar"
        style={{ scaleX }}
      />

      <Navbar />
      
      {/* HTML overlay sections */}
      <main className="main-content">
        <Hero />
        
        {/* Pass WebGL hooks to allow HTML interactions with 3D space */}
        <Projects 
          activeIndex={activeIndex}
          targetRotation={targetRotation}
        />
        
        <Contact />
      </main>
      
      <style>{`
        .progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: #7C3AED;
          transform-origin: 0%;
          z-index: 1000;
        }

        .global-grainient-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: -2;
          pointer-events: none;
        }
        
        .main-content {
          position: relative;
          z-index: 10; /* Put HTML layout on top of fixed WebGL canvas */
          pointer-events: none; /* Let empty space drag fall through to WebGL */
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        /* Ensure all interactive HTML elements have pointer-events-auto */
        .main-content button,
        .main-content a,
        .main-content input,
        .main-content textarea,
        .main-content .glass-panel,
        .main-content .glass-pill {
          pointer-events: auto;
        }
      `}</style>
    </>
  );
}

export default App;
