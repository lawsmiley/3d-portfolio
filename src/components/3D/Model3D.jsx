import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useGLTF, Float, Environment, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Fallback 3D model if GLTF fails to load
const FallbackModel = ({ position = [0, 0, 0], scale = 1 }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      
      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8} position={position}>
      <group scale={scale}>
        {/* Main body */}
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[2, 3, 1]} />
          <meshStandardMaterial
            color="#3b82f6"
            metalness={0.8}
            roughness={0.2}
            emissive={hovered ? new THREE.Color(0x3b82f6).multiplyScalar(0.2) : new THREE.Color(0x000000)}
          />
        </mesh>

        {/* Screen */}
        <mesh position={[0, 0.5, 0.51]}>
          <planeGeometry args={[1.8, 2.2]} />
          <meshStandardMaterial
            color="#000000"
            emissive={new THREE.Color(0x3b82f6).multiplyScalar(0.3)}
          />
        </mesh>

        {/* Keyboard */}
        <mesh position={[0, -0.8, 0.51]}>
          <planeGeometry args={[1.6, 0.4]} />
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.6}
            roughness={0.4}
          />
        </mesh>

        {/* Hover glow effect */}
        {hovered && (
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2.2, 3.2, 1.2]} />
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

// Main 3D Model Component
const Model3D = ({ modelPath = null, position = [0, 0, 0], scale = 1, enableHover = true }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);

  // Try to load GLTF model, fallback to default if fails
  let gltf = null;
  try {
    if (modelPath) {
      gltf = useGLTF(modelPath);
    }
  } catch (error) {
    console.log('GLTF model not found, using fallback');
  }

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Click animation
      if (clicked) {
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 10) * 0.1;
        meshRef.current.scale.lerp(new THREE.Vector3(1.05, 1.05, 1.05), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }

      // Hover animation
      if (hovered && enableHover) {
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      }
    }
  });

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 500);
  };

  const handlePointerOver = () => {
    if (enableHover) setHovered(true);
  };

  const handlePointerOut = () => {
    if (enableHover) setHovered(false);
  };

  useEffect(() => {
    if (gltf) {
      setModelLoaded(true);
    }
  }, [gltf]);

  return (
    <group position={position} scale={scale}>
      {modelLoaded && gltf ? (
        <primitive
          ref={meshRef}
          object={gltf.scene}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          castShadow
          receiveShadow
        />
      ) : (
        <FallbackModel position={[0, 0, 0]} scale={1} />
      )}
    </group>
  );
};

export default Model3D;
