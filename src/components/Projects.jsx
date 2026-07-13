import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'framer-motion';
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
    logo: "/logos/barba.png",
    exploreUrl: null
  },
  {
    title: "ZHomes",
    category: "Real Estate",
    description: "Global transaction coordinator platform featuring an integrated AI Copilot for real estate professionals.",
    themeColor: "cyan",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
    glow: "rgba(6,182,212,0.45)",
    logo: "/logos/zhomes.png",
    exploreUrl: "https://zhomesapp.com"
  },
  {
    title: "Edward Siding",
    category: "Marketing / SEO",
    description: "A highly optimized marketing landing page with custom SEO, robots.txt, and a spectacular photo gallery.",
    themeColor: "amber",
    badgeColor: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    glow: "rgba(245,158,11,0.45)",
    logo: "/logos/edward.png",
    exploreUrl: "https://edwardsidingandgutters.com/"
  },
  {
    title: "Pool Extended",
    category: "Web App / Design",
    description: "Custom design and build platforms for luxury pool remodeling and landscaping spaces.",
    themeColor: "sky",
    badgeColor: "bg-sky-500/10 text-sky-400 border border-sky-500/20",
    glow: "rgba(14,165,233,0.45)",
    logo: "/logos/pool-extended.png",
    exploreUrl: null
  },
  {
    title: "Tri Lion Academy",
    category: "Education / Sports",
    description: "An elite sports training academy platform with interactive registration, scheduling, and progress tracking.",
    themeColor: "red",
    badgeColor: "bg-red-500/10 text-red-400 border border-red-500/20",
    glow: "rgba(239,68,68,0.45)",
    logo: "/logos/tri-lion.png",
    exploreUrl: null
  },
  {
    title: "Clover Jewelry",
    category: "E-Commerce / Luxury",
    description: "A premium jewelry e-commerce experience featuring high-definition showcases and custom orders.",
    themeColor: "emerald",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    glow: "rgba(16,185,129,0.45)",
    logo: "/logos/clover-jewelry.png",
    exploreUrl: null
  }
];

// Individual Project Card Section with 3D Zoom Tunnel Transitions
function ProjectSection({ item, index, scrollYProgress, onExplore }) {
  const count = PROJECT_ITEMS.length;
  // Divide the range [0.12, 0.82] dynamically by the number of projects
  const step = 0.70 / count;
  const startIn = 0.12 + index * step;
  const center = startIn + step * 0.45;
  const startOut = center + step * 0.45;
  const endOut = startOut + step * 0.1;

  // Transforms: scale up and fade out as scroll progress advances
  const scale = useTransform(
    scrollYProgress,
    [startIn, center, startOut, endOut],
    [0.35, 1.0, 1.0, 3.8]
  );

  const opacity = useTransform(
    scrollYProgress,
    [startIn, startIn + (step * 0.25), startOut + (step * 0.1), endOut],
    [0.0, 1.0, 1.0, 0.0]
  );

  const y = useTransform(
    scrollYProgress,
    [startIn, center, startOut, endOut],
    [100, 0, 0, -120]
  );

  // Hook-driven pointer state to avoid overlapping interaction
  const [isActive, setIsActive] = useState(false);

  // Set initial state
  React.useEffect(() => {
    const currentVal = scrollYProgress.get();
    setIsActive(currentVal >= startIn && currentVal <= endOut);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (val) => {
    const active = val >= startIn && val <= endOut;
    if (active !== isActive) {
      setIsActive(active);
    }
  });

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
        pointerEvents: 'none',
        zIndex: isActive ? 25 : 0
      }}
      className="px-6 flex items-center justify-center bg-transparent"
    >
      <div 
        style={{ 
          boxShadow: isActive ? `0 25px 50px -12px ${item.glow}` : 'none',
          pointerEvents: isActive ? 'auto' : 'none'
        }}
        className="max-w-md w-full bg-black/50 backdrop-blur-lg rounded-2xl border border-white/5 p-6 md:p-8 shadow-2xl space-y-4 text-center glass-panel"
      >
        <div className="flex items-center justify-between">
          <span className={`text-[8.5px] font-black uppercase tracking-widest px-3 py-1 rounded ${item.badgeColor}`}>
            {item.category}
          </span>
          <span className="text-zinc-500 font-mono text-[10px] font-black">
            0{index + 1} / 0{count}
          </span>
        </div>

        {/* Brand Logo rendering */}
        <div className="w-full flex justify-center py-2">
          <img 
            src={item.logo} 
            alt={item.title} 
            className="h-14 md:h-16 object-contain max-w-[220px] filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)]" 
          />
        </div>

        <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider font-sans leading-none mt-1">
          {item.title}
        </h3>

        <p className="text-[11.5px] text-zinc-300 leading-relaxed font-medium">
          {item.description}
        </p>

        {(item.exploreUrl || item.title.includes("Barba")) && (
          <button
            onClick={() => onExplore(item)}
            className="w-full py-3 bg-white hover:bg-zinc-200 text-black font-black text-[10px] uppercase tracking-widest rounded-lg flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all shadow-md font-sans mt-2"
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
    const count = PROJECT_ITEMS.length;
    const step = 0.70 / count;
    const startIn = 0.12 + idx * step;
    const center = startIn + step * 0.45;
    const targetScroll = center * pageHeight * 6.0;

    if (window.lenis) {
      window.lenis.scrollTo(targetScroll, { duration: 1.2 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  // Compute current active dot index based on scroll progress
  const [activeDot, setActiveDot] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (val) => {
    const count = PROJECT_ITEMS.length;
    const step = 0.70 / count;
    let activeIdx = 0;
    for (let i = 0; i < count; i++) {
      const startIn = 0.12 + i * step;
      const endOut = startIn + step + 0.05;
      if (val >= startIn && val <= endOut) {
        activeIdx = i;
        break;
      }
    }
    if (activeIdx !== activeDot) {
      setActiveDot(activeIdx);
    }
  });

  // Is projects section currently in view range
  const [showIndicators, setShowIndicators] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (val) => {
    const visible = val >= 0.10 && val <= 0.84;
    if (visible !== showIndicators) {
      setShowIndicators(visible);
    }
  });

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
