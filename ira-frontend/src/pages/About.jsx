import React from 'react';
import Navbar from '../components/Navbar';

const About = () => {
  return (
    <div className="min-h-screen bg-[#F9F7F2] selection:bg-black selection:text-white">
      <Navbar />

      <div className="pt-40 pb-32 px-12 max-w-6xl mx-auto space-y-40">

        {/* Section 1: The Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8 pr-10">
            <h3 className="text-[#1A1A1A] text-[10px] font-bold uppercase tracking-[0.5em] opacity-40">
              The Philosophy
            </h3>
            <h2 className="text-6xl font-serif italic text-[#1A1A1A] leading-[1.1] tracking-tighter">
              Preserving the Craft.
            </h2>
            <p className="text-[11px] uppercase tracking-[0.2em] leading-[2] opacity-70 font-medium">
              IRA was born out of a desire to return to the roots of creation. We believe
              that an artifact should tell a story of patience, uncompromising quality, and
              deep respect for ancestral techniques.
            </p>
          </div>
          <div className="h-[600px] bg-[#EFEEEA] overflow-hidden group">
            <img

              src="/artisian.png"
              alt="IRA Block Printing Craftsmanship"
              className="w-full h-full object-cover grayscale -[20%] group-hover:grayscale-0 transition-all duration-[2000ms] ease-out group-hover:scale-105"
            />


          </div>
        </div>

        {/* Section 2: The Archive (Z-Pattern Reverse) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="h-[600px] bg-[#EFEEEA] overflow-hidden group md:order-1 order-2">
            <img
              src="/women 1.png"
              alt="IRA Natural Indigo Dyes"
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-[2000ms] ease-out group-hover:scale-105"
            />
          </div>
          <div className="space-y-8 pl-10 md:order-2 order-1">
            <h3 className="text-[#1A1A1A] text-[10px] font-bold uppercase tracking-[0.5em] opacity-40">
              The Materials
            </h3>
            <h2 className="text-6xl font-serif italic text-[#1A1A1A] leading-[1.1] tracking-tighter">
              Earth-Taught Textures.
            </h2>
            <p className="text-[11px] uppercase tracking-[0.2em] leading-[2] opacity-70 font-medium">
              From organic fibers to indigo extracted from the forest floor, our Archive
              is a tribute to nature's palette. Every piece is designed to age gracefully,
              becoming a permanent fixture in your personal heritage.
            </p>
          </div>
        </div>

        {/* Final Statement */}
        <div className="text-center space-y-12 pt-20 border-t border-black/5">
          <h2 className="text-4xl font-serif italic text-[#1A1A1A] opacity-80">
            "Artifacts that breathe with you."
          </h2>
          <div className="w-12 h-[1px] bg-black/20 mx-auto"></div>
          <p className="text-[9px] uppercase tracking-[0.6em] text-[#1A1A1A] font-bold opacity-40">
            Designed for the Earth . Est. 2026
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;