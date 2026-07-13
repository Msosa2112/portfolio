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

// Helper to get ZIndex
const getZindex = (array, index) => (
  array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i))
);

// Individual 3D Card
function Card({ index, item, activeIndex, totalCount, onSelect, isMobile }) {
  const meshRef = useRef();
  const glowRef = useRef();
  const [hovered, setHovered] = useState(false);

  const radius = isMobile ? 2.4 : 3.5;
  const angleStep = (Math.PI * 2) / totalCount;
  const theta = index * angleStep;

  const x = Math.sin(theta) * radius;
  const z = Math.cos(theta) * radius;

  useFrame((state) => {
    if (!meshRef.current || !glowRef.current) return;
    
    const parentRotY = meshRef.current.parent.rotation.y;
    const currentAngle = theta + parentRotY;
    const distToFront = Math.abs(Math.atan2(Math.sin(currentAngle), Math.cos(currentAngle)));
    
    const isActive = index === activeIndex;

    // Scales
    const baseScale = isActive ? 1.08 : 0.88;
    const hoverScaleMultiplier = hovered ? 1.12 : 1.0;
    const targetScale = baseScale * hoverScaleMultiplier;

    meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1);
    meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, targetScale, 0.1);

    glowRef.current.scale.x = meshRef.current.scale.x * 1.04;
    glowRef.current.scale.y = meshRef.current.scale.y * 1.04;

    // Float animation
    const floatOffset = (hovered || isActive) 
      ? Math.sin(state.clock.getElapsedTime() * 1.8 + index) * 0.06 
      : 0;
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, floatOffset, 0.1);
    glowRef.current.position.y = meshRef.current.position.y;

    // Pointer parallax tilt
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

    // Opacity
    const targetOpacity = distToFront > Math.PI / 2 ? 0.02 : Math.max(0.12, 1 - distToFront * 0.55);
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
      <mesh ref={glowRef} position={[x, 0, z - 0.02]}>
        <planeGeometry args={[cardWidth, cardHeight]} />
        <meshBasicMaterial color={item.glow} transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
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

// 3D Scene Controller
function Scene({ activeIndex, setActiveIndex, targetRotation, isMobile }) {
  const torusRef = useRef();
  const carouselRef = useRef();
  const sparklesRef = useRef();
  
  const count = PROJECT_ITEMS.length;
  const angleStep = (Math.PI * 2) / count;

  useFrame((state) => {
    // 1. Solve Scroll Progress (Hero = 0, Projects = 1, Contact = 2)
    const scrollY = window.scrollY;
    const pageHeight = window.innerHeight || 800;
    const progress = scrollY / pageHeight;

    // 2. Animate global sparkles parallax
    if (sparklesRef.current) {
      sparklesRef.current.position.y = progress * 1.5;
    }

    // 3. Animate Hero object (TorusKnot)
    if (torusRef.current) {
      // Spinning
      torusRef.current.rotation.x += 0.005;
      torusRef.current.rotation.y += 0.007;

      // Mouse parallax tilt
      torusRef.current.rotation.y += state.pointer.x * 0.02;
      torusRef.current.rotation.x += -state.pointer.y * 0.02;

      // Transition out on scroll
      const t = Math.min(1.0, Math.max(0.0, progress));
      torusRef.current.position.y = t * 3.8 + Math.sin(state.clock.getElapsedTime() * 1.5) * 0.08;
      torusRef.current.position.z = t * -2.0;
      const targetScale = Math.max(0.0, 1.0 - t * 1.2);
      torusRef.current.scale.setScalar(targetScale);
    }

    // 4. Animate Projects Carousel Y transition
    if (carouselRef.current) {
      let carouselY = -6.0;
      let carouselScale = 0.5;

      if (progress < 1.0) {
        // Hero -> Projects
        const t = progress; // 0 to 1
        carouselY = -6.0 + 6.0 * t;
        carouselScale = 0.5 + 0.5 * t;
      } else {
        // Projects -> Contact
        const t = Math.min(1.0, progress - 1.0); // 0 to 1
        carouselY = 0.0 - 6.0 * t;
        carouselScale = 1.0 - 0.5 * t;
      }

      carouselRef.current.position.y = carouselY;
      carouselRef.current.scale.setScalar(carouselScale);

      // Rotate carousel
      carouselRef.current.rotation.y = THREE.MathUtils.lerp(
        carouselRef.current.rotation.y,
        targetRotation.current,
        0.08
      );

      // Solve front index
      let maxCos = -2;
      let closestIdx = 0;
      for (let i = 0; i < count; i++) {
        const theta = carouselRef.current.rotation.y + i * angleStep;
        const cosVal = Math.cos(theta);
        if (cosVal > maxCos) {
          maxCos = cosVal;
          closestIdx = i;
        }
      }

      if (closestIdx !== activeIndex) {
        setActiveIndex(closestIdx);
      }
    }
  });

  const handleSelect = (idx) => {
    if (!carouselRef.current) return;
    const currentRot = carouselRef.current.rotation.y;
    const targetRotForCard = -idx * angleStep;
    const difference = targetRotForCard - (currentRot % (Math.PI * 2));
    let adjustedDiff = Math.atan2(Math.sin(difference), Math.cos(difference));
    targetRotation.current = currentRot + adjustedDiff;
  };

  return (
    <group>
      {/* Hero Glass Dodecahedron object */}
      <mesh ref={torusRef} position={[0, 0, 0]}>
        <dodecahedronGeometry args={[1.0, 1]} />
        <meshPhysicalMaterial 
          roughness={0.12} 
          metalness={0.6} 
          color="#8076eb" 
          transmission={0.7} 
          thickness={0.5} 
          clearcoat={1.0} 
          clearcoatRoughness={0.1} 
        />
      </mesh>

      {/* Projects 3D cylinder group */}
      <group ref={carouselRef} position={[0, -6, 0]} rotation={[0.16, 0, -0.14]}>
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

      {/* Global space sparkles */}
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
        zIndex: 1, // Runs directly in background of content
        pointerEvents: 'none' // Allows interaction events to fall through to HTML links
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
