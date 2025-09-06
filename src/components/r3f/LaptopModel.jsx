import React, { useRef, useState } from 'react';
import { Float, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const LaptopModel = ({ position = [0, 0, 0] }) => {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      
      if (hovered) {
        groupRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1);
      } else {
        groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }

      if (clicked) {
        groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 10) * 0.1;
      }
    }
  });

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 200);
  };

  return (
    <Float 
      speed={1.5} 
      rotationIntensity={0.3} 
      floatIntensity={0.8} 
      position={position}
    >
      <group 
        ref={groupRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Laptop Base */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[3, 0.2, 2]} />
          <meshStandardMaterial 
            color="#1a1a1a" 
            metalness={0.8} 
            roughness={0.2}
            emissive={hovered ? new THREE.Color(0x3b82f6).multiplyScalar(0.1) : new THREE.Color(0x000000)}
          />
        </mesh>

        {/* Laptop Screen */}
        <mesh 
          position={[0, 1.2, -0.8]} 
          rotation={[Math.PI * 0.15, 0, 0]}
          castShadow
        >
          <boxGeometry args={[2.8, 1.8, 0.1]} />
          <meshStandardMaterial 
            color="#000000" 
            metalness={0.9} 
            roughness={0.1}
          />
        </mesh>

        {/* Screen Content */}
        <mesh 
          position={[0, 1.2, -0.75]} 
          rotation={[Math.PI * 0.15, 0, 0]}
        >
          <boxGeometry args={[2.6, 1.6, 0.05]} />
          <meshStandardMaterial 
            color="#3b82f6" 
            emissive={new THREE.Color(0x3b82f6).multiplyScalar(0.3)}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Keyboard */}
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[2.5, 0.05, 1.5]} />
          <meshStandardMaterial 
            color="#2a2a2a" 
            metalness={0.7} 
            roughness={0.3}
          />
        </mesh>

        {/* Trackpad */}
        <mesh position={[0, 0.2, 0.3]}>
          <boxGeometry args={[0.8, 0.02, 0.5]} />
          <meshStandardMaterial 
            color="#333333" 
            metalness={0.6} 
            roughness={0.4}
          />
        </mesh>

        {/* Hover Glow Effect */}
        {hovered && (
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[3.2, 0.3, 2.2]} />
            <meshStandardMaterial 
              color="#3b82f6"
              transparent
              opacity={0.2}
              emissive={new THREE.Color(0x3b82f6).multiplyScalar(0.3)}
            />
          </mesh>
        )}
      </group>
    </Float>
  );
};

export default LaptopModel;
