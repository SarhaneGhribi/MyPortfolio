"use client";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { gsap } from "gsap";

const Space = () => {
  const containerRef = useRef(null);
  const [selectedBody, setSelectedBody] = useState(null);
  
  // Store references
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const earthRef = useRef(null);
  const moonRef = useRef(null);
  const starsRef = useRef(null);
  const animationIdRef = useRef(null);

  // Initialize scene
  useEffect(() => {
    // Create scene only when component mounts
    const container = containerRef.current;
    if (!container) return;

    console.log("Initializing scene");
    
    // Get dimensions
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 600;
    
    // Create scene and camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 5, 30);
    cameraRef.current = camera;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Earth
    const earthGeometry = new THREE.SphereGeometry(3, 64, 64);
    const earthMaterial = new THREE.MeshStandardMaterial({
      roughness: 0.8,
      metalness: 0.2
    });
    
    const earthTexture = new THREE.TextureLoader().load("/earth.jpg");
    earthMaterial.map = earthTexture;
    
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.position.set(-3, 0, 0);
    scene.add(earth);
    earthRef.current = earth;
    
    // Moon
    const moonGeometry = new THREE.SphereGeometry(1, 32, 32);
    const moonMaterial = new THREE.MeshStandardMaterial();
    
    const moonTexture = new THREE.TextureLoader().load("/moon.jpg");
    moonMaterial.map = moonTexture;
    
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.position.set(5, 0, 5);
    scene.add(moon);
    moonRef.current = moon;
    
    // Add stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });
    
    const starsCount = 5000;
    const starsPositions = new Float32Array(starsCount * 3);
    
    for (let i = 0; i < starsCount * 3; i += 3) {
      // Create stars in a sphere around the scene
      const radius = 100;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      starsPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      starsPositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starsPositions[i + 2] = radius * Math.cos(phi);
    }
    
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
    
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
    starsRef.current = stars;
    
    // Lighting
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);
    
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controlsRef.current = controls;
    
    // Handle click
    const handleClick = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      const mouse = new THREE.Vector2(x, y);
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      
      const intersects = raycaster.intersectObjects([earth, moon]);
      
      if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        setSelectedBody(clickedObject === earth ? 'Earth' : 'Moon');
        
        gsap.to(clickedObject.scale, {
          x: 1.1, y: 1.1, z: 1.1,
          duration: 0.3,
          yoyo: true,
          repeat: 1
        });
      }
    };
    
    container.addEventListener('click', handleClick);
    
    // Handle resize
    const handleResize = () => {
      if (!container) return;
      
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      
      renderer.setSize(newWidth, newHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      if (earthRef.current) {
        earthRef.current.rotation.y += 0.005;
      }
      
      if (moonRef.current) {
        const time = Date.now() * 0.0005;
        moonRef.current.position.x = -3 + Math.cos(time) * 8;
        moonRef.current.position.z = Math.sin(time) * 8;
      }
      
      if (starsRef.current) {
        starsRef.current.rotation.y += 0.0001;
      }
      
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup function
    return () => {
      console.log("Cleaning up scene");
      
      // Stop animation
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
      
      // Remove event listeners
      container.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      
      // Dispose of Three.js resources
      if (earthRef.current) {
        earthRef.current.geometry.dispose();
        earthRef.current.material.dispose();
      }
      
      if (moonRef.current) {
        moonRef.current.geometry.dispose();
        moonRef.current.material.dispose();
      }
      
      if (starsRef.current) {
        starsRef.current.geometry.dispose();
        starsRef.current.material.dispose();
      }
      
      // Dispose of controls and renderer
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
        
        // Remove canvas from DOM
        if (container.contains(rendererRef.current.domElement)) {
          container.removeChild(rendererRef.current.domElement);
        }
      }
      
      // Clear refs
      sceneRef.current = null;
      cameraRef.current = null;
      earthRef.current = null;
      moonRef.current = null;
      starsRef.current = null;
      controlsRef.current = null;
      rendererRef.current = null;
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div 
        ref={containerRef} 
        style={{ 
          width: '100%', 
          height: '100%',
          borderRadius: '40px',
          overflow: 'hidden'
        }} 
      />
      
      {selectedBody && (
        <div style={{
          position: 'absolute',
          bottom: '70px',
          left: '16px',
          right: '16px',
          backgroundColor: 'rgba(0,0,30,0.8)',
          color: 'white',
          padding: '12px',
          borderRadius: '12px',
          textAlign: 'center',
          backdropFilter: 'blur(5px)',
          border: '1px solid rgba(255,255,255,0.1)',
          fontSize: '14px'
        }}>
          <h3 style={{ margin: '0 0 8px 0', color: '#b97999' }}>
            {selectedBody}
          </h3>
          <p style={{ margin: 0 }}>
            {selectedBody === 'Earth' 
              ? "Diameter: 12,742 km | Distance from Sun: 149.6 million km"
              : "Diameter: 3,474 km | Distance from Earth: 384,400 km"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Space;