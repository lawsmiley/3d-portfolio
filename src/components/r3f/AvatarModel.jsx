import React, { useRef, useState } from 'react';
import { Float, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const AvatarModel = ({ position = [0, 0, 0] }) => {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      
      if (hovered) {
        groupRef.current.scale.lerp(new THREE.Vector3(1.15, 1.15, 1.15), 0.1);
      } else {
        groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }

      if (clicked) {
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 15) * 0.1;
      }
    }
  });

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 300);
  };

  return (
    <Float 
      speed={1.2} 
      rotationIntensity={0.4} 
      floatIntensity={0.6} 
      position={position}
    >
      <group 
        ref={groupRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Head */}
        <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial 
            color="#fbbf24" 
            metalness={0.1} 
            roughness={0.8}
          />
        </mesh>

        {/* Body */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.4, 0.5, 1, 8]} />
          <meshStandardMaterial 
            color="#3b82f6" 
            metalness={0.3} 
            roughness={0.6}
            emissive={hovered ? new THREE.Color(0x3b82f6).multiplyScalar(0.1) : new THREE.Color(0x000000)}
          />
        </mesh>

        {/* Arms */}
        <mesh position={[-0.7, 0.8, 0]} rotation={[0, 0, Math.PI * 0.3]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.8, 8]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.1} roughness={0.8} />
        </mesh>
        <mesh position={[0.7, 0.8, 0]} rotation={[0, 0, -Math.PI * 0.3]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.8, 8]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.1} roughness={0.8} />
        </mesh>

        {/* Legs */}
        <mesh position={[-0.2, -0.3, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.6, 8]} />
          <meshStandardMaterial color="#1f2937" metalness={0.2} roughness={0.7} />
        </mesh>
        <mesh position={[0.2, -0.3, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.6, 8]} />
          <meshStandardMaterial color="#1f2937" metalness={0.2} roughness={0.7} />
        </mesh>

        {/* Eyes */}
        <mesh position={[-0.2, 1.6, 0.5]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        <mesh position={[0.2, 1.6, 0.5]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#000000" />
        </mesh>

        {/* Smile */}
        <mesh position={[0, 1.4, 0.5]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.15, 0.02, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#000000" />
        </mesh>

        {/* Floating Text */}
        <Text 
          position={[0, 2.5, 0]} 
          fontSize={0.3} 
          color="#ec4899"
          anchorX="center"
          anchorY="middle"
        >
          👋 Hi!
        </Text>

        {/* Hover Glow Effect */}
        {hovered && (
          <mesh position={[0, 0.5, 0]}>
            <sphereGeometry args={[1.2, 16, 16]} />
            <meshStandardMaterial 
              color="#3b82f6"
              transparent
              opacity={0.2}
              emissive={new THREE.Color(0x3b82f6).multiplyScalar(0.2)}
            />
          </mesh>
        )}

        {/* Click Effect */}
        {clicked && (
          <mesh position={[0, 0.5, 0]}>
            <sphereGeometry args={[1.5, 16, 16]} />
            <meshStandardMaterial 
              color="#ec4899"
              transparent
              opacity={0.1}
              emissive={new THREE.Color(0xec4899).multiplyScalar(0.3)}
            />
          </mesh>
        )}
      </group>
    </Float>
  );
};

export default AvatarModel;
