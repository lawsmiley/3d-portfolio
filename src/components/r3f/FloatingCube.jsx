import React, { useRef, useState } from 'react';
import { Float } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FloatingCube = ({ position = [0, 0, 0] }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
      
      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }

      if (clicked) {
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 20) * 0.2;
      }
    }
  });

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 500);
  };

  return (
    <Float 
      speed={2} 
      rotationIntensity={0.8} 
      floatIntensity={1.2} 
      position={position}
    >
      <group>
        <mesh 
          ref={meshRef}
          onClick={handleClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial 
            color="#8b5cf6"
            metalness={0.6}
            roughness={0.3}
            emissive={hovered ? new THREE.Color(0x8b5cf6).multiplyScalar(0.2) : new THREE.Color(0x000000)}
          />
        </mesh>

        {/* Inner rotating cube */}
        <mesh 
          position={[0, 0, 0]}
          rotation={[Math.PI * 0.25, Math.PI * 0.25, 0]}
        >
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial 
            color="#ec4899"
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Hover Glow Effect */}
        {hovered && (
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.8, 1.8, 1.8]} />
            <meshStandardMaterial 
              color="#8b5cf6"
              transparent
              opacity={0.3}
              emissive={new THREE.Color(0x8b5cf6).multiplyScalar(0.4)}
            />
          </mesh>
        )}

        {/* Click Effect */}
        {clicked && (
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial 
              color="#ec4899"
              transparent
              opacity={0.1}
              emissive={new THREE.Color(0xec4899).multiplyScalar(0.5)}
            />
          </mesh>
        )}
      </group>
    </Float>
  );
};

export default FloatingCube;
