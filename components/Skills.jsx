"use client";

import { motion } from "framer-motion";
import { 
  SiHtml5, SiCss, SiJavascript, SiReact, 
  SiNextdotjs, SiTailwindcss, SiMongodb, 
  SiExpress, SiGithub ,SiNetlify
} from "react-icons/si";
import { FaPython } from "react-icons/fa";
import { RiVercelFill } from "react-icons/ri";

const technologies = [
  { name: "HTML", icon: SiHtml5, color: "text-[#E34F26]" },
  { name: "CSS", icon: SiCss, color: "text-[#1572B6]" },
  { name: "JavaScript", icon: SiJavascript, color: "text-[#F7DF1E]" },
  { name: "React", icon: SiReact, color: "text-[#61DAFB]" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-foreground" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-[#06B6D4]" },
  { name: "MongoDB", icon: SiMongodb, color: "text-[#47A248]" },
  { name: "Express.js", icon: SiExpress, color: "text-foreground" },
  { name: "Python", icon: FaPython, color: "text-[#092E20] dark:text-[#092E20]" }, // Django is dark green
  { name: "GitHub", icon: SiGithub, color: "text-foreground" },
  { name: "Vercel", icon: RiVercelFill, color: "text-foreground" },
  { name: "Netlify", icon: SiNetlify, color: "text-foreground" },
];

export default function Skills() {
  // Duplicate array for seamless infinite scrolling
  const duplicatedTech = [...technologies, ...technologies];

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background -z-10" />

      <div className="container mx-auto px-4 mb-16 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-foreground mb-4"
        >
          Tech Stack
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-muted max-w-2xl mx-auto"
        >
          A collection of modern technologies and tools I use to build premium digital experiences.
        </motion.p>
      </div>

      {/* Infinite Marquee Animation */}
      <div className="relative flex w-full overflow-hidden py-10 group">
        {/* Left/Right Fading Gradients for smooth edge transition */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 30, 
            ease: "linear", 
            repeat: Infinity 
          }}
          className="flex gap-6 md:gap-10 px-4 md:px-5 w-max"
        >
          {duplicatedTech.map((tech, index) => (
            <motion.div
              key={`${tech.name}-${index}`}
              whileHover={{ scale: 1.05, y: -10 }}
              className="flex flex-col items-center justify-center min-w-[140px] md:min-w-[180px] h-[160px] md:h-[200px] glass rounded-3xl border border-foreground/10 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.2)] transition-all cursor-pointer relative group/card overflow-hidden"
            >
              {/* Background Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10 flex flex-col items-center gap-4">
                <tech.icon className={`w-12 h-12 md:w-16 md:h-16 ${tech.color} group-hover/card:scale-110 transition-transform duration-300 drop-shadow-md`} />
                <span className="font-semibold text-muted group-hover/card:text-foreground transition-colors">{tech.name}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

     
    </section>
  );
}
