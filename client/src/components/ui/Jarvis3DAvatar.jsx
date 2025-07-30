import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';

const JarvisHead = () => {
  const headRef = useRef();
  const eyeLeftRef = useRef();
  const eyeRightRef = useRef();
  
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    // Gentle head movement
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(time * 0.3) * 0.1;
      headRef.current.rotation.x = Math.cos(time * 0.2) * 0.05;
    }
    
    // Eye blinking
    if (eyeLeftRef.current && eyeRightRef.current) {
      const blink = Math.sin(time * 2) > 0.95 ? 0.05 : 0.2;
      eyeLeftRef.current.scale.y = blink;
      eyeRightRef.current.scale.y = blink;
    }
  });

  return (
    <group ref={headRef}>
      {/* Head */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color="#6366f1" 
          emissive="#4f46e5" 
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Eyes */}
      <mesh ref={eyeLeftRef} position={[-0.3, 0.2, 0.9]}>
        <boxGeometry args={[0.15, 0.2, 0.1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      <mesh ref={eyeRightRef} position={[0.3, 0.2, 0.9]}>
        <boxGeometry args={[0.15, 0.2, 0.1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Mouth */}
      <mesh position={[0, -0.3, 0.9]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.05, 0.1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Halo */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 1.2, 0]}>
        <torusGeometry args={[1.2, 0.05, 16, 100]} />
        <meshBasicMaterial color="#c7d2fe" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export const Jarvis3DAvatar = () => {
  return (
    <div className="w-full h-96">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <JarvisHead />
        <Stars radius={100} depth={50} count={5000} factor={4} />
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          enableRotate={true} 
          autoRotate={true} 
          autoRotateSpeed={0.5} 
        />
      </Canvas>
    </div>
  );
};