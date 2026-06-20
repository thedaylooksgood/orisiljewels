'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const InstagramIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const PinterestIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 0 0-3.6 19.3c0-.8.1-2 .3-2.9.2-.8 1.4-5.8 1.4-5.8s-.3-.7-.3-1.8c0-1.7 1-2.9 2.2-2.9 1 0 1.5.8 1.5 1.7 0 1.1-.7 2.7-1.1 4.2-.3 1.2.6 2.2 1.8 2.2 2.2 0 3.8-2.8 3.8-6.1 0-2.5-1.7-4.4-4.8-4.4-3.4 0-5.6 2.6-5.6 5.6 0 1 .3 1.8.8 2.4.1.1.1.2 0 .4l-.3 1.1c-.1.2-.2.3-.4.2-1.3-.5-1.9-2-1.9-3.7 0-3.1 2.6-6.7 7.7-6.7 4.1 0 6.8 3 6.8 6.1 0 4.2-2.3 7.3-5.7 7.3-1.1 0-2.2-.6-2.5-1.3 0 0-.6 2.4-.7 2.8-.2.9-.8 1.9-1.2 2.6A10 10 0 1 0 12 2z"/>
  </svg>
);

const WhatsappIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const MailIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

export function Footer() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <footer className="w-full bg-[#FFF6F7] text-[#6D4C4E] py-16 select-none relative overflow-hidden border-t border-[#C17F78]/15">
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
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between pb-8 gap-8">
          <div className="flex flex-col space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C17F78]">JOIN OUR STORY</span>
            <h2 className="text-xl md:text-2xl lg:text-[28px] font-bodoni font-bold text-[#6D4C4E] leading-tight">
              Be the first to discover our latest treasures
            </h2>
            <p className="font-script text-[#C17F78] text-[20px] lg:text-[24px] leading-none mt-1">
              Timeless pieces. Exclusive offers. Just for you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4 lg:w-[45%] shrink-0">
            <div className="relative flex-grow w-full border-b border-[#6D4C4E]/25 focus-within:border-[#C17F78] transition-colors py-2">
              <input
                type="email"
                placeholder="Email address"
                required
                className="w-full bg-transparent text-xs text-[#6D4C4E] placeholder-[#6D4C4E]/40 focus:outline-none font-raleway font-light select-text"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#C17F78]/90 hover:bg-[#6D4C4E] text-[#6D4C4E] hover:text-white font-raleway font-bold text-xs tracking-widest py-3 px-8 border border-[#6D4C4E]/10 rounded-sm transition-all duration-300 flex items-center justify-center gap-2 uppercase shrink-0 cursor-pointer shadow-xs"
            >
              <span>SUBSCRIBE</span>
              <span className="text-sm font-light leading-none">+</span>
            </button>
          </form>
        </div>

        {/* Divider with Diamond Star */}
        <div className="relative flex items-center justify-center my-6">
          <div className="w-full h-[0.5px] bg-[#6D4C4E]/10" />
          <div className="absolute w-7 h-7 rounded-full border border-[#C17F78]/30 bg-[#FFF6F7] flex items-center justify-center text-[#C17F78] shadow-xs">
            <span className="text-[10px] leading-none">✦</span>
          </div>
        </div>

        {/* Section 2: Main Links & Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-start text-xs font-light text-[#6D4C4E]/80 pt-6">
          {/* Column 1: Shop */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-raleway font-bold text-[#6D4C4E] uppercase tracking-widest text-[11px]">SHOP</h4>
            <ul className="space-y-2">
              <li><Link href="/products?category=Rings" className="hover:text-[#C17F78] transition-colors">Rings</Link></li>
              <li><Link href="/products?category=Bracelets" className="hover:text-[#C17F78] transition-colors">Bracelets</Link></li>
              <li><Link href="/products?category=Necklaces%2FPendants" className="hover:text-[#C17F78] transition-colors">Necklaces</Link></li>
              <li><Link href="/products?category=Earrings" className="hover:text-[#C17F78] transition-colors">Earrings</Link></li>
              <li><Link href="/products" className="hover:text-[#C17F78] transition-colors">Gift Collection</Link></li>
              <li><Link href="/products?filter=new-arrivals" className="hover:text-[#C17F78] transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-raleway font-bold text-[#6D4C4E] uppercase tracking-widest text-[11px]">COMPANY</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-[#C17F78] transition-colors">About Us</Link></li>
              <li><Link href="/about" className="hover:text-[#C17F78] transition-colors">Our Story</Link></li>
              <li><Link href="/about" className="hover:text-[#C17F78] transition-colors">Craftsmanship</Link></li>
              <li><Link href="#" className="hover:text-[#C17F78] transition-colors">Journal</Link></li>
              <li><Link href="/contact" className="hover:text-[#C17F78] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Logo (Centers on large screen, full-width on mobile/md) */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 flex flex-col items-center justify-center text-center order-first lg:order-none py-6 lg:py-0">
            <span className="text-[#C17F78] text-xs mb-1">✦</span>
            
            <Link href="/" className="relative w-[220px] h-[75px] cursor-pointer group block">
              <div
                className="w-full h-full bg-[#6D4C4E] group-hover:bg-[#C17F78] transition-colors duration-300"
                style={{
                  WebkitMaskImage: "url('/logo.png')",
                  WebkitMaskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskImage: "url('/logo.png')",
                  maskSize: "contain",
                  maskRepeat: "no-repeat",
                  maskPosition: "center"
                }}
              />
            </Link>

            <p className="font-script text-[#C17F78] text-[20px] lg:text-[22px] leading-tight mt-1">
              Handpicked pieces,<br />just for you.
            </p>
            <div className="flex items-center justify-center gap-3 w-full mt-4">
              <div className="w-8 h-[0.5px] bg-[#C17F78]/30" />
              <span className="text-[10px] text-[#C17F78]">♥</span>
              <div className="w-8 h-[0.5px] bg-[#C17F78]/30" />
            </div>
          </div>

          {/* Column 4: Customer Care */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-raleway font-bold text-[#6D4C4E] uppercase tracking-widest text-[11px]">CUSTOMER CARE</h4>
            <ul className="space-y-2">
              <li><Link href="/shipping-policy" className="hover:text-[#C17F78] transition-colors">Shipping Information</Link></li>
              <li><Link href="/refund-policy" className="hover:text-[#C17F78] transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="#" className="hover:text-[#C17F78] transition-colors">Care Guide</Link></li>
              <li><Link href="#" className="hover:text-[#C17F78] transition-colors">Track Your Order</Link></li>
              <li><Link href="/contact" className="hover:text-[#C17F78] transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Column 5: Help */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-raleway font-bold text-[#6D4C4E] uppercase tracking-widest text-[11px]">HELP</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="hover:text-[#C17F78] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-[#C17F78] transition-colors">Terms of Service</Link></li>
              <li><Link href="/refund-policy" className="hover:text-[#C17F78] transition-colors">Refund Policy</Link></li>
              <li><Link href="#" className="hover:text-[#C17F78] transition-colors">Size Guide</Link></li>
              <li><Link href="/contact" className="hover:text-[#C17F78] transition-colors">Contact Support</Link></li>
            </ul>
          </div>
        </div>

        {/* Section 3: Commitments / Badges */}
        <div className="border-t border-[#6D4C4E]/10 pt-8 mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 items-center text-center">
          {/* Badge 1 */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-10 h-10 rounded-full border border-[#C17F78]/30 bg-white/40 flex items-center justify-center text-[#C17F78] shadow-xs">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.2">
                <polygon points="6 3 18 3 22 9 12 21 2 9 6 3" />
                <path d="M2 9h20M12 3v18" />
                <path d="M12 3L6 9l6 12 6-12-6-6" />
              </svg>
            </div>
            <h5 className="text-[10px] font-raleway font-bold text-[#6D4C4E] tracking-widest uppercase">925 Sterling Silver</h5>
            <p className="text-[9px] text-[#C17F78] tracking-wider font-light">Authentic & Certified</p>
          </div>

          {/* Badge 2 */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-10 h-10 rounded-full border border-[#C17F78]/30 bg-white/40 flex items-center justify-center text-[#C17F78] shadow-xs">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 22 8.5 12 15 2 8.5 12 2" />
                <path d="M12 15v7M2 8.5L12 22l10-13.5" />
              </svg>
            </div>
            <h5 className="text-[10px] font-raleway font-bold text-[#6D4C4E] tracking-widest uppercase">Handcrafted</h5>
            <p className="text-[9px] text-[#C17F78] tracking-wider font-light">With Love & Precision</p>
          </div>

          {/* Badge 3 */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-10 h-10 rounded-full border border-[#C17F78]/30 bg-white/40 flex items-center justify-center text-[#C17F78] shadow-xs">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h5 className="text-[10px] font-raleway font-bold text-[#6D4C4E] tracking-widest uppercase">Lifetime Plating</h5>
            <p className="text-[9px] text-[#C17F78] tracking-wider font-light">Long-Lasting Shine</p>
          </div>

          {/* Badge 4 */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-10 h-10 rounded-full border border-[#C17F78]/30 bg-white/40 flex items-center justify-center text-[#C17F78] shadow-xs">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.2">
                <rect x="3" y="9" width="18" height="12" rx="2" ry="2" />
                <path d="M12 22V9M3 9h18M7.5 9a3.5 3.5 0 0 1 0-7c2 0 4.5 3.5 4.5 3.5s2.5-3.5 4.5-3.5a3.5 3.5 0 0 1 0 7" />
              </svg>
            </div>
            <h5 className="text-[10px] font-raleway font-bold text-[#6D4C4E] tracking-widest uppercase">Beautiful Packaging</h5>
            <p className="text-[9px] text-[#C17F78] tracking-wider font-light">Perfect for Gifting</p>
          </div>
        </div>

        {/* Section 4: Social Icons & Copyright */}
        <div className="border-t border-[#6D4C4E]/10 pt-8 mt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-[#6D4C4E]/60 font-light">
          {/* Social Row */}
          <div className="flex items-center space-x-3.5">
            <Link href="#" className="w-8 h-8 rounded-full border border-[#6D4C4E]/15 hover:border-[#C17F78] flex items-center justify-center text-[#6D4C4E] hover:text-[#C17F78] bg-white/20 transition-all" aria-label="Instagram">
              <InstagramIcon size={14} />
            </Link>
            <Link href="#" className="w-8 h-8 rounded-full border border-[#6D4C4E]/15 hover:border-[#C17F78] flex items-center justify-center text-[#6D4C4E] hover:text-[#C17F78] bg-white/20 transition-all" aria-label="Pinterest">
              <PinterestIcon size={14} />
            </Link>
            <Link href="#" className="w-8 h-8 rounded-full border border-[#6D4C4E]/15 hover:border-[#C17F78] flex items-center justify-center text-[#6D4C4E] hover:text-[#C17F78] bg-white/20 transition-all" aria-label="WhatsApp">
              <WhatsappIcon size={14} />
            </Link>
            <Link href="#" className="w-8 h-8 rounded-full border border-[#6D4C4E]/15 hover:border-[#C17F78] flex items-center justify-center text-[#6D4C4E] hover:text-[#C17F78] bg-white/20 transition-all" aria-label="Email">
              <MailIcon size={14} />
            </Link>
          </div>

          <div>© 2025 ORISIL. All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  );
}
