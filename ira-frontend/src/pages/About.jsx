import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

const About = () => {
  // Refined Animation variants for a tighter feel
  const revealVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] selection:bg-[#B3541E] selection:text-white overflow-x-hidden">
      <Navbar />

      <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">

        {/* --- HEADER (Reduced Margin) --- */}
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
          className="text-center mb-24"
        >
          <span className="text-[10px] uppercase tracking-[0.6em] text-[#B3541E] font-bold block mb-4">
            The Archival Narrative
          </span>
          <h1 className="font-serif text-6xl md:text-8xl italic text-[#2D2D2D] tracking-tighter leading-none">
            Slow Craft.
          </h1>
          <div className="w-16 h-[1px] bg-[#B3541E] mx-auto mt-8 opacity-30"></div>
        </motion.header>

        {/* Tightened space-y-32 for better flow */}
        <div className="space-y-32">

          {/* SECTION 1: THE PHILOSOPHY */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={revealVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <div className="space-y-8 lg:pr-12">
              <span className="text-[#B3541E] text-[10px] font-bold uppercase tracking-[0.5em]">
                01 — The Philosophy
              </span>
              <h2 className="text-5xl font-serif italic text-[#2D2D2D] leading-[1.1] tracking-tighter">
                Preserving the <br/> Ancestral Craft.
              </h2>
              <p className="text-[12px] uppercase tracking-[0.25em] leading-[2.2] text-[#2D2D2D] opacity-70 font-medium border-l-2 border-[#B3541E]/20 pl-8">
                IRA was born out of a desire to return to the roots of creation. We believe
                that an artifact should tell a story of patience, uncompromising quality, and
                deep respect for ancestral techniques that are being lost to time.
              </p>
            </div>

            {/* Structured Image Card with B&W to Color Effect */}
            <div className="relative group">
              <div className="aspect-[4/5] bg-white border border-[#E5E1DA] p-4 shadow-sm overflow-hidden">
                <img
                  src="/artisian.png"
                  alt="IRA Craftsmanship"
                  className="w-full h-full object-cover transition-all duration-[1500ms] ease-out group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-[#B3541E]/10 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-1000"></div>
            </div>
          </motion.div>

          {/* SECTION 2: THE MATERIALS (REVERSED) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={revealVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <div className="lg:order-2 space-y-8 lg:pl-12">
              <span className="text-[#B3541E] text-[10px] font-bold uppercase tracking-[0.5em]">
                02 — The Materials
              </span>
              <h2 className="text-5xl font-serif italic text-[#2D2D2D] leading-[1.1] tracking-tighter">
                Earth-Taught <br/> Textures.
              </h2>
              <p className="text-[12px] uppercase tracking-[0.25em] leading-[2.2] text-[#2D2D2D] opacity-70 font-medium border-l-2 border-[#B3541E]/20 pl-8">
                From organic fibers to indigo extracted from the forest floor, our Archive
                is a tribute to nature's palette. Every piece is designed to age gracefully,
                becoming a permanent fixture in your personal heritage log.
              </p>
            </div>

            <div className="lg:order-1 relative group">
              <div className="aspect-[4/5] bg-white border border-[#E5E1DA] p-4 shadow-sm overflow-hidden">
                <img
                  src="/women6.png"
                  alt="Natural Indigo Dyes"
                  className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-[1500ms] ease-out group-hover:scale-105"
                  onError={(e) => { e.target.src = "/landing page.png"; }}
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-[#B3541E]/10 -z-10 group-hover:-translate-x-2 group-hover:translate-y-2 transition-transform duration-1000"></div>
            </div>
          </motion.div>

          {/* FINAL STATEMENT (Reduced Padding) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="text-center space-y-12 py-20 border-t border-[#E5E1DA]"
          >
            <h2 className="text-3xl md:text-4xl font-serif italic text-[#2D2D2D] opacity-80 leading-relaxed max-w-2xl mx-auto">
              "Artifacts that breathe with you, evolving through the seasons of life."
            </h2>
            <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-[1px] bg-[#B3541E] opacity-40"></div>
                <p className="text-[10px] uppercase tracking-[0.6em] text-[#2D2D2D] font-bold opacity-30">
                  Bengaluru • Est. 2026
                </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;