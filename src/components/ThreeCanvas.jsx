import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';

function SparkleField({ isMobile }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Slow drift rotation
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.015;
    
    // Bind Y drift to window scroll position to create starry parallax
    const scrollY = window.scrollY;
    const pageHeight = window.innerHeight || 800;
    const progress = scrollY / pageHeight;
    groupRef.current.position.y = progress * 1.6;
  });

  return (
    <group ref={groupRef}>
      <Sparkles 
        count={isMobile ? 120 : 260} 
        scale={[12, 10, 12]} 
        size={isMobile ? 1.5 : 2.5} 
        speed={0.45} 
        color="#5e6ad2" 
        opacity={0.7} 
      />
      <Sparkles 
        count={isMobile ? 120 : 260} 
        scale={[12, 10, 12]} 
        size={isMobile ? 1.2 : 2.0} 
        speed={0.3} 
        color="#06b6d2" 
        opacity={0.7} 
      />
    </group>
  );
}

export default function ThreeCanvas() {
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
        zIndex: -1, // Sits directly above Grainient background but below HTML text overlays
        pointerEvents: 'none'
      }}
    >
      <ambientLight intensity={1.8} />
      <directionalLight position={[0, 10, 5]} intensity={1.2} />
      
      <Suspense fallback={null}>
        <SparkleField isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
}
