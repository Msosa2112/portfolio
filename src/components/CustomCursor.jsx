import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const updateMousePosition = (e) => {
      if (cursorRef.current) {
        // Translate is centered by default. We use raw client coordinates.
        cursorRef.current.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
      }
    };

    const handleMouseOver = (e) => {
      if (!e.target) return;
      const isHoverable = e.target.tagName === 'A' || 
                          e.target.tagName === 'BUTTON' || 
                          e.target.closest('a') || 
                          e.target.closest('button') || 
                          e.target.closest('.td-gallery-card') ||
                          e.target.closest('.bento-card');
      if (cursorRef.current) {
        if (isHoverable) {
          cursorRef.current.classList.add('hovering');
        } else {
          cursorRef.current.classList.remove('hovering');
        }
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
      <div ref={cursorRef} className="custom-cursor" />
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
          background-color: rgba(255, 255, 255, 0.8);
          transform: translate3d(-100px, -100px, 0); /* initially offscreen */
          transition: width 0.25s cubic-bezier(0.1, 0.8, 0.3, 1), 
                      height 0.25s cubic-bezier(0.1, 0.8, 0.3, 1), 
                      background-color 0.25s ease,
                      margin 0.25s cubic-bezier(0.1, 0.8, 0.3, 1);
          will-change: transform;
        }

        .custom-cursor.hovering {
          width: 52px;
          height: 52px;
          margin-top: -16px; /* Offset to keep it centered when scaling up: (52px - 20px) / 2 = 16px */
          margin-left: -16px;
          background-color: rgba(255, 255, 255, 0.1);
        }

        /* Hide default cursor globally */
        body {
          cursor: none;
        }
        
        a, button, .td-gallery-card, .bento-card {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
