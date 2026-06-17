'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Plus, ShoppingBag } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

// Reused images from /home-page/our-collections folder
const products: Product[] = [
  {
    id: 1,
    name: "Dainty Flower Ring",
    description: "18k gold plated floral design with cubic zirconia center.",
    price: "Rs. 2,250.00",
    image: "/home-page/our-collections/rings.png",
  },
  {
    id: 2,
    name: "Evil Eye Enamel Ring",
    description: "Hand-painted navy enamel with a protective eye motif.",
    price: "Rs. 1,850.00",
    image: "/home-page/our-collections/evil-eye.png",
  },
  {
    id: 3,
    name: "Twisted Gold Ring",
    description: "Minimalist twisted band featuring a brilliant-cut stone.",
    price: "Rs. 2,250.00",
    image: "/home-page/our-collections/necklace.png",
  },
  {
    id: 4,
    name: "Minimal Solitaire",
    description: "Classic eternity band dotted with subtle sparkle.",
    price: "Rs. 3,350.00",
    image: "/home-page/our-collections/bracelets.png",
  },
  {
    id: 5,
    name: "Dainty Pearl Ring",
    description: "Open cuff design featuring twin freshwater pearls.",
    price: "Rs. 1,650.00",
    image: "/home-page/our-collections/earrings.png",
  },
];

export default function ExpandingArrivals() {
  return (
    <section className="w-full flex flex-col lg:flex-row h-[320px] rounded-none bg-white border-y-4 border-white shadow-sm select-none ">

      {/* Left Side: Static Intro Section */}
      <div className="flex-none w-full lg:w-[300px] p-4 lg:p-8 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[#E0B4B8]/30 bg-[#FFF6F7] rounded-none">
        <div className="flex flex-col items-start">
          {/* Decorative Sparkle */}
          <span className="text-[#D38E93] text-lg leading-none mb-1">✦</span>

          <span className="font-script font-bold text-[#D38E93] text-[30px] lg:text-[34px] leading-none mb-1">
            Just Landed
          </span>

          <h2 className="text-xl md:text-[22px] lg:text-[24px] font-bodoni text-[#6D4C4E] uppercase font-bold leading-tight tracking-normal mb-4 lg:mb-6">
            New Arrivals
          </h2>

          <button className="group flex items-center space-x-2 text-[#C17F78] hover:text-[#6D4C4E] text-xs font-semibold tracking-[0.18em] uppercase transition-colors duration-300 rounded-none">
            <span>Explore All</span>
            <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform duration-300 text-[#C17F78] group-hover:text-[#6D4C4E]" />
          </button>
        </div>
      </div>

      {/* Right Side: Expanding Accordion Row */}
      <div className="flex-1 flex w-full h-full overflow-hidden rounded-none">
        {products.map((product, index) => (
          <div
            key={product.id}
            // The flex-1 makes them equal initially. hover:flex-[2.5] makes the hovered one expand, automatically shrinking the others.
            className="group relative flex-1 hover:flex-[2.5] transition-all duration-500 ease-in-out cursor-pointer overflow-hidden border-r border-[#E0B4B8]/25 last:border-r-0 rounded-none bg-[#FFE9EC]"
          >
            {/* Product Image */}
            <div className="absolute inset-0 w-full h-full rounded-none">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover object-center transform transition-transform duration-700 group-hover:scale-105 rounded-none"
                sizes="(max-width: 768px) 20vw, 15vw"
              />
            </div>

            {/* Top Right Plus Button (Always visible) */}
            <div className="absolute top-4 right-4 z-20 w-6 h-6 rounded-full border border-[#E0B4B8]/30 bg-white/30 backdrop-blur-sm flex items-center justify-center text-[#6D4C4E] transition-colors group-hover:bg-white group-hover:border-white">
              <Plus size={12} strokeWidth={1.5} />
            </div>

            {/* Bottom Overlay: Fades in and slides slightly up on hover */}
            <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-[#6D4C4E]/90 via-[#6D4C4E]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-5 rounded-none translate-y-4 group-hover:translate-y-0">

              <div className="flex justify-between items-end w-full whitespace-nowrap min-w-[200px]">
                {/* Text Content */}
                <div className="flex flex-col overflow-hidden">
                  <h3 className="text-white text-sm md:text-base font-playfair font-semibold tracking-wide truncate pr-4">
                    {product.name}
                  </h3>

                  {/* Description - explicitly hidden until expanded to prevent text wrap layout breaking */}
                  <p className="text-white/70 text-[11px] font-sans mt-1 mb-2 truncate pr-4 hidden group-hover:block transition-all delay-100">
                    {product.description}
                  </p>

                  <span className="text-[#E0B4B8] text-xs md:text-sm font-medium mt-1">
                    {product.price}
                  </span>
                </div>

                {/* Shopping Bag Button */}
                <button className="flex-none w-8 h-8 md:w-10 md:h-10 bg-[#C17F78] hover:bg-[#6D4C4E] transition-colors duration-300 flex items-center justify-center text-white shrink-0 rounded-none">
                  <ShoppingBag size={16} strokeWidth={1.5} />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}