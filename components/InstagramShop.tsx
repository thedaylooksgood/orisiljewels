'use client';

import React from 'react';
import Image from 'next/image';
import {
  Heart, ArrowRight, ArrowLeft,
  ShoppingBag, MoreHorizontal, MessageCircle, Send, Bookmark
} from 'lucide-react';
import Link from 'next/link';

// ==========================================
// 🛠️ HARDCODED CONFIGURATION
// ==========================================
const SECTION_HEIGHT = 458;

const cards = [
  {
    id: 1,
    image: "/instagram shop/1.jpg",
    link: "/products?id=1",
    width: 194,
    height: "275px",
    rotation: 8,
    offsetX: -128,
    offsetY: 1,
    baseZIndex: 10,
    isHidden: false
  },
  {
    id: 2,
    image: "/instagram shop/2.jpg",
    title: "Playful Heart-Skull\nMotif Ring",
    price: "Rs. 2,200.00",
    link: "/products?id=2",
    width: 302,
    height: "339px",
    rotation: -3,
    offsetX: -15,
    offsetY: 0,
    baseZIndex: 30,
    isHidden: false
  },
  {
    id: 3,
    image: "/instagram shop/3.jpg",
    link: "/products?id=3",
    width: 215,
    height: "298px",
    rotation: -13,
    offsetX: 83,
    offsetY: 0,
    baseZIndex: 10,
    isHidden: false
  },
  {
    id: 4,
    image: "/instagram shop/4.jpg",
    link: "/products?id=4",
    width: 167,
    height: "226px",
    rotation: 6,
    offsetX: 179,
    offsetY: -4,
    baseZIndex: 4,
    isHidden: false
  }
];

export function InstagramShop() {
  return (
    <section
      className="relative w-full bg-[#fdf6f5] py-10 md:py-0 flex items-center overflow-hidden select-none"
      style={{ minHeight: `${SECTION_HEIGHT}px` }}
    >
      {/* Main Container */}
      <div className="w-full max-w-[1320px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between h-full relative" style={{ minHeight: `${SECTION_HEIGHT}px` }}>

        {/* LEFT COLUMN: Typography and Controls */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left z-40 md:w-[35%]">
          <div className="flex items-center space-x-3 mb-4 text-[#a37c76] text-xs font-semibold tracking-widest">
            <span className="w-8 h-[1px] bg-[#a37c76] hidden md:block"></span>
            <span>CONCEPT 03</span>
            <span className="w-8 h-[1px] bg-[#a37c76] md:hidden"></span>
          </div>

          <h2 className="text-[#4a3331] text-4xl md:text-5xl font-serif font-bold mb-4 leading-[1.1] tracking-wide">
            INSTAGRAM<br />SHOP
          </h2>

          <Heart className="text-[#a37c76] w-5 h-5 mb-4 font-light" strokeWidth={1} />

          <p className="text-[#a37c76] italic font-serif text-lg mb-8 max-w-[280px]">
            Straight from our feed to your cart. Tap. Love. Shop.
          </p>

          <Link href="/instagram-shop" className="flex items-center space-x-3 text-[#a37c76] font-medium text-xs tracking-widest cursor-pointer mb-10 group-hover:opacity-100">
            <span className="border-b border-[#a37c76] pb-1">DISCOVER MORE</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* RIGHT COLUMN: Fanned Cards */}
        <div className="relative w-full md:w-[65%] flex items-center justify-center mt-12 md:mt-0" style={{ height: `${SECTION_HEIGHT}px` }}>
          {cards.map((card) => {
            if (card.isHidden) return null;

            return (
              <Link
                key={card.id}
                href={card.link}
                className="absolute bg-white rounded-2xl shadow-xl border border-slate-100 transition-all duration-300 group flex flex-col overflow-hidden hover:scale-105 hover:z-[100]"
                style={{
                  width: `${card.width}px`,
                  height: card.height !== 'auto' ? card.height : undefined,
                  minHeight: card.height === 'auto' ? '300px' : undefined,
                  zIndex: card.baseZIndex,
                  transform: `translate(${card.offsetX}%, ${card.offsetY}%) rotate(${card.rotation}deg)`,
                }}
              >
                {/* 1. Instagram Post Header */}
                <div className="flex items-center justify-between px-3 py-2 bg-white z-10 shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full border border-[#d4a3a3] flex items-center justify-center text-[9px] text-[#d4a3a3] font-serif font-bold bg-[#fdf6f5]">
                      jz
                    </div>
                    <span className="text-[11px] font-semibold text-slate-800 tracking-tight">orisiljewels</span>
                  </div>
                  <MoreHorizontal size={14} className="text-slate-500" />
                </div>

                {/* 2. Post Image */}
                <div className="relative w-full flex-grow bg-slate-50 min-h-[150px]">
                  <Image src={card.image} alt={`Post ${card.id}`} fill className="object-cover" />

                  {/* Hover Shopping Bag Icon */}
                  <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/95 shadow-sm flex items-center justify-center text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ShoppingBag size={13} strokeWidth={2} />
                  </div>
                </div>

                {/* 3. Post Actions Footer */}
                <div className="flex items-center justify-between px-3 pt-2 pb-1 bg-white shrink-0">
                  <div className="flex items-center gap-3 text-slate-700">
                    <Heart size={16} className="hover:text-red-500 transition-colors cursor-pointer" />
                    <MessageCircle size={16} className="cursor-pointer hover:text-slate-900" />
                    <Send size={16} className="cursor-pointer hover:text-slate-900" />
                  </div>
                  <Bookmark size={16} className="text-slate-700 cursor-pointer hover:text-slate-900" />
                </div>

                {/* 4. Optional Caption (Title & Price) */}
                {(card.title || card.price) && (
                  <div className="px-3 pb-3 pt-1 text-[11px] text-slate-800 bg-white shrink-0 leading-snug">
                    <span className="font-bold mr-1">orisiljewels</span>
                    {card.title && <span className="whitespace-pre-line">{card.title} </span>}
                    {card.price && (
                      <div className="mt-1 flex items-center justify-between">
                        <span className="font-bold text-black">{card.price}</span>
                      </div>
                    )}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}