"use client";

import { useState, useEffect } from "react";

const navItems = [
  { name: "Work", href: "#work" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Main Navbar Container */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "py-3 bg-white/80 backdrop-blur-lg border-b border-stone-200/50 shadow-lg shadow-stone-900/10" 
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="relative flex items-center justify-between">

            {/* Logo Section - Always Visible */}
            <a href="/" className="group flex items-center gap-3">
              <div className="relative">
                {/* Logo badge with animation */}
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-coral-500 via-coral-600 to-coral-700 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                  <span className="text-white font-bold text-2xl">V</span>
                  {/* Inner glow */}
                  <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                {/* Outer glow ring */}
                <div className="absolute -inset-1 bg-coral-400/30 rounded-xl blur-md -z-10 group-hover:blur-lg transition-all duration-300" />
              </div>

              {/* Brand name */}
              <div className="hidden sm:block">
                <span className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                  VertexSoft
                </span>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 bg-coral-500 rounded-full animate-pulse" />
                  <span className="text-xs text-stone-500 font-medium">Available for projects</span>
                </div>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              <div className="flex items-center gap-1 px-3 py-2">
                {navItems.map((item, index) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="relative px-4 py-2.5 text-sm font-medium text-stone-600 hover:text-coral-600 transition-all duration-300 group/item"
                  >
                    {item.name}
                    {/* Animated underline with slide effect */}
                    <span className="absolute bottom-1 left-0 w-full h-0.5 bg-coral-500 rounded-full scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left" />
                  </a>
                ))}
              </div>

              {/* CTA Button with glow */}
              <a
                href="#contact"
                className="relative ml-2 px-6 py-3 bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-400 hover:to-coral-500 text-white font-semibold text-sm rounded-xl transition-all duration-300 group/cta overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get in Touch
                  <svg
                    className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform duration-300"
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
                </span>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-300" />
                {/* Outer glow */}
                <div className="absolute -inset-0.5 bg-coral-400/50 rounded-xl blur-md -z-10 opacity-0 group-hover/cta:opacity-50 transition-opacity duration-300" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-3 bg-stone-100/80 backdrop-blur-sm border border-stone-200/50 rounded-xl text-stone-600 hover:text-coral-600 hover:border-coral-500/50 transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-500 ${
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-slate-900/95 backdrop-blur-xl transition-opacity duration-500 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div
          className={`absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-slate-900 to-slate-900/95 transition-all duration-500 ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-full"
          }`}
        >
          {/* Header with logo */}
          <div className="px-6 py-6 flex items-center justify-between">
            <a href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-coral-500 via-coral-600 to-coral-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">V</span>
              </div>
              <span className="text-xl font-bold text-foreground">VertexSoft</span>
            </a>
            <button
              className="p-3 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-xl text-stone-600 hover:text-coral-600 transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <div className="px-6 py-8 space-y-3">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-5 py-4 text-xl font-medium text-stone-600 hover:text-coral-600 hover:bg-slate-800/50 rounded-xl transition-all duration-300 group/mobile"
                style={{
                  transitionDelay: `${index * 100}ms`,
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transform: isMobileMenuOpen ? "translateY(0)" : "translateY(-20px)",
                }}
              >
                {item.name}
                <span className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center group-hover/mobile:bg-coral-500/20 transition-colors duration-300">
                  <svg
                    className="w-5 h-5 text-stone-500 group-hover/mobile:text-coral-400 transition-colors duration-300"
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
                </span>
              </a>
            ))}

            {/* Mobile CTA */}
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full mt-6 px-6 py-5 bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-400 hover:to-coral-500 text-white font-bold text-lg rounded-xl transition-all duration-300"
              style={{
                transitionDelay: "400ms",
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? "translateY(0)" : "translateY(-20px)",
              }}
            >
              Get in Touch
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

          {/* Footer info */}
          <div
            className="absolute bottom-6 left-0 right-0 px-6 text-center"
            style={{
              transitionDelay: "500ms",
              opacity: isMobileMenuOpen ? 1 : 0,
            }}
          >
            <p className="text-sm text-stone-500">
              Building digital experiences that matter
            </p>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-20" />
    </>
  );
}
