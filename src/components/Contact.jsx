import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowUpRight } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="contact-card glass-panel"
      >
        <h2 className="contact-title">Let's build something <br/><span className="text-gradient">extraordinary.</span></h2>
        <p className="contact-desc">Ready to take your digital presence to the next level? I'm currently available for freelance work and new opportunities.</p>
        
        <div className="contact-actions">
          <a href="mailto:hello@example.com" className="contact-btn primary">
            <Mail size={18} /> Get in Touch
          </a>
          <a href="#" className="contact-btn secondary">
            View Resume <ArrowUpRight size={18} />
          </a>
        </div>
      </motion.div>

      <footer className="footer">
        <div className="footer-content">
          <p className="copyright">© 2026 John Doe. All rights reserved.</p>
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
          padding: 8rem 2rem 2rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6rem;
        }

        .contact-card {
          max-width: 1000px;
          width: 100%;
          padding: 6rem 4rem;
          border-radius: 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 2rem;
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
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
        }

        .contact-desc {
          color: var(--text-secondary);
          font-size: 1.2rem;
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
          font-size: 1rem;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .contact-btn.primary {
          background: var(--text-primary);
          color: var(--bg-color);
        }

        .contact-btn.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px -10px rgba(255, 255, 255, 0.3);
        }

        .contact-btn.secondary {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .contact-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .footer {
          width: 100%;
          max-width: 1200px;
          border-top: 1px solid var(--glass-border);
          padding-top: 2rem;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
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
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.3s ease;
        }

        .social-links a:hover {
          color: var(--text-primary);
        }

        @media (max-width: 768px) {
          .contact-card {
            padding: 4rem 2rem;
          }
          
          .contact-actions {
            flex-direction: column;
            width: 100%;
          }
          
          .contact-btn {
            justify-content: center;
          }

          .footer-content {
            flex-direction: column-reverse;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
