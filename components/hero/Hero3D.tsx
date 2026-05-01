"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Hero3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const outerGroupRef = useRef<THREE.Group | null>(null);
  const innerGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 8;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    // Outer icosahedron - bold wireframe
    const outerGroup = new THREE.Group();
    const outerGeometry = new THREE.IcosahedronGeometry(2.5, 1);

    const outerWireframeGeometry = new THREE.WireframeGeometry(outerGeometry);
    const outerLineMaterial = new THREE.LineBasicMaterial({
      color: 0xea580c,
      transparent: true,
      opacity: 0.6,
    });
    const outerWireframe = new THREE.LineSegments(outerWireframeGeometry, outerLineMaterial);
    outerGroup.add(outerWireframe);

    outerGroupRef.current = outerGroup;
    scene.add(outerGroup);

    // Inner icosahedron
    const innerGroup = new THREE.Group();
    const innerGeometry = new THREE.IcosahedronGeometry(1.8, 0);

    const innerWireframeGeometry = new THREE.WireframeGeometry(innerGeometry);
    const innerLineMaterial = new THREE.LineBasicMaterial({
      color: 0xc2410c,
      transparent: true,
      opacity: 0.8,
    });
    const innerWireframe = new THREE.LineSegments(innerWireframeGeometry, innerLineMaterial);
    innerGroup.add(innerWireframe);

    innerGroupRef.current = innerGroup;
    scene.add(innerGroup);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 300;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 15;
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xea580c,
      size: 0.15,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    particlesRef.current = particles;
    scene.add(particles);

    // Animation
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = performance.now() * 0.001;

      if (outerGroupRef.current) {
        outerGroupRef.current.rotation.x = time * 0.15;
        outerGroupRef.current.rotation.y = time * 0.2;
      }
      if (innerGroupRef.current) {
        innerGroupRef.current.rotation.x = time * 0.12;
        innerGroupRef.current.rotation.y = time * 0.16;
        innerGroupRef.current.rotation.z = time * 0.08;
      }
      if (particles) {
        particles.rotation.y = time * 0.03;
        particles.rotation.x = time * 0.02;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!canvas) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
