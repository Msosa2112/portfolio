import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink, Hand } from 'lucide-react';
import SandboxModal from './sandbox/SandboxModal';

const PROJECT_ITEMS = [
  {
    title: "Barba CRM",
    category: "CRM / Web App",
    description: "A modern, AI-powered CRM built for construction professionals, featuring a highly intuitive UI and real-time data sync via Supabase.",
    glow: "rgba(94,106,210,0.55)",
    themeColor: "indigo",
    exploreUrl: null
  },
  {
    title: "ZHomes",
    category: "Real Estate",
    description: "Global transaction coordinator platform featuring an integrated AI Copilot for real estate professionals.",
    glow: "rgba(6,182,212,0.55)",
    themeColor: "cyan",
    exploreUrl: "https://zhomesapp.com"
  },
  {
    title: "Edward Siding",
    category: "Marketing / SEO",
    description: "A highly optimized marketing landing page with custom SEO, robots.txt, and a spectacular photo gallery.",
    glow: "rgba(245,158,11,0.55)",
    themeColor: "amber",
    exploreUrl: "https://edwardsidingandgutters.com/"
  },
  {
    title: "Outdoor MS",
    category: "Microservices",
    description: "Microservice integration for scalable DOOH (Digital Out of Home) advertising platforms.",
    glow: "rgba(16,185,129,0.55)",
    themeColor: "emerald",
    exploreUrl: null
  }
];

export default function Projects({ activeIndex, targetRotation }) {
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const isDragging = useRef(false);
  const startX = useRef(0);

  const handlePointerDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    // Swiping left increases index, swiping right decreases index
    const dragSpeed = window.innerWidth < 768 ? 0.38 : 0.25;
    const deltaProgress = (startX.current - clientX) * dragSpeed;
    targetRotation.current = Math.min(100, Math.max(0, targetRotation.current + deltaProgress));
    startX.current = clientX;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handleWheel = (e) => {
    const sensitivity = 0.08;
    targetRotation.current = Math.min(100, Math.max(0, targetRotation.current + e.deltaY * sensitivity));
  };

  const handleCardClick = (idx) => {
    const count = PROJECT_ITEMS.length;
    const targetVal = (idx / (count - 1)) * 100;
    targetRotation.current = targetVal;
  };

  const handleExplore = (item) => {
    if (item.title.includes("Barba")) {
      setIsSandboxOpen(true);
    } else if (item.exploreUrl) {
      window.open(item.exploreUrl, "_blank");
    }
  };

  const activeProject = PROJECT_ITEMS[activeIndex];

  return (
    <section 
      id="work" 
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
      onWheel={handleWheel}
      className="w-full h-screen relative flex flex-col justify-between py-12 md:py-20 select-none overflow-hidden bg-transparent pointer-events-auto"
    >
      
      {/* Header Info */}
      <div className="w-full px-6 text-center space-y-2 mt-2 select-none shrink-0 relative z-20 pointer-events-none">
        <span className="text-[9px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full font-black uppercase tracking-widest inline-block pointer-events-auto">
          Selected Work
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none mt-1">
          Interactive <span className="text-gradient">3D Space</span>
        </h2>
        <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider flex items-center justify-center gap-1">
          <Hand size={11} className="text-zinc-500" /> Arrastra horizontalmente para navegar
        </p>
      </div>

      {/* Transparent gap where the 3D stack cards sit */}
      <div className="flex-1 min-h-[220px] pointer-events-none" />

      {/* Active Project details overlay */}
      <div className="w-full px-6 shrink-0 relative z-20 pointer-events-none mb-4 select-none">
        <div className="max-w-md mx-auto bg-black/45 backdrop-blur-md rounded-2xl border border-white/5 p-5 md:p-6 shadow-2xl space-y-3 pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/5 border border-indigo-500/10 px-2 py-0.5 rounded">
                  {activeProject.category}
                </span>
                <span className="text-zinc-500 font-mono text-[9px] font-bold">
                  0{activeIndex + 1} / 0{PROJECT_ITEMS.length}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider font-sans leading-none">
                {activeProject.title}
              </h3>

              <p className="text-[11px] text-zinc-300 leading-relaxed font-medium">
                {activeProject.description}
              </p>

              {(activeProject.exploreUrl || activeProject.title.includes("Barba")) && (
                <button
                  onClick={() => handleExplore(activeProject)}
                  className="w-full py-2.5 bg-white hover:bg-zinc-200 text-black font-black text-[10px] uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all shadow-md font-sans"
                >
                  <span>Explore Project</span>
                  {activeProject.exploreUrl ? <ExternalLink size={11} /> : <ArrowRight size={11} />}
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3D Navigation Indicators */}
        <div className="flex justify-center items-center gap-2 mt-4 pointer-events-auto">
          {PROJECT_ITEMS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleCardClick(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === activeIndex ? 'w-6 bg-indigo-500' : 'w-1.5 bg-zinc-700 hover:bg-zinc-500'
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
