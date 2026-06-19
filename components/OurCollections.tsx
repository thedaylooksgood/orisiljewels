'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface CollectionItem {
  id: number;
  name: string;
  description: string;
  image: string;
  link: string;
  icon: React.ReactNode;
}

const collections: CollectionItem[] = [
  {
    id: 1,
    name: "RINGS",
    description: "Timeless designs for every promise.",
    image: "/home-page/our-collections/rings.png",
    link: "/products?category=Rings",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 mx-auto mb-1.5 text-[#E0B4B8]" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="14" r="5" />
        <path d="M12 9V5" />
        <path d="M10 5h4" />
        <polygon points="12,2 14,4 12,6 10,4" />
      </svg>
    )
  },
  {
    id: 2,
    name: "EARRINGS",
    description: "Designed to frame your beauty effortlessly.",
    image: "/home-page/our-collections/earrings.png",
    link: "/products?category=Earrings",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 mx-auto mb-1.5 text-[#E0B4B8]" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="7" r="1.5" />
        <circle cx="16" cy="7" r="1.5" />
        <path d="M8 8.5v4M16 8.5v4" />
        <circle cx="8" cy="15" r="2.5" />
        <circle cx="16" cy="15" r="2.5" />
        <circle cx="8" cy="15" r="0.8" fill="currentColor" />
        <circle cx="16" cy="15" r="0.8" fill="currentColor" />
      </svg>
    )
  },
  {
    id: 3,
    name: "NECKLACES",
    description: "Pieces that speak your story.",
    image: "/home-page/our-collections/necklace.png",
    link: "/products?category=Necklaces%2FPendants",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 mx-auto mb-1.5 text-[#E0B4B8]" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 3c1 7 4 10 7 10s6-3 7-10" />
        <circle cx="12" cy="15" r="2.5" />
        <circle cx="12" cy="15" r="0.8" fill="currentColor" />
      </svg>
    )
  },
  {
    id: 4,
    name: "BRACELETS",
    description: "Grace in every little detail.",
    image: "/home-page/our-collections/bracelets.png",
    link: "/products?category=Bracelets",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 mx-auto mb-1.5 text-[#E0B4B8]" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(-15 12 12)" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
      </svg>
    )
  },
  {
    id: 5,
    name: "EVIL EYE",
    description: "Protection. Positivity. Peace of mind.",
    image: "/home-page/our-collections/evil-eye.png",
    link: "/products?category=Evil%20Eye%20Collection",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 mx-auto mb-1.5 text-[#E0B4B8]" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="12" cy="12" r="1.2" fill="currentColor" />
      </svg>
    )
  }
];

export function OurCollections() {
  return (
    <section className="w-full bg-[#FFF6F7] pt-4 pb-6 relative select-none">
      <div className="w-full max-w-[1320px] mx-auto px-4 md:px-8">
        {/* Title & Decorative Taglines - Optimized for tight vertical spacing */}
        <div className="text-center flex flex-col items-center mb-4.5">
          {/* Top Tagline */}
          <p className="font-script text-[#D38E93] font-bold text-[22px] md:text-[25px] lg:text-[28px] leading-none mb-1">
            Crafted to be cherished, made to shine
          </p>

          {/* Top Divider with Diamond */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-12 md:w-16 h-[0.5px] bg-[#C17F78]/25" />
            <div className="w-1.5 h-1.5 border border-[#C17F78] rotate-45 bg-[#FFF6F7]" />
            <div className="w-12 md:w-16 h-[0.5px] bg-[#C17F78]/25" />
          </div>

          {/* Main Section Heading - Compact & Elegant */}
          <h2 className="font-bodoni text-lg md:text-xl lg:text-[22px] text-[#6D4C4E] font-medium tracking-[0.25em] uppercase mb-1.5">
            Our Collections
          </h2>

          {/* Bottom Diamond Divider */}
          <div className="w-1.5 h-1.5 border border-[#C17F78] rotate-45 bg-[#C17F78]" />
        </div>

        {/* Categories Grid - 5 columns on desktop, optimized height for maximum visual space */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
          {collections.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className="group relative w-full h-[240px] md:h-[270px] lg:h-[290px] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 ease-out border border-[#E0B4B8]/20"
            >
              {/* Background Image */}
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover transition-transform duration-700 ease-out scale-100 group-hover:scale-105"
              />

              {/* Premium Dark Gradient Overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t from-black/60 via-black/15 to-transparent transition-opacity duration-500 group-hover:opacity-100 z-10" />

              {/* Centered Content at Bottom */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-20 text-center font-playfair">
                {/* Title */}
                <h3 className="text-white text-xs md:text-sm font-bold tracking-[0.18em] mb-2 uppercase whitespace-nowrap">
                  {item.name}
                </h3>

                {/* Link Indicator */}
                <div className="text-[#E0B4B8] hover:text-white text-[8px] md:text-[9px] font-semibold tracking-widest uppercase transition-colors duration-300 inline-flex items-center justify-center gap-1.5 group/btn">
                  <span className="relative">
                    SHOP NOW
                    <span className="absolute bottom-[-2px] left-0 w-full h-[1px] bg-[#E0B4B8] group-hover/btn:bg-white transition-colors duration-300" />
                  </span>
                  <span className="transform transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
