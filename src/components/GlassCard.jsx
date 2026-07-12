import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', delay = 0 }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`bento-card ${className}`}
    >
      <div 
        className="glass-background"
        style={{
          background: `
            radial-gradient(
              800px circle at ${mousePos.x}px ${mousePos.y}px,
              rgba(255,255,255,0.06),
              transparent 40%
            ),
            rgba(255, 255, 255, 0.02)
          `
        }}
      />
      <div 
        className="card-border"
        style={{
          maskImage: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
          opacity: isHovered ? 1 : 0
        }}
      />
      <div className="card-content">
        {children}
      </div>

      <style>{`
        .bento-card {
          position: relative;
          border-radius: 32px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transform-style: preserve-3d;
          box-shadow: 0 20px 40px -20px rgba(0,0,0,0.5);
          isolation: isolate;
        }

        .glass-background {
          position: absolute;
          inset: 0;
          z-index: 0;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: inherit;
          transition: background 0.3s ease;
        }

        .card-border {
          position: absolute;
          inset: 0;
          z-index: 1;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          transition: opacity 0.5s ease;
        }

        .card-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </motion.div>
  );
};

export default GlassCard;
