'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

const taglineText = "A lifetime of beautiful moments.";
const taglineLetters = Array.from(taglineText);

const bannerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const bgImageVariants: Variants = {
  hidden: { scale: 1.12, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const taglineContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.035,
    },
  },
};

const taglineLetterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 4,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 18,
      stiffness: 140,
    },
  },
};

export function Banner() {
  return (
    <section className="w-full relative bg-[#FFF6F7] overflow-hidden select-none h-[350px] max-h-[350px] flex flex-col justify-center">
      {/* Background Image Container */}
      <motion.div
        variants={bgImageVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 w-full h-full z-0"
      >
        <Image
          src="/home-page/banners/1.png"
          alt="Elegance That Lasts"
          fill
          priority
          className="object-cover"
        />
        {/* Soft elegant overlay to ensure luxury text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFF6F7]/50 via-[#FFF6F7]/25 to-transparent md:from-[#FFF6F7]/70 md:via-[#FFF6F7]/35 md:to-transparent" />
      </motion.div>

      {/* Main Container */}
      <motion.div
        variants={bannerContainerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full h-full z-10"
      >
        <div className="w-full max-w-[1320px] mx-auto h-full grid grid-cols-1 md:grid-cols-2 items-center px-4 md:px-8 py-8 md:py-0 gap-8 md:gap-6">
          {/* Left Column: Text Content */}
          <div className="flex flex-col justify-center max-w-xl mx-auto md:mx-0 text-center md:text-left">
            {/* Heading */}
            <motion.h1
              variants={fadeUpVariants}
              className="font-bodoni text-3xl sm:text-4xl md:text-[40px] lg:text-[46px] text-text-dark font-medium leading-[1.15] mb-1"
            >
              Elegance That Lasts
            </motion.h1>

            {/* Calligraphic Script Tagline with Sequential Character Reveal */}
            <motion.div
              variants={taglineContainerVariants}
              className="font-script text-[#D38E93] font-bold text-[32px] sm:text-[36px] md:text-[40px] lg:text-[46px] leading-none mb-4 md:mb-5"
            >
              {taglineLetters.map((char, index) => (
                <motion.span
                  key={index}
                  variants={taglineLetterVariants}
                  style={{ display: 'inline-block' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeUpVariants}
              className="text-xs sm:text-sm text-black/70 font-light leading-relaxed mb-5 md:mb-6 max-w-md"
            >
              Handcrafted fine jewelry designed to celebrate your story, your style, and every romantic milestone. Discover our signature rose gold and sterling silver collections.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-wrap gap-3 md:gap-4 justify-center md:justify-start font-raleway font-bold text-[9px] md:text-[10px] tracking-widest"
            >
              <Link
                href="/products"
                className="bg-cta-primary border border-cta-primary text-[#FFF6F7] hover:bg-transparent hover:text-cta-primary px-6 py-2.5 md:px-8 md:py-3 rounded-lg shadow-[0_4px_15px_rgba(193,127,120,0.2)] hover:translate-y-[-2px] transition-all duration-300 uppercase"
              >
                EXPLORE COLLECTION
              </Link>
              <Link
                href="/about"
                className="bg-transparent border border-cta-primary text-cta-primary hover:bg-cta-primary hover:text-[#FFF6F7] px-6 py-2.5 md:px-8 md:py-3 rounded-lg hover:translate-y-[-2px] transition-all duration-300 uppercase"
              >
                DISCOVER MORE
              </Link>
            </motion.div>
          </div>

          {/* Empty Right Column to let the background image shine through on desktop */}
          <div className="hidden md:block" />
        </div>
      </motion.div>
    </section>
  );
}
