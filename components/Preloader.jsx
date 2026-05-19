"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing experience...");

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    const duration = 800; // 0.8 seconds total
    const interval = 10; // Update every 10ms
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(currentProgress);

      // Change loading text halfway
      if (currentProgress > 40 && currentProgress < 80) {
        setLoadingText("Loading portfolio...");
      } else if (currentProgress >= 80) {
        setLoadingText("Ready.");
      }

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = "unset";
        }, 500); // Brief pause at 100%
      }
    }, interval);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          // Zoom out and fade out exit animation
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background overflow-hidden"
        >
          {/* Ambient Background Particles/Glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-[60vh] h-[60vh] bg-primary/20 blur-[120px] rounded-full absolute -top-20 -left-20 mix-blend-screen"
            />
            <motion.div 
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="w-[60vh] h-[60vh] bg-secondary/20 blur-[120px] rounded-full absolute -bottom-20 -right-20 mix-blend-screen"
            />
          </div>

          <div className="relative z-10 flex flex-col items-center glass p-12 rounded-3xl border border-foreground/5 shadow-2xl backdrop-blur-xl">
            
            {/* Rotating Ring & Percentage */}
            <div className="relative w-40 h-40 flex items-center justify-center mb-8">
              {/* Outer Rotating Ring */}
              <motion.svg 
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-full h-full text-foreground/5" 
                viewBox="0 0 100 100"
              >
                <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10 5" />
              </motion.svg>
              
              {/* Progress Ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                <motion.circle 
                  cx="50" cy="50" r="48" 
                  fill="none" 
                  stroke="url(#gradient)" 
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="301.59" // 2 * PI * 48
                  initial={{ strokeDashoffset: 301.59 }}
                  animate={{ strokeDashoffset: 301.59 - (301.59 * progress) / 100 }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#7C3AED" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Percentage Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-foreground tracking-tighter tabular-nums drop-shadow-[0_0_10px_rgba(var(--foreground),0.5)]">
                  {progress}
                  <span className="text-xl text-primary">%</span>
                </span>
              </div>
            </div>

            {/* Name and Role */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center mb-6"
            >
              <h1 className="text-2xl md:text-3xl font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-primary via-foreground to-secondary animate-gradient bg-300%">
                Sagor Sutradhar
              </h1>
              <h2 className="text-sm tracking-[0.3em] uppercase text-muted mt-2 font-medium">
                MERN Stack Developer
              </h2>
            </motion.div>

            {/* Status Text */}
            <div className="h-6 overflow-hidden flex justify-center items-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={loadingText}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-xs text-primary/80 font-mono tracking-widest uppercase flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
                  {loadingText}
                </motion.p>
              </AnimatePresence>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
