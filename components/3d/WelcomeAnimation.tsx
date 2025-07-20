"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface WelcomeAnimationProps {
  className?: string;
}

const WelcomeAnimation: React.FC<WelcomeAnimationProps> = ({ className }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    
    // Add renderer to the DOM
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }
    
    // Create geometry - floating cubes
    const cubes: THREE.Mesh[] = [];
    const cubeCount = 50;
    
    for (let i = 0; i < cubeCount; i++) {
      const size = Math.random() * 0.5 + 0.1;
      const geometry = new THREE.BoxGeometry(size, size, size);
      
      // Create gradient material with blue hues
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(
          0.1, 
          0.4 + Math.random() * 0.3,  // Blue-ish
          0.7 + Math.random() * 0.3   // Light blue highlight
        ),
        transparent: true,
        opacity: Math.random() * 0.5 + 0.3
      });
      
      const cube = new THREE.Mesh(geometry, material);
      
      // Position cubes randomly in a spherical area
      const radius = 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      cube.position.x = radius * Math.sin(phi) * Math.cos(theta);
      cube.position.y = radius * Math.sin(phi) * Math.sin(theta);
      cube.position.z = radius * Math.cos(phi);
      
      // Add rotation properties for animation
      (cube as any).rotationSpeed = {
        x: Math.random() * 0.01 - 0.005,
        y: Math.random() * 0.01 - 0.005,
        z: Math.random() * 0.01 - 0.005
      };
      
      scene.add(cube);
      cubes.push(cube);
    }
    
    // Position camera
    camera.position.z = 15;
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    let frameId: number;
    
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      // Rotate each cube
      cubes.forEach(cube => {
        cube.rotation.x += (cube as any).rotationSpeed.x;
        cube.rotation.y += (cube as any).rotationSpeed.y;
        cube.rotation.z += (cube as any).rotationSpeed.z;
      });
      
      // Rotate camera slightly for more dynamic effect
      camera.position.x = Math.sin(Date.now() * 0.0001) * 2;
      camera.position.y = Math.cos(Date.now() * 0.0001) * 2;
      camera.lookAt(scene.position);
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of geometries and materials
      cubes.forEach(cube => {
        cube.geometry.dispose();
        (cube.material as THREE.Material).dispose();
      });
    };
  }, []);
  
  return (
    <div 
      ref={mountRef} 
      className={`absolute top-0 left-0 w-full h-full z-0 ${className || ''}`}
      aria-hidden="true"
    />
  );
};

export default WelcomeAnimation;
