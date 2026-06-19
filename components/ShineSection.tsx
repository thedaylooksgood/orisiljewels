'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gem, ShieldCheck, Gift, Heart, ArrowRight } from 'lucide-react';

export function ShineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Collage Assembly Animation
      const elements = gsap.utils.toArray('.collage-item');

      gsap.from(elements, {
        scrollTrigger: {
          trigger: collageRef.current,
          start: 'top 85%',
          end: 'center center',
          scrub: 1.5,
        },
        y: (i) => (i % 2 === 0 ? 50 : -50),
        x: (i) => (i % 2 === 0 ? -20 : 20),
        opacity: 0,
        scale: 1.05,
        stagger: 0.05,
        ease: 'power2.out',
      });

      // 2. Text Content Reveal
      const textElements = gsap.utils.toArray('.text-reveal');

      gsap.from(textElements, {
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 85%',
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });

      // 3. Bottom Features Fade In
      const featureElements = gsap.utils.toArray('.feature-item');

      gsap.from(featureElements, {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 95%',
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#FFF6F7] py-12 lg:py-16 overflow-hidden relative select-none">

      <div className="max-w-[1320px] mx-auto px-4 md:px-8 relative z-10">

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">

          {/* ════════════════════════════════════════
              LEFT SIDE: EDITORIAL MASONRY COLLAGE
          ════════════════════════════════════════ */}
          <div ref={collageRef} className="lg:col-span-7 relative w-full flex justify-start items-center">

            <div className="relative w-full max-w-[700px] aspect-[1/1] sm:aspect-[1.2/1]">

              {/* 1. Vertical Text line on far left */}


              {/* 2. Top-Right Rectangle (Necklace) */}
              <div className="collage-item absolute top-[0%] right-[22%] w-[26%] h-[32%] z-20 bg-white border-[4px] border-white shadow-lg overflow-hidden">
                <Image src="/images/shine-necklace.png" alt="Necklace" fill className="object-cover object-top hover:scale-105 transition-transform duration-700" sizes="20vw" />
              </div>

              {/* 3. Timeless Card (Far Right) */}
              <div className="collage-item absolute top-[8%] right-[0%] w-[20%] h-[36%] z-10 bg-[#FFF3F4] border-[4px] border-white shadow-md flex flex-col items-center justify-center p-2 text-center">
                <span className="font-script text-[#C17F78] text-[22px] sm:text-[28px] leading-none mb-2">Timeless</span>
                <span className="text-[7px] sm:text-[8px] font-bold tracking-[0.2em] uppercase text-[#6D4C4E] leading-loose">Elegance<br />Perfectly<br />Yours</span>
                <div className="w-6 h-px bg-[#E0B4B8] my-2" />
                <Gem size={8} className="text-[#D38E93]" />
              </div>

              {/* 4. Main Ring (Center-Left) */}
              <div className="collage-item absolute top-[15%] left-[12%] w-[42%] h-[40%] z-20 bg-white border-[6px] border-white shadow-xl overflow-hidden">
                <Image src="/images/shine-main-ring.png" alt="Flower Ring" fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="30vw" priority />
              </div>

              {/* 5. Earrings (Middle Right) */}
              <div className="collage-item absolute top-[32%] right-[8%] w-[42%] h-[30%] z-30 bg-white border-[5px] border-white shadow-lg overflow-hidden">
                <Image src="/images/shine-earrings.png" alt="Earrings" fill className="object-cover object-center hover:scale-105 transition-transform duration-700" sizes="30vw" />
              </div>

              {/* 6. Model (Bottom Left) */}
              <div className="collage-item absolute bottom-[12%] left-[10%] w-[45%] h-[35%] z-10 bg-white border-[4px] border-white shadow-md overflow-hidden">
                <Image src="/images/shine-model.png" alt="Model" fill className="object-cover object-top hover:scale-105 transition-transform duration-700" sizes="30vw" />
              </div>

              {/* 7. Solitaire Ring (Bottom Right) */}
              <div className="collage-item absolute bottom-[0%] right-[15%] w-[42%] h-[42%] z-20 bg-white border-[6px] border-white shadow-xl overflow-hidden">
                <Image src="/images/shine-solitaire-ring.png" alt="Solitaire Ring" fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="30vw" />
              </div>

              {/* 8. Badge 925 */}
              <div className="collage-item absolute top-[42%] left-[0%] z-40 bg-white w-[22%] aspect-square shadow-[0_8px_20px_rgba(109,76,78,0.12)] flex flex-col items-center justify-center p-1">
                <span className="text-[20px] sm:text-[28px] font-bodoni text-[#C17F78] leading-none mb-1">925</span>
                <span className="text-[6px] sm:text-[8px] font-semibold tracking-[0.1em] text-slate-500 uppercase mb-1 sm:mb-2">Sterling Silver</span>
                <div className="w-8 h-px bg-[#E0B4B8]/40 mb-1" />
                <Gem size={8} className="text-[#C17F78]" />
              </div>

              {/* 9. Badge Crafted */}
              <div className="collage-item absolute bottom-[2%] right-[0%] z-40 bg-[#FFF6F7] w-[20%] aspect-square shadow-[0_8px_20px_rgba(109,76,78,0.12)] flex flex-col items-center justify-center p-2 text-center">
                <span className="text-[6px] sm:text-[8px] font-bold tracking-[0.15em] text-[#6D4C4E] uppercase leading-[1.8] mb-1 sm:mb-2">Crafted<br />With Love,<br />Made For<br />You</span>
                <div className="w-6 h-px bg-[#E0B4B8]/40 mb-1" />
                <Gem size={8} className="text-[#C17F78]" />
              </div>

            </div>
          </div>

          {/* ════════════════════════════════════════
              RIGHT SIDE: TEXT CONTENT
          ════════════════════════════════════════ */}
          <div ref={textRef} className="lg:col-span-5 flex flex-col items-start pl-0 lg:pl-6 w-full lg:ml-auto max-w-[500px]">

            <div className="text-reveal flex items-center space-x-2 mb-3">
              <span className="text-[#D38E93] text-[16px] leading-none">✦</span>
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#6D4C4E] font-sans">
                Our Story
              </span>
            </div>

            <div className="text-reveal font-script font-bold text-[#D38E93] text-[36px] lg:text-[44px] leading-none mb-2">
              Shine in Your Own Way
            </div>

            <h2 className="text-reveal text-[24px] md:text-[28px] lg:text-[32px] font-bodoni text-[#6D4C4E] uppercase font-bold leading-tight tracking-normal mb-6">
              More than just jewelry
            </h2>

            <p className="text-reveal text-[14px] leading-[1.7] text-slate-600 font-sans mb-8 max-w-full">
              Every piece is thoughtfully crafted in certified 925 sterling silver. From graceful anklets to radiant pendants, our jewelry is designed to enhance your natural glow and make you feel uniquely you.
            </p>

            <Link
              href="/about"
              className="text-reveal group flex items-center space-x-2 text-[#C17F78] hover:text-[#6D4C4E] text-[12px] font-bold tracking-[0.18em] uppercase transition-colors duration-300"
            >
              <span>Discover Our Journey</span>
              <ArrowRight size={16} className="transform group-hover:translate-x-1.5 transition-transform duration-300 text-[#C17F78] group-hover:text-[#6D4C4E]" />
            </Link>
          </div>
        </div>

        {/* ════════════════════════════════════════
              BOTTOM FEATURES RIBBON (Aligned to New Arrivals width)
          ════════════════════════════════════════ */}
        <div className="w-full border-y border-[#E0B4B8]/30 py-8 bg-white/20 relative z-10">
          <div ref={featuresRef} className="w-full grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center">

            <div className="feature-item group flex items-center space-x-4 cursor-pointer">
              <Gem className="text-[#C17F78] group-hover:text-[#6D4C4E] transition-colors shrink-0" strokeWidth={1.25} size={28} />
              <div className="text-left">
                <h4 className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-[#6D4C4E] mb-1">Premium Quality</h4>
                <p className="text-[10px] md:text-[11px] text-[#A05E63] font-medium leading-none">Finest materials.</p>
              </div>
            </div>

            <div className="feature-item group flex items-center space-x-4 cursor-pointer">
              <ShieldCheck className="text-[#C17F78] group-hover:text-[#6D4C4E] transition-colors shrink-0" strokeWidth={1.25} size={28} />
              <div className="text-left">
                <h4 className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-[#6D4C4E] mb-1">925 Silver</h4>
                <p className="text-[10px] md:text-[11px] text-[#A05E63] font-medium leading-none">Certified quality.</p>
              </div>
            </div>

            <div className="feature-item group flex items-center space-x-4 cursor-pointer">
              <Gift className="text-[#C17F78] group-hover:text-[#6D4C4E] transition-colors shrink-0" strokeWidth={1.25} size={28} />
              <div className="text-left">
                <h4 className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-[#6D4C4E] mb-1">Packaging</h4>
                <p className="text-[10px] md:text-[11px] text-[#A05E63] font-medium leading-none">Elegant boxes.</p>
              </div>
            </div>

            <div className="feature-item group flex items-center space-x-4 cursor-pointer">
              <Heart className="text-[#C17F78] group-hover:text-[#6D4C4E] transition-colors shrink-0" strokeWidth={1.25} size={28} />
              <div className="text-left">
                <h4 className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-[#6D4C4E] mb-1">Trusted</h4>
                <p className="text-[10px] md:text-[11px] text-[#A05E63] font-medium leading-none">1000+ happy clients.</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}