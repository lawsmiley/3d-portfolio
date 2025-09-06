import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations, Html, Environment, ContactShadows, Float } from "@react-three/drei";
import * as THREE from 'three';

// Animated Character Component
const Character = ({ url, animationName, position = [0, 0, 0], scale = 1 }) => {
  const group = useRef();
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions && actions[animationName]) {
      actions[animationName].play();
    }
  }, [actions, animationName]);

  return <primitive ref={group} object={scene} position={position} scale={scale} />;
};

// Gaming Laptop Component
const GamingLaptop = ({ position = [0, 0, 0] }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
      
      // Screen glow effect
      if (hovered) {
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      }
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5} position={position}>
      <group ref={meshRef}>
        {/* Laptop Base */}
        <mesh
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[2.5, 0.3, 1.8]} />
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Laptop Screen */}
        <mesh position={[0, 0.8, 0.9]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[2.2, 1.4, 0.1]} />
          <meshStandardMaterial
            color="#000000"
            emissive={hovered ? new THREE.Color(0x00ff88).multiplyScalar(0.3) : new THREE.Color(0x00ff88).multiplyScalar(0.1)}
          />
        </mesh>

        {/* Screen Content */}
        <mesh position={[0, 0.8, 0.95]} rotation={[0.2, 0, 0]}>
          <planeGeometry args={[2.0, 1.2]} />
          <meshStandardMaterial
            color="#00ff88"
            emissive={new THREE.Color(0x00ff88).multiplyScalar(0.5)}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Keyboard */}
        <mesh position={[0, 0.15, 0.9]}>
          <planeGeometry args={[2.0, 0.6]} />
          <meshStandardMaterial
            color="#2a2a2a"
            metalness={0.6}
            roughness={0.4}
          />
        </mesh>

        {/* RGB Lighting */}
        {hovered && (
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2.7, 0.4, 2.0]} />
            <meshStandardMaterial
              color="#00ff88"
              transparent
              opacity={0.1}
              emissive={new THREE.Color(0x00ff88).multiplyScalar(0.2)}
            />
          </mesh>
        )}
      </group>
    </Float>
  );
};

// Gaming Chair Component
const GamingChair = ({ position = [0, 0, 0] }) => {
  const chairRef = useRef();

  useFrame((state) => {
    if (chairRef.current) {
      chairRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.3} position={position}>
      <group ref={chairRef}>
        {/* Chair Base */}
        <mesh castShadow>
          <cylinderGeometry args={[0.8, 0.8, 0.1, 32]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Chair Back */}
        <mesh position={[0, 0.6, -0.3]} rotation={[0.1, 0, 0]}>
          <boxGeometry args={[1.2, 1.2, 0.1]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.6} roughness={0.4} />
        </mesh>

        {/* Chair Seat */}
        <mesh position={[0, 0.1, 0.2]}>
          <boxGeometry args={[1.0, 0.1, 0.8]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.6} roughness={0.4} />
        </mesh>

        {/* RGB Strip */}
        <mesh position={[0, 0.6, -0.25]}>
          <boxGeometry args={[1.3, 0.05, 0.15]} />
          <meshStandardMaterial
            color="#00ff88"
            emissive={new THREE.Color(0x00ff88).multiplyScalar(0.3)}
          />
        </mesh>
      </group>
    </Float>
  );
};

// Floating Particles
const FloatingParticles = () => {
  const pointsRef = useRef();
  const particleCount = 100;

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = Math.random() * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00ff88"
        size={0.02}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Main Gaming Scene Component
const GamingScene = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <Canvas
      camera={{ position: [0, 1.5, 5], fov: 50 }}
      className="w-full h-full"
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Lighting Setup */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, 5, 5]} intensity={0.5} color="#00ff88" />
      <pointLight position={[5, 5, -5]} intensity={0.5} color="#0088ff" />
      
      {/* Environment */}
      <Environment preset="night" />
      
      {/* Contact Shadows */}
      <ContactShadows
        position={[0, -1, 0]}
        opacity={0.3}
        scale={10}
        blur={2}
        far={4.5}
      />

      {/* Gaming Setup */}
      <Suspense fallback={
        <Html center>
          <div className="text-2xl text-green-400 animate-pulse">
            Loading Gaming Setup...
          </div>
        </Html>
      }>
        {/* Gaming Laptop */}
        <GamingLaptop position={[0, 0, 0]} />
        
        {/* Gaming Chair */}
        <GamingChair position={[0, -0.5, -1.5]} />
        
        {/* Floating Particles */}
        <FloatingParticles />
      </Suspense>

      {/* Interactive Camera Controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
        maxDistance={8}
        minDistance={3}
        autoRotate={!hovered}
        autoRotateSpeed={0.5}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </Canvas>
  );
};

export default GamingScene;
