'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { FaInstagram, FaPinterestP, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { Gem, HandHeart, ShieldCheck, Gift } from 'lucide-react';
export function Footer() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <footer className="mt-auto w-full bg-[#FFF6F7] text-[#6D4C4E] pt-6 pb-2 md:pt-8 md:pb-3 select-none relative overflow-hidden border-t border-[#C17F78]/15">
      {/* Luxurious Silk Background Texture Overlay */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-[0.15] pointer-events-none">
        <Image
          src="/budget_bg.png"
          alt="Luxury silk background texture"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="w-full max-w-[1320px] mx-auto px-4 md:px-8 relative z-10 flex flex-col">
        {/* Section 1: Newsletter */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between pb-4 gap-4">
          <div className="flex flex-col space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C17F78]">JOIN OUR STORY</span>
            <h2 className="text-xl md:text-2xl lg:text-[28px] font-bodoni font-bold text-[#6D4C4E] leading-tight">
              Be the first to discover our latest treasures
            </h2>
            <p className="font-script text-[#6D4C4E] text-[30px] md:text-[36px] lg:text-[40px] font-bold leading-[1.1] mt-2">
              Timeless pieces. Exclusive offers. Just for you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 lg:w-[45%] shrink-0">
            <div className="relative flex-grow w-full">
              <input
                type="email"
                placeholder="Email address"
                required
                className="w-full bg-white/80 border border-[#6D4C4E]/25 focus:border-[#C17F78] focus:bg-white px-4 py-2.5 rounded text-xs text-[#6D4C4E] placeholder-[#6D4C4E]/50 focus:outline-none font-raleway font-medium transition-all select-text shadow-2xs"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#C17F78] hover:bg-[#6D4C4E] text-white font-raleway font-extrabold text-xs tracking-widest py-3 px-8 rounded-sm transition-all duration-300 flex items-center justify-center gap-2 uppercase shrink-0 cursor-pointer shadow-xs"
            >
              <span>SUBSCRIBE</span>
              <span className="text-sm font-light leading-none">+</span>
            </button>
          </form>
        </div>

        {/* Divider with Diamond Star */}
        <div className="relative flex items-center justify-center my-1">
          <div className="w-full h-[0.5px] bg-[#6D4C4E]/15" />
          <div className="absolute w-7 h-7 rounded-full border border-[#C17F78]/30 bg-[#FFF6F7] flex items-center justify-center text-[#C17F78] shadow-xs">
            <span className="text-[10px] leading-none">✦</span>
          </div>
        </div>

        {/* Section 2: Main Links & Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-6 gap-x-6 items-start text-[13px] font-medium text-[#6D4C4E] pt-1">
          {/* Column 1: Logo & Brand Description */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 flex flex-col items-start space-y-3.5 text-left">
            <Link href="/" className="relative w-full max-w-[280px] h-[90px] cursor-pointer group block -my-2">
              <div
                className="w-full h-full bg-[#6D4C4E] group-hover:bg-[#C17F78] transition-colors duration-300"
                style={{
                  WebkitMaskImage: "url('/logo.png')",
                  WebkitMaskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "left center",
                  maskImage: "url('/logo.png')",
                  maskSize: "contain",
                  maskRepeat: "no-repeat",
                  maskPosition: "left center"
                }}
              />
            </Link>

            <p className="font-script text-[#D38E93] text-[26px] md:text-[28px] lg:text-[30px] font-bold leading-none -mt-2 whitespace-normal sm:whitespace-nowrap">
              Handpicked pieces, just for you.
            </p>

            <p className="font-raleway text-xs text-[#6D4C4E]/80 leading-relaxed max-w-[340px]">
              Orisil Jewels offers premium, handcrafted 92.5 sterling silver jewelry. Each piece is designed with love, combining timeless elegance with modern craftsmanship to create treasures you&apos;ll cherish forever.
            </p>

            <div className="flex items-center gap-3 w-[80%] pt-0.5">
              <div className="w-8 h-[0.5px] bg-[#C17F78]/30" />
              <span className="text-[10px] text-[#C17F78]">♥</span>
              <div className="w-8 h-[0.5px] bg-[#C17F78]/30" />
            </div>
          </div>

          {/* Column 2: Shop */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-raleway font-bold text-[#6D4C4E] uppercase tracking-widest text-[11px]">SHOP</h4>
            <ul className="space-y-1.5 text-[#6D4C4E]/90">
              <li><Link href="/products?category=Rings" className="hover:text-[#C17F78] transition-colors">Rings</Link></li>
              <li><Link href="/products?category=Bracelets" className="hover:text-[#C17F78] transition-colors">Bracelets</Link></li>
              <li><Link href="/products?category=Necklaces%2FPendants" className="hover:text-[#C17F78] transition-colors">Necklaces</Link></li>
              <li><Link href="/products?category=Earrings" className="hover:text-[#C17F78] transition-colors">Earrings</Link></li>
              <li><Link href="/products" className="hover:text-[#C17F78] transition-colors">Gift Collection</Link></li>
              <li><Link href="/products?filter=new-arrivals" className="hover:text-[#C17F78] transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-raleway font-bold text-[#6D4C4E] uppercase tracking-widest text-[11px]">COMPANY</h4>
            <ul className="space-y-1.5 text-[#6D4C4E]/90">
              <li><Link href="/about" className="hover:text-[#C17F78] transition-colors">About Us</Link></li>
              <li><Link href="/about" className="hover:text-[#C17F78] transition-colors">Our Story</Link></li>
              <li><Link href="/about" className="hover:text-[#C17F78] transition-colors">Craftsmanship</Link></li>
              <li><Link href="#" className="hover:text-[#C17F78] transition-colors">Journal</Link></li>
              <li><Link href="/contact" className="hover:text-[#C17F78] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 4: Customer Care */}
          <div className="flex flex-col space-y-3 items-start text-left">
            <h4 className="font-raleway font-bold text-[#6D4C4E] uppercase tracking-widest text-[11px]">CUSTOMER CARE</h4>
            <ul className="space-y-1.5 text-[#6D4C4E]/90 flex flex-col items-start">
              <li><Link href="/shipping-policy" className="hover:text-[#C17F78] transition-colors">Shipping Information</Link></li>
              <li><Link href="/refund-policy" className="hover:text-[#C17F78] transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="#" className="hover:text-[#C17F78] transition-colors">Care Guide</Link></li>
              <li><Link href="#" className="hover:text-[#C17F78] transition-colors">Track Your Order</Link></li>
              <li><Link href="/contact" className="hover:text-[#C17F78] transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Column 5: Help */}
          <div className="flex flex-col space-y-3 items-start text-left">
            <h4 className="font-raleway font-bold text-[#6D4C4E] uppercase tracking-widest text-[11px]">HELP</h4>
            <ul className="space-y-1.5 text-[#6D4C4E]/90 flex flex-col items-start">
              <li><Link href="/privacy-policy" className="hover:text-[#C17F78] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-[#C17F78] transition-colors">Terms of Service</Link></li>
              <li><Link href="/refund-policy" className="hover:text-[#C17F78] transition-colors">Refund Policy</Link></li>
              <li><Link href="#" className="hover:text-[#C17F78] transition-colors">Size Guide</Link></li>
              <li><Link href="/contact" className="hover:text-[#C17F78] transition-colors">Contact Support</Link></li>
            </ul>
          </div>
        </div>

        {/* Section 3: Commitments / Badges */}
        <div className="border-t border-[#6D4C4E]/10 pt-2 mt-2 grid grid-cols-2 md:grid-cols-4 gap-2 items-center text-center">
          {/* Badge 1 */}
          <div className="flex flex-col items-center space-y-1.5">
            <div className="w-10 h-10 rounded-full border border-[#C17F78]/30 bg-white/40 flex items-center justify-center text-[#C17F78] shadow-xs">
              <Gem className="w-5 h-5" strokeWidth={1.2} />
            </div>
            <h5 className="text-[10px] font-raleway font-bold text-[#6D4C4E] tracking-widest uppercase">925 Sterling Silver</h5>
            <p className="text-[9px] text-[#C17F78] tracking-wider font-medium">Authentic & Certified</p>
          </div>

          {/* Badge 2 */}
          <div className="flex flex-col items-center space-y-1.5">
            <div className="w-10 h-10 rounded-full border border-[#C17F78]/30 bg-white/40 flex items-center justify-center text-[#C17F78] shadow-xs">
              <HandHeart className="w-5 h-5" strokeWidth={1.2} />
            </div>
            <h5 className="text-[10px] font-raleway font-bold text-[#6D4C4E] tracking-widest uppercase">Handcrafted</h5>
            <p className="text-[9px] text-[#C17F78] tracking-wider font-medium">With Love & Precision</p>
          </div>

          {/* Badge 3 */}
          <div className="flex flex-col items-center space-y-1.5">
            <div className="w-10 h-10 rounded-full border border-[#C17F78]/30 bg-white/40 flex items-center justify-center text-[#C17F78] shadow-xs">
              <ShieldCheck className="w-5 h-5" strokeWidth={1.2} />
            </div>
            <h5 className="text-[10px] font-raleway font-bold text-[#6D4C4E] tracking-widest uppercase">Lifetime Plating</h5>
            <p className="text-[9px] text-[#C17F78] tracking-wider font-medium">Long-Lasting Shine</p>
          </div>

          {/* Badge 4 */}
          <div className="flex flex-col items-center space-y-1.5">
            <div className="w-10 h-10 rounded-full border border-[#C17F78]/30 bg-white/40 flex items-center justify-center text-[#C17F78] shadow-xs">
              <Gift className="w-5 h-5" strokeWidth={1.2} />
            </div>
            <h5 className="text-[10px] font-raleway font-bold text-[#6D4C4E] tracking-widest uppercase">Beautiful Packaging</h5>
            <p className="text-[9px] text-[#C17F78] tracking-wider font-medium">Perfect for Gifting</p>
          </div>
        </div>

        {/* Section 4: Social Icons & Copyright */}
        <div className="border-t border-[#6D4C4E]/10 pt-2 mt-2 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-[#6D4C4E]/70 font-medium">
          {/* Social Row */}
          <div className="flex items-center space-x-3.5">
            <Link href="#" className="w-8 h-8 rounded-full border border-[#6D4C4E]/20 hover:border-[#C17F78] flex items-center justify-center text-[#6D4C4E] hover:text-white hover:bg-[#C17F78] bg-white/40 transition-all duration-300 shadow-sm" aria-label="Instagram">
              <FaInstagram size={14} />
            </Link>
            <Link href="#" className="w-8 h-8 rounded-full border border-[#6D4C4E]/20 hover:border-[#C17F78] flex items-center justify-center text-[#6D4C4E] hover:text-white hover:bg-[#C17F78] bg-white/40 transition-all duration-300 shadow-sm" aria-label="Pinterest">
              <FaPinterestP size={14} />
            </Link>
            <Link href="#" className="w-8 h-8 rounded-full border border-[#6D4C4E]/20 hover:border-[#C17F78] flex items-center justify-center text-[#6D4C4E] hover:text-white hover:bg-[#C17F78] bg-white/40 transition-all duration-300 shadow-sm" aria-label="WhatsApp">
              <FaWhatsapp size={15} />
            </Link>
            <Link href="#" className="w-8 h-8 rounded-full border border-[#6D4C4E]/20 hover:border-[#C17F78] flex items-center justify-center text-[#6D4C4E] hover:text-white hover:bg-[#C17F78] bg-white/40 transition-all duration-300 shadow-sm" aria-label="Email">
              <FaEnvelope size={13} />
            </Link>
          </div>

          <div>© 2025 ORISIL. All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  );
}
