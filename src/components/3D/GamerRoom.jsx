import React, { Suspense, useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations, Html, Points, PointMaterial, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from 'three';

// Generic GLTF Loader with animation
const Model = ({ url, animationName, position = [0, 0, 0], scale = 1, rotation = [0, 0, 0] }) => {
  const group = useRef();
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions && animationName && actions[animationName]) {
      actions[animationName].play();
    }
  }, [actions, animationName]);

  return (
    <primitive 
      ref={group} 
      object={scene} 
      position={position} 
      scale={scale} 
      rotation={rotation}
      castShadow
      receiveShadow
    />
  );
};

// Floating Particle Effect
const FloatingParticles = () => {
  const particlesRef = useRef();
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = Math.random() * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      particlesRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={1000}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00ffea"
        size={0.02}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Animated Gaming Setup (Fallback if no GLB models)
const GamingSetup = () => {
  const setupRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (setupRef.current) {
      setupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.05;
    }
  });

  return (
    <group ref={setupRef}>
      {/* Gaming Desk */}
      <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 0.1, 2]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Monitor */}
      <mesh position={[0, 0.5, 0.8]} castShadow>
        <boxGeometry args={[2, 1.2, 0.1]} />
        <meshStandardMaterial 
          color="#000000" 
          emissive="#00ffea" 
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Monitor Stand */}
      <mesh position={[0, 0.2, 0.8]}>
        <boxGeometry args={[0.3, 0.1, 0.3]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Keyboard */}
      <mesh position={[0, 0.1, 0.2]} castShadow>
        <boxGeometry args={[1.5, 0.05, 0.6]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Mouse */}
      <mesh position={[0.8, 0.1, 0.3]} castShadow>
        <boxGeometry args={[0.2, 0.1, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Gaming Chair */}
      <mesh position={[0, -0.3, -1.5]} castShadow>
        <boxGeometry args={[1, 1.5, 1]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* RGB Strip */}
      <mesh position={[0, 0.6, 0.8]}>
        <boxGeometry args={[2.2, 0.05, 0.15]} />
        <meshStandardMaterial 
          color="#00ffea" 
          emissive="#00ffea" 
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
};

// Animated Gamer Character (Fallback)
const GamerCharacter = () => {
  const characterRef = useRef();
  const [isTyping, setIsTyping] = useState(false);

  useFrame(({ clock }) => {
    if (characterRef.current) {
      // Gentle breathing animation
      characterRef.current.position.y = -0.3 + Math.sin(clock.getElapsedTime() * 2) * 0.02;
      
      // Typing animation
      if (isTyping) {
        characterRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 10) * 0.1;
      }
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <group ref={characterRef} position={[0, -0.5, -1]}>
      {/* Head */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.4, 0.8, 0.3]} />
        <meshStandardMaterial color="#00ffea" />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.3, 0.5, 0]} castShadow>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>
      <mesh position={[0.3, 0.5, 0]} castShadow>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.1, -0.2, 0]} castShadow>
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.1, -0.2, 0]} castShadow>
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
};

const GamerRoom = () => {
  const monitorRef = useRef();
  const pointLightRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Animate monitor RGB glow & light flicker
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // Monitor glow animation
    if (monitorRef.current) {
      monitorRef.current.traverse((child) => {
        if (child.material && child.name.includes("Screen")) {
          child.material.emissiveIntensity = Math.sin(t * 3) * 0.5 + 0.5;
          child.material.emissive.setHex(0x00ffea);
        }
      });
    }
    
    // Light flicker animation
    if (pointLightRef.current) {
      pointLightRef.current.intensity = Math.sin(t * 2) * 0.5 + 1.5;
    }
  });

  return (
    <Canvas 
      camera={{ position: [3, 2, 5], fov: 50 }} 
      className="w-full h-full"
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <pointLight 
        ref={pointLightRef} 
        position={[0, 3, 0]} 
        intensity={1.5} 
        color="#ff0040" 
        castShadow
      />
      <pointLight position={[-3, 2, 3]} intensity={0.8} color="#00ffea" />
      <pointLight position={[3, 2, 3]} intensity={0.8} color="#ff00ff" />

      {/* Environment */}
      <Environment preset="night" />
      <ContactShadows position={[0, -1, 0]} opacity={0.3} scale={10} blur={2} />

      {/* 3D Models */}
      <Suspense fallback={
        <Html center>
          <div className="text-2xl text-green-400 animate-pulse">
            Loading Gaming Room...
          </div>
        </Html>
      }>
        {/* Try to load GLB models, fallback to custom components */}
        <GamingSetup />
        <GamerCharacter />
        
        {/* Floating particles */}
        <FloatingParticles />
      </Suspense>

      {/* Interactive Camera Controls */}
      <OrbitControls 
        enablePan={true} 
        enableZoom={true} 
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
        maxDistance={10}
        minDistance={3}
        autoRotate={!hovered}
        autoRotateSpeed={0.5}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </Canvas>
  );
};

export default GamerRoom;
