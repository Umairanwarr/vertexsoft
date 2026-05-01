"use client";

import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

const services = [
  {
    title: "Web & Mobile Apps",
    subtitle: "Digital Excellence",
    description:
      "We craft scalable, high-performance applications that transform how your business operates and your customers engage.",
    features: [
      "React & Next.js",
      "Flutter",
      "PHP & Laravel",
      "Node.js Backend",
      "Cloud Infrastructure",
    ],
    gradient: "from-coral-400 via-coral-500 to-coral-600",
    accent: "#f97316",
  },
  {
    title: "AI & Machine Learning",
    subtitle: "Intelligent Solutions",
    description:
      "Transform raw data into competitive advantage with custom AI models and intelligent automation systems.",
    features: [
      "Custom ML Models",
      "Natural Language Processing",
      "Computer Vision",
      "Predictive Analytics",
    ],
    gradient: "from-coral-300 via-coral-400 to-coral-500",
    accent: "#fdba74",
  },
  {
    title: "UI/UX Design",
    subtitle: "Experience First",
    description:
      "User-centered design that delights, converts, and builds lasting brand loyalty across every touchpoint.",
    features: [
      "Product Design",
      "Design Systems",
      "User Research",
      "Interactive Prototypes",
    ],
    gradient: "from-coral-500 via-coral-600 to-coral-700",
    accent: "#fb923c",
  },
  {
    title: "Digital Marketing",
    subtitle: "Growth Engine",
    description:
      "Data-driven strategies that amplify your reach, optimize conversions, and deliver measurable ROI.",
    features: [
      "SEO Optimization",
      "Content Strategy",
      "PPC Campaigns",
      "Performance Analytics",
    ],
    gradient: "from-coral-400 via-coral-300 to-coral-200",
    accent: "#f97316",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  // Three.js Background with Flowing Energy
  useEffect(() => {
    if (!canvasRef.current || !isVisible) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create flowing energy streams
    const streamCount = 50;
    const streams: THREE.Line[] = [];

    for (let s = 0; s < streamCount; s++) {
      const points: THREE.Vector3[] = [];
      const segments = 20;
      const baseY = (s / streamCount) * 30 - 15;
      const baseX = (Math.random() - 0.5) * 40;

      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        points.push(
          new THREE.Vector3(
            baseX + Math.sin(t * Math.PI * 4 + s) * 3,
            baseY + t * 30,
            Math.sin(t * Math.PI * 2 + s) * 2
          )
        );
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: 0xf97316,
        transparent: true,
        opacity: 0.15 + Math.random() * 0.15,
      });

      const line = new THREE.Line(geometry, material);
      line.userData = {
        speed: 0.02 + Math.random() * 0.03,
        offset: s,
      };
      scene.add(line);
      streams.push(line);
    }

    // Floating particles
    const particleCount = 300;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0xf97316);
    const color2 = new THREE.Color(0xfdba74);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

      const mixedColor = color1.clone().lerp(color2, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = performance.now() * 0.001;

      // Animate streams
      streams.forEach((stream) => {
        const positions = stream.geometry.attributes.position.array as Float32Array;
        const speed = stream.userData.speed;
        const offset = stream.userData.offset;

        for (let i = 0; i < 21; i++) {
          const t = i / 20;
          const baseY = offset * 0.6 - 15 + time * 5;
          const wrappedY = ((baseY % 30) + 30) % 30 - 15;

          positions[i * 3] = (offset - 10) * 1.5 + Math.sin(t * Math.PI * 4 + offset + time) * 3;
          positions[i * 3 + 1] = wrappedY + t * 30;
          positions[i * 3 + 2] = Math.sin(t * Math.PI * 2 + offset + time) * 2;
        }
        stream.geometry.attributes.position.needsUpdate = true;
      });

      // Animate particles
      particles.rotation.y = time * 0.01;
      particles.rotation.x = time * 0.005;

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
      streams.forEach((s) => {
        s.geometry.dispose();
        if (Array.isArray(s.material)) {
          s.material.forEach((m) => m.dispose());
        } else {
          s.material.dispose();
        }
      });
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-32 overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 -z-10">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ width: "100%", height: "100%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div
          className={`text-center mb-24 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-coral-500 text-sm font-medium tracking-widest uppercase">
            What We Do
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
            Services that{" "}
            <span className="text-coral-500">drive results</span>
          </h2>
          <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
            End-to-end solutions powered by cutting-edge technology and design excellence.
          </p>
        </div>

        {/* Horizontal Scrolling Cards */}
        <div
          ref={scrollContainerRef}
          className="relative"
          onMouseEnter={() => setActiveIndex(-1)}
          onMouseLeave={() => setActiveIndex(0)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`group relative transition-all duration-500 ${
                  index % 2 === 0 ? "lg:mt-0" : "lg:mt-12"
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                {/* Card Background */}
                <div
                  className={`relative h-full p-6 rounded-3xl border transition-all duration-500 overflow-hidden ${
                    activeIndex === index
                      ? "bg-white border-coral-500 shadow-xl shadow-coral-500/10 scale-105 z-10"
                      : "bg-white/80 backdrop-blur-sm border-stone-200 hover:border-stone-300"
                  }`}
                >
                  {/* Gradient Glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  {/* Number */}
                  <div
                    className={`text-6xl font-bold mb-4 transition-all duration-500 ${
                      activeIndex === index
                        ? `text-transparent bg-clip-text bg-gradient-to-br ${service.gradient}`
                        : "text-stone-200"
                    }`}
                  >
                    0{index + 1}
                  </div>

                  {/* Subtitle */}
                  <span className="text-xs font-medium text-coral-500 uppercase tracking-wider">
                    {service.subtitle}
                  </span>

                  {/* Title */}
                  <h3
                    className={`mt-2 text-xl font-bold transition-colors duration-300 ${
                      activeIndex === index ? "text-stone-900" : "text-stone-800"
                    } group-hover:text-coral-500`}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className={`mt-3 text-sm leading-relaxed line-clamp-3 transition-colors ${
                      activeIndex === index ? "text-stone-600" : "text-stone-500"
                  }`}>
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className={`mt-4 pt-4 border-t transition-colors ${
                    activeIndex === index ? "border-stone-100" : "border-stone-200"
                  }`}>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className={`px-2 py-1 text-xs rounded transition-colors ${
                            activeIndex === index ? "bg-stone-50 text-stone-600" : "bg-stone-100 text-stone-500"
                          }`}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div
                    className={`absolute bottom-6 right-6 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                      activeIndex === index
                        ? `border-coral-500 bg-coral-500/10`
                        : "border-stone-200 opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <svg
                      className={`w-5 h-5 transition-all duration-500 ${
                        activeIndex === index ? "text-coral-500" : "text-stone-400"
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

                {/* Glow Effect */}
                {activeIndex === index && (
                  <div
                    className="absolute -inset-1 bg-gradient-to-br rounded-3xl blur-xl opacity-30 -z-10"
                    style={{
                      background: `linear-gradient(135deg, ${service.accent}44, transparent)`,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className={`mt-24 text-center transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-xl text-slate-400 mb-8">
            Ready to transform your business?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-10 py-5 bg-coral-500 hover:bg-coral-400 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-coral-500/25"
          >
            Start Your Project
            <svg
              className="w-6 h-6"
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
