"use client";

import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

const projects = [
  {
    title: "FinTech Dashboard",
    category: "Web Development",
    description: "Real-time financial analytics processing $50M+ daily",
    stats: "$50M+",
    statLabel: "Daily Transactions",
    color: "#ea580c",
  },
  {
    title: "HealthAI Diagnostic",
    category: "Machine Learning",
    description: "97% accuracy in medical imaging detection",
    stats: "97%",
    statLabel: "Detection Accuracy",
    color: "#fb923c",
  },
  {
    title: "E-Commerce Mobile App",
    category: "Mobile Development",
    description: "2M+ downloads with 4.8-star rating",
    stats: "2M+",
    statLabel: "Downloads",
    color: "#f97316",
  },
];

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const groupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Three.js Full Background with Project-Themed 3D Elements
  useEffect(() => {
    if (!canvasRef.current || !isVisible) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Main group for all elements
    const group = new THREE.Group();
    groupRef.current = group;
    scene.add(group);

    // Create floating tech cubes representing different projects
    const cubeGroup = new THREE.Group();

    const cubeGeometries = [
      new THREE.BoxGeometry(2, 2, 2),
      new THREE.BoxGeometry(1.5, 1.5, 1.5),
      new THREE.BoxGeometry(1, 1, 1),
    ];

    const cubeColors = [0xea580c, 0xfb923c, 0xf97316];

// More visible cube fills
const fillColors = [0xea580c, 0xfb923c, 0xf97316];

    cubeGeometries.forEach((geo, i) => {
      const edges = new THREE.EdgesGeometry(geo);
      const lineMaterial = new THREE.LineBasicMaterial({
        color: cubeColors[i],
        transparent: true,
        opacity: 0.6
      });
      const lines = new THREE.LineSegments(edges, lineMaterial);

      // Position cubes in 3D space
      lines.position.set(
        (i - 1) * 4,
        Math.sin(i) * 1.5,
        Math.cos(i) * 2
      );

      lines.userData = {
        rotationSpeed: 0.01 + i * 0.005,
        floatOffset: i * Math.PI / 3,
      };

      cubeGroup.add(lines);
    });

    group.add(cubeGroup);

    // Add connecting lines between cubes (network effect)
    const connectGeometry = new THREE.BufferGeometry();
    const connectPositions = new Float32Array(24);
    connectGeometry.setAttribute("position", new THREE.BufferAttribute(connectPositions, 3));
    const connectMaterial = new THREE.LineBasicMaterial({
      color: 0xea580c,
      transparent: true,
      opacity: 0.2
    });
    const connections = new THREE.LineSegments(connectGeometry, connectMaterial);
    group.add(connections);

    // Floating particles representing data points
    const particleCount = 500;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 40;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 10;
      particleSpeeds.push(0.02 + Math.random() * 0.05);
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xea580c,
      size: 0.08,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    group.add(particles);

    // Glowing orbs around each cube
    const orbs: THREE.Mesh[] = [];
    cubeGeometries.forEach((geo, i) => {
      const orbGeometry = new THREE.SphereGeometry(1.8, 16, 16);
      const orbMaterial = new THREE.MeshBasicMaterial({
        color: cubeColors[i],
        transparent: true,
        opacity: 0.08,
      });
      const orb = new THREE.Mesh(orbGeometry, orbMaterial);
      orb.position.copy(cubeGroup.children[i].position);
      group.add(orb);
      orbs.push(orb);
    });

    let animationId: number;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = performance.now() * 0.001;

      // Smooth group rotation based on mouse
      group.rotation.y += (mouseX * 0.3 - group.rotation.y) * 0.02;
      group.rotation.x += (mouseY * 0.2 - group.rotation.x) * 0.02;

      // Animate cubes
      cubeGroup.children.forEach((child, i) => {
        child.rotation.x += child.userData.rotationSpeed;
        child.rotation.y += child.userData.rotationSpeed * 1.5;
        child.position.y += Math.sin(time + child.userData.floatOffset) * 0.005;
      });

      // Animate orbs
      orbs.forEach((orb, i) => {
        orb.position.y = cubeGroup.children[i].position.y + Math.sin(time * 2 + i) * 0.1;
        const scale = 1 + Math.sin(time * 0.5 + i) * 0.1;
        orb.scale.set(scale, scale, scale);
      });

      // Update connection lines
      const positions = cubeGroup.children.map(child =>
        new THREE.Vector3().copy(child.position).applyMatrix4(cubeGroup.matrixWorld)
      );
      const connectPos = connectGeometry.attributes.position.array as Float32Array;
      let idx = 0;
      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          connectPos[idx++] = positions[i].x;
          connectPos[idx++] = positions[i].y;
          connectPos[idx++] = positions[i].z;
          connectPos[idx++] = positions[j].x;
          connectPos[idx++] = positions[j].y;
          connectPos[idx++] = positions[j].z;
        }
      }
      connectGeometry.attributes.position.needsUpdate = true;

      // Animate particles
      const particlePos = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        particlePos[i * 3 + 1] += particleSpeeds[i];
        if (particlePos[i * 3 + 1] > 15) {
          particlePos[i * 3 + 1] = -15;
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      cubeGeometries.forEach(g => g.dispose());
      cubeGroup.children.forEach(child => {
        if (child instanceof THREE.LineSegments || child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach(m => m.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
      connectGeometry.dispose();
      connectMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      orbs.forEach(orb => {
        orb.geometry.dispose();
        if (Array.isArray(orb.material)) {
          orb.material.forEach(m => m.dispose());
        } else {
          orb.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative min-h-[80vh] flex items-center overflow-hidden bg-gradient-to-b from-white via-stone-50 to-background"
    >
      {/* Full-screen 3D Background */}
      <div className="absolute inset-0 -z-10">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ width: "100%", height: "100%" }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        {/* Header */}
        <div
          className={`mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-coral-600 text-sm font-medium tracking-widest uppercase">
            Portfolio
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
            Built for{" "}
            <span className="text-coral-600">impact</span>
          </h2>
        </div>

        {/* Project Cards - Overlaid on 3D */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group relative p-6 rounded-2xl border transition-all duration-500 cursor-pointer ${
                activeIndex === index
                  ? "bg-white border-coral-500/70 backdrop-blur-xl scale-105 shadow-xl shadow-coral-500/10"
                  : "bg-white/90 border-stone-300 backdrop-blur-sm hover:border-coral-400/50"
              }`}
              onMouseEnter={() => setActiveIndex(index)}
              style={{
                transitionDelay: `${index * 100}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
              }}
            >
              {/* Glow effect on hover */}
              <div
                className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
                  activeIndex === index ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${project.color}15 0%, transparent 70%)`,
                }}
              />

              {/* Category badge */}
              <span className="relative text-xs font-semibold text-coral-700 uppercase tracking-wider">
                {project.category}
              </span>

              {/* Title */}
              <h3 className="relative mt-3 text-xl font-bold text-foreground group-hover:text-coral-700 transition-colors">
                {project.title}
              </h3>

              {/* Description */}
              <p className="relative mt-2 text-sm text-stone-700 line-clamp-2">
                {project.description}
              </p>

              {/* Stats */}
              <div className="relative mt-4 pt-4 border-t border-stone-200">
                <div className="text-3xl font-bold text-foreground">{project.stats}</div>
                <div className="text-xs text-stone-600 mt-1">{project.statLabel}</div>
              </div>

              {/* Arrow indicator */}
              <div
                className={`absolute top-6 right-6 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  activeIndex === index
                    ? "border-coral-600 bg-coral-500/20"
                    : "border-stone-400"
                }`}
              >
                <svg
                  className={`w-4 h-4 transition-all duration-300 ${
                    activeIndex === index ? "text-coral-700 translate-x-0.5" : "text-stone-500"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`mt-16 text-center transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-coral-600 hover:bg-coral-700 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-coral-500/30"
          >
            Start Your Project
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
