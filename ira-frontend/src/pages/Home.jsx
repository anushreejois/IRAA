import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="flex h-[calc(100vh-104px)]">
        {/* Left Side: Text Content */}
        <div className="w-1/2 flex flex-col justify-center px-24 relative">
          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] opacity-60 mb-8">
            <span className="w-8 h-[1px] bg-black"></span>
            Est. 2026 • The Archive
          </div>

          <h1 className="font-serif text-[120px] leading-[0.85] mb-12">
            IRA <br />
            <span className="italic font-normal opacity-80">archive.</span>
          </h1>

          <p className="max-w-md text-xs uppercase tracking-[0.2em] leading-relaxed opacity-70 font-medium">
            A sanctuary for <span className="italic font-serif normal-case text-lg lowercase">slow fashion.</span> where heritage craftsmanship meets the raw, minimal silhouettes of the modern archive.
          </p>

          <div className="flex gap-6 mt-16">
            <button
              onClick={() => navigate('/shop')}
              className="bg-[#1A1A1A] text-white px-10 py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-black transition-all cursor-pointer"
            >
              Enter Gallery
            </button>
            <button className="border border-black/20 px-10 py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white transition-all cursor-pointer">
              The Story
            </button>
          </div>
        </div>

        {/* Right Side: The Big Image */}
        <div className="w-1/2 bg-gray-200 overflow-hidden relative group">
            <img
              src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1"
              alt="Heritage Collection"
              className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-1000"
            />

            <div className="absolute bottom-12 right-0 bg-white/40 backdrop-blur-lg p-10 pr-24 text-right">
                <span className="text-[8px] uppercase tracking-[0.4em] opacity-60 block mb-2">Current Archive</span>
                <h2 className="font-serif text-4xl italic mb-1">The Heritage Core</h2>
                <span className="text-[9px] opacity-40">Vol. 01</span>
            </div>
        </div>
      </main>
    </div>
  );
}

export default Home;