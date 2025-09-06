import React, { Suspense, useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations, Html, Points, PointMaterial, Environment, ContactShadows, Text, Float } from "@react-three/drei";
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

// Floating Code Holograms
const CodeHolograms = () => {
  const hologramRef = useRef();
  const [codeLines, setCodeLines] = useState([
    "const gamer = {",
    "  level: 'pro',",
    "  skills: ['React', 'Three.js'],",
    "  passion: 'coding'",
    "};",
    "",
    "function buildPortfolio() {",
    "  return <UltraGamerRoom />;",
    "}"
  ]);

  useFrame(({ clock }) => {
    if (hologramRef.current) {
      hologramRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
      hologramRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.1;
    }
  });

  return (
    <group ref={hologramRef} position={[2, 1.5, 0]}>
      {codeLines.map((line, index) => (
        <Text
          key={index}
          position={[0, -index * 0.2, 0]}
          fontSize={0.08}
          color="#00ffea"
          font="/fonts/inter-bold.woff"
          anchorX="left"
          anchorY="middle"
        >
          {line}
        </Text>
      ))}
      
      {/* Hologram glow effect */}
      <mesh position={[0, -0.5, 0]}>
        <planeGeometry args={[2, 2]} />
        <meshStandardMaterial
          color="#00ffea"
          transparent
          opacity={0.1}
          emissive="#00ffea"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
};

// Animated RGB Keyboard
const RGBKeyboard = () => {
  const keyboardRef = useRef();
  const [keysPressed, setKeysPressed] = useState(new Set());

  useFrame(({ clock }) => {
    if (keyboardRef.current) {
      // Gentle floating
      keyboardRef.current.position.y = 0.1 + Math.sin(clock.getElapsedTime() * 0.5) * 0.02;
      
      // Random key press simulation
      if (Math.random() < 0.1) {
        const randomKey = Math.floor(Math.random() * 20);
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
    <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2} position={[0, 0.1, 0.2]}>
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

        {/* Individual RGB Keys */}
        {Array.from({ length: 20 }, (_, i) => (
          <mesh
            key={i}
            position={[
              (i % 10 - 4.5) * 0.15,
              0.08,
              Math.floor(i / 10) * 0.15 - 0.075
            ]}
          >
            <boxGeometry args={[0.12, 0.05, 0.12]} />
            <meshStandardMaterial
              color={keysPressed.has(i) ? "#00ffea" : "#2a2a2a"}
              emissive={keysPressed.has(i) ? new THREE.Color(0x00ffea).multiplyScalar(0.5) : new THREE.Color(0x000000)}
            />
          </mesh>
        ))}

        {/* RGB Backlight Strip */}
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[2.1, 0.02, 0.7]} />
          <meshStandardMaterial
            color="#00ffea"
            transparent
            opacity={0.3}
            emissive={new THREE.Color(0x00ffea).multiplyScalar(0.4)}
          />
        </mesh>
      </group>
    </Float>
  );
};

// Spinning Gaming Chair
const SpinningChair = () => {
  const chairRef = useRef();
  const [isSpinning, setIsSpinning] = useState(false);

  useFrame(({ clock }) => {
    if (chairRef.current) {
      if (isSpinning) {
        chairRef.current.rotation.y = clock.getElapsedTime() * 2;
      } else {
        chairRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.05;
      }
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSpinning(true);
      setTimeout(() => setIsSpinning(false), 2000);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Float speed={0.3} rotationIntensity={0.2} floatIntensity={0.1} position={[0, -0.3, -1.5]}>
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
            color="#00ffea"
            emissive={new THREE.Color(0x00ffea).multiplyScalar(0.5)}
          />
        </mesh>

        {/* Spinning Effect Glow */}
        {isSpinning && (
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[1.0, 1.0, 0.2, 32]} />
            <meshStandardMaterial
              color="#00ffea"
              transparent
              opacity={0.2}
              emissive={new THREE.Color(0x00ffea).multiplyScalar(0.3)}
            />
          </mesh>
        )}
      </group>
    </Float>
  );
};

// Pulsing RGB Monitors
const PulsingMonitors = () => {
  const monitorRef = useRef();
  const [screenContent, setScreenContent] = useState(0);

  useFrame(({ clock }) => {
    if (monitorRef.current) {
      // Screen content animation
      if (Math.random() < 0.05) {
        setScreenContent(prev => (prev + 1) % 4);
      }

      // Pulsing RGB effect
      monitorRef.current.traverse((child) => {
        if (child.material && child.name.includes("Screen")) {
          const t = clock.getElapsedTime();
          child.material.emissiveIntensity = Math.sin(t * 3) * 0.5 + 0.5;
          child.material.emissive.setHex(0x00ffea);
        }
      });
    }
  });

  const screenContents = [
    { color: "#00ffea", text: "CODE" },
    { color: "#ff00ff", text: "GAME" },
    { color: "#00ff00", text: "BUILD" },
    { color: "#ffaa00", text: "CREATE" }
  ];

  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.3} position={[0, 0, 0]}>
      <group ref={monitorRef}>
        {/* Main Monitor */}
        <mesh position={[0, 0.9, 1.0]} rotation={[0.15, 0, 0]} castShadow>
          <boxGeometry args={[2.5, 1.6, 0.1]} />
          <meshStandardMaterial
            color="#000000"
            emissive={screenContents[screenContent].color}
            emissiveIntensity={0.3}
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

        {/* Monitor Stand */}
        <mesh position={[0, 0.2, 1.0]}>
          <boxGeometry args={[0.3, 0.1, 0.3]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.6} roughness={0.4} />
        </mesh>

        {/* RGB Strip */}
        <mesh position={[0, 0.9, 1.05]}>
          <boxGeometry args={[2.6, 0.05, 0.15]} />
          <meshStandardMaterial
            color="#00ffea"
            emissive={new THREE.Color(0x00ffea).multiplyScalar(0.6)}
          />
        </mesh>

        {/* Side Monitors */}
        <mesh position={[-1.5, 0.7, 0.8]} rotation={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[1.5, 1.0, 0.1]} />
          <meshStandardMaterial
            color="#000000"
            emissive="#ff00ff"
            emissiveIntensity={0.2}
          />
        </mesh>

        <mesh position={[1.5, 0.7, 0.8]} rotation={[0, -0.3, 0]} castShadow>
          <boxGeometry args={[1.5, 1.0, 0.1]} />
          <meshStandardMaterial
            color="#000000"
            emissive="#00ff00"
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
};

// Animated Gamer Character
const AnimatedGamer = () => {
  const characterRef = useRef();
  const [isTyping, setIsTyping] = useState(false);
  const [isGaming, setIsGaming] = useState(false);

  useFrame(({ clock }) => {
    if (characterRef.current) {
      // Gentle breathing animation
      characterRef.current.position.y = -0.3 + Math.sin(clock.getElapsedTime() * 2) * 0.02;
      
      // Typing animation
      if (isTyping) {
        characterRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 10) * 0.1;
      }
      
      // Gaming animation
      if (isGaming) {
        characterRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 5) * 0.05;
      }
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setIsGaming(true);
        setTimeout(() => setIsGaming(false), 2000);
      }, 2000);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Float speed={0.4} rotationIntensity={0.1} floatIntensity={0.2} position={[0, -0.5, -1]}>
      <group ref={characterRef}>
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

        {/* Gaming Glow */}
        {(isTyping || isGaming) && (
          <mesh position={[0, 0.5, 0]}>
            <boxGeometry args={[0.6, 1.0, 0.5]} />
            <meshStandardMaterial
              color="#00ffea"
              transparent
              opacity={0.1}
              emissive={new THREE.Color(0x00ffea).multiplyScalar(0.2)}
            />
          </mesh>
        )}
      </group>
    </Float>
  );
};

// Floating Particle Effects
const FloatingParticles = () => {
  const particlesRef = useRef();
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = Math.random() * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
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
          count={2000}
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

// Main Ultra Gamer Room Component
const UltraGamerRoom = () => {
  const pointLightRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Animate lights and effects
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
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
      <pointLight position={[0, 1, -2]} intensity={0.6} color="#00ff00" />

      {/* Environment */}
      <Environment preset="night" />
      <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={15} blur={2} />

      {/* 3D Scene */}
      <Suspense fallback={
        <Html center>
          <div className="text-2xl text-green-400 animate-pulse">
            Loading Ultra Gaming Room...
          </div>
        </Html>
      }>
        {/* Gaming Setup */}
        <PulsingMonitors />
        <RGBKeyboard />
        <SpinningChair />
        <AnimatedGamer />
        <CodeHolograms />
        
        {/* Floating particles */}
        <FloatingParticles />
      </Suspense>

      {/* Interactive Camera Controls */}
      <OrbitControls 
        enablePan={true} 
        enableZoom={true} 
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
        maxDistance={12}
        minDistance={3}
        autoRotate={!hovered}
        autoRotateSpeed={0.3}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </Canvas>
  );
};

export default UltraGamerRoom;
