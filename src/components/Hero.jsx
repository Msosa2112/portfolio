import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import TextMorph from './TextMorph';

const Hero = () => {
  const { scrollYProgress } = useScroll();

  // 3D Zoom Tunnel transforms for Hero (Active from scroll 0.0 to 0.15)
  const scale = useTransform(scrollYProgress, [0, 0.15], [1, 3.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.11], [1, 0]);
  const zIndex = useTransform(scrollYProgress, [0, 0.15], [20, 0]);
  const y = useTransform(scrollYProgress, [0, 0.15], [0, -120]);

  const handleStartExploring = () => {
    // Scroll smoothly to Projects section start
    const pageHeight = window.innerHeight || 800;
    window.scrollTo({ top: pageHeight * 0.95, behavior: 'smooth' });
  };

  return (
    <motion.section 
      style={{ 
        scale, 
        opacity, 
        zIndex,
        y,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: scrollYProgress.get() < 0.12 ? 'auto' : 'none'
      }}
      className="hero-section bg-transparent"
    >
      <div className="hero-content">
        <div className="badge glass-pill">
          <Sparkles size={14} className="badge-icon" />
          <span>Available for new opportunities</span>
        </div>

        <h1 className="hero-title">
          Designing digital{' '}
          <TextMorph
            words="experiences, interfaces, products, applications, interactions"
            color="#a7b1ff"
            font={{
              fontFamily: "inherit",
              fontSize: "inherit",
              fontWeight: "inherit",
            }}
            style={{
              display: 'inline-flex',
              verticalAlign: 'baseline',
            }}
          />{' '}
          that matter.
        </h1>

        <p className="hero-subtitle">
          I am a multidisciplinary designer and developer crafting exceptional products with precision and passion.
        </p>

        <div className="hero-actions">
          <button onClick={handleStartExploring} className="primary-btn glass-panel active:scale-95 transition-all">
            View Work <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <style>{`
        .hero-section {
          padding: 0 2rem;
          padding-top: 2rem;
          text-align: center;
          overflow: hidden;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          max-width: 900px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 2rem 1.25rem 1.5rem 1.25rem;
          }
          .hero-content {
            gap: 1.25rem;
          }
        }
      `}</style>
    </motion.section>
  );
};

export default Hero;
