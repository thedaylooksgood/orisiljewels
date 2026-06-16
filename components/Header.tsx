import React from 'react';
import { Phone, Mail, MessageCircle, Search, User, Heart, ShoppingBag, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const Facebook = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const Instagram = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Youtube = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const categories = [
  "Rings",
  "Earrings",
  "Bracelets",
  "Necklaces/Pendants",
  "Ladies Anklets",
  "Toe Rings",
  "Ladies Chains",
  "Men's Rings",
  "Men's Chains",
  "Kids Silver Jewellery",
  "Evil Eye Collection"
];

export function Header() {
  return (
    <header className="w-full flex flex-col font-sans">
      {/* Top Bar */}
      <div className="w-full bg-[#2a1733] text-white text-[11px] py-1 px-6 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Phone size={13} className="opacity-80" />
            <span className="opacity-90 tracking-wide">+91 89888 18882</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail size={13} className="opacity-80" />
            <span className="opacity-90 tracking-wide">orisiljewels@gmail.com</span>
          </div>
        </div>
        <div className="font-semibold tracking-widest text-[10px] uppercase opacity-90">
          FREE SHIPPING
        </div>
        <div className="flex items-center space-x-5">
          <Facebook size={13} className="hover:text-gray-300 cursor-pointer opacity-80 transition-opacity hover:opacity-100" />
          <Instagram size={13} className="hover:text-gray-300 cursor-pointer opacity-80 transition-opacity hover:opacity-100" />
          <Youtube size={13} className="hover:text-gray-300 cursor-pointer opacity-80 transition-opacity hover:opacity-100" />
          <MessageCircle size={13} className="hover:text-gray-300 cursor-pointer opacity-80 transition-opacity hover:opacity-100" />
        </div>
      </div>

      {/* Main Navbar */}
      <div className="w-full bg-black text-white px-8 py-3 flex justify-between items-center sticky top-0 z-40 shadow-sm border-b border-white/10">
        {/* Logo */}
        <Link href="/" className="flex items-center cursor-pointer hover:opacity-90 transition-opacity">
          <Image
            src="/logo.png"
            alt="Orisil Jewels Logo"
            width={160}
            height={48}
            className="h-12 w-auto object-contain brightness-0 invert"
          />
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center space-x-8 text-[12px] font-bold tracking-widest">
          <Link href="/" className="hover:text-gray-300 transition-colors">HOME</Link>
          
          {/* ALL PRODUCTS Category Dropdown */}
          <div className="relative group py-2">
            <Link href="/products" className="flex items-center hover:text-gray-300 transition-colors py-1">
              ALL PRODUCTS <ChevronDown size={14} className="ml-1 opacity-70 group-hover:rotate-180 transition-transform duration-300" strokeWidth={3} />
            </Link>
            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="bg-[#111111] border border-white/10 shadow-2xl rounded-md overflow-hidden py-1.5 backdrop-blur-md bg-opacity-95">
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/products?category=${encodeURIComponent(cat)}`}
                    className="block px-5 py-2.5 text-[10px] text-gray-300 hover:text-white hover:bg-white/5 transition-colors font-semibold tracking-wider border-b border-white/[0.03] last:border-b-0"
                  >
                    {cat.toUpperCase()}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/products?filter=new-arrivals" className="hover:text-gray-300 transition-colors flex items-center">
            NEW ARRIVALS <span className="ml-1.5 text-red-500 text-sm">❤</span>
          </Link>
          <Link href="/products?filter=bestseller" className="hover:text-gray-300 transition-colors">BESTSELLER</Link>
          <Link href="/about" className="hover:text-gray-300 transition-colors">ABOUT US</Link>
          <Link href="/contact" className="hover:text-gray-300 transition-colors">CONTACT US</Link>
        </nav>

        {/* Right Icons */}
        <div className="flex items-center space-x-6">
          <Search size={20} className="hover:text-gray-300 cursor-pointer transition-colors" strokeWidth={2} />
          <User size={20} className="hover:text-gray-300 cursor-pointer transition-colors" strokeWidth={2} />
          <Heart size={20} className="hover:text-gray-300 cursor-pointer transition-colors" strokeWidth={2} />
          <div className="relative cursor-pointer hover:opacity-80 transition-opacity">
            <ShoppingBag size={20} strokeWidth={2} />
            <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[9px] font-bold w-[16px] h-[16px] flex items-center justify-center rounded-full border-2 border-black">
              1
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
