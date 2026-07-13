import React from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Mail, ArrowUpRight } from 'lucide-react';

const Contact = () => {
  const { scrollYProgress } = useScroll();

  // 3D Zoom Tunnel transforms for Contact (Active from scroll 0.86 to 1.0)
  const scale = useTransform(scrollYProgress, [0.86, 0.96], [0.35, 1.0]);
  const opacity = useTransform(scrollYProgress, [0.86, 0.94], [0.0, 1.0]);
  const y = useTransform(scrollYProgress, [0.86, 0.96], [100, 0]);

  // Hook-driven pointer state to avoid overlay interaction locks
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    setIsActive(scrollYProgress.get() >= 0.88);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (val) => {
    const active = val >= 0.88;
    if (active !== isActive) {
      setIsActive(active);
    }
  });

  return (
    <motion.section 
      id="contact" 
      style={{
        scale,
        opacity,
        y,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: isActive ? 20 : 0
      }}
      className="contact-section bg-transparent"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: isActive ? 'auto' : 'none' }}
        className="contact-card glass-panel"
      >
        <h2 className="contact-title">Construyamos infraestructura <br/><span className="text-gradient">soberana.</span></h2>
        <p className="contact-desc">Desarrollamos soluciones de software hiper-personalizadas de alto valor sin ataduras. Entregamos el código fuente completo y creamos entornos de datos 105% independientes. Cero cobros de suscripción mensual.</p>
        
        <div className="contact-actions">
          <a href="mailto:info@damelaletra.com" className="contact-btn primary">
            <Mail size={18} /> Iniciar Proyecto
          </a>
        </div>
      </motion.div>

      <footer className="footer" style={{ pointerEvents: isActive ? 'auto' : 'none' }}>
        <div className="footer-content">
          <p className="copyright">© 2026 Msosa Portfolio. All rights reserved.</p>
          <div className="social-links">
            <a href="#">Twitter</a>
            <a href="#">LinkedIn</a>
            <a href="#">Dribbble</a>
          </div>
        </div>
      </footer>

      <style>{`
        .contact-section {
          width: 100%;
          padding: 4rem 1.25rem 2rem 1.25rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3rem;
          box-sizing: border-box;
        }

        .contact-card {
          max-width: 1000px;
          width: 100%;
          padding: 3rem 1.5rem;
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.5rem;
          position: relative;
          overflow: hidden;
        }

        .contact-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at 50% 0%, rgba(94, 106, 210, 0.15), transparent 60%);
          pointer-events: none;
        }

        .contact-title {
          font-size: clamp(2rem, 6vw, 4.5rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
        }

        .contact-desc {
          color: var(--text-secondary);
          font-size: clamp(0.95rem, 2vw, 1.2rem);
          max-width: 600px;
          line-height: 1.6;
        }

        .contact-actions {
          display: flex;
          gap: 1.5rem;
          margin-top: 1rem;
        }

        .contact-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          border-radius: 999px;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }

        .contact-btn.primary {
          background: var(--accent);
          color: white;
        }

        .contact-btn.primary:hover {
          background: var(--accent-hover);
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(94, 106, 210, 0.3);
        }

        .contact-btn.secondary {
          background: rgba(255, 255, 255, 0.05);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }

        .contact-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .footer {
          position: absolute;
          bottom: 2rem;
          left: 0;
          right: 0;
          width: 100%;
          padding: 0 2rem;
          box-sizing: border-box;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .copyright {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .social-links {
          display: flex;
          gap: 2rem;
        }

        .social-links a {
          color: var(--text-secondary);
          font-size: 0.9rem;
          transition: color 0.3s ease;
        }

        .social-links a:hover {
          color: white;
        }

        @media (max-width: 768px) {
          .contact-card {
            padding: 2.5rem 1.25rem;
          }
          .contact-actions {
            flex-direction: column;
            width: 100%;
            gap: 1rem;
          }
          .contact-btn {
            justify-content: center;
            width: 100%;
          }
          .footer-content {
            flex-direction: column;
            gap: 1.5rem;
            text-align: center;
          }
          .social-links {
            justify-content: center;
          }
          .footer {
            position: relative;
            bottom: auto;
            margin-top: 2rem;
          }
        }
      `}</style>
    </motion.section>
  );
};

export default Contact;
