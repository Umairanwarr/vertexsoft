"use client";

import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "5+", label: "Years Experience" },
  { value: "25+", label: "Team Experts" },
];

const values = [
  {
    title: "Innovation First",
    description: "We push boundaries with cutting-edge technology and creative solutions.",
    detail: "From AI-powered automation to real-time distributed systems, we explore what's possible before it becomes mainstream.",
  },
  {
    title: "Quality Obsessed",
    description: "Every line of code meets the highest standards of excellence.",
    detail: "Code reviews, automated testing, performance budgets. We treat technical debt like technical opportunity.",
  },
  {
    title: "Client Success",
    description: "Your goals become our mission. We succeed only when you succeed.",
    detail: "Transparent communication, predictable delivery, long-term partnerships. Your wins are our portfolio.",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeStat, setActiveStat] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Three.js Background with Rotating Network Globe
  useEffect(() => {
    if (!canvasRef.current || !isVisible) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create rotating globe with network nodes
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Sphere geometry for globe
    const sphereGeometry = new THREE.IcosahedronGeometry(8, 4);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0xf97316,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    globeGroup.add(sphere);

    // Add glowing nodes at vertices
    const nodeCount = 50;
    const nodes: THREE.Mesh[] = [];
    const nodeGeometry = new THREE.SphereGeometry(0.15, 8, 8);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0xfdba74,
    });

    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 8.2;

      node.position.x = radius * Math.sin(phi) * Math.cos(theta);
      node.position.y = radius * Math.sin(phi) * Math.sin(theta);
      node.position.z = radius * Math.cos(phi);

      node.userData = {
        originalPosition: node.position.clone(),
        pulseSpeed: 0.5 + Math.random() * 1,
        pulseOffset: Math.random() * Math.PI * 2,
      };

      globeGroup.add(node);
      nodes.push(node);
    }

    // Connecting lines between nearby nodes
    const lineCount = 30;
    const lines: THREE.Line[] = [];
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xf97316,
      transparent: true,
      opacity: 0.1,
    });

    for (let i = 0; i < lineCount; i++) {
      const points = [
        nodes[Math.floor(Math.random() * nodeCount)].position.clone(),
        nodes[Math.floor(Math.random() * nodeCount)].position.clone(),
      ];
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeometry, lineMaterial.clone());
      globeGroup.add(line);
      lines.push(line);
    }

    // Floating geometric shapes around globe
    const shapes: THREE.Mesh[] = [];
    const shapeGeometries = [
      new THREE.OctahedronGeometry(0.5, 0),
      new THREE.TetrahedronGeometry(0.5, 0),
      new THREE.DodecahedronGeometry(0.4, 0),
    ];

    for (let i = 0; i < 15; i++) {
      const geometry = shapeGeometries[Math.floor(Math.random() * shapeGeometries.length)];
      const material = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.5 ? 0xf97316 : 0xfdba74,
        wireframe: true,
        transparent: true,
        opacity: 0.3 + Math.random() * 0.3,
      });
      const shape = new THREE.Mesh(geometry, material);

      const angle = (i / 15) * Math.PI * 2;
      const radius = 12 + Math.random() * 5;
      shape.position.x = Math.cos(angle) * radius;
      shape.position.y = Math.sin(angle * 2) * 3;
      shape.position.z = Math.sin(angle) * radius;

      shape.userData = {
        rotationSpeed: 0.01 + Math.random() * 0.02,
        orbitSpeed: 0.005 + Math.random() * 0.01,
        angle: angle,
        radius: radius,
      };

      globeGroup.add(shape);
      shapes.push(shape);
    }

    // Particles in space
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 60;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xfdba74,
      size: 0.05,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    let animationId: number;
    let time = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.01;

      // Rotate globe group
      globeGroup.rotation.y += 0.003;
      globeGroup.rotation.x += 0.001;

      // Pulse nodes
      nodes.forEach((node) => {
        const scale =
          1 + Math.sin(time * node.userData.pulseSpeed + node.userData.pulseOffset) * 0.3;
        node.scale.set(scale, scale, scale);
      });

      // Animate floating shapes
      shapes.forEach((shape) => {
        shape.rotation.x += shape.userData.rotationSpeed;
        shape.rotation.y += shape.userData.rotationSpeed;

        shape.userData.angle += shape.userData.orbitSpeed;
        shape.position.x = Math.cos(shape.userData.angle) * shape.userData.radius;
        shape.position.z = Math.sin(shape.userData.angle) * shape.userData.radius;
        shape.position.y += Math.sin(time * 2 + shape.userData.angle) * 0.02;
      });

      // Rotate particles
      particles.rotation.y += 0.001;

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
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      shapes.forEach((shape) => {
        shape.geometry.dispose();
        if (Array.isArray(shape.material)) {
          shape.material.forEach((m) => m.dispose());
        } else {
          shape.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, [isVisible]);

  // Auto-rotate stats
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setActiveStat((prev) => (prev + 1) % stats.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section ref={sectionRef} id="about" className="relative py-32 overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 -z-10">
        <canvas ref={canvasRef} className="w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div
          className={`text-center mb-24 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-coral-500 text-sm font-medium tracking-widest uppercase">
            About VertexSoft
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
            We craft{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-400 to-coral-600">
              digital excellence
            </span>
          </h2>
          <p className="mt-6 text-lg text-slate-400 max-w-3xl mx-auto">
            From visionary startups to established enterprises, we transform ambitious ideas into
            powerful digital solutions that drive real business growth.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`relative p-8 rounded-2xl border transition-all duration-500 text-center ${
                activeStat === index
                  ? "bg-white border-coral-500/50 shadow-xl shadow-coral-500/10 scale-105"
                  : "bg-white/60 border-stone-200 backdrop-blur-sm"
              }`}
              onMouseEnter={() => setActiveStat(index)}
            >
              <div
                className={`text-4xl sm:text-5xl font-bold transition-all duration-300 ${
                  activeStat === index
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-coral-500 to-coral-600"
                    : "text-foreground"
                }`}
              >
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-stone-500">{stat.label}</div>
              {activeStat === index && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-coral-500/5 to-coral-600/5 -z-10" />
              )}
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <h3 className="text-3xl font-bold text-foreground">
              Our Story
            </h3>
            <p className="mt-4 text-stone-500 leading-relaxed">
              VertexSoft was born from a simple belief: great software should be both beautiful
              and powerful. What started as a small team of passionate developers has grown into a
              full-service digital agency serving clients worldwide.
            </p>
            <p className="mt-4 text-stone-500 leading-relaxed">
              We don&apos;t just write code—we partner with you to understand your vision, challenge your
              assumptions, and build solutions that exceed expectations. Every project is an
              opportunity to push boundaries and create something extraordinary.
            </p>
          </div>

          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <h3 className="text-3xl font-bold text-foreground">
              Why Choose Us
            </h3>
            <div className="mt-6 space-y-4">
              {[
                "Proven track record with 50+ successful projects",
                "Full-stack expertise across all modern technologies",
                "Agile methodology for faster time to market",
                "Dedicated support and maintenance after launch",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-coral-500/10 flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-coral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-stone-600">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Section - Editorial Vertical Layout */}
        <div className="mb-24">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            {/* Section Header - Left Side */}
            <div
              className={`lg:w-1/3 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <span className="text-coral-500 text-sm font-medium tracking-widest uppercase">
                Our Philosophy
              </span>
              <h3 className="mt-4 text-4xl sm:text-5xl font-bold text-foreground leading-tight">
                The principles
                <br />
                <span className="text-coral-500">that define us</span>
              </h3>
              <p className="mt-6 text-stone-600 text-lg leading-relaxed">
                These aren't wall decorations. They're decision filters for every project,
                every hire, every technical choice we make.
              </p>
            </div>

            {/* Values List - Right Side */}
            <div className="lg:w-2/3">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className={`group relative py-12 border-t border-slate-800 transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  } ${index === 0 ? "" : ""}`}
                  style={{ transitionDelay: `${400 + index * 200}ms` }}
                  onMouseEnter={() => setActiveStat(index + 2)}
                  onMouseLeave={() => setActiveStat(0)}
                >
                  {/* Hover glow line */}
                  <div
                    className={`absolute top-0 left-0 h-0.5 bg-gradient-to-r from-coral-400 to-coral-600 transition-all duration-500 ${
                      activeStat === index + 2 ? "w-full" : "w-0"
                    }`}
                  />

                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-4">
                    {/* Number badge */}
                    <div
                      className={`flex-shrink-0 text-5xl font-bold transition-all duration-300 ${
                        activeStat === index + 2
                          ? "text-coral-500 scale-110"
                          : "text-stone-200"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4
                        className={`text-2xl sm:text-3xl font-bold transition-all duration-300 ${
                          activeStat === index + 2 ? "text-coral-500" : "text-foreground"
                        }`}
                      >
                        {value.title}
                      </h4>
                      <p className="mt-2 text-stone-600 text-lg">{value.description}</p>
                      <p
                        className={`mt-3 text-stone-500 transition-all duration-500 ${
                          activeStat === index + 2 ? "opacity-100 max-h-96" : "opacity-0 max-h-0"
                        } overflow-hidden`}
                      >
                        {value.detail}
                      </p>
                    </div>
                  </div>

                  {/* Decorative element on hover */}
                  <div
                    className={`absolute right-0 top-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-coral-400/5 to-coral-600/5 rounded-full blur-2xl transition-all duration-500 ${
                      activeStat === index + 2 ? "opacity-100 scale-100" : "opacity-0 scale-50"
                    }`}
                  />
                </div>
              ))}

              {/* Bottom divider */}
              <div className="py-12">
                <div className="h-px bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
