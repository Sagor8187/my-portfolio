"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "next-themes";
import { cn } from "@/utils/cn";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch for theme
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = navLinks.map(link => link.name.toLowerCase());
      let currentSection = activeSection;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section.charAt(0).toUpperCase() + section.slice(1);
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const scrollToSection = (e, href, name) => {
    e.preventDefault();
    setIsOpen(false);
    setActiveSection(name);
    
    const element = document.querySelector(href);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top,
        behavior: "smooth"
      });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "py-4" : "py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div
          className={cn(
            "flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500",
            scrolled
              ? "glass shadow-lg shadow-black/10 border border-foreground/10"
              : "bg-transparent border border-transparent"
          )}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, "#home", "Home")}
            className="text-xl font-bold tracking-tighter text-foreground relative group"
          >
            Dev<span className="text-primary transition-colors group-hover:text-secondary"> Sagor</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href, link.name)}
                className="relative px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground group"
              >
                {activeSection === link.name && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute inset-0 rounded-lg bg-foreground/5 border border-foreground/10 -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
                <span className="relative z-10 group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.5)] transition-all">
                  {link.name}
                </span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* Download CV Button (Desktop) */}
            <a
              href="/Sagor_Resume.pdf"
              download="Sagor_Sutradhar_Resume.pdf"
              className="hidden md:flex items-center justify-center px-5 py-2 text-sm font-bold text-background bg-primary rounded-full hover:scale-105 hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(56,189,248,0.4)]"
            >
              Resume
            </a>

            {/* Dark Mode Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full bg-foreground/5 border border-foreground/10 text-foreground hover:bg-foreground/10 transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-foreground relative w-10 h-10 flex items-center justify-center"
              onClick={toggleMenu}
              aria-label="Toggle Mobile Menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiX size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiMenu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full px-4 mt-2 md:hidden"
          >
            <div className="glass rounded-2xl p-4 flex flex-col gap-2 border border-foreground/10 shadow-2xl">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href, link.name)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={cn(
                    "px-4 py-3 rounded-xl text-base font-medium transition-all",
                    activeSection === link.name
                      ? "bg-foreground/10 text-foreground border border-foreground/10"
                      : "text-muted hover:bg-foreground/5 hover:text-foreground"
                  )}
                >
                  {link.name}
                </motion.a>
              ))}
              
              <motion.a
                href="/cv.pdf"
                download="Sagor_Sutradhar_CV.pdf"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="px-4 py-3 mt-2 rounded-xl text-base font-bold text-background bg-primary hover:bg-primary/90 transition-all text-center shadow-[0_0_15px_rgba(56,189,248,0.3)]"
              >
                Download CV
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
