import React, { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
const Space = () => {
  const containerRef = useRef(null);
  const [aspectRatio, setAspectRatio] = useState(getAspectRatio());
  const [isSceneInitialized, setIsSceneInitialized] = useState(false);

  useEffect(() => {
    if (!isSceneInitialized) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, aspectRatio, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);

      if (containerRef.current) {
        containerRef.current.appendChild(renderer.domElement);
      }

      const earthTexture = new THREE.TextureLoader().load("/earth.jpg");
      const normalTexture = new THREE.TextureLoader().load("/normal.jpg");

      const earthMesh = new THREE.Mesh(
        new THREE.SphereGeometry(5),
        new THREE.MeshStandardMaterial({
          map: earthTexture,
          normalMap: normalTexture,
        })
      );

      const moonTexture = new THREE.TextureLoader().load("moon.jpg");
      const moonMesh = new THREE.Mesh(
        new THREE.SphereGeometry(1.5),
        new THREE.MeshStandardMaterial({
          map: moonTexture,
          normalMap: normalTexture,
        })
      );

      function addStar() {
        const geometry = new THREE.SphereGeometry(0.08, 24, 24);
        const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const star = new THREE.Mesh(geometry, material);

        const [x, y, z] = Array(3)
          .fill()
          .map(() => THREE.MathUtils.randFloatSpread(100));

        star.position.set(x, y, z);
        scene.add(star);
      }

      Array(500).fill().forEach(addStar);

      // Move moon and earth to appropriate initial positions
      moonMesh.position.z = -5;
      moonMesh.position.y = 1;

      scene.add(moonMesh);
      scene.add(earthMesh);

      // Move the camera back further to zoom out more and adjust the vertical position
      camera.position.z = 45; // Increase this value to zoom out more
      camera.position.y = 2; // Adjust the camera's Y position to move it up

      // Move the Earth mesh up to center it better in the viewport
      earthMesh.position.y = 10; // Move Earth up along the Y axis
      earthMesh.position.x = -5;

      const orbitControls = new OrbitControls(camera, renderer.domElement);
      orbitControls.enableDamping = true;
      orbitControls.dampingFactor = 0.25;
      orbitControls.screenSpacePanning = false;
      orbitControls.maxDistance = 50; // Limit maximum zoom out
      orbitControls.minDistance = 10; // Limit minimum zoom in

      function animate() {
        requestAnimationFrame(animate);
        orbitControls.update();

        earthMesh.rotation.y += 0.01;
        moonMesh.rotation.y += 0.01;

        const moonDistance = 13;
        const moonOrbitSpeed = 0.1;
        const moonX =
          Math.sin(moonMesh.rotation.y * moonOrbitSpeed) * moonDistance;
        const moonZ =
          Math.cos(moonMesh.rotation.y * moonOrbitSpeed) * moonDistance;
        moonMesh.position.set(moonX, 1, moonZ);

        renderer.render(scene, camera);
      }

      const pointLight = new THREE.PointLight(0xb97999);
      pointLight.position.set(0, 5, 5);

      const ambientLight = new THREE.AmbientLight(0xffffff);
      scene.add(pointLight, ambientLight);

      animate();

      function handleResize() {
        setAspectRatio(getAspectRatio());
        camera.aspect = aspectRatio;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      window.addEventListener("resize", handleResize);
      setIsSceneInitialized(true);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [containerRef, aspectRatio, isSceneInitialized]);

  function getAspectRatio() {
    return window.innerWidth / window.innerHeight;
  }

  useEffect(() => {
    function handleResize() {
      setAspectRatio(getAspectRatio());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        overflow: "hidden",
        width: "90%",
        position: "absolute",
        borderRadius: "20px",
        height: "95%",
      }}
    ></div>
  );
};

export default Space;
