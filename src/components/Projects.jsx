import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import SandboxModal from './sandbox/SandboxModal';

const PROJECT_ITEMS = [
  {
    title: "Barba CRM",
    category: "CRM / Web App",
    description: "A modern, AI-powered CRM built for construction professionals, featuring a highly intuitive UI and real-time data sync via Supabase.",
    themeColor: "indigo",
    badgeColor: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
    glow: "rgba(94,106,210,0.45)",
    exploreUrl: null
  },
  {
    title: "ZHomes",
    category: "Real Estate",
    description: "Global transaction coordinator platform featuring an integrated AI Copilot for real estate professionals.",
    themeColor: "cyan",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
    glow: "rgba(6,182,212,0.45)",
    exploreUrl: "https://zhomesapp.com"
  },
  {
    title: "Edward Siding",
    category: "Marketing / SEO",
    description: "A highly optimized marketing landing page with custom SEO, robots.txt, and a spectacular photo gallery.",
    themeColor: "amber",
    badgeColor: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    glow: "rgba(245,158,11,0.45)",
    exploreUrl: "https://edwardsidingandgutters.com/"
  },
  {
    title: "Outdoor MS",
    category: "Microservices",
    description: "Microservice integration for scalable DOOH (Digital Out of Home) advertising platforms.",
    themeColor: "emerald",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    glow: "rgba(16,185,129,0.45)",
    exploreUrl: null
  }
];

// Individual Project Card Section with 3D Zoom Tunnel Transitions
function ProjectSection({ item, index, scrollYProgress, onExplore }) {
  // Math bounds for project i
  const startIn = 0.12 + index * 0.17;
  const center = startIn + 0.08;
  const startOut = center + 0.08;
  const endOut = startOut + 0.06;

  // Transforms: scale up and fade out as scroll progress advances
  const scale = useTransform(
    scrollYProgress,
    [startIn, center, startOut, endOut],
    [0.35, 1.0, 1.0, 3.8]
  );

  const opacity = useTransform(
    scrollYProgress,
    [startIn, startIn + 0.05, startOut + 0.02, endOut],
    [0.0, 1.0, 1.0, 0.0]
  );

  const y = useTransform(
    scrollYProgress,
    [startIn, center, startOut, endOut],
    [100, 0, 0, -120]
  );

  // Hook-driven pointer state to avoid overlapping interaction
  const [isActive, setIsActive] = useState(false);
  React.useEffect(() => {
    return scrollYProgress.onChange((val) => {
      setIsActive(val >= startIn + 0.02 && val <= startOut + 0.02);
    });
  }, [scrollYProgress, startIn, startOut]);

  return (
    <motion.div
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
        pointerEvents: isActive ? 'auto' : 'none',
        zIndex: isActive ? 25 : 0
      }}
      className="px-6 flex items-center justify-center bg-transparent"
    >
      <div 
        style={{ boxShadow: isActive ? `0 25px 50px -12px ${item.glow}` : 'none' }}
        className="max-w-md w-full bg-black/50 backdrop-blur-lg rounded-2xl border border-white/5 p-6 md:p-8 shadow-2xl space-y-4 text-center glass-panel"
      >
        <div className="flex items-center justify-between">
          <span className={`text-[8.5px] font-black uppercase tracking-widest px-3 py-1 rounded ${item.badgeColor}`}>
            {item.category}
          </span>
          <span className="text-zinc-500 font-mono text-[10px] font-black">
            0{index + 1} / 0{PROJECT_ITEMS.length}
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider font-sans leading-none mt-2">
          {item.title}
        </h3>

        <p className="text-[11.5px] text-zinc-300 leading-relaxed font-medium">
          {item.description}
        </p>

        {(item.exploreUrl || item.title.includes("Barba")) && (
          <button
            onClick={() => onExplore(item)}
            className="w-full py-3 bg-white hover:bg-zinc-200 text-black font-black text-[10px] uppercase tracking-widest rounded-lg flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all shadow-md font-sans mt-4"
          >
            <span>Explore Project</span>
            {item.exploreUrl ? <ExternalLink size={11} /> : <ArrowRight size={11} />}
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  const handleExplore = (item) => {
    if (item.title.includes("Barba")) {
      setIsSandboxOpen(true);
    } else if (item.exploreUrl) {
      window.open(item.exploreUrl, "_blank");
    }
  };

  const handleIndicatorClick = (idx) => {
    const pageHeight = window.innerHeight || 800;
    // Scroll smoothly to center of project idx
    const startIn = 0.12 + idx * 0.17;
    const center = startIn + 0.08;
    window.scrollTo({ top: center * pageHeight * 6.0, behavior: 'smooth' }); // driven by 600vh scrollbar spacer
  };

  // Compute current active dot index based on scroll progress
  const [activeDot, setActiveDot] = useState(0);
  React.useEffect(() => {
    return scrollYProgress.onChange((val) => {
      let activeIdx = 0;
      for (let i = 0; i < PROJECT_ITEMS.length; i++) {
        const startIn = 0.12 + i * 0.17;
        const endOut = startIn + 0.22;
        if (val >= startIn && val <= endOut) {
          activeIdx = i;
          break;
        }
      }
      setActiveDot(activeIdx);
    });
  }, [scrollYProgress]);

  // Is projects section currently in view range
  const [showIndicators, setShowIndicators] = useState(false);
  React.useEffect(() => {
    return scrollYProgress.onChange((val) => {
      setShowIndicators(val >= 0.10 && val <= 0.84);
    });
  }, [scrollYProgress]);

  return (
    <div className="relative w-full">
      {/* 3D Zoom sections */}
      {PROJECT_ITEMS.map((item, idx) => (
        <ProjectSection
          key={idx}
          index={idx}
          item={item}
          scrollYProgress={scrollYProgress}
          onExplore={handleExplore}
        />
      ))}

      {/* Persistent 3D Indicators overlay in Projects region */}
      <AnimatePresence>
        {showIndicators && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="fixed bottom-8 left-0 right-0 z-30 flex flex-col items-center justify-center gap-2 pointer-events-auto"
          >
            <p className="text-zinc-500 font-mono text-[9px] uppercase tracking-widest mb-1">
              {PROJECT_ITEMS[activeDot].title} — Scroll para continuar
            </p>
            <div className="flex items-center gap-2">
              {PROJECT_ITEMS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleIndicatorClick(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeDot ? 'w-6 bg-indigo-500' : 'w-1.5 bg-zinc-700 hover:bg-zinc-500'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SandboxModal
        isOpen={isSandboxOpen}
        onClose={() => setIsSandboxOpen(false)}
      />
    </div>
  );
}
