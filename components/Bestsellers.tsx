'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingBag, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  rating: number;
  reviews: number;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Dainty Flower Ring",
    category: "Signature Rings",
    price: "Rs. 2,250.00",
    image: "/home-page/our-collections/rings.png",
    rating: 5.0,
    reviews: 184,
    description: "18k gold plated floral design featuring a brilliant-cut cubic zirconia center. Crafted with pure 92.5 sterling silver base."
  },
  {
    id: 2,
    name: "Evil Eye Enamel Ring",
    category: "Enamel Rings",
    price: "Rs. 1,850.00",
    image: "/home-page/our-collections/evil-eye.png",
    rating: 4.8,
    reviews: 92,
    description: "Hand-painted navy enamel with a protective eye motif and a CZ sparkle, representing ancient protective symbolism."
  },
  {
    id: 3,
    name: "Twisted Gold Ring",
    category: "Gold Bands",
    price: "Rs. 2,250.00",
    image: "/home-page/our-collections/necklace.png",
    rating: 4.9,
    reviews: 115,
    description: "Minimalist twisted gold band featuring a brilliant-cut stone set in high-polish sterling silver."
  },
  {
    id: 4,
    name: "Minimal Solitaire",
    category: "Solitaire Rings",
    price: "Rs. 3,350.00",
    image: "/home-page/our-collections/bracelets.png",
    rating: 4.9,
    reviews: 78,
    description: "A classic eternity band dotted with subtle sparkle, crafted with premium grade sterling silver."
  },
  {
    id: 5,
    name: "Dainty Pearl Ring",
    category: "Pearl Rings",
    price: "Rs. 1,650.00",
    image: "/home-page/our-collections/earrings.png",
    rating: 4.7,
    reviews: 63,
    description: "Open cuff ring design featuring twin freshwater pearls with high-lustre finish."
  }
];

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

function SpotlightCard({ children, className = '', ...props }: SpotlightCardProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden group ${className}`}
      {...props}
    >
      {/* Spotlight overlay following cursor */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
        style={{
          background: `radial-gradient(280px circle at ${coords.x}px ${coords.y}px, rgba(193, 127, 120, 0.12), transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
}

export function Bestsellers() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [offset, setOffset] = useState<number>(55);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setOffset(30);
      } else if (window.innerWidth < 768) {
        setOffset(42);
      } else {
        setOffset(55);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % products.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <section className="w-full bg-[#FFF6F7] py-12 md:py-20 select-none overflow-hidden">
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8">
        
        {/* Main Columns */}
        <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Typography & Description (45% width) */}
          <div className="w-full lg:w-[45%] flex flex-col items-center lg:items-start text-center lg:text-left z-30">
            <span className="text-[#C17F78] text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-2 flex items-center gap-1.5 justify-center lg:justify-start">
              <span className="text-xs text-[#E0B4B8]">✦</span> Curated Bestsellers
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bodoni text-[#6D4C4E] uppercase font-bold tracking-wider leading-[1.1] mt-1">
              The Orisil<br/>Signature
            </h2>

            <div className="w-16 h-[1.5px] bg-[#E0B4B8] my-6 relative">
              <div className="absolute inset-0 flex items-center justify-center lg:justify-start">
                <span className="bg-[#FFF6F7] px-1 text-[8px] text-[#C17F78] absolute -top-1">✦</span>
              </div>
            </div>

            <p className="text-xs md:text-sm text-[#a37c76] leading-relaxed max-w-[340px] mb-8 font-sans">
              Experience the pinnacle of fine jewelry. Each piece in our curated bestseller collection represents pure 92.5 sterling silver craftsmanship finished with timeless luxury.
            </p>

            {/* Carousel Control Buttons & Indicators */}
            <div className="flex items-center gap-6">
              {/* Arrow Controls */}
              <div className="flex gap-2">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-[#E0B4B8]/30 hover:border-[#C17F78] hover:bg-[#FFF6F7] text-[#6D4C4E] flex items-center justify-center transition-all duration-300 cursor-pointer shadow-xs active:scale-95 animate-fade-in"
                  aria-label="Previous card"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-[#E0B4B8]/30 hover:border-[#C17F78] hover:bg-[#FFF6F7] text-[#6D4C4E] flex items-center justify-center transition-all duration-300 cursor-pointer shadow-xs active:scale-95 animate-fade-in"
                  aria-label="Next card"
                >
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Dots Indicators */}
              <div className="flex gap-1.5">
                {products.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                      activeIdx === idx ? 'w-6 bg-[#C17F78]' : 'w-1.5 bg-[#E0B4B8]/50'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 pt-6 border-t border-[#E0B4B8]/20 flex items-center gap-6 text-[10px] text-[#a37c76] font-medium tracking-wide uppercase">
              <span className="flex items-center gap-1">✦ BIS Hallmarked</span>
              <span className="flex items-center gap-1">✦ Free Insured Shipping</span>
            </div>
          </div>

          {/* RIGHT COLUMN: 3D Fanned Stack Viewport (55% width) */}
          <div className="w-full lg:w-[55%] flex items-center justify-center relative min-h-[420px] md:min-h-[480px]">
            {products.map((product, idx) => {
              const diff = (idx - activeIdx + products.length) % products.length;
              const isFront = diff === 0;
              const isRight = diff === 1;
              const isLeft = diff === products.length - 1; // index 4

              // Calculate fanning transformations
              let transformStyle = '';
              let opacity = 0;
              let zIndex = 0;

              if (isFront) {
                transformStyle = 'translate3d(0, 0, 0) scale(1) rotate(0deg)';
                opacity = 1;
                zIndex = 30;
              } else if (isRight) {
                transformStyle = `translate3d(${offset}px, 15px, 0) scale(0.92) rotate(6deg)`;
                opacity = 0.85;
                zIndex = 20;
              } else if (isLeft) {
                transformStyle = `translate3d(-${offset}px, 15px, 0) scale(0.92) rotate(-6deg)`;
                opacity = 0.85;
                zIndex = 20;
              } else {
                // Hidden cards (diff === 2 or diff === 3)
                transformStyle = 'translate3d(0, 40px, 0) scale(0.8) rotate(0deg)';
                opacity = 0;
                zIndex = 10;
              }

              const handleCardClick = () => {
                if (isRight) {
                  handleNext();
                } else if (isLeft) {
                  handlePrev();
                }
              };

              return (
                <div
                  key={product.id}
                  onClick={handleCardClick}
                  style={{
                    transform: transformStyle,
                    opacity: opacity,
                    zIndex: zIndex,
                    pointerEvents: (isFront || isRight || isLeft) ? 'auto' : 'none',
                    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className={`absolute w-[245px] sm:w-[310px] md:w-[325px] h-[340px] sm:h-[390px] md:h-[420px] bg-white rounded-2xl border border-[#E0B4B8]/30 shadow-[0_15px_35px_-8px_rgba(109,76,78,0.12)] overflow-hidden flex flex-col justify-between ${
                    isFront 
                      ? 'cursor-default' 
                      : (isRight || isLeft) 
                        ? 'cursor-pointer hover:border-[#C17F78]/50 hover:shadow-[0_20px_40px_-5px_rgba(109,76,78,0.18)]' 
                        : ''
                  }`}
                >
                  {/* Spotlight zoom wrapper */}
                  <SpotlightCard className="w-full h-full flex flex-col justify-between bg-white">
                    {/* Card Image */}
                    <div className="relative w-full h-[60%] bg-[#FFE9EC] overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 60vw, 30vw"
                        priority={isFront}
                      />
                      
                      {isFront && (
                        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-[#E0B4B8]/20 shadow-xs z-30">
                          <Sparkles size={9} className="text-[#C17F78] animate-pulse" />
                          <span className="text-[8px] md:text-[9px] font-bold text-[#6D4C4E] tracking-wider uppercase">Best Seller</span>
                        </div>
                      )}
                    </div>

                    {/* Card Content Details */}
                    <div className="h-[40%] p-5 md:p-6 flex flex-col justify-between bg-white select-none">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[8px] md:text-[9px] tracking-wider uppercase text-[#C17F78] font-bold">
                            {product.category}
                          </span>
                          {isFront && (
                            <div className="flex items-center gap-1 text-[10px] font-medium text-[#a37c76]">
                              <Star size={10} fill="currentColor" className="text-amber-400" />
                              <span className="font-semibold">{product.rating}</span>
                            </div>
                          )}
                        </div>
                        <h3 className="text-xs md:text-sm font-serif text-[#6D4C4E] font-bold leading-snug line-clamp-1 mt-1 group-hover:text-[#C17F78] transition-colors duration-300">
                          {product.name}
                        </h3>
                        {isFront && (
                          <p className="text-[10px] md:text-[11px] text-[#a37c76]/80 leading-relaxed font-sans line-clamp-2 mt-2">
                            {product.description}
                          </p>
                        )}
                      </div>

                      {/* Card Footer */}
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#E0B4B8]/20">
                        <span className="text-xs md:text-sm font-bold text-[#6D4C4E] font-sans">
                          {product.price}
                        </span>

                        {isFront ? (
                          <Link 
                            href={`/products?id=${product.id}`}
                            className="bg-[#6D4C4E] hover:bg-[#C17F78] text-white text-[9px] tracking-widest font-bold uppercase py-2 px-3.5 rounded-lg flex items-center gap-1.5 transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer hover:scale-103 z-30"
                          >
                            <ShoppingBag size={11} strokeWidth={2} />
                            <span>Shop Now</span>
                          </Link>
                        ) : (
                          <span className="text-[9px] tracking-wider uppercase text-[#C17F78] font-bold">
                            Click to View
                          </span>
                        )}
                      </div>
                    </div>
                  </SpotlightCard>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}