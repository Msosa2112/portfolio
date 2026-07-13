import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink, Hand } from 'lucide-react';
import SandboxModal from './sandbox/SandboxModal';

const PROJECT_ITEMS = [
  {
    title: "Barba CRM",
    category: "CRM / Web App",
    description: "A modern, AI-powered CRM built for construction professionals, featuring a highly intuitive UI and real-time data sync via Supabase.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2371&auto=format&fit=crop",
    glow: "rgba(94,106,210,0.55)",
    themeColor: "from-indigo-600/10 to-indigo-900/30",
    borderColor: "rgba(94,106,210,0.4)",
    badgeColor: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
    exploreUrl: null
  },
  {
    title: "ZHomes",
    category: "Real Estate",
    description: "Global transaction coordinator platform featuring an integrated AI Copilot for real estate professionals.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2346&auto=format&fit=crop",
    glow: "rgba(6,182,212,0.55)",
    themeColor: "from-cyan-600/10 to-cyan-900/30",
    borderColor: "rgba(6,182,212,0.4)",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
    exploreUrl: "https://zhomesapp.com"
  },
  {
    title: "Edward Siding",
    category: "Marketing / SEO",
    description: "A highly optimized marketing landing page with custom SEO, robots.txt, and a spectacular photo gallery.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2340&auto=format&fit=crop",
    glow: "rgba(245,158,11,0.55)",
    themeColor: "from-amber-600/10 to-amber-900/30",
    borderColor: "rgba(245,158,11,0.4)",
    badgeColor: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    exploreUrl: "https://edwardsidingandgutters.com/"
  },
  {
    title: "Outdoor MS",
    category: "Microservices",
    description: "Microservice integration for scalable DOOH (Digital Out of Home) advertising platforms.",
    image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2342&auto=format&fit=crop",
    glow: "rgba(16,185,129,0.55)",
    themeColor: "from-emerald-600/10 to-emerald-900/30",
    borderColor: "rgba(16,185,129,0.4)",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    exploreUrl: null
  }
];

const getZindex = (array, index) => (
  array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i))
);

export default function Projects() {
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const [progress, setProgress] = useState(50);
  const [active, setActive] = useState(2);
  
  const isDown = useRef(false);
  const startX = useRef(0);

  const speedWheel = 0.02;
  const speedDrag = -0.12;

  useEffect(() => {
    const calculatedActive = Math.floor((progress / 100) * (PROJECT_ITEMS.length - 1));
    setActive(Math.min(PROJECT_ITEMS.length - 1, Math.max(0, calculatedActive)));
  }, [progress]);

  const handleExplore = (item) => {
    if (item.title.includes("Barba")) {
      setIsSandboxOpen(true);
    } else if (item.exploreUrl) {
      window.open(item.exploreUrl, "_blank");
    }
  };

  // Handlers
  const handleWheel = (e) => {
    const wheelProgress = e.deltaY * speedWheel;
    setProgress(prev => Math.max(0, Math.min(100, prev + wheelProgress)));
  };

  const handleMouseDown = (e) => {
    isDown.current = true;
    startX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const mouseProgress = (clientX - startX.current) * speedDrag;
    setProgress(prev => Math.max(0, Math.min(100, prev + mouseProgress)));
    startX.current = clientX;
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  const handleCardClick = (idx) => {
    if (idx === PROJECT_ITEMS.length - 1) {
      setProgress(100);
    } else {
      setProgress(((idx + 0.5) / (PROJECT_ITEMS.length - 1)) * 100);
    }
  };

  const zIndexes = getZindex(PROJECT_ITEMS, active);

  return (
    <section id="work" className="w-full min-h-[600px] py-12 md:py-20 relative flex flex-col justify-between overflow-hidden font-sans select-none">
      
      {/* 2D Curved abanico layout matching Fabio Ottaviani */}
      <style>{`
        .carousel-wrapper {
          position: relative;
          z-index: 1;
          height: 480px;
          width: 100%;
          overflow: hidden;
          pointer-events: none;
        }

        .carousel-card-item {
          --width: clamp(260px, 60vw, 340px);
          --height: clamp(340px, 80vw, 450px);
          --x: calc(var(--active-val) * 780%);
          --y: calc(var(--active-val) * 190%);
          --rot: calc(var(--active-val) * 105deg);

          overflow: hidden;
          position: absolute;
          z-index: var(--z-index-val);
          width: var(--width);
          height: var(--height);
          margin: calc(var(--height) * -0.5) 0 0 calc(var(--width) * -0.5);
          border-radius: 24px;
          top: 50%;
          left: 50%;
          user-select: none;
          transform-origin: 0% 100%;
          background: #090a0f;
          pointer-events: all;
          transform: translate(var(--x), var(--y)) rotate(var(--rot));
          transition: transform .8s cubic-bezier(0, 0.02, 0, 1), border-color .3s ease, box-shadow .5s ease;
          border-width: 1px;
        }

        .carousel-card-box {
          position: absolute;
          z-index: 1;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transition: opacity .8s cubic-bezier(0, 0.02, 0, 1);
          opacity: var(--opacity-val);
          font-family: inherit;
        }

        .carousel-card-box::before {
          content: '';
          position: absolute;
          z-index: 2;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(0, 0, 0, .4), rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.2) 60%, rgba(0, 0, 0, .85));
        }

        .carousel-card-item .num {
          position: absolute;
          z-index: 3;
          color: #fff;
          top: 15px;
          left: 20px;
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(40px, 12vw, 75px);
          font-weight: 900;
          line-height: 1;
          opacity: 0.95;
        }

        .carousel-card-item .card-content {
          position: absolute;
          z-index: 3;
          bottom: 24px;
          left: 20px;
          right: 20px;
          color: #fff;
          text-align: left;
        }

        .carousel-card-item .title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(22px, 5vw, 28px);
          font-weight: 900;
          color: #ffffff;
          line-height: 1.1;
        }

        .carousel-card-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
        }
      `}</style>

      {/* Header Info */}
      <div className="px-6 text-center space-y-2 mt-2 select-none shrink-0 relative z-30">
        <span className="text-[9px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full font-black uppercase tracking-widest inline-block">
          Selected Work
        </span>
        <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-none mt-1">
          Featured <span className="text-gradient">Projects</span>
        </h2>
        <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider flex items-center justify-center gap-1">
          <Hand size={11} className="text-zinc-500" /> Arrastra horizontalmente para navegar
        </p>
      </div>

      {/* 2D Curved Drag & Wheel Carousel Viewport */}
      <div 
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        className="carousel-wrapper flex-1"
      >
        {PROJECT_ITEMS.map((item, idx) => {
          const zIndex = zIndexes[idx];
          const activeVal = (idx - active) / PROJECT_ITEMS.length;
          const isActive = idx === active;

          // Opacity formula that allows 3 cards to be visible at once (fading side cards nicely but keeping them visible)
          const opacityVal = Math.max(0.15, 1 - Math.abs(idx - active) * 0.45);

          return (
            <div
              key={idx}
              onClick={() => handleCardClick(idx)}
              style={{
                '--active-val': activeVal,
                '--z-index-val': zIndex,
                '--opacity-val': opacityVal,
                boxShadow: isActive ? `0 20px 50px -15px ${item.glow}` : '0 10px 25px rgba(0,0,0,0.5)',
                borderColor: isActive ? item.borderColor : 'rgba(255, 255, 255, 0.04)'
              }}
              className="carousel-card-item cursor-pointer"
            >
              <div className="carousel-card-box">
                {/* Serif large Number */}
                <div className="num">0{idx + 1}</div>
                
                {/* Cover Image */}
                <img src={item.image} alt={item.title} />

                {/* Content Overlay */}
                <div className="card-content space-y-3">
                  <div>
                    <span className="text-[7.5px] font-black text-indigo-400 uppercase tracking-widest block mb-0.5">
                      {item.category}
                    </span>
                    <h4 className="title">{item.title}</h4>
                  </div>
                  
                  {isActive && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-3"
                    >
                      <p className="text-[10px] text-zinc-300 leading-relaxed font-medium line-clamp-2">
                        {item.description}
                      </p>
                      
                      {(item.exploreUrl || item.title.includes("Barba")) && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleExplore(item);
                          }}
                          className="px-4 py-2 bg-white hover:bg-zinc-200 text-black font-black text-[9px] uppercase tracking-wider rounded-lg flex items-center gap-1 active:scale-95 transition-all shadow-md"
                        >
                          <span>Explore Project</span>
                          {item.exploreUrl ? <ExternalLink size={10} /> : <ArrowRight size={10} />}
                        </button>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom text layout */}
      <div className="px-6 text-center shrink-0 relative z-30 mb-2 select-none max-w-sm mx-auto">
        <p className="text-zinc-500 font-mono text-[9px] uppercase tracking-widest leading-relaxed">
          {PROJECT_ITEMS[active].title} — {PROJECT_ITEMS[active].category}
        </p>
        
        {/* Navigation Indicators */}
        <div className="flex justify-center items-center gap-2 mt-3">
          {PROJECT_ITEMS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleCardClick(idx)}
              className={`h-1 rounded-full transition-all duration-300 ${
                idx === active ? 'w-5 bg-indigo-500' : 'w-1 bg-zinc-700'
              }`}
            />
          ))}
        </div>
      </div>

      <SandboxModal
        isOpen={isSandboxOpen}
        onClose={() => setIsSandboxOpen(false)}
      />

    </section>
  );
}
