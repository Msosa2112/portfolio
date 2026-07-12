import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button') || e.target.closest('.bento-card')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="custom-cursor"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
          scale: isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)'
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <style>{`
        .custom-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: difference;
        }

        /* Hide default cursor globally */
        body {
          cursor: none;
        }
        
        a, button, .bento-card {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
