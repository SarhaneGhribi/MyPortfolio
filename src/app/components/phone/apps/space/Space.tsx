import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const Space = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);

    container.appendChild(renderer.domElement);

    const earthTexture = new THREE.TextureLoader().load("/earth.jpg");
    const normalTexture = new THREE.TextureLoader().load("/normal.jpg");

    const earthMesh = new THREE.Mesh(
      new THREE.SphereGeometry(5),
      new THREE.MeshStandardMaterial({
        map: earthTexture,
        normalMap: normalTexture,
      })
    );

    const moonTexture = new THREE.TextureLoader().load("/moon.jpg");
    const moonMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1.5),
      new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture,
      })
    );

    // The sun: earth is radius 5, and the real sun-to-earth size ratio is
    // ~109:1 with a distance of ~23,500 earth radii — both far too large to
    // use directly here, so it's scaled down to a size/distance pairing that
    // keeps the same "much bigger, far away" relationship while staying
    // inside the scene.
    const sunMesh = new THREE.Mesh(
      new THREE.SphereGeometry(35, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xfff2d0 })
    );
    sunMesh.position.set(0, 20, -280);

    // A flat MeshBasicMaterial sphere alone just looks like a solid disc, so
    // a couple of additive-blended, camera-facing glow sprites are layered
    // on top of it (a tight bright core + a broad soft halo) to fake a
    // corona/bloom effect without a full post-processing pipeline.
    function createGlowTexture(): THREE.CanvasTexture {
      const size = 256;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d")!;
      const gradient = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2
      );
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(0.2, "rgba(255,244,214,0.9)");
      gradient.addColorStop(0.5, "rgba(255,196,110,0.35)");
      gradient.addColorStop(1, "rgba(255,150,60,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
      return new THREE.CanvasTexture(canvas);
    }

    const glowTexture = createGlowTexture();

    const innerGlow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    innerGlow.scale.setScalar(35 * 2.6);
    sunMesh.add(innerGlow);

    const outerGlow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTexture,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    outerGlow.scale.setScalar(35 * 5);
    sunMesh.add(outerGlow);

    function addStar() {
      const geometry = new THREE.SphereGeometry(0.6, 8, 8);
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const star = new THREE.Mesh(geometry, material);

      // Scatter stars on a distant shell so they always sit behind the
      // earth/moon (which stay within ~15 units of the origin) instead of
      // mixing in among them.
      const radius = THREE.MathUtils.randFloat(250, 400);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(THREE.MathUtils.randFloatSpread(2));
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      star.position.set(x, y, z);
      scene.add(star);
    }

    Array(500).fill(null).forEach(addStar);

    // Move moon and earth to appropriate initial positions
    moonMesh.position.z = 15;
    moonMesh.position.y = 10;

    scene.add(moonMesh);
    scene.add(earthMesh);
    scene.add(sunMesh);

    // Move the camera back further to zoom out more and adjust the vertical position
    camera.position.z = 45; // Increase this value to zoom out more
    camera.position.y = 10; // Adjust the camera's Y position to move it up

    // Move the Earth mesh up to center it better in the viewport
    earthMesh.position.y = 10; // Move Earth up along the Y axis
    earthMesh.position.x = -5;

    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;
    orbitControls.dampingFactor = 0.25;
    orbitControls.screenSpacePanning = false;
    orbitControls.maxDistance = 50; // Limit maximum zoom out
    orbitControls.minDistance = 10; // Limit minimum zoom in

    let animationFrameId: number;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
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

    const sunLight = new THREE.DirectionalLight(0xfff2d9, 2);
    sunLight.position.copy(sunMesh.position);
    sunLight.target.position.set(0, 10, 0);
    scene.add(sunLight, sunLight.target);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    animate();

    function handleResize() {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      orbitControls.dispose();
      earthMesh.geometry.dispose();
      (earthMesh.material as THREE.Material).dispose();
      moonMesh.geometry.dispose();
      (moonMesh.material as THREE.Material).dispose();
      sunMesh.geometry.dispose();
      (sunMesh.material as THREE.Material).dispose();
      innerGlow.material.dispose();
      outerGlow.material.dispose();
      glowTexture.dispose();
      earthTexture.dispose();
      moonTexture.dispose();
      normalTexture.dispose();
      renderer.dispose();
      if (container?.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-full overflow-hidden rounded-[20px]"
    ></div>
  );
};

export default Space;
