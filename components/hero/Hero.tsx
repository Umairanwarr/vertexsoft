"use client";

import { useEffect, useState } from "react";
import Hero3D from "./Hero3D";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-stone-50 to-background">
      {/* 3D Background */}
      <Hero3D />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-background/60 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div
            className={`flex items-center gap-3 mb-8 transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="h-px w-12 bg-coral-500/60" />
            <span className="text-sm font-medium tracking-widest uppercase text-coral-600">
              VertexSoft
            </span>
          </div>

          {/* Main headline - bold, typographic */}
          <h1
            className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] mb-8 tracking-tight transition-all duration-700 ease-out delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="block text-foreground">Software</span>
            <span className="block text-foreground">crafted for</span>
            <span className="block text-coral-600">ambition</span>
          </h1>

          {/* Subheadline */}
          <p
            className={`text-lg sm:text-xl text-stone-600 max-w-xl leading-relaxed mb-12 transition-all duration-700 ease-out delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            We build digital products that scale with your vision. From AI-powered platforms to
            enterprise systems, we turn complexity into competitive advantage.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-wrap gap-4 transition-all duration-700 ease-out delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 px-7 py-4 bg-coral-600 hover:bg-coral-700 text-foreground font-semibold rounded-lg shadow-lg shadow-coral-500/25 transition-all duration-300 hover:shadow-coral-500/40 hover:-translate-y-0.5"
            >
              Start a Project
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
            <a
              href="#work"
              className="inline-flex items-center gap-3 px-7 py-4 border border-stone-300 hover:border-stone-400 text-stone-700 hover:text-stone-900 font-semibold rounded-lg transition-all duration-300 hover:bg-white"
            >
              See Our Work
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator - minimal */}
      <div
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-700 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-5 h-8 border border-stone-400 rounded-full flex justify-center pt-2">
          <div className="w-0.5 h-2 bg-coral-600 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
