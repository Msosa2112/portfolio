import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { 
  ArrowRight, Mail, Sparkles, Heart, RefreshCw, X, Hand, 
  ChevronLeft, ChevronRight, Maximize2, Minimize2, Move, Monitor
} from 'lucide-react';
import SandboxModal from './sandbox/SandboxModal';

const PROJECT_ITEMS = [
  {
    url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2371&auto=format&fit=crop",
    title: "Barba Construction CRM",
    category: "CRM / Web App",
    description: "A modern, AI-powered CRM built for construction professionals, featuring a highly intuitive UI and real-time data sync via Supabase.",
    glow: "rgba(94,106,210,0.45)",
    exploreUrl: null
  },
  {
    url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2346&auto=format&fit=crop",
    title: "ZHomes TC Platform",
    category: "Real Estate Platform",
    description: "Global transaction coordinator platform featuring an integrated AI Copilot for real estate professionals.",
    glow: "rgba(6,182,212,0.45)",
    exploreUrl: "https://zhomesapp.com"
  },
  {
    url: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2340&auto=format&fit=crop",
    title: "Edward Siding & Gutters",
    category: "Marketing / SEO",
    description: "A highly optimized marketing landing page with custom SEO, robots.txt, and a spectacular photo gallery.",
    glow: "rgba(245,158,11,0.45)",
    exploreUrl: "https://edwardsidingandgutters.com/"
  },
  {
    url: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2342&auto=format&fit=crop",
    title: "Outdoor Advertising MS",
    category: "Microservices / APIs",
    description: "Microservice integration for scalable DOOH (Digital Out of Home) advertising platforms.",
    glow: "rgba(16,185,129,0.45)",
    exploreUrl: null
  }
];

export default function Projects() {
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);

  const handleExplore = (item) => {
    if (item.title.includes("Barba")) {
      setIsSandboxOpen(true);
    } else if (item.exploreUrl) {
      window.open(item.exploreUrl, "_blank");
    }
  };

  return (
    <section id="work" className="w-full max-w-[1200px] px-5 py-12 md:py-24 mx-auto space-y-28 font-sans">
      
      {/* Title */}
      <div className="space-y-4 text-center md:text-left select-none">
        <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full font-black uppercase tracking-widest inline-block">
          Laboratorio de Prototipos de UI
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
          Elige la mejor <span className="text-gradient">Galería</span>
        </h2>
        <p className="text-zinc-400 text-sm md:text-base max-w-xl leading-relaxed font-medium">
          Hemos programado 5 propuestas de interfaces interactivas para presentar tus proyectos. Pruébalas en tu móvil y decide cuál te convence más.
        </p>
      </div>

      {/* PROTOTIPO 1: Tinder Card Deck */}
      <div className="space-y-6">
        <div className="border-b border-zinc-900 pb-3 flex items-center justify-between">
          <div>
            <span className="text-indigo-400 font-black text-[10px] uppercase tracking-wider">Propuesta 1</span>
            <h3 className="text-lg font-bold text-white">Tinder Card Deck (Deslizable Táctil)</h3>
          </div>
          <span className="text-zinc-500 text-[10px] font-mono">Mobile-First Gesture</span>
        </div>
        <TinderDeckPrototype items={PROJECT_ITEMS} onExplore={handleExplore} />
      </div>

      {/* PROTOTIPO 2: Opposing Split Slider */}
      <div className="space-y-6">
        <div className="border-b border-zinc-900 pb-3 flex items-center justify-between">
          <div>
            <span className="text-indigo-400 font-black text-[10px] uppercase tracking-wider">Propuesta 2</span>
            <h3 className="text-lg font-bold text-white">Opposing Split Slider (Scroll Asimétrico)</h3>
          </div>
          <span className="text-zinc-500 text-[10px] font-mono">Mechanical / Editorial</span>
        </div>
        <SplitSliderPrototype items={PROJECT_ITEMS} onExplore={handleExplore} />
      </div>

      {/* PROTOTIPO 3: Circular Orbit Carrousel */}
      <div className="space-y-6">
        <div className="border-b border-zinc-900 pb-3 flex items-center justify-between">
          <div>
            <span className="text-indigo-400 font-black text-[10px] uppercase tracking-wider">Propuesta 3</span>
            <h3 className="text-lg font-bold text-white">3D Circular Orbit (Carrusel Rotativo)</h3>
          </div>
          <span className="text-zinc-500 text-[10px] font-mono">Spatial / 3D Layout</span>
        </div>
        <OrbitPrototype items={PROJECT_ITEMS} onExplore={handleExplore} />
      </div>

      {/* PROTOTIPO 4: 3D Z-Axis Zoom Tunnel */}
      <div className="space-y-6">
        <div className="border-b border-zinc-900 pb-3 flex items-center justify-between">
          <div>
            <span className="text-indigo-400 font-black text-[10px] uppercase tracking-wider">Propuesta 4</span>
            <h3 className="text-lg font-bold text-white">3D Z-Axis Zoom Tunnel (Profundidad Infinita)</h3>
          </div>
          <span className="text-zinc-500 text-[10px] font-mono">Infinite Scroll</span>
        </div>
        <ZoomTunnelPrototype items={PROJECT_ITEMS} onExplore={handleExplore} />
      </div>

      {/* PROTOTIPO 5: Spatial Glass OS */}
      <div className="space-y-6">
        <div className="border-b border-zinc-900 pb-3 flex items-center justify-between">
          <div>
            <span className="text-indigo-400 font-black text-[10px] uppercase tracking-wider">Propuesta 5</span>
            <h3 className="text-lg font-bold text-white">Spatial Glass OS Desktop (Widgets Interactivos)</h3>
          </div>
          <span className="text-zinc-500 text-[10px] font-mono">OS Simulation</span>
        </div>
        <GlassOSPrototype items={PROJECT_ITEMS} onExplore={handleExplore} />
      </div>

      <SandboxModal
        isOpen={isSandboxOpen}
        onClose={() => setIsSandboxOpen(false)}
      />

    </section>
  );
}

// ---------------------------------------------------------
// PROPUESTA 1: Tinder Card Deck
// ---------------------------------------------------------
function TinderDeckPrototype({ items, onExplore }) {
  const [cards, setCards] = useState(items.map((item, idx) => ({ ...item, id: idx })));
  
  const handleSwipe = (id, direction) => {
    // Remove swiped card and send to back
    setCards(prev => {
      const swipedCard = prev.find(c => c.id === id);
      const remaining = prev.filter(c => c.id !== id);
      if (swipedCard) {
        return [...remaining, swipedCard]; // Recycle card to back of deck
      }
      return prev;
    });
  };

  return (
    <div className="w-full h-[460px] flex flex-col items-center justify-center relative overflow-hidden bg-black/40 border border-zinc-900 rounded-3xl p-4 select-none">
      <span className="absolute top-4 left-1/2 -translate-x-1/2 text-[8px] text-zinc-500 font-bold uppercase tracking-widest flex items-center gap-1">
        <Hand size={10} /> Desliza a los lados para pasar
      </span>

      <div className="relative w-[280px] h-[340px] mt-4 flex items-center justify-center">
        <AnimatePresence>
          {cards.slice(0, 3).reverse().map((item, index) => {
            // index 0 represents card furthest back in rendering order of slice(0,3)
            const isFront = index === 2;
            return (
              <TinderCard 
                key={item.id} 
                item={item} 
                isFront={isFront} 
                onSwipe={(dir) => handleSwipe(item.id, dir)}
                onExplore={onExplore}
                offsetIndex={2 - index}
              />
            );
          })}
        </AnimatePresence>
      </div>

      <button 
        onClick={() => handleSwipe(cards[0].id, 'right')}
        className="mt-6 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[10px] text-zinc-400 font-black uppercase tracking-wider rounded-xl transition-all active:scale-95"
      >
        Siguiente Carta
      </button>
    </div>
  );
}

function TinderCard({ item, isFront, onSwipe, onExplore, offsetIndex }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-150, 150], [-15, 15]);
  const opacity = useTransform(x, [-150, -100, 0, 100, 150], [0.5, 1, 1, 1, 0.5]);

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100) {
      onSwipe('right');
    } else if (info.offset.x < -100) {
      onSwipe('left');
    }
  };

  return (
    <motion.div
      style={{
        x: isFront ? x : 0,
        rotate: isFront ? rotate : 0,
        opacity: isFront ? opacity : 1,
        scale: 1 - offsetIndex * 0.04,
        y: offsetIndex * 10,
        zIndex: 50 - offsetIndex,
        boxShadow: isFront && item.glow ? `0 12px 40px -10px ${item.glow}` : '0 4px 15px rgba(0,0,0,0.4)',
      }}
      drag={isFront ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className={`absolute w-full h-full rounded-2xl border bg-zinc-950 flex flex-col justify-between overflow-hidden p-5 select-none transition-all duration-300 ${
        isFront ? 'border-zinc-800 cursor-grab active:cursor-grabbing' : 'border-zinc-900/60'
      }`}
    >
      {/* Visual cover */}
      <div 
        className="h-28 w-full rounded-xl bg-cover bg-center shrink-0 border border-zinc-900"
        style={{ backgroundImage: `url(${item.url})` }}
      />

      <div className="flex-1 flex flex-col justify-between pt-4">
        <div className="space-y-1.5">
          <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest block">{item.category}</span>
          <h4 className="text-sm font-black text-white leading-tight">{item.title}</h4>
          <p className="text-[10px] text-zinc-400 leading-relaxed font-medium line-clamp-3">{item.description}</p>
        </div>

        {isFront && (
          <button
            onClick={() => onExplore(item)}
            className="w-full py-2.5 bg-white text-black font-black text-[9px] uppercase tracking-wider rounded-lg flex items-center justify-center gap-1 active:scale-97 transition-all mt-4"
          >
            <span>Explore Project</span>
            <ArrowRight size={10} />
          </button>
        )}
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------
// PROPUESTA 2: Opposing Split Slider
// ---------------------------------------------------------
function SplitSliderPrototype({ items, onExplore }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setActiveIndex(prev => (prev - 1 + items.length) % items.length);
  };

  const current = items[activeIndex];

  return (
    <div className="w-full h-[380px] bg-[#08080c] border border-zinc-900 rounded-3xl overflow-hidden flex flex-col md:flex-row relative select-none">
      
      {/* Left side: Information, slides UP */}
      <div className="flex-1 p-6 flex flex-col justify-between relative overflow-hidden h-1/2 md:h-full border-b md:border-b-0 md:border-r border-zinc-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3 flex-1 flex flex-col justify-center"
          >
            <span className="text-[8px] font-black tracking-widest uppercase text-indigo-400">{current.category}</span>
            <h4 className="text-xl font-black text-white leading-tight">{current.title}</h4>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm font-medium">{current.description}</p>
            
            <div className="pt-2">
              <button
                onClick={() => onExplore(current)}
                className="px-4 py-2 bg-indigo-950/40 hover:bg-indigo-900/50 border border-indigo-500/20 text-indigo-300 font-bold text-[9px] uppercase tracking-wider rounded-lg flex items-center gap-1 active:scale-95 transition-all"
              >
                <span>Explorar Proyecto</span>
                <ArrowRight size={10} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-1.5 self-start md:self-auto mt-4 md:mt-0 relative z-30">
          <button 
            onClick={handlePrev}
            className="h-8 w-8 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 flex items-center justify-center text-zinc-400 active:scale-95 transition-all"
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            onClick={handleNext}
            className="h-8 w-8 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 flex items-center justify-center text-zinc-400 active:scale-95 transition-all"
          >
            <ChevronRight size={16} />
          </button>
          <span className="text-[10px] text-zinc-500 font-mono ml-2">{activeIndex + 1} / {items.length}</span>
        </div>
      </div>

      {/* Right side: Cover Art, slides DOWN */}
      <div className="flex-1 relative overflow-hidden h-1/2 md:h-full bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${current.url})` }}
          >
            {/* Soft dark overlap */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            
            {/* Tailored Glow Shadow */}
            {current.glow && (
              <div 
                className="absolute inset-0 pointer-events-none transition-all duration-500"
                style={{ boxShadow: `inset 0 0 40px ${current.glow}` }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}

// ---------------------------------------------------------
// PROPUESTA 3: Circular Orbit
// ---------------------------------------------------------
function OrbitPrototype({ items, onExplore }) {
  const [angleOffset, setAngleOffset] = useState(0);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX || e.touches?.[0].pageX;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const x = e.pageX || e.touches?.[0].pageX;
    const diff = x - startX.current;
    setAngleOffset(prev => prev + diff * 0.25);
    startX.current = x;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const activeIndex = Math.floor((360 - ((angleOffset % 360) + 360) % 360 + 45) / 90) % 4;
  const current = items[activeIndex];

  return (
    <div className="w-full bg-black/40 border border-zinc-900 rounded-3xl p-6 relative overflow-hidden flex flex-col items-center justify-center select-none h-[420px]">
      <span className="absolute top-4 text-[8px] text-zinc-500 font-bold uppercase tracking-widest flex items-center gap-1">
        <Hand size={10} /> Arrastra horizontalmente para rotar
      </span>

      {/* Orbit 3D viewport */}
      <div 
        ref={containerRef}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full max-w-lg h-56 relative flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d'
        }}
      >
        {items.map((item, index) => {
          const angle = (index * 90) + angleOffset;
          const rad = (angle * Math.PI) / 180;
          const radius = 160;
          const x = radius * Math.sin(rad);
          const z = radius * Math.cos(rad);
          const scale = (z + radius) / (2 * radius) * 0.45 + 0.55;
          const isActive = index === activeIndex;

          return (
            <motion.div
              key={index}
              animate={{
                x,
                z,
                scale,
                filter: isActive ? 'grayscale(0) brightness(1)' : 'grayscale(0.6) brightness(0.4)',
              }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              className="absolute w-[180px] h-[120px] rounded-xl border border-zinc-800 overflow-hidden bg-zinc-950 flex flex-col justify-end p-3 shadow-2xl"
              style={{
                zIndex: Math.round(z + radius),
                backgroundImage: `url(${item.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: isActive && item.glow ? `0 0 30px ${item.glow}` : 'none'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-[2]" />
              <div className="relative z-10">
                <span className="text-[7px] font-black text-indigo-400 uppercase tracking-wider block">{item.category}</span>
                <span className="text-[10px] font-bold text-white block line-clamp-1">{item.title}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Info details for center active card */}
      <div className="h-20 flex flex-col items-center justify-center text-center space-y-2 mt-4 max-w-sm">
        <h4 className="text-sm font-black text-white">{current.title}</h4>
        <p className="text-[10px] text-zinc-400 font-medium line-clamp-2 leading-relaxed">{current.description}</p>
        <button
          onClick={() => onExplore(current)}
          className="text-[9px] font-black uppercase text-indigo-400 hover:text-white flex items-center gap-0.5 active:scale-95 transition-all mt-1"
        >
          <span>Explore Now</span>
          <ArrowRight size={10} />
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// PROPUESTA 4: 3D Z-Axis Zoom Tunnel
// ---------------------------------------------------------
function ZoomTunnelPrototype({ items, onExplore }) {
  const [scrollZ, setScrollZ] = useState(0);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startY = useRef(0);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startY.current = e.pageY || e.touches?.[0].pageY;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const y = e.pageY || e.touches?.[0].pageY;
    const diff = y - startY.current;
    setScrollZ(prev => Math.max(0, Math.min((items.length - 1) * 350, prev - diff * 0.95)));
    startY.current = y;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const activeIndex = Math.min(items.length - 1, Math.max(0, Math.round(scrollZ / 350)));
  const current = items[activeIndex];

  return (
    <div className="w-full bg-[#07080a] border border-zinc-900 rounded-3xl p-6 relative overflow-hidden flex flex-col items-center justify-center select-none h-[420px]">
      <span className="absolute top-4 text-[8px] text-zinc-500 font-bold uppercase tracking-widest flex items-center gap-1 z-30">
        <Hand size={10} /> Desliza verticalmente para avanzar en el túnel
      </span>

      {/* 3D Viewport */}
      <div 
        ref={containerRef}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full max-w-sm h-64 relative flex items-center justify-center cursor-grab active:cursor-grabbing z-10"
        style={{
          perspective: '500px',
          transformStyle: 'preserve-3d'
        }}
      >
        {items.map((item, index) => {
          // Calculate Z position relative to scroll track
          const cardZ = -(index * 350) + scrollZ;
          const zIndex = Math.round(1000 + cardZ);
          const opacity = cardZ > 50 ? 0 : cardZ < -600 ? 0 : (cardZ + 600) / 650;
          const isActive = index === activeIndex;

          return (
            <motion.div
              key={index}
              animate={{
                z: cardZ,
                opacity,
                filter: isActive ? 'grayscale(0) brightness(1)' : 'grayscale(0.8) brightness(0.3)'
              }}
              transition={{ type: 'spring', stiffness: 100, damping: 17 }}
              className="absolute w-[220px] h-[150px] rounded-xl border border-zinc-800 overflow-hidden bg-zinc-950 flex flex-col justify-end p-4 shadow-2xl"
              style={{
                zIndex,
                backgroundImage: `url(${item.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: isActive && item.glow ? `0 0 25px ${item.glow}` : 'none'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-[2]" />
              <div className="relative z-10">
                <span className="text-[7.5px] font-black text-indigo-400 uppercase tracking-wider block">{item.category}</span>
                <span className="text-xs font-bold text-white block line-clamp-1">{item.title}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Info details for center active card */}
      <div className="h-20 flex flex-col items-center justify-center text-center space-y-2 mt-4 max-w-sm z-20">
        <h4 className="text-sm font-black text-white">{current.title}</h4>
        <p className="text-[10px] text-zinc-400 font-medium line-clamp-2 leading-relaxed">{current.description}</p>
        <button
          onClick={() => onExplore(current)}
          className="text-[9px] font-black uppercase text-indigo-400 hover:text-white flex items-center gap-0.5 active:scale-95 transition-all mt-1"
        >
          <span>Explore Now</span>
          <ArrowRight size={10} />
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// PROPUESTA 5: Spatial Glass OS Desktop
// ---------------------------------------------------------
function GlassOSPrototype({ items, onExplore }) {
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [positions, setPositions] = useState({});

  const handleOpenWindow = (itemTitle) => {
    if (!openWindows.includes(itemTitle)) {
      setOpenWindows(prev => [...prev, itemTitle]);
      // set random starting position offset
      setPositions(prev => ({
        ...prev,
        [itemTitle]: { x: Math.random() * 30 - 15, y: Math.random() * 30 - 15 }
      }));
    }
    setActiveWindow(itemTitle);
  };

  const handleCloseWindow = (itemTitle, e) => {
    e.stopPropagation();
    setOpenWindows(prev => prev.filter(title => title !== itemTitle));
    if (activeWindow === itemTitle) {
      setActiveWindow(openWindows.find(title => title !== itemTitle) || null);
    }
  };

  return (
    <div className="w-full h-[520px] bg-[#0c0d13] border border-zinc-900 rounded-3xl relative overflow-hidden select-none p-4 flex flex-col justify-between">
      
      {/* Desktop Icons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-md relative z-10">
        {items.map((item, idx) => {
          const isOpen = openWindows.includes(item.title);
          return (
            <button
              key={idx}
              onClick={() => handleOpenWindow(item.title)}
              className={`flex flex-col items-center gap-2 p-2.5 rounded-2xl border transition-all active:scale-95 ${
                isOpen 
                  ? 'bg-indigo-500/10 border-indigo-500/30' 
                  : 'bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/10'
              }`}
            >
              <div 
                className="h-10 w-10 rounded-xl bg-cover bg-center shadow-inner border border-zinc-900"
                style={{ backgroundImage: `url(${item.url})` }}
              />
              <span className="text-[9px] text-zinc-300 font-bold text-center tracking-wide line-clamp-1 max-w-[80px]">
                {item.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Instruction */}
      {openWindows.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-2 pointer-events-none p-6">
          <Monitor className="text-zinc-600 animate-pulse" size={24} />
          <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Haz doble click en un widget arriba para abrir la ventana</p>
        </div>
      )}

      {/* Spatial Desktop Window Manager Viewport */}
      <div className="flex-1 w-full relative mt-4">
        {openWindows.map((itemTitle) => {
          const item = items.find(i => i.title === itemTitle);
          const isActive = activeWindow === itemTitle;
          const pos = positions[itemTitle] || { x: 0, y: 0 };

          return (
            <motion.div
              key={itemTitle}
              drag
              dragMomentum={false}
              dragConstraints={{ left: 10, right: 280, top: 10, bottom: 200 }}
              onDragStart={() => setActiveWindow(itemTitle)}
              style={{
                zIndex: isActive ? 100 : 50,
                boxShadow: isActive && item.glow ? `0 15px 40px -10px ${item.glow}` : '0 10px 25px rgba(0,0,0,0.5)'
              }}
              className={`absolute w-[240px] rounded-2xl border bg-black/85 backdrop-blur-md overflow-hidden flex flex-col transition-shadow ${
                isActive ? 'border-zinc-700' : 'border-zinc-850 opacity-90'
              }`}
            >
              {/* Title Bar / Drag Handle */}
              <div 
                className="px-3.5 py-2.5 bg-zinc-950 flex items-center justify-between border-b border-zinc-900 cursor-grab active:cursor-grabbing text-zinc-400 select-none"
                onClick={() => setActiveWindow(itemTitle)}
              >
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-red-500 hover:bg-red-600" onClick={(e) => handleCloseWindow(itemTitle, e)} />
                  <div className="h-2 w-2 rounded-full bg-yellow-500" />
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-wider text-zinc-300 max-w-[120px] truncate">{item.title}</span>
                <Move size={10} className="text-zinc-600" />
              </div>

              {/* Window content */}
              <div className="p-4 space-y-3 text-left">
                <span className="text-[7.5px] font-black text-indigo-400 uppercase tracking-widest block">{item.category}</span>
                <p className="text-[9.5px] text-zinc-400 leading-relaxed font-medium line-clamp-3">{item.description}</p>
                <button
                  onClick={() => onExplore(item)}
                  className="w-full py-2 bg-zinc-900 hover:bg-zinc-850 text-white border border-zinc-800 text-[8px] font-black uppercase tracking-wider rounded-lg active:scale-97 transition-all flex items-center justify-center gap-0.5"
                >
                  <span>Explore Sandbox</span>
                  <ArrowRight size={8} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
