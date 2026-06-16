'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function ShineSection() {
  return (
    <section className="w-full bg-white pb-16 px-4 md:px-8 select-none">
      <div className="max-w-7xl mx-auto overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col lg:flex-row lg:h-[500px]">
        {/* Left Side: Image Panel */}
        <div className="w-full lg:w-1/2 h-[300px] lg:h-full relative overflow-hidden group">
          <Image
            src="/shine-banner.jpg"
            alt="Orisil Flower Ring Detail"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        {/* Right Side: Text Narrative Panel */}
        <div className="w-full lg:w-1/2 bg-[#2a1733] text-white flex flex-col justify-center items-center p-8 md:p-12 lg:p-16 text-center">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-wide mb-6">
            Shine in Your Own Way
          </h2>
          <p className="text-xs md:text-sm leading-relaxed text-white/95 font-light max-w-lg mb-8">
            At Orisil, we believe jewellery is more than an accessory – it is a reflection of your personality, style, and spirit. From graceful anklets and elegant bracelets to timeless toe rings, delicate tops, and radiant pendant sets, each piece is thoughtfully crafted in certified 925 sterling silver to enhance your natural glow. Whether you&apos;re celebrating a special moment or adding a subtle touch of shine to your everyday look, Orisil jewellery is designed to make you feel confident, graceful, and uniquely you.
          </p>
          <Link
            href="/about"
            className="bg-white hover:bg-slate-100 text-[#2a1733] font-bold text-xs md:text-[13px] tracking-widest px-8 py-3.5 transition-colors duration-300 rounded focus:outline-none"
          >
            MORE INFO
          </Link>
        </div>
      </div>
    </section>
  );
}
