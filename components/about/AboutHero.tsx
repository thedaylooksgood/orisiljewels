import React from 'react';
import Image from 'next/image';

export function AboutHero() {
  return (
    <section className="w-full relative py-8 overflow-hidden bg-[#FDFBFB] flex flex-col items-center justify-center">
      {/* Background Silk Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/about-us/about-us-bg.png"
          alt="Silk Background"
          fill
          priority
          className="object-cover object-center pointer-events-none"
        />
        {/* White Overlay */}
        <div className="absolute inset-0 bg-white/85 pointer-events-none"></div>
      </div>

      {/* Main Container - Centered */}
      <div className="relative z-10 w-full max-w-[800px] mx-auto px-4 md:px-8 flex flex-col items-center text-center">
        
        <span className="text-[#C17F78] text-[9px] font-black uppercase tracking-[0.25em] mb-2">
          About Us
        </span>
        
        <h1 className="font-bodoni text-[#4A3234] text-2xl sm:text-3xl md:text-[34px] font-bold leading-[1.2] mb-3">
          40 Years of Trust, Crafted Into Every Piece
        </h1>
        
        {/* Subtle separator line */}
        <div className="w-10 h-[1px] bg-[#C17F78]/50 mb-3"></div>
        
        <p className="font-script font-bold text-[#D38E93] text-[26px] sm:text-[32px] leading-none">
          Wear elegance, trust & lasting beauty.
        </p>

      </div>
    </section>
  );
}
