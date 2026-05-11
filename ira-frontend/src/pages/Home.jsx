import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

const Home = () => {
  const navigate = useNavigate();

  // Animation variants for staggered load
  const revealVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.215, 0.61, 0.355, 1] }
    }
  };

  return (
    <div className="min-h-screen selection:bg-black selection:text-white bg-[#F9F7F2] overflow-hidden">
      <Navbar />

      <main className="flex flex-col md:flex-row h-[calc(100vh-104px)]">

        {/* LEFT: TEXT CONTENT */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          className="w-full md:w-1/2 flex flex-col justify-center px-12 md:px-24 relative z-10"
        >
          <motion.div variants={revealVariants} className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.5em] opacity-40 mb-10">
            <span className="w-12 h-[1px] bg-black"></span>
            Artifact Collection — 2026
          </motion.div>

          <motion.h1 variants={revealVariants} className="font-serif text-[10vw] md:text-[120px] leading-[0.85] mb-12 text-[#1A1A1A] tracking-tighter">
            IRA <br />
            <span className="italic font-normal opacity-80 pl-4 md:pl-10">archive.</span>
          </motion.h1>

          <motion.p variants={revealVariants} className="max-w-md text-[11px] uppercase tracking-[0.3em] leading-[2.2] opacity-60 font-medium border-l border-black/10 pl-8">
            A sanctuary for <span className="italic font-serif normal-case text-lg lowercase text-black opacity-100">slow fashion.</span> where heritage craftsmanship meets the raw, minimal silhouettes of the modern era.
          </motion.p>

          <motion.div variants={revealVariants} className="flex flex-wrap gap-8 mt-20">
            <button
              onClick={() => navigate('/shop')}
              className="group relative overflow-hidden bg-[#1A1A1A] text-white px-12 py-5 text-[10px] font-bold uppercase tracking-[0.4em] transition-all hover:shadow-2xl"
            >
              <span className="relative z-10">Enter Gallery</span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>

            <button
              onClick={() => navigate('/about')}
              className="group border border-black/10 px-12 py-5 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white transition-all"
            >
              The Story
            </button>
          </motion.div>
        </motion.div>

        {/* RIGHT: IMAGE AREA */}
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="w-full md:w-1/2 bg-[#EFEEEA] overflow-hidden relative group cursor-crosshair"
        >
            <img
              src="/landing page.png"
              alt="IRA Heritage Collection"
              className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[3000ms] cubic-bezier(0.16, 1, 0.3, 1)"
            />

            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 bg-black/5 opacity-40 mix-blend-overlay pointer-events-none" />

            {/* Floating Info Tag */}
            <motion.div
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute bottom-12 right-0 bg-white/80 backdrop-blur-xl p-12 pr-32 border-l border-black/5 shadow-2xl"
            >
                <span className="text-[9px] uppercase tracking-[0.5em] opacity-40 block mb-3 font-bold">Curated Series</span>
                <h2 className="font-serif text-5xl italic mb-2 text-[#1A1A1A]">The Heritage Core</h2>
                <div className="flex items-center gap-4">
                   <span className="text-[10px] opacity-30 uppercase tracking-widest">Vol. 01</span>
                   <span className="w-8 h-[1px] bg-black/10"></span>
                   <span className="text-[10px] opacity-30 uppercase tracking-widest font-bold">Inland</span>
                </div>
            </motion.div>
        </motion.div>
      </main>

      {/* FOOTER TICKER: Adds that "Archive" catalog feel */}
      <div className="absolute bottom-0 w-full bg-black text-white py-2 flex overflow-hidden opacity-10">
        <div className="flex whitespace-nowrap animate-scroll text-[8px] uppercase tracking-[1em] font-bold">
          &nbsp; HANDLOOMED • INDIGO DYED • ORGANIC FIBERS • ETHICALLY SOURCED • SLOW CRAFT • ARCHIVAL QUALITY •&nbsp;
          &nbsp; HANDLOOMED • INDIGO DYED • ORGANIC FIBERS • ETHICALLY SOURCED • SLOW CRAFT • ARCHIVAL QUALITY •&nbsp;
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default Home;