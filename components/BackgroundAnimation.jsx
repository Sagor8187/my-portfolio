"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function BackgroundAnimation() {
  const { scrollYProgress } = useScroll();
  
  // Parallax layers for extreme cinematic depth
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]); // Deep background
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);  // Midground
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]); // Particles
  const y4 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]); // Extreme Foreground (moves fastest)

  const [bubbles, setBubbles] = useState([]);
  const [dust, setDust] = useState([]);

  useEffect(() => {
    // Generate glass bubbles with varying depth of field (parallax layers)
    const bubbleArray = Array.from({ length: 15 }).map((_, i) => {
      const depthLayer = i % 3; // 0: background, 1: midground, 2: foreground
      
      let size, blur, parallaxLayer, motionBlur;
      if (depthLayer === 0) {
        // Deep background - small, out of focus, slow
        size = Math.random() * 80 + 40;
        blur = Math.random() * 4 + 8; // High backdrop blur
        motionBlur = 4; // CSS filter blur to simulate depth of field
        parallaxLayer = "y1";
      } else if (depthLayer === 1) {
        // Midground - sharp, medium size, medium speed
        size = Math.random() * 120 + 80;
        blur = Math.random() * 2 + 2; // Low backdrop blur
        motionBlur = 0; // Sharp
        parallaxLayer = "y2";
      } else {
        // Foreground - massive, completely out of focus, fast
        size = Math.random() * 200 + 150;
        blur = Math.random() * 10 + 15; // Extreme backdrop blur
        motionBlur = 8; // Heavy CSS filter blur
        parallaxLayer = "y4";
      }

      return {
        id: `bubble-${i}`,
        size,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 30 + 20, 
        delay: Math.random() * 5,
        blur,
        motionBlur,
        depthLayer,
        parallaxLayer
      };
    });
    setBubbles(bubbleArray);

    // Cyber particle system
    const dustArray = Array.from({ length: 30 }).map((_, i) => ({
      id: `dust-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
    }));
    setDust(dustArray);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-background transition-colors duration-300">
      
      {/* Cinematic Ambient Glow / Dark Cyber Neon Lighting */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 w-full h-[120vh] -top-[10vh] will-change-transform"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.3, 0.15],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[5%] left-[-10%] w-[70%] h-[70%] rounded-full bg-cyan-500/20 blur-[180px] mix-blend-screen"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.35, 0.15],
            rotate: [0, -10, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute bottom-[5%] right-[-10%] w-[80%] h-[80%] rounded-full bg-violet-600/20 blur-[180px] mix-blend-screen"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 10 }}
          className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[150px] mix-blend-screen"
        />
      </motion.div>

      {/* Floating Glassmorphism Bubbles with Parallax & Depth of Field */}
      <div className="absolute inset-0 w-full h-full">
        {bubbles.map((b) => {
          const yTransform = b.parallaxLayer === "y1" ? y1 : b.parallaxLayer === "y2" ? y2 : y4;
          return (
            <motion.div
              key={b.id}
              style={{ y: yTransform }}
              className="absolute inset-0 w-full h-[150vh] -top-[25vh] will-change-transform"
            >
              <motion.div
                initial={{
                  x: `${b.x}vw`,
                  y: `${b.y}vh`,
                  opacity: 0,
                }}
                animate={{
                  y: [`${b.y}vh`, `${b.y - 15}vh`, `${b.y}vh`], 
                  x: [`${b.x}vw`, `${b.x + 8}vw`, `${b.x}vw`], 
                  opacity: b.depthLayer === 2 ? 0.6 : 1, // Extreme foreground is slightly transparent
                  rotate: [0, 180, 360],
                }}
                transition={{
                  y: { duration: b.duration, repeat: Infinity, ease: "easeInOut" },
                  x: { duration: b.duration * 1.2, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: b.duration * 1.5, repeat: Infinity, ease: "linear" },
                  opacity: { duration: 3, ease: "easeOut" }
                }}
                className={`absolute rounded-full border border-foreground/5 bg-foreground/[0.02] shadow-[inset_0_0_30px_rgba(0,0,0,0.02),0_15px_40px_rgba(0,0,0,0.1)] flex items-center justify-center overflow-hidden`}
                style={{
                  width: b.size,
                  height: b.size,
                  backdropFilter: `blur(${b.blur}px)`,
                  WebkitBackdropFilter: `blur(${b.blur}px)`,
                  filter: b.motionBlur > 0 ? `blur(${b.motionBlur}px)` : 'none', // motion/depth blur
                }}
              >
                {/* 3D Glass inner lighting/reflection */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-foreground/0 via-primary/5 to-foreground/10" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-bl from-transparent via-transparent to-secondary/5" />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Futuristic Soft Particle System */}
      <motion.div style={{ y: y3 }} className="absolute inset-0 w-full h-[150vh] -top-[25vh] will-change-transform">
        {dust.map((d) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: `${d.y}vh`, x: `${d.x}vw` }}
            animate={{
              y: [`${d.y}vh`, `${d.y - 40}vh`],
              x: [`${d.x}vw`, `${d.x + (Math.random() * 10 - 5)}vw`],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: d.duration,
              repeat: Infinity,
              ease: "linear",
              delay: d.delay,
            }}
            className="absolute rounded-full bg-cyan-300/80 shadow-[0_0_8px_rgba(103,232,249,0.8)]"
            style={{ 
              width: d.size, 
              height: d.size,
              filter: `blur(${Math.random() * 1.5}px)`
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
