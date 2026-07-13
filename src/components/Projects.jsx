import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import SandboxModal from './sandbox/SandboxModal';

const PROJECT_ITEMS = [
  {
    title: "Barba CRM",
    category: "Operaciones de Obra & Estimaciones",
    description: "Herramienta de presupuestos en campo diseñada para contratistas. Permite cotizar a los clientes en 30 segundos usando botones gigantes sin contraseñas ni fricciones, eliminando el papeleo de obra.",
    themeColor: "indigo",
    badgeColor: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
    glow: "rgba(94,106,210,0.45)",
    logo: "/logos/barba.png",
    sandboxId: "barba"
  },
  {
    title: "ZHomes",
    category: "Plataforma de Transacciones Inmobiliarias",
    description: "Aplicación móvil interactiva para el descubrimiento de viviendas y simulación de hipotecas. Reduce la fricción al emparejar al comprador al instante con asesores calificados sin llamadas frías.",
    themeColor: "cyan",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
    glow: "rgba(6,182,212,0.45)",
    logo: "/logos/zhomes.png",
    sandboxId: "zhomes",
    exploreUrl: "https://zhomesapp.com/"
  },
  {
    title: "Tzel",
    category: "Filtro de Deudas & Adquisiciones",
    description: "Automatización de recolección de listados inmobiliarios con deudas o pre-ejecuciones hipotecarias. Entrega alertas inmediatas para adquirir propiedades antes de que lleguen al mercado público.",
    themeColor: "amber",
    badgeColor: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    glow: "rgba(245,158,11,0.45)",
    logo: "/logos/tzel.png",
    sandboxId: "tzel"
  },
  {
    title: "Tri Lion Academy",
    category: "Plataforma de Reservas & Membresías",
    description: "Sistema de inscripciones y cobros recurrentes automatizados para academias deportivas. Elimina la gestión manual de horarios de entrenamiento y registros de atletas en recepción.",
    themeColor: "red",
    badgeColor: "bg-red-500/10 text-red-400 border border-red-500/20",
    glow: "rgba(239,68,68,0.45)",
    logo: "/logos/tri-lion.png",
    exploreUrl: "https://trilionacademy.com/"
  }
];

// Individual Project Card Section with Vertical Slide-up Transitions
function ProjectSection({ item, index, scrollYProgress, onExplore }) {
  const count = PROJECT_ITEMS.length;
  const step = 0.42 / count;
  const startIn = 0.12 + index * step;
  const center = startIn + step * 0.45;
  const startOut = center + step * 0.45;
  const endOut = startOut + step * 0.1;

  // Vertical scrolling translation: slides UP from bottom to top
  const y = useTransform(
    scrollYProgress,
    [startIn, center, startOut, endOut],
    [550, 0, 0, -550]
  );

  // Flat scale (No deep Z zoom, only a subtle entrance/exit scale)
  const scale = useTransform(
    scrollYProgress,
    [startIn, center, startOut, endOut],
    [0.92, 1.0, 1.0, 0.92]
  );

  const opacity = useTransform(
    scrollYProgress,
    [startIn, startIn + (step * 0.25), startOut + (step * 0.1), endOut],
    [0.0, 1.0, 1.0, 0.0]
  );

  // Hook-driven pointer state to avoid overlapping interaction
  const [isActive, setIsActive] = useState(false);

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

        <div className="flex flex-col gap-2 mt-3">
          {item.sandboxId && (
            <button
              onClick={() => onExplore(item)}
              className="w-full py-3 bg-white hover:bg-zinc-200 text-black font-black text-[10px] uppercase tracking-widest rounded-lg flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all shadow-md font-sans"
            >
              <span>Probar Simulación</span>
              <ArrowRight size={11} />
            </button>
          )}
          {item.exploreUrl && (
            <a
              href={item.exploreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-white font-black text-[10px] uppercase tracking-widest rounded-lg flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all font-sans"
            >
              <span>Visitar Sitio Web</span>
              <ExternalLink size={11} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ activeSandboxId, setActiveSandboxId }) {
  const { scrollYProgress } = useScroll();

  const handleExplore = (item) => {
    if (item.sandboxId) {
      setActiveSandboxId(item.sandboxId);
    }
  };

  const handleIndicatorClick = (idx) => {
    const pageHeight = window.innerHeight || 800;
    const count = PROJECT_ITEMS.length;
    const step = 0.42 / count;
    const startIn = 0.12 + idx * step;
    const center = startIn + step * 0.45;
    const targetScroll = center * pageHeight * 8.0;

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
    const step = 0.42 / count;
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
    const visible = val >= 0.10 && val <= 0.55;
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
        activeSandboxId={activeSandboxId}
        onClose={() => setActiveSandboxId(null)}
      />
    </div>
  );
}
