"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Award, Crown, Gem, ShieldCheck } from 'lucide-react';

export function Craftsmanship() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="w-full relative min-h-[400px] lg:min-h-[480px] flex items-center overflow-hidden bg-white">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img 
          src="/about-us/hallmark-bg.png" 
          alt="Artisan crafting jewellery" 
          className="w-full h-full object-cover object-[70%_center] lg:object-center"
        />
        {/* Faint overlay to soften contrast */}
        <div className="absolute inset-0 bg-black/[0.04] pointer-events-none" />
      </div>

      {/* Slanted White Gradient Overlay */}
      {/* 
        On mobile/tablet: solid/vertical gradient ensuring text is readable on top of the image.
        On desktop (lg): 105-degree slanted gradient that fades from solid white on the left (42%) to transparent on the right (70%),
        showcasing the craftsman's hands and the jewellery piece.
      */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_65%,rgba(255,255,255,0.85)_100%)] lg:bg-[linear-gradient(105deg,white_42%,rgba(255,255,255,0.98)_48%,rgba(255,255,255,0.85)_54%,rgba(255,255,255,0)_70%)]" />

      {/* Content Container */}
      <div className="max-w-[1320px] mx-auto w-full px-4 md:px-8 py-12 lg:py-16 relative z-20 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Side: Content & Badges */}
        <div className="w-full lg:w-[50%] flex flex-col items-start text-left">
          
          {/* Label */}
          <span className="text-[#C17F78] font-bold text-xs uppercase tracking-[0.25em] mb-3">
            Crafted with Passion
          </span>
          
          {/* Title */}
          <h2 className="font-bodoni text-[#4A3234] text-2.5xl sm:text-3.5xl lg:text-[38px] font-bold leading-[1.15] mb-4">
            Handcrafted.<br />
            Hallmarked.<br />
            Timeless.
          </h2>

          {/* Arrow Divider */}
          <div className="flex items-center gap-2 mb-4 w-full max-w-[160px]">
            <div className="h-[1.5px] bg-[#C17F78]/40 flex-grow" />
            <svg className="w-3 h-3 text-[#C17F78]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>

          {/* Description */}
          <p className="font-sans text-[#6D4C4E]/90 text-[13.5px] md:text-[14px] leading-[1.65] max-w-[440px] mb-6">
            Every piece is crafted in 92.5 Sterling Silver with precision and care by skilled artisans who treat each creation as a work of art.
          </p>

          {/* Badge Grid with Dividers */}
          {/* On mobile: 2x2 grid with divider down the center. On desktop: 1x4 flex row with dividers between items. */}
          <div className="grid grid-cols-2 gap-y-6 gap-x-2 md:flex md:flex-row md:items-stretch w-full max-w-[620px]">
            
            {/* Badge 1: 925 Hallmarked Silver */}
            <div className="flex flex-col items-center text-center px-4 md:flex-1 border-r border-[#C17F78]/20">
              <div className="h-8 flex items-center justify-center">
                <Award className="w-7 h-7 text-[#C17F78]" strokeWidth={1.2} />
              </div>
              <span className="text-[10px] md:text-[10.5px] font-bold text-[#4A3234] uppercase tracking-widest mt-2 leading-tight">
                925<br />Hallmarked Silver
              </span>
            </div>

            {/* Badge 2: Fine Craftsmanship */}
            <div className="flex flex-col items-center text-center px-4 md:flex-1 border-none md:border-r md:border-[#C17F78]/20">
              <div className="h-8 flex items-center justify-center">
                <Crown className="w-7 h-7 text-[#C17F78]" strokeWidth={1.2} />
              </div>
              <span className="text-[10px] md:text-[10.5px] font-bold text-[#4A3234] uppercase tracking-widest mt-2 leading-tight">
                Fine<br />Craftsmanship
              </span>
            </div>

            {/* Badge 3: Unique Designs */}
            <div className="flex flex-col items-center text-center px-4 md:flex-1 border-r border-[#C17F78]/20">
              <div className="h-8 flex items-center justify-center">
                <Gem className="w-7 h-7 text-[#C17F78]" strokeWidth={1.2} />
              </div>
              <span className="text-[10px] md:text-[10.5px] font-bold text-[#4A3234] uppercase tracking-widest mt-2 leading-tight">
                Unique<br />Designs
              </span>
            </div>

            {/* Badge 4: Trusted for 40+ Years */}
            <div className="flex flex-col items-center text-center px-4 md:flex-1">
              <div className="h-8 flex items-center justify-center">
                <ShieldCheck className="w-7 h-7 text-[#C17F78]" strokeWidth={1.2} />
              </div>
              <span className="text-[10px] md:text-[10.5px] font-bold text-[#4A3234] uppercase tracking-widest mt-2 leading-tight">
                Trusted for<br />40+ Years
              </span>
            </div>

          </div>
        </div>

        {/* Right Side: Interactive Play Button over background image */}
        <div className="w-full lg:w-[45%] flex items-center justify-center lg:justify-start lg:pl-16 h-[100px] lg:h-auto z-20">
          <button 
            onClick={() => setIsVideoOpen(true)}
            className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center bg-black/15 backdrop-blur-[3px] shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:bg-[#C17F78] hover:border-[#C17F78] group transition-all duration-300 scale-100 active:scale-95 cursor-pointer"
            aria-label="Play Crafting Video"
          >
            <Play className="w-6 h-6 text-white fill-white ml-1 group-hover:scale-105 transition-transform" />
          </button>
        </div>

      </div>

      {/* Video Modal Lightbox */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Video Iframe Container */}
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-[1000px] aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative"
            >
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/XqC9H21H55A?autoplay=1" 
                title="Orisil Silversmithing & Craftsmanship" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
