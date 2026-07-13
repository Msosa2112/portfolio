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

// 3D Glass Building Monolith with Image Screen
function Building({ index, item, activeIndex, isMobile }) {
  const meshRef = useRef();
  const glassRef = useRef();
  const glowRef = useRef();

  const cardWidth = isMobile ? 1.5 : 2.1;
  const cardHeight = isMobile ? 2.2 : 3.0;

  // Alternate sides of the street: Left (even) / Right (odd)
  const isLeft = index % 2 === 0;
  const targetX = isLeft ? (isMobile ? -1.1 : -1.6) : (isMobile ? 1.1 : 1.6);
  const targetZ = -(index * 6.0 + 2.5);

  useFrame((state) => {
    if (!meshRef.current || !glassRef.current || !glowRef.current) return;

    // Parent group position translation
    const parentZ = meshRef.current.parent.position.z;
    const currentWorldZ = targetZ + parentZ;

    const isActive = index === activeIndex;

    // Zero-gravity slow float for the active card
    const floatY = isActive ? Math.sin(state.clock.getElapsedTime() * 1.5 + index) * 0.05 : 0;
    const yPos = 0.3 + floatY;

    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, yPos, 0.1);
    glassRef.current.position.y = meshRef.current.position.y;
    glowRef.current.position.y = meshRef.current.position.y;

    // Interactive mouse tilt parallax (Subtle rotation when active)
    let rotX = 0;
    let rotY = isLeft ? 0.25 : -0.25; // Pre-angled facing the street center slightly
    let rotZ = 0;

    if (isActive) {
      // Tilt to face camera on pointer
      rotY += state.pointer.x * 0.2;
      rotX = -state.pointer.y * 0.15;
    }

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, rotX, 0.1);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, rotY, 0.1);
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, rotZ, 0.1);

    glassRef.current.rotation.copy(meshRef.current.rotation);
    glowRef.current.rotation.copy(meshRef.current.rotation);

    // Opacity decays as it moves past or is too far in front
    // Active window of focus is Z between -4 and 0
    const distanceToFocus = Math.abs(currentWorldZ + 0.5); // 0.5 is offset in front of camera
    const opacityVal = Math.max(0.0, 1.0 - distanceToFocus * 0.25);

    if (meshRef.current.material) {
      meshRef.current.material.opacity = THREE.MathUtils.lerp(meshRef.current.material.opacity, opacityVal, 0.15);
      meshRef.current.material.grayscale = THREE.MathUtils.lerp(meshRef.current.material.grayscale, isActive ? 0 : 0.6, 0.15);
    }
    if (glassRef.current.material) {
      glassRef.current.material.opacity = THREE.MathUtils.lerp(glassRef.current.material.opacity, opacityVal * 0.25, 0.15);
    }
    if (glowRef.current.material) {
      const activeGlow = isActive ? opacityVal * 0.65 : opacityVal * 0.1;
      glowRef.current.material.opacity = THREE.MathUtils.lerp(glowRef.current.material.opacity, activeGlow, 0.15);
    }
  });

  return (
    <group>
      {/* 3D Semi-transparent Glass Monolith Structure */}
      <mesh ref={glassRef} position={[targetX, 0, targetZ]}>
        <boxGeometry args={[cardWidth + 0.1, cardHeight + 0.1, 0.25]} />
        <meshPhysicalMaterial 
          color={item.glow}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.0}
          transmission={0.7}
          thickness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Glowing Neon Aura outline under the glass */}
      <mesh ref={glowRef} position={[targetX, 0, targetZ - 0.14]}>
        <planeGeometry args={[cardWidth + 0.18, cardHeight + 0.18]} />
        <meshBasicMaterial color={item.glow} transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>

      {/* Main Screen (Project Image) */}
      <Image
        ref={meshRef}
        url={item.image}
        position={[targetX, 0, targetZ + 0.13]}
        scale={[cardWidth, cardHeight]}
        transparent
        opacity={0}
      />
    </group>
  );
}

// 3D Scene Controller
function Scene({ activeIndex, setActiveIndex, isMobile }) {
  const streetRef = useRef();
  const sparklesRef = useRef();
  const gridRef = useRef();
  
  const count = PROJECT_ITEMS.length;

  useFrame((state) => {
    // 1. Solve Scroll Progress (Hero = 0, Projects = 1, Contact = 2)
    const scrollY = window.scrollY;
    const pageHeight = window.innerHeight || 800;
    const progress = scrollY / pageHeight;

    // 2. Animate global sparkles parallax
    if (sparklesRef.current) {
      // Moves particles faster/upwards on scroll to simulate speed
      sparklesRef.current.position.y = progress * 1.8;
      // Slight slow rotation of particle galaxy
      sparklesRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }

    // 3. Move street group forward (along Z positive) on scroll
    if (streetRef.current) {
      // Hero starts at Z=0. Projects Z ranges from -2.5 to -20.5.
      // At scrollProgress = 1.0 (Projects section), we are traveling the street.
      // Let's translate Z from 0 to 22.0
      // We map the scroll progress (from 0 to 2) to Z translation:
      const maxZTranslation = 23.5;
      
      // Interpolate target Z based on scroll progress
      // We use smooth interpolation to damp scroll jitters
      const targetZ = Math.max(0.0, Math.min(maxZTranslation, progress * 11.75));
      streetRef.current.position.z = THREE.MathUtils.lerp(
        streetRef.current.position.z,
        targetZ,
        0.08
      );

      // Solve which building is closest to the front (world Z = 0)
      let closestIdx = 0;
      let minDistance = 999;
      for (let i = 0; i < count; i++) {
        const cardTargetZ = -(i * 6.0 + 2.5);
        const cardWorldZ = cardTargetZ + streetRef.current.position.z;
        const dist = Math.abs(cardWorldZ - 0.0);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = i;
        }
      }

      if (closestIdx !== activeIndex) {
        setActiveIndex(closestIdx);
      }
    }

    // 4. Animate the grid helper parallax
    if (gridRef.current && streetRef.current) {
      // Scroll the grid floor infinite texture effect by wrapping position
      gridRef.current.position.z = (streetRef.current.position.z % 4.0) - 15.0;
    }
  });

  return (
    <group>
      {/* Perspective wireframe neon grid road floor */}
      <gridHelper 
        ref={gridRef}
        args={[60, 30, '#5e6ad2', '#14151f']} 
        position={[0, -1.9, -15]} 
        rotation={[0, 0, 0]}
      />

      {/* 3D depth street elements group */}
      <group ref={streetRef} position={[0, 0, 0]}>
        {PROJECT_ITEMS.map((item, idx) => (
          <Building
            key={idx}
            index={idx}
            item={item}
            activeIndex={activeIndex}
            isMobile={isMobile}
          />
        ))}
      </group>

      {/* Cosmic dust sparkles */}
      <group ref={sparklesRef}>
        <Sparkles 
          count={isMobile ? 80 : 200} 
          scale={[10, 8, 12]} 
          size={isMobile ? 1.5 : 2.5} 
          speed={0.5} 
          color="#5e6ad2" 
          opacity={0.65} 
        />
        <Sparkles 
          count={isMobile ? 80 : 200} 
          scale={[10, 8, 12]} 
          size={isMobile ? 1.2 : 2.0} 
          speed={0.3} 
          color="#06b6d2" 
          opacity={0.65} 
        />
      </group>
    </group>
  );
}

export default function ThreeCanvas({ activeIndex, setActiveIndex }) {
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
      camera={{ position: [0, 0, 0.4], fov: 65, near: 0.1, far: 50 }}
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
          isMobile={isMobile}
        />
      </Suspense>
    </Canvas>
  );
}
