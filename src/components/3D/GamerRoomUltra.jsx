import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations, Html, Text, Points, PointMaterial, Float } from "@react-three/drei";

// Model Loader with Animation
const Model = ({ url, animationName, position = [0, 0, 0], scale = 1, ref }) => {
  const group = useRef();
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions && animationName && actions[animationName]) {
      actions[animationName].play();
    }
  }, [actions, animationName]);

  // Forward ref to parent
  useEffect(() => {
    if (ref) {
      ref.current = group.current;
    }
  }, [ref]);

  return <primitive ref={group} object={scene} position={position} scale={scale} />;
};

// Animated Keyboard RGB
const KeyboardRGB = ({ keyboardRef }) => {
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (keyboardRef.current) {
      keyboardRef.current.traverse((child) => {
        if (child.material) {
          const r = (Math.sin(t * 2) + 1) / 2;
          const g = (Math.sin(t * 3 + 1) + 1) / 2;
          const b = (Math.sin(t * 4 + 2) + 1) / 2;
          child.material.color.setRGB(r, g, b);
          child.material.emissive.setRGB(r * 0.3, g * 0.3, b * 0.3);
        }
      });
    }
  });
  return null;
};

// Chair Rocking Animation
const AnimatedChair = ({ chairRef }) => {
  useFrame(({ clock }) => {
    if (chairRef.current) {
      chairRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.05;
      chairRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.02;
    }
  });
  return null;
};

// Holographic Code Panels
const FloatingHologram = ({ position, code }) => {
  const meshRef = useRef();
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.8) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Text
        ref={meshRef}
        position={position}
        fontSize={0.15}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
        rotation={[Math.PI / 6, 0, Math.PI / 4]}
        material-transparent
        material-opacity={0.8}
      >
        {code}
      </Text>
    </Float>
  );
};

// Floating Particles
const FloatingParticles = () => {
  const particlesRef = useRef();
  
  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      particlesRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  const points = React.useMemo(() => {
    const temp = new Float32Array(1000);
    for (let i = 0; i < 1000; i++) {
      temp[i] = (Math.random() - 0.5) * 20;
    }
    return temp;
  }, []);

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={1000}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#00ffea"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// RGB Neon Lights
const NeonLights = () => {
  const lightRef1 = useRef();
  const lightRef2 = useRef();
  const lightRef3 = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    if (lightRef1.current) {
      lightRef1.current.intensity = Math.sin(t * 2) * 0.5 + 1;
    }
    if (lightRef2.current) {
      lightRef2.current.intensity = Math.sin(t * 3 + 1) * 0.5 + 1;
    }
    if (lightRef3.current) {
      lightRef3.current.intensity = Math.sin(t * 4 + 2) * 0.5 + 1;
    }
  });

  return (
    <>
      <pointLight ref={lightRef1} position={[3, 2, -2]} color="#ff0040" intensity={1} />
      <pointLight ref={lightRef2} position={[-3, 2, -2]} color="#00ff40" intensity={1} />
      <pointLight ref={lightRef3} position={[0, 3, 2]} color="#4000ff" intensity={1} />
    </>
  );
};

const GamerRoomUltra = () => {
  const monitorRef = useRef();
  const pointLightRef = useRef();
  const keyboardRef = useRef();
  const chairRef = useRef();

  // Animate Monitor & RGB Lights
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (monitorRef.current) {
      monitorRef.current.traverse((child) => {
        if (child.material && child.name.includes("Screen")) {
          child.material.emissiveIntensity = Math.sin(t * 3) * 0.5 + 0.5;
          child.material.emissive.setHex(0x00ffff);
        }
      });
    }
    if (pointLightRef.current) {
      pointLightRef.current.intensity = Math.sin(t * 2) * 0.5 + 1.5;
    }
  });

  return (
    <Canvas camera={{ position: [5, 3, 7], fov: 50 }}>
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <pointLight ref={pointLightRef} position={[0, 3, 0]} intensity={1.5} color={"#ff0040"} />
      <NeonLights />

      {/* 3D Models */}
      <Suspense fallback={
        <Html center>
          <div className="text-2xl text-cyan-400 animate-pulse">
            Loading Ultra 3D Room...
          </div>
        </Html>
      }>
        <Model url="/models/room.glb" />
        <Model url="/models/desk.glb" />
        <Model url="/models/chair.glb" ref={chairRef} />
        <Model url="/models/keyboard.glb" ref={keyboardRef} />
        <Model url="/models/gamer.glb" animationName="GamingIdle" />
        <primitive ref={monitorRef} object={useGLTF("/models/monitor.glb").scene} />
      </Suspense>

      {/* Holographic floating code */}
      <FloatingHologram 
        position={[1, 1.5, -0.5]} 
        code={`const x = "Code";\nconsole.log(x);\nfunction render() {\n  return <div>Hello</div>;\n}`}
      />
      <FloatingHologram 
        position={[-1, 1.2, -0.5]} 
        code={`import React from 'react';\nconst App = () => {\n  return <h1>Portfolio</h1>;\n};`}
      />
      <FloatingHologram 
        position={[0, 2, 1]} 
        code={`npm install three\n@react-three/fiber\n@react-three/drei`}
      />

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Animations */}
      <AnimatedChair chairRef={chairRef} />
      <KeyboardRGB keyboardRef={keyboardRef} />

      {/* Enhanced Controls */}
      <OrbitControls 
        enablePan={true} 
        enableZoom={true} 
        maxPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.3}
        enableDamping
        dampingFactor={0.05}
      />
    </Canvas>
  );
};

export default GamerRoomUltra;
