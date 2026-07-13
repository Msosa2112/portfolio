import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Hand } from 'lucide-react';
import SandboxModal from './sandbox/SandboxModal';

const PROJECT_ITEMS = [
  {
    title: "Barba Construction CRM",
    category: "CRM / Web App",
    description: "A modern, AI-powered CRM built for construction professionals, featuring a highly intuitive UI and real-time data sync via Supabase.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2371&auto=format&fit=crop",
    glow: "rgba(94,106,210,0.4)",
    themeColor: "from-indigo-600/10 to-indigo-900/30",
    borderColor: "border-indigo-500/20",
    badgeColor: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
    exploreUrl: null
  },
  {
    title: "ZHomes TC Platform",
    category: "Real Estate Platform",
    description: "Global transaction coordinator platform featuring an integrated AI Copilot for real estate professionals.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2346&auto=format&fit=crop",
    glow: "rgba(6,182,212,0.4)",
    themeColor: "from-cyan-600/10 to-cyan-900/30",
    borderColor: "border-cyan-500/20",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
    exploreUrl: "https://zhomesapp.com"
  },
  {
    title: "Edward Siding & Gutters",
    category: "Marketing / SEO",
    description: "A highly optimized marketing landing page with custom SEO, robots.txt, and a spectacular photo gallery.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2340&auto=format&fit=crop",
    glow: "rgba(245,158,11,0.4)",
    themeColor: "from-amber-600/10 to-amber-900/30",
    borderColor: "border-amber-500/20",
    badgeColor: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    exploreUrl: "https://edwardsidingandgutters.com/"
  },
  {
    title: "Outdoor Advertising MS",
    category: "Microservices / APIs",
    description: "Microservice integration for scalable DOOH (Digital Out of Home) advertising platforms.",
    image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2342&auto=format&fit=crop",
    glow: "rgba(16,185,129,0.4)",
    themeColor: "from-emerald-600/10 to-emerald-900/30",
    borderColor: "border-emerald-500/20",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    exploreUrl: null
  }
];

export default function Projects() {
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const [progress, setProgress] = useState(50);
  const [isMobile, setIsMobile] = useState(false);
  
  const isDown = useRef(false);
  const startX = useRef(0);
  
  const speedWheel = 0.05;
  const speedDrag = -0.15;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleExplore = (item) => {
    if (item.title.includes("Barba")) {
      setIsSandboxOpen(true);
    } else if (item.exploreUrl) {
      window.open(item.exploreUrl, "_blank");
    }
  };

  // Animate values based on progress
  const activeFloat = (progress / 100) * (PROJECT_ITEMS.length - 1);
  const activeIndex = Math.min(PROJECT_ITEMS.length - 1, Math.max(0, Math.round(activeFloat)));
  const currentProject = PROJECT_ITEMS[activeIndex];

  // Handlers
  const handleWheel = (e) => {
    setProgress(prev => Math.max(0, Math.min(100, prev + e.deltaY * speedWheel)));
  };

  const handleMouseDown = (e) => {
    isDown.current = true;
    startX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const diff = clientX - startX.current;
    const mouseProgress = diff * speedDrag;
    
    setProgress(prev => Math.max(0, Math.min(100, prev + mouseProgress)));
    startX.current = clientX;
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  const handleCardClick = (idx) => {
    // Smoothly transition progress to center the clicked card
    const targetProgress = (idx / (PROJECT_ITEMS.length - 1)) * 100;
    setProgress(targetProgress);
  };

  return (
    <section id="work" className="w-full max-w-[1200px] px-4 py-16 mx-auto relative font-sans select-none overflow-hidden">
      {/* Section Title */}
      <div className="mb-12 space-y-3 text-center md:text-left">
        <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full font-black uppercase tracking-widest inline-block">
          Selected Work
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Featured <span className="text-gradient">Projects</span>
        </h2>
        <p className="text-zinc-400 text-xs md:text-sm max-w-md leading-relaxed font-medium">
          Arrastra horizontalmente o usa la rueda del ratón para explorar mis proyectos interactivos.
        </p>
      </div>

      {/* Interactive 3D Perspective Carousel Container */}
      <div 
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        className="w-full h-[460px] md:h-[500px] relative flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="absolute top-2 text-[8.5px] text-zinc-500 font-bold uppercase tracking-widest flex items-center gap-1 pointer-events-none">
          <Hand size={11} /> Arrastra horizontalmente para navegar
        </div>

        {PROJECT_ITEMS.map((item, idx) => {
          const diff = idx - activeFloat;
          const absDiff = Math.abs(diff);
          
          // Spatial 3D Calculations
          const translateX = isMobile ? diff * 155 : diff * 320;
          const translateZ = -absDiff * 140;
          const rotateY = diff * -32;
          const zIndex = Math.round(100 - absDiff * 10);
          
          // Disappearing at screen edges (fade to 0 as it moves away from center)
          const opacity = Math.max(0, 1 - absDiff * 0.65);
          const isActive = idx === activeIndex;

          return (
            <div
              key={idx}
              onClick={() => handleCardClick(idx)}
              style={{
                transform: `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateY}deg)`,
                zIndex,
                opacity,
                pointerEvents: opacity < 0.15 ? 'none' : 'auto',
                boxShadow: isActive ? `0 20px 50px -15px ${item.glow}` : '0 10px 25px rgba(0,0,0,0.5)',
                transition: isDown.current ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease'
              }}
              className={`absolute w-[270px] md:w-[350px] h-[340px] md:h-[400px] rounded-[24px] border ${
                isActive ? item.borderColor : 'border-zinc-900/50'
              } bg-gradient-to-br ${item.themeColor} bg-[#0b0c10]/95 backdrop-blur-xl p-5 md:p-6 flex flex-col justify-between overflow-hidden`}
            >
              {/* Card visual representation */}
              <div 
                className="h-28 md:h-40 w-full rounded-[16px] bg-cover bg-center shrink-0 border border-zinc-900/40"
                style={{ backgroundImage: `url(${item.image})` }}
              />

              {/* Text metadata */}
              <div className="flex-1 flex flex-col justify-between pt-4">
                <div className="space-y-1.5 text-left">
                  <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest block">
                    {item.category}
                  </span>
                  <h4 className="text-sm md:text-base font-black text-white leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[10px] md:text-xs text-zinc-400 leading-relaxed font-medium line-clamp-3 md:line-clamp-4">
                    {item.description}
                  </p>
                </div>

                {/* Explore Trigger */}
                {isActive && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExplore(item);
                    }}
                    className="w-full py-2.5 bg-white hover:bg-zinc-200 text-black font-black text-[9px] md:text-[10px] uppercase tracking-wider rounded-xl flex items-center justify-center gap-1 active:scale-95 transition-all mt-4"
                  >
                    <span>Explore Project</span>
                    {item.exploreUrl ? <ExternalLink size={11} /> : <ArrowRight size={11} />}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress indicators / dots */}
      <div className="flex justify-center items-center gap-2 mt-4">
        {PROJECT_ITEMS.map((_, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={idx}
              onClick={() => handleCardClick(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                isActive ? 'w-6 bg-indigo-500' : 'w-1.5 bg-zinc-700 hover:bg-zinc-600'
              }`}
            />
          );
        })}
      </div>

      <SandboxModal
        isOpen={isSandboxOpen}
        onClose={() => setIsSandboxOpen(false)}
      />
    </section>
  );
}
