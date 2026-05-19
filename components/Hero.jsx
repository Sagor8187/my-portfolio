"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import {
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaGithub,
  FaChevronRight,
} from "react-icons/fa";
import { cn } from "@/utils/cn";

// link for array

const socialLinks = [
  {
    icon: FaGithub,
    link: "https://github.com/Sagor8187",
  },
  {
    icon: FaLinkedin,
    link: "https://www.linkedin.com/in/sagor-sutradhar/",
  },
  {
    icon: FaTwitter,
    link: "https://x.com/Sagor8187",
  },
  {
    icon: FaEnvelope,
    link: "sdsagor8187@gmail.com",
  },
];

// Magnetic Button Wrapper
function MagneticButton({ children, className }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    if (!ref.current) return;

    const { clientX, clientY } = e;
    const { height, width, left, top } =
      ref.current.getBoundingClientRect();

    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    setPosition({
      x: middleX * 0.3,
      y: middleY * 0.3,
    });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
      className={cn("relative z-10", className)}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const heroRef = useRef(null);

  // 👉 CLEAN MERN TEXT
  const typingText =
    "Hey, I'm Sagor Sutradhar - MERN Stack Developer.";

  // 👉 typing state
  const [index, setIndex] = useState(0);

  // 👉 infinite typing effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev >= typingText.length) return 0;
        return prev + 1;
      });
    }, 70);

    return () => clearInterval(interval);
  }, []);

  // GSAP animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-text", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.2,
      });

      gsap.from(".reveal-sub", {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 0.5,
      });

      gsap.from(".reveal-btn", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 1,
        stagger: 0.1,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="min-h-screen relative flex flex-col justify-center overflow-hidden pt-20"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          animate={{
            x: ["-5%", "5%", "-5%"],
            y: ["-5%", "5%", "-5%"],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px]"
        />

        <motion.div
          animate={{
            x: ["5%", "-5%", "5%"],
            y: ["5%", "-5%", "5%"],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-secondary/20 blur-[150px]"
        />
      </div>

      {/* Badge */}
      <div className="reveal-sub inline-flex justify-center mx-auto text-center  items-center gap-2 px-4 py-2 rounded-full glass border border-foreground/10 mb-8 mt-10 md:mt-10">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-sm font-medium text-foreground">
          MERN Stack Developer | Open for Opportunities
        </span>
      </div>

      {/* Heading */}
      <div className="flex flex-col items-center overflow-hidden mb-2 py-2">
        <h1 className="reveal-text text-5xl md:text-7xl font-bold">
          Full Stack
        </h1>
      </div>

      <div className="flex flex-col items-center overflow-hidden mb-8 py-2">
        <h1 className="reveal-text text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary">
          Web Developer
        </h1>
      </div>

      {/* Typing text FIXED */}
      <div className="reveal-sub h-8 md:h-10 mb-10 text-xl md:text-2xl text-muted font-medium max-w-2xl mx-auto flex items-center justify-center">
        {typingText
          .slice(0, index)
          .split("")
          .map((char, i) => (
            <motion.span
              key={i}
              style={{ whiteSpace: "pre" }}
            >
              {char}
            </motion.span>
          ))}

        <span className="w-[2px] h-[1.2em] bg-primary ml-1 animate-pulse" />
      </div>

      {/* Buttons */}
      <div className="reveal-btn flex justify-center items-center gap-4 mt-10">
        <MagneticButton>
          <a
            href="#projects"
            className="px-8 py-4 bg-foreground text-background rounded-full font-bold flex items-center gap-2 hover:scale-105 transition"
          >
            View Work <FaChevronRight />
          </a>
        </MagneticButton>

        <MagneticButton>
          <a
            href="#contact"
            className="px-8 py-4 glass rounded-full font-bold border border-foreground/10 hover:border-primary/50 transition"
          >
            Contact Me
          </a>
        </MagneticButton>
      </div>

      {/* Social */}
      <div className="flex justify-center items-center gap-6 mt-12">
        {socialLinks.map(
          ({icon:Icon, link}, i) => (
            <MagneticButton key={i}>
              <a
              target="_blank"
                href={link}
                className="w-12 h-12 flex items-center justify-center rounded-full glass border border-foreground/10 hover:text-primary transition"
              >
                <Icon />
              </a>
            </MagneticButton>
          )
        )}
      </div>
    </section>
  );
}