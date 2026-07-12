import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

function ParticleSwarm() {
  const ref = useRef();
  
  // Generate random points in a sphere
  const [positions, math] = useMemo(() => {
    const count = 5000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 10 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return [pos, Math];
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    
    const scrollY = window.scrollY;
    
    // Time-based rotation
    const timeX = state.clock.getElapsedTime() * -0.05;
    const timeY = state.clock.getElapsedTime() * -0.05;
    
    // Scroll-based rotation (spins faster as you scroll down)
    const scrollRotX = scrollY * 0.001;
    const scrollRotY = scrollY * 0.003;
    
    // Mouse reaction
    const mouseX = state.mouse.x * 0.3;
    const mouseY = state.mouse.y * 0.3;
    
    // Combine everything
    const targetX = timeX + scrollRotX + mouseY;
    const targetY = timeY + scrollRotY + mouseX;
    
    // Smoothly interpolate
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, targetX, 0.05);
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetY, 0.05);
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#a7b1ff"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}


const CanvasBackground = () => {
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <fog attach="fog" args={['#030305', 5, 15]} />
        <ParticleSwarm />
      </Canvas>
      <style>{`
        .canvas-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: -1;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default CanvasBackground;
