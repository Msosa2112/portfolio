import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const PROJECT_ITEMS = [
  {
    title: "Barba CRM",
    glow: "#5e6ad2",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2371&auto=format&fit=crop"
  },
  {
    title: "ZHomes",
    glow: "#06b6d2",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2346&auto=format&fit=crop"
  },
  {
    title: "Edward Siding",
    glow: "#f59e0b",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2340&auto=format&fit=crop"
  },
  {
    title: "Outdoor MS",
    glow: "#10b981",
    image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2342&auto=format&fit=crop"
  }
];

// 3D Card Stack Mesh
function Card({ index, item, activeFloat, activeIndex, isMobile }) {
  const meshRef = useRef();
  const glowRef = useRef();

  useFrame((state) => {
    if (!meshRef.current || !glowRef.current) return;

    // Relative distance to active index
    const t = index - activeFloat;
    const isActive = index === activeIndex;

    let targetX = 0;
    let targetY = 0;
    let targetZ = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let targetRotZ = 0;
    let targetScale = 1.0;
    let targetOpacity = 1.0;

    if (t < 0) {
      // 1. Swiped Away (Flies out to the left in a smooth 3D arc)
      targetX = t * 3.8;
      targetY = t * -1.2;
      targetZ = t * 0.4;
      targetRotZ = t * 0.5;
      targetScale = 1.0;
      targetOpacity = Math.max(0, 1 + t);
    } else {
      // 2. Stacked in Depth (pushed back and slightly staggered)
      targetX = 0;
      targetY = t * 0.16;
      targetZ = t * -0.58;
      targetScale = Math.max(0.65, 1.0 - t * 0.08);
      targetOpacity = Math.max(0, 1 - t * 0.42);
      targetRotX = -0.12 * Math.min(1.0, t);
    }

    // Zero-gravity slight float for front active card
    if (isActive) {
      targetY += Math.sin(state.clock.getElapsedTime() * 1.5) * 0.05;
    }

    // Interpolate positions smoothly
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.15);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.15);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.15);

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.15);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.15);
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, targetRotZ, 0.15);

    meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.15);
    meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, targetScale, 0.15);

    // Sync glow halo
    glowRef.current.position.copy(meshRef.current.position);
    glowRef.current.position.z -= 0.01;
    glowRef.current.rotation.copy(meshRef.current.rotation);
    glowRef.current.scale.copy(meshRef.current.scale);
    glowRef.current.scale.x *= 1.05;
    glowRef.current.scale.y *= 1.05;

    // Opacity
    if (meshRef.current.material) {
      meshRef.current.material.opacity = THREE.MathUtils.lerp(meshRef.current.material.opacity, targetOpacity, 0.15);
      meshRef.current.material.grayscale = THREE.MathUtils.lerp(meshRef.current.material.grayscale, isActive ? 0 : 0.5, 0.15);
    }
    if (glowRef.current.material) {
      const targetGlowOpacity = isActive ? targetOpacity * 0.75 : targetOpacity * 0.15;
      glowRef.current.material.opacity = THREE.MathUtils.lerp(glowRef.current.material.opacity, targetGlowOpacity, 0.15);
    }
  });

  const cardWidth = isMobile ? 1.7 : 2.3;
  const cardHeight = isMobile ? 2.3 : 3.1;

  return (
    <group>
      {/* 3D Glow Border Mesh */}
      <mesh ref={glowRef}>
        <planeGeometry args={[cardWidth, cardHeight]} />
        <meshBasicMaterial color={item.glow} transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>
      {/* Main Image Mesh */}
      <Image
        ref={meshRef}
        url={item.image}
        scale={[cardWidth, cardHeight]}
        transparent
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'default';
        }}
      />
    </group>
  );
}

// 3D Scene Controller
function Scene({ activeIndex, setActiveIndex, targetRotation, isMobile }) {
  const stackRef = useRef();
  const sparklesRef = useRef();
  
  const count = PROJECT_ITEMS.length;

  useFrame((state) => {
    // 1. Solve Scroll Progress (Hero = 0, Projects = 1, Contact = 2)
    const scrollY = window.scrollY;
    const pageHeight = window.innerHeight || 800;
    const progress = scrollY / pageHeight;

    // 2. Animate global sparkles parallax
    if (sparklesRef.current) {
      sparklesRef.current.position.y = progress * 1.5;
    }

    // 3. Solve activeFloat from rotation progress
    // Normalize targetRotation.current between 0 and 100 to map activeFloat
    const dragVal = Math.min(100, Math.max(0, targetRotation.current));
    const activeFloat = (dragVal / 100) * (count - 1);
    
    // Update active index
    const closestIdx = Math.round(activeFloat);
    if (closestIdx !== activeIndex) {
      setActiveIndex(closestIdx);
    }

    // 4. Animate Stack Group Y and scale transition on scroll
    if (stackRef.current) {
      let groupY = -6.0;
      let groupScale = 0.5;

      if (progress < 1.0) {
        // Hero -> Projects
        const t = progress; // 0 to 1
        groupY = -6.0 + 6.0 * t;
        groupScale = 0.5 + 0.5 * t;
      } else {
        // Projects -> Contact
        const t = Math.min(1.0, progress - 1.0); // 0 to 1
        groupY = 0.0 - 6.0 * t;
        groupScale = 1.0 - 0.5 * t;
      }

      stackRef.current.position.y = groupY;
      stackRef.current.scale.setScalar(groupScale);
    }
  });

  // Calculate continuous activeFloat for card coordinates
  const dragVal = Math.min(100, Math.max(0, targetRotation.current));
  const activeFloat = (dragVal / 100) * (count - 1);

  return (
    <group>
      {/* 3D Stack Carousel */}
      <group ref={stackRef} position={[0, -6, 0]} rotation={[0.08, 0, -0.06]}>
        {PROJECT_ITEMS.map((item, idx) => (
          <Card
            key={idx}
            index={idx}
            item={item}
            activeFloat={activeFloat}
            activeIndex={activeIndex}
            isMobile={isMobile}
          />
        ))}
      </group>

      {/* Global cosmic sparkles */}
      <group ref={sparklesRef}>
        <Sparkles 
          count={isMobile ? 80 : 180} 
          scale={[10, 8, 10]} 
          size={isMobile ? 1.5 : 2.5} 
          speed={0.4} 
          color="#5e6ad2" 
          opacity={0.65} 
        />
        <Sparkles 
          count={isMobile ? 80 : 180} 
          scale={[10, 8, 10]} 
          size={isMobile ? 1.2 : 2.0} 
          speed={0.25} 
          color="#06b6d2" 
          opacity={0.65} 
        />
      </group>
    </group>
  );
}

export default function ThreeCanvas({ activeIndex, setActiveIndex, targetRotation }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 4.8], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none'
      }}
    >
      <ambientLight intensity={1.8} />
      <directionalLight position={[0, 10, 5]} intensity={1.2} />
      
      <Suspense fallback={null}>
        <Scene 
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          targetRotation={targetRotation}
          isMobile={isMobile}
        />
      </Suspense>
    </Canvas>
  );
}
