import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Briefcase, User, Mail } from 'lucide-react';

const navItems = [
  { id: 'home', icon: Home, label: 'Home', href: '#' },
  { id: 'work', icon: Briefcase, label: 'Work', href: '#work' },
  { id: 'about', icon: User, label: 'About', href: '#about' },
  { id: 'contact', icon: Mail, label: 'Contact', href: '#contact' }
];

const Navbar = ({ onNavClick }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isTouch, setIsTouch] = useState(false);

  React.useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  const handleNavClick = (e, itemId) => {
    e.preventDefault();
    if (onNavClick) onNavClick();
    const pageHeight = window.innerHeight || 800;
    const totalHeight = pageHeight * 6.0; // Matches the 600vh scroll-spacer

    let targetScroll = 0;
    if (itemId === 'work') {
      targetScroll = 0.20 * totalHeight; // Scroll to first project
    } else if (itemId === 'about') {
      targetScroll = 0.20 * totalHeight; // Scroll to work/about info region
    } else if (itemId === 'contact') {
      targetScroll = 0.95 * totalHeight; // Scroll to contact at the bottom
    }

    if (window.lenis) {
      window.lenis.scrollTo(targetScroll, { duration: 1.2 });
    } else {
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.nav 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: 'auto', zIndex: 10000 }}
      className="dock-container"
    >
      <div className="dock glass-panel">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isHovered = hoveredIndex === index;
          const isNeighbor = hoveredIndex !== null && Math.abs(hoveredIndex - index) === 1;
          
          return (
            <a 
              key={item.id}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.id)}
              className="dock-item"
              onMouseEnter={() => { if (!isTouch) setHoveredIndex(index); }}
              onMouseLeave={() => { if (!isTouch) setHoveredIndex(null); }}
            >
              <AnimatePresence>
                {isHovered && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: -45, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="tooltip glass-pill"
                  >
                    {item.label}
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div
                animate={{
                  scale: isHovered ? 1.5 : isNeighbor ? 1.15 : 1,
                  y: isHovered ? -12 : isNeighbor ? -6 : 0
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="icon-container"
              >
                <Icon size={20} strokeWidth={2} />
              </motion.div>
            </a>
          );
        })}
      </div>

      <style>{`
        .dock-container {
          position: fixed;
          bottom: 2rem;
          left: 0;
          right: 0;
          margin: 0 auto;
          width: max-content;
          display: flex;
          justify-content: center;
          z-index: 10000;
          pointer-events: auto;
        }

        .dock {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 24px;
          background: rgba(10, 10, 15, 0.4);
          box-shadow: 0 10px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .dock-item {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          color: var(--text-secondary);
          transition: color 0.3s ease;
          text-decoration: none;
        }

        .dock-item:hover {
          color: var(--text-primary);
        }

        .icon-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .tooltip {
          position: absolute;
          top: 0;
          white-space: nowrap;
          padding: 0.4rem 0.8rem;
          font-size: 0.85rem;
          font-weight: 500;
          pointer-events: none;
          color: white;
          background: rgba(0, 0, 0, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;
