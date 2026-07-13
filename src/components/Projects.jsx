import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import SandboxModal from './sandbox/SandboxModal';

const PROJECT_ITEMS = [
  {
    title: "Barba Construction CRM",
    category: "CRM / Web App",
    description: "A modern, AI-powered CRM built for construction professionals, featuring a highly intuitive UI and real-time data sync via Supabase.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2371&auto=format&fit=crop",
    glow: "rgba(94,106,210,0.5)",
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
    glow: "rgba(6,182,212,0.5)",
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
    glow: "rgba(245,158,11,0.5)",
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
    glow: "rgba(16,185,129,0.5)",
    themeColor: "from-emerald-600/10 to-emerald-900/30",
    borderColor: "border-emerald-500/20",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    exploreUrl: null
  }
];

export default function Projects() {
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const containerRef = useRef(null);

  const handleExplore = (item) => {
    if (item.title.includes("Barba")) {
      setIsSandboxOpen(true);
    } else if (item.exploreUrl) {
      window.open(item.exploreUrl, "_blank");
    }
  };

  return (
    <section id="work" ref={containerRef} className="w-full max-w-[1000px] px-4 py-16 mx-auto relative font-sans">
      {/* Section Title */}
      <div className="mb-16 space-y-3 text-center md:text-left select-none">
        <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full font-black uppercase tracking-widest inline-block">
          Selected Work
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Featured <span className="text-gradient">Projects</span>
        </h2>
        <p className="text-zinc-400 text-xs md:text-sm max-w-md leading-relaxed font-medium">
          A curated selection of platforms, CRM applications, and interactive web tools crafted with precision.
        </p>
      </div>

      {/* Stacking Cards List */}
      <div className="flex flex-col gap-[6vh] md:gap-[8vh]">
        {PROJECT_ITEMS.map((project, idx) => (
          <ProjectCard 
            key={idx} 
            project={project} 
            index={idx} 
            total={PROJECT_ITEMS.length} 
            onExplore={handleExplore}
          />
        ))}
      </div>

      <SandboxModal
        isOpen={isSandboxOpen}
        onClose={() => setIsSandboxOpen(false)}
      />
    </section>
  );
}

function ProjectCard({ project, index, total, onExplore }) {
  const cardRef = useRef(null);
  
  // Track scroll position of this specific card relative to viewport
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"]
  });

  // Calculate scale-down and opacity-down as the cards scroll up and stack
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95 - (total - index - 1) * 0.01]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.65]);

  // Adjust top offset slightly for each card to create the stacking stack-layered effect
  const stickyTop = `calc(90px + ${index * 20}px)`;

  return (
    <div 
      ref={cardRef} 
      style={{ top: stickyTop }} 
      className="sticky w-full z-10 py-2"
    >
      <motion.div
        style={{ 
          scale, 
          opacity,
          boxShadow: `0 15px 45px -15px ${project.glow}`
        }}
        className={`w-full rounded-[24px] border ${project.borderColor} bg-gradient-to-br ${project.themeColor} bg-[#0b0c10]/95 backdrop-blur-xl p-5 md:p-8 flex flex-col md:flex-row gap-6 md:gap-10 transition-all duration-300`}
      >
        {/* Left column: Text Content */}
        <div className="flex-1 flex flex-col justify-between space-y-4 md:space-y-6">
          <div className="space-y-3">
            <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${project.badgeColor} inline-block`}>
              {project.category}
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
              {project.title}
            </h3>
            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-medium">
              {project.description}
            </p>
          </div>

          <div className="pt-2">
            {(project.exploreUrl || project.title.includes("Barba")) ? (
              <button
                onClick={() => onExplore(project)}
                className="px-5 py-3 bg-white hover:bg-zinc-200 text-black font-black text-[10px] uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-md"
              >
                <span>Explore Project</span>
                {project.exploreUrl ? <ExternalLink size={12} /> : <ArrowRight size={12} />}
              </button>
            ) : (
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider inline-flex items-center gap-1">
                Completed Project
              </span>
            )}
          </div>
        </div>

        {/* Right column: Image representation */}
        <div className="flex-1 h-[180px] md:h-[280px] rounded-[18px] overflow-hidden border border-zinc-900/60 relative group shrink-0">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${project.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-80" />
        </div>
      </motion.div>
    </div>
  );
}
