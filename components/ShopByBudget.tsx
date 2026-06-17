'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface BudgetTier {
  id: number;
  label: string;
  amount: string;
  link: string;
}

const budgetTiers: BudgetTier[] = [
  {
    id: 1,
    label: "UNDER",
    amount: "₹999",
    link: "/products?maxPrice=999",
  },
  {
    id: 2,
    label: "UNDER",
    amount: "₹1499",
    link: "/products?maxPrice=1499",
  },
  {
    id: 3,
    label: "UNDER",
    amount: "₹1999",
    link: "/products?maxPrice=1999",
  },
  {
    id: 4,
    label: "UNDER",
    amount: "₹2499",
    link: "/products?maxPrice=2499",
  },
  {
    id: 5,
    label: "UNDER",
    amount: "₹2999",
    link: "/products?maxPrice=2999",
  },
  {
    id: 6,
    label: "ABOVE",
    amount: "₹3000",
    link: "/products?minPrice=3000",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 15,
    },
  },
};

export function ShopByBudget() {
  return (
    <section className="w-full bg-[#FFF6F7] pt-12 pb-16 px-4 md:px-8 select-none relative overflow-hidden">

      {/* Luxurious Silk Background Texture Overlay */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-40 pointer-events-none">
        <Image
          src="/budget_bg.png"
          alt="Luxury silk background texture"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Decorative Background Sparkles */}
      <div className="absolute top-12 left-[12%] text-[#E0B4B8]/40 text-xl hidden md:block select-none pointer-events-none z-10 animate-pulse">✦</div>
      <div className="absolute bottom-12 right-[12%] text-[#C17F78]/30 text-2xl hidden md:block select-none pointer-events-none z-10 animate-pulse">✦</div>
      <div className="absolute top-24 right-[15%] text-[#E0B4B8]/30 text-sm hidden md:block select-none pointer-events-none z-10 animate-pulse">✦</div>
      <div className="absolute bottom-24 left-[15%] text-[#C17F78]/20 text-lg hidden md:block select-none pointer-events-none z-10 animate-pulse">✦</div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Section Heading & Taglines */}
        <div className="text-center flex flex-col items-center mb-10">
          {/* Top Tagline */}
          <p className="font-script font-bold text-[30px] md:text-[34px] lg:text-[38px] text-[#D38E93] leading-none mb-1 select-none">
            Elegance within reach
          </p>

          {/* Top Divider */}
          <div className="flex items-center justify-center gap-3 mb-2.5">
            <div className="w-12 md:w-16 h-[0.5px] bg-[#C17F78]/25" />
            <div className="w-1.5 h-1.5 border border-[#C89B95]/80 rotate-45 bg-[#FFF6F7]" />
            <div className="w-12 md:w-16 h-[0.5px] bg-[#C17F78]/25" />
          </div>

          {/* Main Section Heading */}
          <h2 className="font-bodoni text-lg md:text-xl lg:text-[22px] text-[#6D4C4E] font-bold tracking-[0.25em] uppercase mb-2">
            Shop By Budget
          </h2>

          {/* Bottom Diamond Divider */}
          <div className="w-1.5 h-1.5 border border-[#C17F78] rotate-45 bg-[#C17F78]" />
        </div>

        {/* Budget Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 justify-items-center max-w-[1100px] mx-auto px-2"
        >
          {budgetTiers.map((tier) => (
            <motion.div
              key={tier.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="relative group w-[135px] h-[155px] md:w-[145px] md:h-[165px] z-10 flex"
            >
              {/* Glow effect behind the card (acting as a light projection on silk backdrop) */}
              <div className="absolute inset-0 -z-10 bg-[#E0B4B8]/25 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 pointer-events-none" />

              <Link
                href={tier.link}
                className="relative w-full h-full border-2 border-[#E0B4B8]/40 group-hover:border-[#C17F78] rounded-2xl flex flex-col items-center justify-between py-5 px-3 bg-white transition-all duration-300 shadow-[0_10px_35px_-5px_rgba(109,76,78,0.08),0_4px_12px_-3px_rgba(224,180,184,0.15)] group-hover:shadow-[0_20px_45px_-12px_rgba(109,76,78,0.22),0_10px_20px_-5px_rgba(224,180,184,0.3)] cursor-pointer overflow-hidden flex-1"
              >
                {/* Framer motion shimmer shine sweep effect */}
                <motion.div
                  className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full pointer-events-none"
                  whileHover={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />

                {/* Inner frame overlay */}
                <div className="absolute inset-1.5 border border-transparent group-hover:border-[#E0B4B8]/20 rounded-[10px] transition-all duration-300 pointer-events-none" />

                {/* Card Content Layout */}
                <div className="flex flex-col items-center justify-between h-full w-full">
                  {/* Top Label (UNDER / ABOVE) */}
                  <span className="text-[9px] md:text-[10px] font-sans font-bold tracking-[0.25em] text-[#D38E93] group-hover:text-[#C17F78] transition-colors duration-300 uppercase">
                    {tier.label}
                  </span>

                  {/* Divider line */}
                  <div className="w-5 h-[1.5px] bg-[#E0B4B8]/60 my-1 group-hover:w-10 group-hover:bg-[#C17F78] transition-all duration-300" />

                  {/* Middle Text (Price Value) */}
                  <span className="text-[22px] md:text-[25px] font-bodoni font-bold text-[#6D4C4E] group-hover:scale-105 transition-transform duration-300 tracking-wide leading-none my-auto">
                    {tier.amount}
                  </span>

                  {/* Arrow Circle Indicator */}
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-[#E0B4B8]/40 bg-[#FFF6F7] text-[#C17F78] flex items-center justify-center group-hover:bg-[#C17F78] group-hover:border-[#C17F78] group-hover:text-white transition-all duration-300 shadow-sm">
                    <ArrowRight size={13} className="transform group-hover:translate-x-0.5 transition-transform duration-300" strokeWidth={2.5} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
