import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations, Html, Environment } from "@react-three/drei";

// Interactive Laptop Component
const InteractiveLaptop = ({ url, position = [0, 0, 0], scale = 1 }) => {
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, scene);
  const [screenContent, setScreenContent] = useState(0); // 0: code, 1: game, 2: portfolio
  const screenRef = useRef();
  const { invalidate } = useThree();

  useEffect(() => {
    if (actions && actions.LaptopOpen) {
      actions.LaptopOpen.clampWhenFinished = true;
      actions.LaptopOpen.setLoop(false);
      actions.LaptopOpen.play();
    }
  }, [actions]);

  // Handle click on the screen
  const handleClick = (e) => {
    e.stopPropagation(); // Prevents click from affecting OrbitControls
    setScreenContent((prev) => (prev + 1) % 3); // Cycle through 0, 1, 2
    invalidate(); // Tell R3F to re-render the scene
  };

  // Find the screen mesh and make it clickable
  useEffect(() => {
    scene.traverse((child) => {
      if (child.name === "Screen" || child.name === "Display" || child.name === "screen") {
        screenRef.current = child;
        child.onClick = handleClick;
        // Make it slightly emissive to show it's interactive
        if (child.material) {
          child.material.emissive.setHex(0x001122);
          child.material.emissiveIntensity = 0.1;
        }
      }
    });
  }, [scene]);

  // Screen content components
  const CodeScreen = () => (
    <div className="bg-black p-3 text-green-400 font-mono text-xs w-48 h-32 overflow-hidden">
      <div className="text-blue-400">// Portfolio Code</div>
      <div className="text-white">const developer = {`{`}</div>
      <div className="text-yellow-400 ml-2">name: "Your Name",</div>
      <div className="text-yellow-400 ml-2">skills: ["React", "Three.js"],</div>
      <div className="text-yellow-400 ml-2">experience: "3+ years"</div>
      <div className="text-white">{`};`}</div>
      <div className="text-gray-500 mt-2">// Click to change view</div>
    </div>
  );

  const GameScreen = () => (
    <div className="bg-gradient-to-b from-blue-900 to-purple-900 p-3 text-white font-mono text-xs w-48 h-32 overflow-hidden relative">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10">
        <div className="text-green-400">🎮 GAMING MODE</div>
        <div className="text-yellow-400 mt-1">Level: 99</div>
        <div className="text-blue-400 mt-1">Score: 999,999</div>
        <div className="text-red-400 mt-1">Health: ████████</div>
        <div className="text-gray-400 mt-2 text-xs">Click to switch view</div>
      </div>
    </div>
  );

  const PortfolioScreen = () => (
    <div className="bg-gradient-to-br from-gray-900 to-black p-3 text-white font-mono text-xs w-48 h-32 overflow-hidden">
      <div className="text-cyan-400">💼 PORTFOLIO</div>
      <div className="text-white mt-1">Projects: 15+</div>
      <div className="text-green-400 mt-1">Technologies:</div>
      <div className="text-yellow-400 ml-2">• React</div>
      <div className="text-yellow-400 ml-2">• Three.js</div>
      <div className="text-yellow-400 ml-2">• Node.js</div>
      <div className="text-gray-400 mt-2 text-xs">Click to cycle views</div>
    </div>
  );

  const getScreenContent = () => {
    switch (screenContent) {
      case 0:
        return <CodeScreen />;
      case 1:
        return <GameScreen />;
      case 2:
        return <PortfolioScreen />;
      default:
        return <CodeScreen />;
    }
  };

  return (
    <>
      <primitive object={scene} position={position} scale={scale} />
      {/* Display HTML content on the screen */}
      {screenRef.current && (
        <Html
          transform
          wrapperClass="laptop-screen"
          distanceFactor={1.5}
          position={screenRef.current.position}
          rotation={screenRef.current.rotation}
        >
          {getScreenContent()}
        </Html>
      )}
    </>
  );
};

// Enhanced Scene with Interactive Laptop
const InteractiveScene = () => {
  return (
    <Canvas camera={{ position: [0, 1.5, 3], fov: 50 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Environment preset="city" />

      <Suspense fallback={<Html center>Loading Interactive 3D Scene...</Html>}>
        {/* Basic room setup */}
        <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
        
        {/* Interactive Laptop */}
        <InteractiveLaptop 
          url="/models/laptop.glb" 
          position={[0, -0.2, 0.1]} 
          scale={1}
        />
        
        {/* Simple desk */}
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[2, 0.1, 1]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      </Suspense>

      <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2} />
    </Canvas>
  );
};

export default InteractiveScene;
