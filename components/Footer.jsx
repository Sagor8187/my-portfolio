"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaArrowUp } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub, href: "#", label: "GitHub" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="relative bg-background border-t border-foreground/5 py-12 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        
        {/* Back to Top Button */}
        <button 
          onClick={scrollToTop}
          className="group relative flex items-center justify-center w-14 h-14 mb-8 rounded-full glass border border-foreground/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] bg-background/50 backdrop-blur-sm z-20"
          aria-label="Back to top"
        >
          <div className="absolute inset-0 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <FaArrowUp className="text-muted group-hover:text-primary transition-colors" size={20} />
        </button>

        {/* Social Icons */}
        <div className="flex items-center gap-6 mb-8">
          {socialLinks.map((link, index) => (
            <a 
              key={index}
              href={link.href}
              aria-label={link.label}
              className="text-muted hover:text-foreground transition-colors p-2 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] duration-300"
            >
              <link.icon size={24} />
            </a>
          ))}
        </div>

        {/* Brand / Copyright */}
        <div className="flex flex-col items-center text-center">
          <h4 className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">
            Developer
          </h4>
          <p className="text-muted text-sm font-medium">
            &copy; {currentYear} All rights reserved.
          </p>
          <p className="text-foreground/30 text-xs mt-2">
            Crafted with Next.js & Tailwind CSS
          </p>
        </div>

      </div>
    </footer>
  );
}
