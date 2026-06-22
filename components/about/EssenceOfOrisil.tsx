"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  PiSealCheckBold, 
  PiHandshakeBold, 
  PiSparkleBold, 
  PiTagBold, 
  PiHeartBold 
} from 'react-icons/pi';

const essences = [
  {
    icon: PiSealCheckBold,
    title: "Purity",
    text: "We use 92.5 hallmarked silver for guaranteed purity."
  },
  {
    icon: PiHandshakeBold,
    title: "Trust",
    text: "Four decades of honesty and relationships."
  },
  {
    icon: PiSparkleBold,
    title: "Design",
    text: "Timeless designs that express you."
  },
  {
    icon: PiTagBold,
    title: "Price",
    text: "Honest pricing, always transparent."
  },
  {
    icon: PiHeartBold,
    title: "Connection",
    text: "More than customers, you are our family."
  }
];

export function EssenceOfOrisil() {
  return (
    <section 
      className="w-full py-12 relative overflow-hidden border-b border-[#C17F78]/10 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/budget_bg.png')" }}
    >
      {/* Light overlay to ensure text legibility while displaying background details */}
      <div className="absolute inset-0 bg-white/93 z-0 pointer-events-none" />

      <div className="max-w-[1320px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col items-center text-center mb-8">
          <h2 className="text-[#4A3234] font-bodoni text-2xl md:text-3xl font-bold uppercase tracking-[0.25em]">
            The Essence of Orisil
          </h2>
          
          {/* Custom Elegant Divider */}
          <div className="flex items-center justify-center gap-4 w-full max-w-[200px] mt-3">
            <div className="h-[1px] bg-[#C17F78]/30 flex-grow" />
            <div className="w-2.5 h-2.5 rounded-full border border-[#C17F78]/50 flex items-center justify-center">
              <div className="w-1 h-1 bg-[#C17F78]/80 rounded-full" />
            </div>
            <div className="h-[1px] bg-[#C17F78]/30 flex-grow" />
          </div>
        </div>

        {/* 5-Column Cards Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 w-full mt-2">
          {essences.map((item, i) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={i}
                className="flex flex-col items-center text-center p-6 bg-white/95 rounded-2xl border border-[#C17F78]/15 shadow-[0_4px_20px_rgba(74,50,52,0.02)] transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
              >
                {/* Icon Wrapper */}
                <div className="w-[68px] h-[68px] rounded-full bg-[#C17F78]/5 border border-[#C17F78]/10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#C17F78] group-hover:border-[#C17F78] group-hover:shadow-[0_8px_20px_rgba(193,127,120,0.2)]">
                  <IconComponent className="w-8 h-8 text-[#C17F78] group-hover:text-white transition-colors duration-300" />
                </div>
                
                {/* Title */}
                <h3 className="font-bodoni text-[#4A3234] text-[19px] lg:text-xl font-bold mb-2 tracking-wide transition-colors duration-300 group-hover:text-[#C17F78]">
                  {item.title}
                </h3>
                
                {/* Description */}
                <p className="font-sans text-[#6D4C4E]/80 text-[13px] leading-relaxed max-w-[180px]">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
