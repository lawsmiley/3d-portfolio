import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = () => {
  const pointsRef = useRef();
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(8000);
    
    for (let i = 0; i < 8000; i++) {
      positions[i] = (Math.random() - 0.5) * 50;
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.3;
    }
  });

  return (
    <Points ref={pointsRef} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00ff88"
        size={0.01}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const FloatingGeometry = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[3, 0, -2]}>
      <octahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial
        color="#0088ff"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
};

const SecondaryParticleField = () => {
  const pointsRef = useRef();
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000);
    
    for (let i = 0; i < 2000; i++) {
      positions[i] = (Math.random() - 0.5) * 40;
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = -state.clock.elapsedTime * 0.015;
      pointsRef.current.rotation.y = -state.clock.elapsedTime * 0.025;
      pointsRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.08) * 0.4;
    }
  });

  return (
    <Points ref={pointsRef} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#0088ff"
        size={0.008}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const ParticleBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={0.3} />
        <ParticleField />
        <SecondaryParticleField />
        <FloatingGeometry />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;
