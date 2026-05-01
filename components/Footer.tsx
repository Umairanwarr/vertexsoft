"use client";

import { useState, useEffect } from "react";

const footerLinks = {
  services: [
    { name: "Web & Mobile Apps", href: "#services" },
    { name: "AI & Machine Learning", href: "#services" },
    { name: "UI/UX Design", href: "#services" },
    { name: "Digital Marketing", href: "#services" },
  ],
  company: [
    { name: "About Us", href: "#about" },
    { name: "Our Work", href: "#work" },
    { name: "Contact", href: "#contact" },
    { name: "Careers", href: "#" },
  ],
  resources: [
    { name: "Blog", href: "#" },
    { name: "Case Studies", href: "#work" },
    { name: "Tech Stack", href: "#services" },
    { name: "FAQ", href: "#contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
  ],
};

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "Dribbble",
    href: "https://dribbble.com",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm9.885-11.441c-2.575-.422-4.943-.405-7.098.05a57.44 57.44 0 0 0-1.597-3.957c2.3-1 5.124-1.543 8.458-1.562.193 1.827.255 3.629.237 5.469zm-3.57-6.74c-.98 1.972-2.146 3.717-3.478 5.22-1.097-2.271-2.396-4.4-3.878-6.376 2.606-.46 5.255-.253 7.356 1.156zm-8.828-.85c1.527 1.94 2.861 4.05 3.978 6.322-2.474 2.154-5.394 3.457-8.742 3.893-.22-3.588.866-6.655 4.764-10.215zm-5.14 8.83c.067.477.144.948.23 1.413 4.075-.445 7.587-1.93 10.477-4.447.789 2.32 1.318 4.76 1.584 7.283-3.424 1.207-7.155.796-10.354-1.07-1.079-1.035-1.916-2.218-1.937-3.179zm15.48 3.016c-.297-2.328-.817-4.586-1.554-6.737 2.025-.408 4.275-.333 6.736.232-.433 2.837-2.122 5.287-4.693 6.965-.162-.166-.323-.333-.489-.46z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <a href="/" className="group flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12 bg-gradient-to-br from-coral-500 via-coral-600 to-coral-700 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                <span className="text-white font-bold text-2xl">V</span>
              </div>
              <span className="text-xl font-bold text-foreground">VertexSoft</span>
            </a>
            <p className="text-stone-500 text-sm leading-relaxed mb-6 max-w-xs">
              Building digital products that matter. We help ambitious companies
              transform ideas into powerful software solutions.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-stone-500 hover:text-white hover:bg-coral-500 transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-stone-500 hover:text-coral-500 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-stone-500 hover:text-coral-500 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-stone-500 hover:text-coral-500 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="font-semibold text-foreground mb-4">Newsletter</h4>
            <p className="text-sm text-stone-500 mb-4">
              Get insights on tech, design, and innovation.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-foreground placeholder-stone-400 focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500 transition-colors"
              />
              <button
                type="submit"
                className="w-full px-4 py-2.5 bg-coral-500 hover:bg-coral-600 text-white font-semibold text-sm rounded-lg transition-all duration-300 hover:scale-[1.02]"
              >
                {isSubscribed ? "Subscribed!" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-stone-500">
              © {currentYear} VertexSoft. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              {footerLinks.legal.map((link) => (
                <li key={link.name} className="list-none">
                  <a
                    href={link.href}
                    className="text-sm text-stone-500 hover:text-coral-500 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-coral-500/50 to-transparent" />
    </footer>
  );
}
