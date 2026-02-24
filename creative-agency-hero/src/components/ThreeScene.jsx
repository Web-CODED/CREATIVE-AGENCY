import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Text } from '@react-three/drei';
import * as THREE from 'three'; 

const Model3D = ({ scrollProgress }) => {
  const groupRef = useRef();
  const { scene } = useGLTF('/models/dead_by_daylight_-_dustin_hendersen-v1-v1-v1.glb');
  const clonedScene = scene.clone();

  useFrame(() => {
    if (groupRef.current) {
      if (scrollProgress < 0.4) {
        // Phase 1: Model stays in place, camera rotates around it
        groupRef.current.position.x = 0;
        groupRef.current.rotation.y = 0;
        groupRef.current.position.y = 0;
      } else {
        // Phase 2: Model walks away (left to right)
        const phase2Progress = (scrollProgress - 0.4) / 0.6;
        
        // Translate from left to right
        groupRef.current.position.x = phase2Progress * 8;
        
        // Rotate to face right as it walks away
        groupRef.current.rotation.y = -Math.PI / 4;
        
        // Bobbing animation during walk
        groupRef.current.position.y = Math.sin(phase2Progress * Math.PI * 4) * 0.3;
        
        // Scale down slightly as it walks away (perspective effect)
        const scale = 1 - phase2Progress * 0.15;
        groupRef.current.scale.set(scale, scale, scale);
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <primitive object={clonedScene} scale={1.5} />
    </group>
  );
};

const TextCreative = ({ scrollProgress }) => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      if (scrollProgress < 0.4) {
        const phase1Progress = scrollProgress / 0.4;
        
        // Text rises from bottom
        meshRef.current.position.y = -2 + phase1Progress * 3;
        meshRef.current.material.opacity = phase1Progress;
        
        // Rotation effect
        meshRef.current.rotation.x = -Math.PI / 2 + phase1Progress * 0.5;
      }
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -1, -3]}>
      <planeGeometry args={[5, 2.5]} />
      <meshBasicMaterial 
        color="#ffff00" 
        transparent 
        opacity={0}
        emissive="#ffff00"
        emissiveIntensity={0.6}
      />
    </mesh>
  );
};

const TextAgency = ({ scrollProgress }) => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      if (scrollProgress > 0.4) {
        const phase2Progress = (scrollProgress - 0.4) / 0.6;
        
        // Text slides in from left
        meshRef.current.position.x = -3 + phase2Progress * 3;
        
        // Opacity increases (from outline to glow)
        meshRef.current.material.opacity = phase2Progress;
        
        // Glow effect intensifies
        meshRef.current.material.emissiveIntensity = phase2Progress * 1.2;
      }
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 1, -4]}>
      <planeGeometry args={[5, 2.5]} />
      <meshBasicMaterial 
        color="#00ff99" 
        transparent 
        opacity={0}
        emissive="#00ff99"
        emissiveIntensity={0}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const CameraController = ({ scrollProgress }) => {
  const { camera } = useThree();

  useFrame(() => {
    if (scrollProgress < 0.4) {
      // Phase 1: Camera circles around model and zooms out
      const phase1Progress = scrollProgress / 0.4;

      // Circular orbit motion
      const angle = phase1Progress * Math.PI * 2;
      const radius = 5 + phase1Progress * 3;
      
      camera.position.x = Math.cos(angle) * radius;
      camera.position.y = 2 + phase1Progress * 3;
      camera.position.z = Math.sin(angle) * radius;
      
      camera.lookAt(0, 1, 0);
    } else {
      // Phase 2: Camera settles as model walks away
      const phase2Progress = (scrollProgress - 0.4) / 0.6;
      
      camera.position.x = -5 + phase2Progress * 8;
      camera.position.y = 3;
      camera.position.z = 6;
      
      camera.lookAt(1, 1, 0);
    }
  });

  return null;
};

const ThreeScene = ({ scrollProgress }) => {
  return (
    <>
      <CameraController scrollProgress={scrollProgress} />
      <Model3D scrollProgress={scrollProgress} />
      <TextCreative scrollProgress={scrollProgress} />
      <TextAgency scrollProgress={scrollProgress} />
    </>
  );
};

export default ThreeScene;
