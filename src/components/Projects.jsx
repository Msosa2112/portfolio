import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image, Sparkles } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink, Hand } from 'lucide-react';
import * as THREE from 'three';
import SandboxModal from './sandbox/SandboxModal';

const PROJECT_ITEMS = [
  {
    title: "Barba CRM",
    category: "CRM / Web App",
    description: "A modern, AI-powered CRM built for construction professionals, featuring a highly intuitive UI and real-time data sync via Supabase.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2371&auto=format&fit=crop",
    glow: "#5e6ad2",
    themeColor: "indigo",
    exploreUrl: null
  },
  {
    title: "ZHomes",
    category: "Real Estate",
    description: "Global transaction coordinator platform featuring an integrated AI Copilot for real estate professionals.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2346&auto=format&fit=crop",
    glow: "#06b6d2",
    themeColor: "cyan",
    exploreUrl: "https://zhomesapp.com"
  },
  {
    title: "Edward Siding",
    category: "Marketing / SEO",
    description: "A highly optimized marketing landing page with custom SEO, robots.txt, and a spectacular photo gallery.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2340&auto=format&fit=crop",
    glow: "#f59e0b",
    themeColor: "amber",
    exploreUrl: "https://edwardsidingandgutters.com/"
  },
  {
    title: "Outdoor MS",
    category: "Microservices",
    description: "Microservice integration for scalable DOOH (Digital Out of Home) advertising platforms.",
    image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2342&auto=format&fit=crop",
    glow: "#10b981",
    themeColor: "emerald",
    exploreUrl: null
  }
];

const getZindex = (array, index) => (
  array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i))
);

// Individual 3D Card with Neon Border and Hover Parallax Tilt
function Card({ index, item, activeIndex, totalCount, onSelect, isMobile }) {
  const meshRef = useRef();
  const glowRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Position on the 3D cylinder
  const radius = isMobile ? 2.4 : 3.5;
  const angleStep = (Math.PI * 2) / totalCount;
  const theta = index * angleStep;

  // Coordinates on cylinder
  const x = Math.sin(theta) * radius;
  const z = Math.cos(theta) * radius;

  useFrame((state) => {
    if (!meshRef.current || !glowRef.current) return;
    
    // Parent rotation
    const currentAngle = theta + meshRef.current.parent.rotation.y;
    const distToFront = Math.abs(Math.atan2(Math.sin(currentAngle), Math.cos(currentAngle)));
    
    const isActive = index === activeIndex;

    // Hover + Active scale calculation
    const baseScale = isActive ? 1.08 : 0.88;
    const hoverScaleMultiplier = hovered ? 1.12 : 1.0;
    const targetScale = baseScale * hoverScaleMultiplier;

    meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1);
    meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, targetScale, 0.1);

    // Sync neon border glow scale
    glowRef.current.scale.x = meshRef.current.scale.x * 1.04;
    glowRef.current.scale.y = meshRef.current.scale.y * 1.04;

    // Zero-gravity floating animation for active or hovered card
    const floatOffset = (hovered || isActive) 
      ? Math.sin(state.clock.getElapsedTime() * 1.8 + index) * 0.06 
      : 0;
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, floatOffset, 0.1);
    glowRef.current.position.y = meshRef.current.position.y;

    // 3D Parallax Tilt to face cursor
    let targetRotY = theta;
    let targetRotX = 0;
    if (hovered || isActive) {
      targetRotY += state.pointer.x * 0.22;
      targetRotX = -state.pointer.y * 0.18;
    }
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.1);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.1);
    glowRef.current.rotation.y = meshRef.current.rotation.y;
    glowRef.current.rotation.x = meshRef.current.rotation.x;

    // Opacity decay
    const targetOpacity = distToFront > Math.PI / 2 ? 0.05 : Math.max(0.12, 1 - distToFront * 0.55);
    const glowOpacity = (isActive || hovered) ? targetOpacity * 0.85 : targetOpacity * 0.18;

    if (meshRef.current.material) {
      meshRef.current.material.opacity = THREE.MathUtils.lerp(meshRef.current.material.opacity, targetOpacity, 0.1);
      meshRef.current.material.grayscale = THREE.MathUtils.lerp(meshRef.current.material.grayscale, isActive ? 0 : 0.5, 0.1);
    }
    if (glowRef.current.material) {
      glowRef.current.material.opacity = THREE.MathUtils.lerp(glowRef.current.material.opacity, glowOpacity, 0.1);
    }
  });

  const cardWidth = isMobile ? 1.6 : 2.2;
  const cardHeight = isMobile ? 2.2 : 3.0;

  return (
    <group>
      {/* 3D Neon Aura Glow under the image card */}
      <mesh 
        ref={glowRef} 
        position={[x, 0, z - 0.02]} 
      >
        <planeGeometry args={[cardWidth, cardHeight]} />
        <meshBasicMaterial 
          color={item.glow} 
          transparent 
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Main Image Panel */}
      <Image
        ref={meshRef}
        url={item.image}
        position={[x, 0, z]}
        rotation={[0, theta, 0]}
        scale={[cardWidth, cardHeight]}
        transparent
        onClick={(e) => {
          e.stopPropagation();
          onSelect(index);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = 'default';
        }}
      />
    </group>
  );
}

// Angled 3D Carousel Cylinder
function CylinderCarousel({ activeIndex, setActiveIndex, targetRotation, isMobile }) {
  const groupRef = useRef();
  const count = PROJECT_ITEMS.length;
  const angleStep = (Math.PI * 2) / count;

  useFrame(() => {
    if (!groupRef.current) return;

    // Smoothly rotate cylinder group
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation.current,
      0.08
    );

    // Determine front card
    let maxCos = -2;
    let closestIdx = 0;
    for (let i = 0; i < count; i++) {
      const theta = groupRef.current.rotation.y + i * angleStep;
      const cosVal = Math.cos(theta);
      if (cosVal > maxCos) {
        maxCos = cosVal;
        closestIdx = i;
      }
    }

    if (closestIdx !== activeIndex) {
      setActiveIndex(closestIdx);
    }
  });

  const handleSelect = (idx) => {
    const currentRot = groupRef.current.rotation.y;
    const targetRotForCard = -idx * angleStep;
    const difference = targetRotForCard - (currentRot % (Math.PI * 2));
    let adjustedDiff = Math.atan2(Math.sin(difference), Math.cos(difference));
    targetRotation.current = currentRot + adjustedDiff;
  };

  return (
    // Angled diagonal path tilt (X-axis tilt of 10deg, Z-axis tilt of -8deg for asymmetric premium curve)
    <group ref={groupRef} rotation={[0.16, 0, -0.14]}>
      {PROJECT_ITEMS.map((item, idx) => (
        <Card
          key={idx}
          index={idx}
          item={item}
          activeIndex={activeIndex}
          totalCount={count}
          onSelect={handleSelect}
          isMobile={isMobile}
        />
      ))}
    </group>
  );
}

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const targetRotation = useRef(0);
  const isDragging = useRef(false);
  const startX = useRef(0);

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePointerDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = clientX - startX.current;
    const sensitivity = isMobile ? 0.009 : 0.005;
    targetRotation.current += deltaX * sensitivity;
    startX.current = clientX;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handleWheel = (e) => {
    const sensitivity = 0.0015;
    targetRotation.current += e.deltaY * sensitivity;
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
      className="w-full h-screen relative flex flex-col justify-between py-12 md:py-20 overflow-hidden font-sans select-none bg-transparent"
    >
      
      {/* 3D WebGL Canvas Layer */}
      <div 
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        onWheel={handleWheel}
        className="absolute inset-0 z-10 w-full h-full cursor-grab active:cursor-grabbing"
      >
        <Canvas
          camera={{ position: [0, 0, 4.8], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={1.8} />
          <directionalLight position={[0, 10, 5]} intensity={1.2} />
          
          <Suspense fallback={null}>
            <CylinderCarousel 
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              targetRotation={targetRotation}
              isMobile={isMobile}
            />
          </Suspense>

          {/* WebGL Stars field */}
          <Sparkles 
            count={isMobile ? 70 : 150} 
            scale={[8, 5, 8]} 
            size={isMobile ? 1.5 : 2.5} 
            speed={0.4} 
            color="#5e6ad2" 
            opacity={0.65} 
          />
          <Sparkles 
            count={isMobile ? 70 : 150} 
            scale={[8, 5, 8]} 
            size={isMobile ? 1.2 : 2.0} 
            speed={0.25} 
            color="#06b6d2" 
            opacity={0.65} 
          />
        </Canvas>
      </div>

      {/* 2D HTML Content Layer (Floating on top of WebGL) */}
      <div className="w-full px-6 text-center space-y-2 mt-2 select-none shrink-0 relative z-20 pointer-events-none">
        <span className="text-[9px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full font-black uppercase tracking-widest inline-block pointer-events-auto">
          Selected Work
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none mt-1">
          Interactive <span className="text-gradient">3D Space</span>
        </h2>
        <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider flex items-center justify-center gap-1">
          <Hand size={11} className="text-zinc-500" /> Arrastra o gira la rueda para explorar en 3D
        </p>
      </div>

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
              onClick={() => {
                const count = PROJECT_ITEMS.length;
                const angleStep = (Math.PI * 2) / count;
                const currentRot = targetRotation.current;
                const targetRotForCard = -idx * angleStep;
                const difference = targetRotForCard - (currentRot % (Math.PI * 2));
                let adjustedDiff = Math.atan2(Math.sin(difference), Math.cos(difference));
                targetRotation.current = currentRot + adjustedDiff;
              }}
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
