import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations, Html, Environment, ContactShadows, Float, Text } from "@react-three/drei";
import * as THREE from 'three';

// Animated Keyboard Component
const AnimatedKeyboard = ({ position = [0, 0, 0] }) => {
  const keyboardRef = useRef();
  const [keysPressed, setKeysPressed] = useState(new Set());

  useFrame((state) => {
    if (keyboardRef.current) {
      // Simulate typing animation
      const time = state.clock.elapsedTime;
      keyboardRef.current.rotation.y = Math.sin(time * 0.1) * 0.02;
      
      // Random key press simulation
      if (Math.random() < 0.1) {
        const randomKey = Math.floor(Math.random() * 10);
        setKeysPressed(prev => new Set([...prev, randomKey]));
        setTimeout(() => {
          setKeysPressed(prev => {
            const newSet = new Set(prev);
            newSet.delete(randomKey);
            return newSet;
          });
        }, 200);
      }
    }
  });

  return (
    <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2} position={position}>
      <group ref={keyboardRef}>
        {/* Keyboard Base */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.0, 0.1, 0.6]} />
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Individual Keys */}
        {Array.from({ length: 10 }, (_, i) => (
          <mesh
            key={i}
            position={[
              (i - 4.5) * 0.15,
              0.08,
              Math.sin(i * 0.3) * 0.1
            ]}
          >
            <boxGeometry args={[0.12, 0.05, 0.12]} />
            <meshStandardMaterial
              color={keysPressed.has(i) ? "#00ff88" : "#2a2a2a"}
              emissive={keysPressed.has(i) ? new THREE.Color(0x00ff88).multiplyScalar(0.3) : new THREE.Color(0x000000)}
            />
          </mesh>
        ))}

        {/* RGB Backlight */}
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[2.1, 0.02, 0.7]} />
          <meshStandardMaterial
            color="#00ff88"
            transparent
            opacity={0.3}
            emissive={new THREE.Color(0x00ff88).multiplyScalar(0.2)}
          />
        </mesh>
      </group>
    </Float>
  );
};

// Animated Mouse Component
const AnimatedMouse = ({ position = [0, 0, 0] }) => {
  const mouseRef = useRef();
  const [isClicked, setIsClicked] = useState(false);

  useFrame((state) => {
    if (mouseRef.current) {
      // Gentle movement
      mouseRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Click animation
      if (isClicked) {
        mouseRef.current.scale.y = 0.8;
      } else {
        mouseRef.current.scale.y = 1;
      }
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 100);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Float speed={0.3} rotationIntensity={0.2} floatIntensity={0.1} position={position}>
      <group ref={mouseRef}>
        {/* Mouse Body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.15, 0.5]} />
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>

        {/* Mouse Wheel */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
          <meshStandardMaterial
            color="#00ff88"
            emissive={new THREE.Color(0x00ff88).multiplyScalar(0.5)}
          />
        </mesh>

        {/* RGB Lighting */}
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[0.35, 0.02, 0.55]} />
          <meshStandardMaterial
            color="#00ff88"
            transparent
            opacity={0.4}
            emissive={new THREE.Color(0x00ff88).multiplyScalar(0.3)}
          />
        </mesh>
      </group>
    </Float>
  );
};

// Enhanced Gaming Laptop
const EnhancedGamingLaptop = ({ position = [0, 0, 0] }) => {
  const laptopRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [screenContent, setScreenContent] = useState(0);

  useFrame((state) => {
    if (laptopRef.current) {
      // Gentle floating
      laptopRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
      
      // Screen content animation
      if (Math.random() < 0.05) {
        setScreenContent(prev => (prev + 1) % 3);
      }
    }
  });

  const screenContents = [
    { color: "#00ff88", text: "CODE" },
    { color: "#0088ff", text: "GAME" },
    { color: "#ff0088", text: "BUILD" }
  ];

  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.3} position={position}>
      <group 
        ref={laptopRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Laptop Base */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.8, 0.3, 2.0]} />
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Laptop Screen */}
        <mesh position={[0, 0.9, 1.0]} rotation={[0.15, 0, 0]}>
          <boxGeometry args={[2.5, 1.6, 0.1]} />
          <meshStandardMaterial
            color="#000000"
            emissive={hovered ? new THREE.Color(0x00ff88).multiplyScalar(0.4) : new THREE.Color(0x00ff88).multiplyScalar(0.1)}
          />
        </mesh>

        {/* Screen Content */}
        <mesh position={[0, 0.9, 1.05]} rotation={[0.15, 0, 0]}>
          <planeGeometry args={[2.2, 1.4]} />
          <meshStandardMaterial
            color={screenContents[screenContent].color}
            emissive={new THREE.Color(screenContents[screenContent].color).multiplyScalar(0.6)}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Screen Text */}
        <Text
          position={[0, 0.9, 1.06]}
          rotation={[0.15, 0, 0]}
          fontSize={0.3}
          color={screenContents[screenContent].color}
          anchorX="center"
          anchorY="middle"
        >
          {screenContents[screenContent].text}
        </Text>

        {/* Keyboard */}
        <mesh position={[0, 0.15, 1.0]}>
          <planeGeometry args={[2.2, 0.7]} />
          <meshStandardMaterial
            color="#2a2a2a"
            metalness={0.6}
            roughness={0.4}
          />
        </mesh>

        {/* RGB Strip */}
        <mesh position={[0, 0.15, 1.05]}>
          <boxGeometry args={[2.3, 0.05, 0.1]} />
          <meshStandardMaterial
            color="#00ff88"
            emissive={new THREE.Color(0x00ff88).multiplyScalar(0.4)}
          />
        </mesh>

        {/* Hover Glow */}
        {hovered && (
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[3.0, 0.4, 2.2]} />
            <meshStandardMaterial
              color="#00ff88"
              transparent
              opacity={0.1}
              emissive={new THREE.Color(0x00ff88).multiplyScalar(0.3)}
            />
          </mesh>
        )}
      </group>
    </Float>
  );
};

// Gaming Headset
const GamingHeadset = ({ position = [0, 0, 0] }) => {
  const headsetRef = useRef();

  useFrame((state) => {
    if (headsetRef.current) {
      headsetRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <Float speed={0.4} rotationIntensity={0.1} floatIntensity={0.2} position={position}>
      <group ref={headsetRef}>
        {/* Headset Band */}
        <mesh castShadow>
          <torusGeometry args={[0.4, 0.05, 8, 16]} />
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>

        {/* Left Earcup */}
        <mesh position={[-0.3, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
          <meshStandardMaterial
            color="#2a2a2a"
            metalness={0.6}
            roughness={0.4}
          />
        </mesh>

        {/* Right Earcup */}
        <mesh position={[0.3, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
          <meshStandardMaterial
            color="#2a2a2a"
            metalness={0.6}
            roughness={0.4}
          />
        </mesh>

        {/* RGB Lighting */}
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[0.42, 0.02, 8, 16]} />
          <meshStandardMaterial
            color="#00ff88"
            emissive={new THREE.Color(0x00ff88).multiplyScalar(0.3)}
          />
        </mesh>
      </group>
    </Float>
  );
};

// Main Advanced Gaming Scene
const AdvancedGamingScene = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <Canvas
      camera={{ position: [0, 1.5, 6], fov: 50 }}
      className="w-full h-full"
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-3, 3, 3]} intensity={0.6} color="#00ff88" />
      <pointLight position={[3, 3, -3]} intensity={0.6} color="#0088ff" />
      <pointLight position={[0, 5, 0]} intensity={0.4} color="#ff0088" />
      
      {/* Environment */}
      <Environment preset="night" />
      
      {/* Contact Shadows */}
      <ContactShadows
        position={[0, -1, 0]}
        opacity={0.4}
        scale={12}
        blur={2}
        far={5}
      />

      {/* Gaming Setup */}
      <Suspense fallback={
        <Html center>
          <div className="text-2xl text-green-400 animate-pulse">
            Loading Advanced Gaming Setup...
          </div>
        </Html>
      }>
        {/* Enhanced Gaming Laptop */}
        <EnhancedGamingLaptop position={[0, 0, 0]} />
        
        {/* Animated Keyboard */}
        <AnimatedKeyboard position={[0, 0.1, 1.5]} />
        
        {/* Animated Mouse */}
        <AnimatedMouse position={[0.8, 0.1, 1.2]} />
        
        {/* Gaming Headset */}
        <GamingHeadset position={[0, 1.2, -0.5]} />
      </Suspense>

      {/* Interactive Camera Controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
        maxDistance={10}
        minDistance={4}
        autoRotate={!hovered}
        autoRotateSpeed={0.3}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </Canvas>
  );
};

export default AdvancedGamingScene;
