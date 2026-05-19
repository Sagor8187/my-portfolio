"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setFormState({ name: "", email: "", subject: "", message: "" });
      alert("Message sent successfully!");
    }, 1500);
  };

  const contactInfo = [
    { icon: FaEnvelope, title: "Email", value: "sdsagor8187@gmail.com", href: "https://mail.google.com/mail" },
    { icon: FaPhoneAlt, title: "Phone", value: "01754718187", href: "tel:+8801754718187" },
    { icon: FaMapMarkerAlt, title: "Location", value: "Khilkhet,Dhaka,Bangladesh", href: "#" },
  ];

  const socialLinks = [
    { icon: FaGithub, href: "#" },
    { icon: FaLinkedin, href: "#" },
    { icon: FaTwitter, href: "#" },
  ];

  return (
    <section id="contact" className="py-32 relative overflow-hidden min-h-screen flex items-center justify-center">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/20 blur-[150px] rounded-full -z-10 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 blur-[150px] rounded-full -z-10 translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-primary tracking-widest uppercase mb-4"
          >
            Get In Touch
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground"
          >
            Let's Work Together
          </motion.h3>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 max-w-6xl mx-auto">
          {/* Left Column - Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-5/12 flex flex-col justify-center space-y-10"
          >
            <div>
              <h4 className="text-3xl font-bold text-foreground mb-4">Don't be a stranger!</h4>
              <p className="text-muted text-lg leading-relaxed">
                Whether you have a question, a project idea, or just want to say hi, my inbox is always open. I'll try my best to get back to you!
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <a 
                  key={index} 
                  href={item.href}
                  className="flex items-center gap-6 p-4 rounded-2xl hover:bg-foreground/5 border border-transparent hover:border-foreground/10 transition-colors group"
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-full glass border border-foreground/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-background transition-all duration-300">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h5 className="text-sm uppercase tracking-wider text-muted font-bold mb-1">{item.title}</h5>
                    <p className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-6 border-t border-foreground/10">
              <h5 className="text-sm uppercase tracking-wider text-muted font-bold mb-6">Connect with me</h5>
              <div className="flex gap-4">
                {socialLinks.map((link, i) => (
                  <a 
                    key={i} 
                    href={link.href}
                    className="w-12 h-12 flex items-center justify-center rounded-full glass border border-foreground/10 text-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all hover:-translate-y-1"
                  >
                    <link.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-7/12"
          >
            <form onSubmit={handleSubmit} className="glass p-8 md:p-10 rounded-3xl border border-foreground/10 shadow-2xl relative overflow-hidden group/form">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover/form:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Name Input */}
                  <div className="relative">
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="peer w-full bg-transparent border-0 border-b-2 border-foreground/20 px-0 py-3 text-foreground placeholder-transparent focus:ring-0 focus:border-primary transition-colors"
                      placeholder="Name"
                    />
                    <label 
                      htmlFor="name" 
                      className="absolute left-0 top-3 text-muted text-lg transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:text-muted peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-valid:-top-4 peer-valid:text-xs peer-valid:text-primary cursor-text"
                    >
                      Your Name
                    </label>
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="peer w-full bg-transparent border-0 border-b-2 border-foreground/20 px-0 py-3 text-foreground placeholder-transparent focus:ring-0 focus:border-primary transition-colors"
                      placeholder="Email"
                    />
                    <label 
                      htmlFor="email" 
                      className="absolute left-0 top-3 text-muted text-lg transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:text-muted peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-valid:-top-4 peer-valid:text-xs peer-valid:text-primary cursor-text"
                    >
                      Email Address
                    </label>
                  </div>
                </div>

                {/* Subject Input */}
                <div className="relative">
                  <input 
                    type="text" 
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="peer w-full bg-transparent border-0 border-b-2 border-foreground/20 px-0 py-3 text-foreground placeholder-transparent focus:ring-0 focus:border-primary transition-colors"
                    placeholder="Subject"
                  />
                  <label 
                    htmlFor="subject" 
                    className="absolute left-0 top-3 text-muted text-lg transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:text-muted peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-valid:-top-4 peer-valid:text-xs peer-valid:text-primary cursor-text"
                  >
                    Subject
                  </label>
                </div>

                {/* Message Input */}
                <div className="relative">
                  <textarea 
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="peer w-full bg-transparent border-0 border-b-2 border-foreground/20 px-0 py-3 text-foreground placeholder-transparent focus:ring-0 focus:border-primary transition-colors resize-none"
                    placeholder="Message"
                  ></textarea>
                  <label 
                    htmlFor="message" 
                    className="absolute left-0 top-3 text-muted text-lg transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:text-muted peer-placeholder-shown:top-3 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-primary peer-valid:-top-6 peer-valid:text-xs peer-valid:text-primary cursor-text"
                  >
                    Your Message
                  </label>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="group relative w-full flex items-center justify-center gap-3 px-8 py-4 bg-foreground text-background rounded-xl font-bold text-lg overflow-hidden transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">{isSubmitting ? "Sending..." : "Send Message"}</span>
                  <FaPaperPlane className={`relative z-10 w-4 h-4 transition-transform duration-300 ${isSubmitting ? "translate-x-10 opacity-0" : "group-hover:-translate-y-1 group-hover:translate-x-1"}`} />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
