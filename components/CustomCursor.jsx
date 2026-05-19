"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only run on desktop devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      // Check if hovering over clickable elements
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    // Hide default cursor globally when this script runs
    document.body.classList.add("hide-default-cursor");

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.classList.remove("hide-default-cursor");
    };
  }, []);

  // Return nothing on mobile/touch devices (checking during render isn't perfect for SSR, 
  // so we hide it via CSS media queries inside the component classes)
  return (
    <>
      {/* Main small dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-primary rounded-full pointer-events-none z-[9999] hidden sm:block shadow-md"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovering ? 0 : 1,
        }}
        transition={{
          type: "tween",
          ease: "backOut",
          duration: 0.02,
        }}
      />

      {/* Outer animated ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-primary rounded-full pointer-events-none z-[9998] hidden sm:block"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(var(--primary), 0.1)" : "transparent",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
          mass: 0.2,
        }}
      />
    </>
  );
}
