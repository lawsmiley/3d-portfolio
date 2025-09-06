import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';

const Scene = () => {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Canvas 
      camera={{ position: [0, 0, 8], fov: 55 }} 
      className="w-full h-full"
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Lighting Setup */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#8b5cf6" />
      
      {/* Animated Stars Background */}
      <Stars 
        radius={100} 
        depth={50} 
        count={2000} 
        factor={4} 
        fade 
        speed={0.5}
      />

      <group ref={groupRef}>
        {/* Simple floating cube */}
        <Float position={[0, 0, 0]} floatIntensity={1} rotationIntensity={0.5}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial 
              color="#3b82f6" 
              metalness={0.6} 
              roughness={0.3}
            />
          </mesh>
        </Float>

        {/* Floating spheres */}
        <Float position={[-3, 1, 0]} floatIntensity={1.2} rotationIntensity={0.3}>
          <mesh castShadow>
            <sphereGeometry args={[0.8, 32, 32]} />
            <meshStandardMaterial 
              color="#8b5cf6" 
              metalness={0.7} 
              roughness={0.2}
            />
          </mesh>
        </Float>

        <Float position={[3, 1, 0]} floatIntensity={1.5} rotationIntensity={0.4}>
          <mesh castShadow>
            <sphereGeometry args={[0.6, 32, 32]} />
            <meshStandardMaterial 
              color="#ec4899" 
              metalness={0.8} 
              roughness={0.1}
            />
          </mesh>
        </Float>

        {/* Floating geometric shapes */}
        <Float position={[0, 3, -2]} floatIntensity={2} rotationIntensity={0.8}>
          <mesh>
            <octahedronGeometry args={[0.5]} />
            <meshStandardMaterial 
              color="#10b981" 
              metalness={0.6} 
              roughness={0.3}
            />
          </mesh>
        </Float>
      </group>

      {/* Interactive Camera Controls */}
      <OrbitControls 
        enableZoom={true}
        enablePan={true}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 6}
        maxDistance={15}
        minDistance={3}
        autoRotate={!hovered}
        autoRotateSpeed={0.5}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </Canvas>
  );
};

export default Scene;
