'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface CollectionItem {
  id: number;
  name: string;
  image: string;
  link: string;
}

const collections: CollectionItem[] = [
  {
    id: 1,
    name: "Evil Eye Collection",
    image: "/Our Collections/1.png",
    link: "/collections/evil-eye",
  },
  {
    id: 2,
    name: "Rings",
    image: "/Our Collections/2.png",
    link: "/collections/rings",
  },
  {
    id: 3,
    name: "Earrings",
    image: "/Our Collections/3.png",
    link: "/collections/earrings",
  },
  {
    id: 4,
    name: "Bracelets",
    image: "/Our Collections/4.png",
    link: "/collections/bracelets",
  },
  {
    id: 5,
    name: "Necklaces/Pendants",
    image: "/Our Collections/5.png",
    link: "/collections/necklaces-pendants",
  },
];

export function OurCollections() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.6; // Scroll 60% of the visible container width
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="w-full bg-white py-16 px-4 md:px-8 relative select-none">
      {/* Title & Subtitle */}
      <div className="text-center mb-12">
        <h2 className="text-[#2a1733] text-2xl md:text-3xl font-bold tracking-[0.2em] uppercase mb-3">
          Our Collections
        </h2>
        <p className="text-slate-500 text-xs md:text-sm tracking-wider font-light">
          Handcrafted jewelry to make every moment sparkle.
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative max-w-7xl mx-auto flex items-center group/nav">
        {/* Left Arrow Button */}
        <button
          onClick={() => scroll('left')}
          className="absolute -left-2 md:-left-4 z-10 p-2 text-gray-500 hover:text-[#2a1733] transition-colors duration-300 bg-white/85 hover:bg-white border border-gray-200/80 shadow-md rounded-full md:opacity-0 group-hover/nav:opacity-100 focus:outline-none cursor-pointer"
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} strokeWidth={1.5} />
        </button>

        {/* Scrollable Area */}
        <div
          ref={scrollContainerRef}
          className="w-full flex overflow-x-auto gap-6 md:gap-8 py-4 scroll-smooth scrollbar-none snap-x snap-mandatory justify-start md:justify-center"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {collections.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className="flex-none w-[200px] md:w-[220px] flex flex-col items-center group snap-center"
            >
              {/* Image Container */}
              {/* Note: We do not add rounded-full, border, or black background circles here because the source PNG images already include the black circle baked in. */}
              <div className="w-full aspect-square overflow-hidden transform transition-transform duration-500 ease-out group-hover:scale-105">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={220}
                  height={220}
                  priority={item.id === 1}
                  className="w-full h-full object-contain pointer-events-none"
                />
              </div>

              {/* Title label */}
              <span className="mt-4 text-xs md:text-sm font-semibold tracking-wider text-slate-700 group-hover:text-[#2a1733] text-center transition-colors duration-300">
                {item.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => scroll('right')}
          className="absolute -right-2 md:-right-4 z-10 p-2 text-gray-500 hover:text-[#2a1733] transition-colors duration-300 bg-white/85 hover:bg-white border border-gray-200/80 shadow-md rounded-full md:opacity-0 group-hover/nav:opacity-100 focus:outline-none cursor-pointer"
          aria-label="Scroll right"
        >
          <ChevronRight size={24} strokeWidth={1.5} />
        </button>
      </div>
    </section>
  );
}
