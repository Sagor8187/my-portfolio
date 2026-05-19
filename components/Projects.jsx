"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { cn } from "@/utils/cn";

const projectsData = [
  {
    id: 1,
    title: "Tiles E-Commerce Website",
    description: "Developed a responsive tiles e-commerce website with modern UI, authentication, and dynamic product features.",
    tech: ["Next.js", "Tailwind CSS","hero-ui","duisy-ui", "Better Auth", "Json-server","vercel","Animate-css","react-toastify"],
   
    github: "https://github.com/Sagor8187/My-Tiles-Gallary.git",
    live: "https://my-tiles-gallary.vercel.app/",
    image:"https://i.ibb.co/3mtskRpd/Screenshot-2026-05-19-144045.png"
  },
  {
    id: 2,
    title: "Contact Management & Tracking website",
    description:"Created a responsive contact management and tracking application with modern UI, contact organization, and seamless user experience.",
    tech: ["React", "tailwind-css","hero-ui","vercel", "duisy-ui", "react-icons","react-toastify"],

    github: "https://github.com/Sagor8187/Keen-keeper-dashboard-app.git",
    live: "https://keen-keeper-henna-tau.vercel.app/",
    image:"https://i.ibb.co/Y4KfF49c/Screenshot-2026-05-19-144956.png"
  },
  {
    id: 3,
    title: "NEST E-Commarce",
    description: "Built a responsive Nest e-commerce app using React and Tailwind. Users can browse products, add to cart, and remove items easily. Focused on clean UI, smooth interactions, and seamless shopping experience. Key Features: Product listing, add to cart, remove from cart, responsive design, interactive UI.",
    tech: ["React", "Tailwind CSS", "context-api","tailwind-css","react-router-dom","duisy-ui"],
   image:"https://i.ibb.co/gLbz4qtc/post.png",
    github: "https://github.com/Sagor8187/NEST-E-commerce.git",
    live: "https://marvelous-belekoy-79b799.netlify.app/",
  },
  
];

export default function Projects() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const ctx = gsap.context(() => {
        gsap.from(".project-card", {
          y: 80,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, [isInView]);

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-secondary/5 via-background to-background -z-10" />
      
      <div className="container mx-auto px-4 relative z-10" ref={containerRef}>
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-primary tracking-widest uppercase mb-4"
          >
            Showcase
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-foreground"
          >
            Featured Projects Section
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {projectsData.map((project) => (
            <div 
              key={project.id} 
              className="project-card opacity-100" // GSAP controls opacity
            >
              <div 
                className="group relative rounded-3xl glass border border-foreground/10 overflow-hidden hover:border-primary/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] transition-all duration-500 h-full flex flex-col"
              >
                {/* Project Image Placeholder / Abstract Graphic */}
                <div className="w-full h-64 overflow-hidden relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-80 group-hover:scale-110 transition-transform duration-700 ease-out`} />
                  <img src={project.image} alt="" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  
                  {/* Decorative Elements inside the image area */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-30 mix-blend-overlay">
                    <div className="w-32 h-32 rounded-full bg-white blur-2xl group-hover:blur-3xl transition-all duration-700" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col">
                  <h4 className="text-2xl font-bold text-foreground mb-3 transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-muted mb-6 flex-1 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-xs font-medium px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 text-foreground">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 pt-6 border-t border-foreground/10">
                    <a 
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-background font-bold hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                    >
                      <FaExternalLinkAlt size={14} /> Live Demo
                    </a>
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl glass border border-foreground/10 text-foreground hover:bg-foreground/5 transition-all"
                    >
                      <FaGithub size={16} /> Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
