"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaGraduationCap, FaBriefcase, FaAward } from "react-icons/fa6";

const timelineData = [
  {
    id: 1,
    title: "Bachelor of Computer Science and Engineering",
    subtitle: "Dhaka International University • 2026 - Present",
    description:
      "Currently pursuing a Bachelor's degree in Computer Science and Engineering with a focus on full-stack web development, modern JavaScript technologies, and scalable application development.",
    icon: FaGraduationCap,
    type: "education",
  },
  {
    id: 2,
    title: "Diploma in Computer Science & Technology",
    subtitle: "Cumilla Polytechnic Institute • Completed",
    description:
      "Completed Diploma in Computer Science & Technology with a CGPA of 3.61. Built a strong foundation in programming, web development, database management, and software engineering concepts.",
    icon: FaGraduationCap,
    type: "education",
  },
  {
    id: 3,
    title: "Collaborative Project Experience",
    subtitle: "Team-Based Development Projects",
    description:
      "Worked with teams on multiple web development projects using React, Next.js, Node.js,Express js, MongoDB, and Tailwind CSS. Gained hands-on experience in frontend development, backend integration, Git collaboration, and responsive UI design.",
    icon: FaBriefcase,
    type: "experience",
  },
];

const TimelineItem = ({ data, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1, type: "spring", stiffness: 50 }}
      className={`mb-12 flex justify-between items-center w-full ${isEven ? "flex-row-reverse" : ""}`}
    >
      {/* Desktop Layout - Empty space on one side */}
      <div className="hidden md:block w-5/12" />

      {/* Center Icon & Line */}
      <div className="z-20 relative flex items-center justify-center w-10 h-10 bg-background border-4 border-primary rounded-full shadow-[0_0_15px_rgba(56,189,248,0.5)]">
        <data.icon className="w-4 h-4 text-primary" />
        {/* Glow behind icon */}
        <div className="absolute inset-0 bg-primary/20 blur-md rounded-full -z-10" />
      </div>

      {/* Card Content */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="w-full md:w-5/12 ml-6 md:ml-0 glass p-6 md:p-8 rounded-3xl border border-foreground/10 hover:border-primary/50 transition-colors relative group overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-primary uppercase rounded-full bg-primary/10 border border-primary/20">
            {data.type}
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
            {data.title}
          </h3>
          <p className="text-sm font-medium text-secondary mb-4">
            {data.subtitle}
          </p>
          <p className="text-muted leading-relaxed">
            {data.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Education() {
  const containerRef = useRef(null);
  
  // Calculate scroll progress for the center line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="education" className="py-32 relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-foreground/[0.01]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-foreground"
          >
            Education & Experience
          </motion.h3>
        </div>

        <div className="relative max-w-5xl mx-auto" ref={containerRef}>
          {/* Static Background Line */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-1 md:-ml-[2px] bg-foreground/5 rounded-full" />
          
          {/* Animated Foreground Line */}
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-5 md:left-1/2 top-0 w-1 md:-ml-[2px] bg-gradient-to-b from-primary via-secondary to-primary rounded-full shadow-[0_0_10px_rgba(56,189,248,0.5)] origin-top" 
          />

          {/* Timeline Items */}
          <div className="relative z-10 pt-10">
            {timelineData.map((item, index) => (
              <TimelineItem key={item.id} data={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
