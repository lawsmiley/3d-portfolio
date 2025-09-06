import React, { useRef, useState } from 'react';
import { Float, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ProjectCard3D({ 
  title, 
  description, 
  position = [0, 0, 0], 
  url = "#", 
  color = "#3b82f6",
  delay = 0 
}) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 + delay;
      
      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }

      if (clicked) {
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 10) * 0.1;
      }
    }
  });

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 200);
    if (url !== "#") {
      window.open(url, "_blank");
    }
  };

  return (
    <Float 
      speed={1.5} 
      rotationIntensity={0.3} 
      floatIntensity={0.8} 
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
          <boxGeometry args={[2.5, 1.5, 0.2]} />
          <meshStandardMaterial 
            color={color}
            metalness={0.3} 
            roughness={0.4}
            emissive={hovered ? new THREE.Color(color).multiplyScalar(0.2) : new THREE.Color(0x000000)}
          />
        </mesh>
        
        {/* Card border */}
        <mesh position={[0, 0, 0.11]}>
          <boxGeometry args={[2.6, 1.6, 0.02]} />
          <meshStandardMaterial 
            color="#ffffff"
            transparent
            opacity={0.1}
          />
        </mesh>

        {/* Title text */}
        <Text 
          position={[0, 0.3, 0.15]} 
          fontSize={0.25} 
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.2}
        >
          {title}
        </Text>

        {/* Description text */}
        <Text 
          position={[0, -0.2, 0.15]} 
          fontSize={0.15} 
          color="#cccccc"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.2}
        >
          {description}
        </Text>

        {/* Hover effect - glow */}
        {hovered && (
          <mesh position={[0, 0, 0.12]}>
            <boxGeometry args={[2.8, 1.8, 0.01]} />
            <meshStandardMaterial 
              color={color}
              transparent
              opacity={0.3}
              emissive={new THREE.Color(color).multiplyScalar(0.5)}
            />
          </mesh>
        )}
      </group>
    </Float>
  );
}
