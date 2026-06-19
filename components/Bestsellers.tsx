'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  ShoppingBag,
  Sliders,
  Eye,
  Copy,
  Check
} from 'lucide-react';

interface InteractiveProduct {
  id: number;
  name: string;
  price: string;
  image: string;
  x: number;       // left percentage (0 - 100) inside 1320px container
  y: number;       // top percentage (0 - 100) inside 1320px container
  popDelay: string;
  isHero?: boolean;
  labelPosition: 'right' | 'bottom-right' | 'left' | 'top-left';
  podiumColor: 'white' | 'pink' | 'gold' | 'mint' | 'dark';
}

export function Bestsellers() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeDragIndex, setActiveDragIndex] = useState<number | null>(null);
  
  const canvasRef = useRef<HTMLDivElement>(null);

  // Position percentage values relative to the 1320px container
  const [products, setProducts] = useState<InteractiveProduct[]>([
    {
      id: 1,
      name: "Pastel Multi-Stone Ring",
      price: "Rs. 1,400.00",
      image: "/best sellers/1.jpg",
      x: 12.5, y: 65.0,
      popDelay: "0.8s",
      labelPosition: "bottom-right",
      podiumColor: "pink"
    },
    {
      id: 2,
      name: "Floral Vine Ring",
      price: "Rs. 1,499.00",
      image: "/best sellers/2.jpg",
      x: 20.0, y: 32.0,
      popDelay: "1.8s",
      labelPosition: "right",
      podiumColor: "white"
    },
    {
      id: 3,
      name: "Playful Heart-Skull\nMotif Ring",
      price: "Rs. 2,200.00",
      image: "/best sellers/3.jpg",
      x: 50.5, y: 56.0,
      isHero: true,
      popDelay: "3.2s",
      labelPosition: "right",
      podiumColor: "pink"
    },
    {
      id: 4,
      name: "Gold-Finished Ring",
      price: "Rs. 3,100.00",
      image: "/best sellers/4.png",
      x: 70.0, y: 32.0,
      popDelay: "4.5s",
      labelPosition: "right",
      podiumColor: "pink"
    },
    {
      id: 5,
      name: "Enamel Silver Ring",
      price: "Rs. 1,300.00",
      image: "/best sellers/5.png",
      x: 88.0, y: 51.0,
      popDelay: "5.5s",
      labelPosition: "right",
      podiumColor: "white"
    },
    {
      id: 6,
      name: "Minimalist Solitaire Ring",
      price: "Rs. 2,950.00",
      image: "/best sellers/6.png",
      x: 84.5, y: 78.0,
      popDelay: "6.5s",
      labelPosition: "right",
      podiumColor: "pink"
    }
  ]);

  const handleCanvasMouseDown = (e: React.MouseEvent, index: number) => {
    if (!isEditMode) return;
    e.stopPropagation();
    setActiveDragIndex(index);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current || !isEditMode || activeDragIndex === null) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const pctX = parseFloat((((e.clientX - rect.left) / rect.width) * 100).toFixed(2));
    const pctY = parseFloat((((e.clientY - rect.top) / rect.height) * 100).toFixed(2));

    setProducts((prev) =>
      prev.map((item, idx) => {
        if (idx !== activeDragIndex) return item;
        return {
          ...item,
          x: Math.max(0, Math.min(100, pctX)),
          y: Math.max(0, Math.min(100, pctY)),
        };
      })
    );
  };

  const stopDragging = () => {
    setActiveDragIndex(null);
  };

  const handleCopyConfig = () => {
    const codeOutput = `// Paste this coordinates config into Bestsellers.tsx!\n${JSON.stringify(products, null, 2)}`;
    navigator.clipboard.writeText(codeOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative w-full h-[820px] select-none font-sans overflow-hidden bg-white">
      
      {/* BACKGROUND IMAGE Layer 1: Full-width outer background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/home-page/best-sellers/bestsellers-bg.png"
          alt="Bestsellers Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* LUXURY POP ANIMATION ENGINES */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes luxuryPop {
          0% { opacity: 0; transform: scale(0.6) translateY(20px); }
          70% { transform: scale(1.05) translateY(-4px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .staggered-pop {
          opacity: ${isEditMode ? '1' : '0'};
          ${!isEditMode ? `animation: luxuryPop 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;` : ''}
        }
      `}} />

      {/* DRAG-AND-DROP COORDINATES SNIPPET TOOLBAR */}
      <div className="absolute top-4 left-6 z-30 flex items-center gap-3">
        <button
          onClick={() => setIsEditMode(!isEditMode)}
          className={`flex items-center gap-2 text-xs font-bold tracking-wider uppercase px-4 py-2.5 rounded-full border transition-all shadow-md ${
            isEditMode 
              ? 'bg-amber-600 border-amber-600 text-white hover:bg-amber-500' 
              : 'bg-white border-[#EFE5E3] text-[#4A2E2B] hover:bg-neutral-50'
          }`}
        >
          <Sliders size={14} />
          {isEditMode ? "Lock Coordinates" : "Drag Coordinates"}
        </button>

        {isEditMode && (
          <button
            onClick={handleCopyConfig}
            className="flex items-center gap-2 text-xs font-bold tracking-wider bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-full shadow-md transition-colors"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied!" : "Copy Array"}
          </button>
        )}
      </div>

      {/* HEADER SECTION (Centered within site width 1320px) */}
      <div className="w-full max-w-[1320px] mx-auto px-4 flex justify-between items-center z-20 relative pt-12">
        <div className="flex flex-col">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#4A2E2B]">
            Premium Spotlight
          </span>
        </div>

        <div className="text-center flex flex-col items-center">
          <h2 className="text-[#4A2E2B] text-4xl lg:text-5xl tracking-wide uppercase mb-2 font-serif" style={{ fontFamily: 'Cinzel, Georgia, serif' }}>
            Our Bestsellers
          </h2>
          <div className="flex items-center gap-3 text-base lg:text-lg italic tracking-wide font-serif text-[#C89694]">
            <span>Handpicked pieces, just for you.</span>
            <span className="w-1.5 h-1.5 rotate-45 border border-[#C89694] block bg-[#C89694]"></span>
          </div>
        </div>

        <button className="text-xs font-bold tracking-widest uppercase flex items-center gap-2 group text-[#4A2E2B] hover:text-black">
          View All Collection
          <div className="w-8 h-8 rounded-full border border-[#4A2E2B] flex items-center justify-center transition-all duration-300 group-hover:bg-[#4A2E2B] group-hover:text-white">
            <ArrowRight size={14} />
          </div>
        </button>
      </div>

      {/* Layer 2: Transparent Inner container locked to 1320px width */}
      <div
        ref={canvasRef}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        className={`w-full max-w-[1320px] h-[640px] mx-auto relative z-10 transition-all ${
          isEditMode ? 'border border-dashed border-amber-500/50 bg-neutral-900/5' : ''
        }`}
      >
        {/* Transparent dotted path map background */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <Image
            src="/home-page/best-sellers/nodes.png"
            alt="Dotted Line Path"
            fill
            priority
            className="object-contain"
          />
        </div>

        {/* INTERACTIVE PRODUCT EMBEDDED PODIUMS & CARDS */}
        {products.map((product, idx) => (
          <div
            key={product.id}
            className="absolute staggered-pop"
            style={{
              left: `${product.x}%`,
              top: `${product.y}%`,
              animationDelay: product.popDelay,
              transform: 'translate(-50%, -50%)',
              zIndex: product.isHero ? 20 : 10,
              pointerEvents: 'auto'
            }}
          >
            {product.isHero ? (
              /* HERO SPOTLIGHT RING */
              <div 
                className="relative flex items-center justify-center"
                onMouseDown={(e) => handleCanvasMouseDown(e, idx)}
              >
                <div className="absolute w-[360px] h-[360px] bg-white/20 rounded-full pointer-events-none -z-10 blur-lg" />
                <div className="absolute w-[290px] h-[290px] border border-white/30 rounded-full pointer-events-none -z-10" />

                {/* Main Podium */}
                <div className="relative w-[220px] h-[220px] rounded-full shadow-[0_25px_50px_rgba(0,0,0,0.15)] p-2 group cursor-pointer transition-all duration-500 hover:scale-105 bg-gradient-to-b from-[#FADCDA] to-[#E3B3B1]">
                  <div className="w-full h-full rounded-full bg-gradient-to-b from-white/40 to-transparent absolute inset-0 border border-white/60" />
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-6 drop-shadow-[0_20px_35px_rgba(0,0,0,0.2)]"
                    />
                  </div>
                </div>

                {/* Card Info Box */}
                <div className="absolute left-[88%] bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-white/70 min-w-[210px] flex flex-col items-start z-20">
                  <span className="text-[10px] font-bold tracking-widest text-[#4A2E2B] bg-[#FBEBEA] px-2.5 py-1 rounded mb-3 uppercase flex items-center gap-1">
                    ★ Hero Spotlight
                  </span>
                  <h3 className="text-[#3A2A28] text-sm font-medium leading-snug mb-2 whitespace-pre-line">
                    {product.name}
                  </h3>
                  <span className="text-[#4A2E2B] text-base font-bold mb-4">
                    {product.price}
                  </span>
                  <button className="w-10 h-10 bg-[#BC8A88] hover:bg-[#4A2E2B] text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer hover:shadow-md">
                    <ShoppingBag size={16} />
                  </button>
                </div>
              </div>
            ) : (
              /* SATELLITE RINGS */
              <div 
                className="relative flex items-center group cursor-pointer"
                onMouseDown={(e) => handleCanvasMouseDown(e, idx)}
              >
                {/* Standard Center Node Dot */}
                <div className="absolute w-2.5 h-2.5 rounded-full shadow-[0_0_8px_rgba(255,255,255,1)] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white" />

                {/* Standard Base Podium */}
                <div className={`
                  relative w-[110px] h-[110px] rounded-full shadow-[0_12px_28px_rgba(0,0,0,0.1)] p-1.5 transition-transform duration-500 group-hover:-translate-y-2.5 z-10 bg-white
                `}>
                  <div className="w-full h-full rounded-full bg-gradient-to-b from-white/50 to-transparent absolute inset-0 border border-white/30" />
                  <div className="relative w-full h-full rounded-full">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-2.5 drop-shadow-[0_10px_15px_rgba(0,0,0,0.12)]"
                    />
                  </div>
                </div>

                {/* Floating Side Text Label */}
                <div className={`
                  absolute whitespace-nowrap flex flex-col gap-1 z-30 transition-all duration-300
                  ${product.labelPosition === 'bottom-right' ? 'left-[80%] top-[80%]' : ''}
                  ${product.labelPosition === 'right' ? 'left-[112%] top-1/2 -translate-y-1/2' : ''}
                  ${product.labelPosition === 'left' ? 'right-[112%] top-1/2 -translate-y-1/2 text-right items-end' : ''}
                  ${product.labelPosition === 'top-left' ? 'right-[80%] bottom-[80%] text-right items-end' : ''}
                `}>
                  <h3 className="font-medium text-xs tracking-wide text-[#5A4543]">
                    {product.name}
                  </h3>
                  <span className="font-bold text-sm text-[#1A1A1A]">
                    {product.price}
                  </span>
                  <button className="w-6 h-6 rounded-full border border-[#D9BCBA] text-[#A67C7A] flex items-center justify-center bg-white/40 mt-1 transition-all duration-300 hover:bg-[#4A2E2B] hover:text-white hover:border-[#4A2E2B]">
                    <Plus size={12} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* TIMELINE / DOTS */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
          <div className="w-2.5 h-2.5 rounded-full shadow-sm bg-[#4A2E2B]"></div>
          <div className="w-2 h-2 rounded-full bg-[#EAD4D2]"></div>
          <div className="w-2 h-2 rounded-full bg-[#EAD4D2]"></div>
          <div className="w-2 h-2 rounded-full bg-[#EAD4D2]"></div>
          <div className="w-2 h-2 rounded-full bg-[#EAD4D2]"></div>
        </div>

        {/* BOTTOM NAVIGATION ARROWS */}
        <div className="absolute bottom-6 left-12 flex items-center gap-4 z-20">
          <button className="w-11 h-11 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.04)] border flex items-center justify-center transition-all duration-300 bg-white text-[#4A2E2B] border-[#EFE5E3] hover:bg-[#4A2E2B] hover:text-white">
            <ArrowLeft size={16} />
          </button>
          <button className="w-11 h-11 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.04)] border flex items-center justify-center transition-all duration-300 bg-white text-[#4A2E2B] border-[#EFE5E3] hover:bg-[#4A2E2B] hover:text-white">
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}