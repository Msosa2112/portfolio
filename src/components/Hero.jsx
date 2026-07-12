import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import TextMorph from './TextMorph';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="badge glass-pill"
        >
          <Sparkles size={14} className="badge-icon" />
          <span>Available for new opportunities</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="hero-title"
        >
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
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="hero-subtitle"
        >
          I am a multidisciplinary designer and developer crafting exceptional products with precision and passion.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="hero-actions"
        >
          <button className="primary-btn glass-panel">
            View Work <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 2rem;
          padding-top: 5rem;
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

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .badge-icon {
          color: var(--accent);
        }

        .hero-title {
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.03em;
        }

        .hero-subtitle {
          font-size: clamp(1.1rem, 2vw, 1.3rem);
          color: var(--text-secondary);
          max-width: 600px;
          line-height: 1.6;
          font-weight: 400;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        .primary-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          border-radius: 999px;
          color: var(--text-primary);
          font-family: inherit;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .primary-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px -10px var(--accent-glow);
        }
      `}</style>
    </section>
  );
};

export default Hero;
