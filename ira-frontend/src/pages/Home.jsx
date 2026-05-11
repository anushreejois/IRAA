import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen selection:bg-black selection:text-white bg-[#F9F7F2]">
      <Navbar />

      <main className="flex h-[calc(100vh-104px)]">
        {/* Left Side: Text Content */}
        <div className="w-1/2 flex flex-col justify-center px-24 relative">
          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] opacity-60 mb-8">
            <span className="w-8 h-[1px] bg-black"></span>
            Est. 2026 • The Archive
          </div>

          <h1 className="font-serif text-[120px] leading-[0.85] mb-12 text-[#1A1A1A]">
            IRA <br />
            <span className="italic font-normal opacity-80">archive.</span>
          </h1>

          <p className="max-w-md text-xs uppercase tracking-[0.2em] leading-relaxed opacity-70 font-medium">
            A sanctuary for <span className="italic font-serif normal-case text-lg lowercase">slow fashion.</span> where heritage craftsmanship meets the raw, minimal silhouettes of the modern archive.
          </p>

          <div className="flex gap-6 mt-16">
            <button
              onClick={() => navigate('/shop')}
              className="bg-[#1A1A1A] text-white px-10 py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-black transition-all cursor-pointer shadow-lg"
            >
              Enter Gallery
            </button>
            <button
              onClick={() => navigate('/about')}
              className="border border-black/20 px-10 py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:border-black transition-all cursor-pointer"
            >
              The Story
            </button>
          </div>
        </div>

        {/* Right Side: The Big Image */}
        <div className="w-1/2 bg-[#EFEEEA] overflow-hidden relative group">
            <img
              src="/landing page.png"
              alt="IRA Heritage Collection"
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2000ms] ease-out"
            />

            <div className="absolute bottom-12 right-0 bg-white/60 backdrop-blur-md p-10 pr-24 text-right border-l border-black/5">
                <span className="text-[8px] uppercase tracking-[0.4em] opacity-60 block mb-2 font-bold">Current Archive</span>
                <h2 className="font-serif text-4xl italic mb-1 text-[#1A1A1A]">The Heritage Core</h2>
                <span className="text-[9px] opacity-40 uppercase tracking-widest">Vol. 01</span>
            </div>
        </div>
      </main>
    </div>
  );
}

export default Home;