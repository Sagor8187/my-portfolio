"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaCode, FaLayerGroup, FaServer, FaWandMagicSparkles } from "react-icons/fa6";

// Animated counter component
function AnimatedStat({ value, label }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-6 glass rounded-2xl border border-foreground/5 hover:border-primary/30 transition-colors group">
      <motion.h4 
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      >
        {value}
      </motion.h4>
      <p className="text-muted text-sm uppercase tracking-wider font-medium group-hover:text-foreground transition-colors">{label}</p>
    </div>
  );
}

export default function About() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-foreground/[0.02]" />
      
      {/* Background Ornaments */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 right-[10%] w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10"
      />
      
      <div className="container mx-auto px-4 relative z-10" ref={containerRef}>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16 md:mb-24">
            
            <h3 className="text-4xl md:text-5xl font-bold text-foreground">About Me</h3>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
            {/* Left: Animated Image/Card */}
            <motion.div variants={itemVariants} className="relative">
              <div className="aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden glass border border-foreground/10 relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 z-10 mix-blend-overlay group-hover:opacity-50 transition-opacity duration-500" />
                
                {/* Animated Image Container */}
                <div className="absolute inset-0 flex items-center justify-center bg-background/30 p-8">
                  {/* Glowing shadow behind image */}
                  <motion.div 
                    animate={{ 
                      borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "60% 40% 30% 70% / 60% 30% 70% 40%", "30% 70% 70% 30% / 30% 30% 70% 70%"],
                      rotate: [0, 90, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[80%] h-[80%] bg-gradient-to-br from-primary to-secondary blur-2xl opacity-40 z-0"
                  />
                  
                  {/* Morphing Profile Image */}
                  <motion.div 
                    animate={{ 
                      borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "60% 40% 30% 70% / 60% 30% 70% 40%", "30% 70% 70% 30% / 30% 30% 70% 70%"],
                      y: [-15, 15, -15]
                    }}
                    transition={{ 
                      borderRadius: { duration: 10, repeat: Infinity, ease: "linear" },
                      y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="relative w-full h-full overflow-hidden border-2 border-foreground/20 z-10 shadow-2xl"
                  >
                    <img
                      src="https://i.ibb.co/p6mM9jVW/43fffcd7-5470-42c0-914d-e89f77ad6199.png"
                      alt="Profile background"
                      className="w-full h-full object-cover scale-[1.15] group-hover:scale-100 transition-transform duration-700"
                    />
                  </motion.div>
                </div>

                {/* Floating Tech Badges */}
                <motion.div 
                  animate={{ y: [-10, 10, -10] }} 
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-10 right-10 z-20 glass px-4 py-2 rounded-xl border border-foreground/10 flex items-center gap-2 shadow-xl"
                >
                  <FaLayerGroup className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm">Problem Solver</span>
                </motion.div>

                <motion.div 
                  animate={{ y: [10, -10, 10] }} 
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-10 left-10 z-20 glass px-4 py-2 rounded-xl border border-foreground/10 flex items-center gap-2 shadow-xl"
                >
                  <FaServer className="w-4 h-4 text-secondary" />
                  <span className="font-medium text-sm">Full Stack Developer</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Right: Personal Introduction & Journey */}
            <motion.div variants={itemVariants} className="flex flex-col justify-center">
              <h4 className="text-3xl font-bold mb-6 text-foreground">
                Hi, I'm Sagor Sutradhar, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">a passionate Full Stack MERN Developer and an avid problem solver.</span>
              </h4>
              
              <div className="space-y-6 text-lg text-muted">
                <p>
                 I am dedicate my time to building scalable web applications and solving complex logical challenges
                </p>
                <p>
                  My technical ecosystem revolves around React.js, Next.js, Node.js, and Express.js. I craft responsive, modern user interfaces using HTML, CSS, JavaScript, Tailwind CSS, and Bootstrap, while managing version control via Git & GitHub and deploying through Netlify and Vercel.
                </p>
                <p>
                  What sets me apart is my analytical mindset. I love cracking complex algorithmic puzzles and actively solve problems on HackerRank and Codeforces. This habit helps me write highly optimized, clean, and bug-free code for my development projects. I am eager to bring my technical skills and problem-solving drive to a dynamic software engineering team.
                </p>
              </div>

              {/* Journey Highlights */}
              <div className="mt-10 space-y-4">
                {[
                  { year: "2025", title: "Lerning Front-End Developer", desc: "Bdcalling Academy is a leading IT training institute in Bangladesh, offering career-oriented courses to help you enhance your skills and build a successful" },
                  { year: "2026", title: "Lerning Full Stack MERN Developer", desc: "Programming Hero is an interactive, gamified e-learning platform headquartered in Bangladesh that teaches coding and web development." },
                  
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ x: 10 }}
                    className="flex gap-4 p-4 rounded-2xl hover:bg-foreground/5 transition-colors border border-transparent hover:border-foreground/5 cursor-default"
                  >
                    <div className="w-16 font-bold text-primary pt-1">{item.year}</div>
                    <div>
                      <h5 className="font-bold text-foreground">{item.title}</h5>
                      <p className="text-sm text-muted">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Animated Statistics */}
          

        </motion.div>
      </div>
    </section>
  );
}
