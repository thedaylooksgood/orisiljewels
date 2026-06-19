'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const FacebookIcon = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const InstagramIcon = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const YoutubeIcon = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const WhatsappIcon = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

export function Footer() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email subscription logic
  };

  return (
    <footer className="w-full bg-[#2a1733] text-white py-16 select-none border-t border-white/5">
      <div className="w-full max-w-[1320px] mx-auto px-4 md:px-8 flex flex-col space-y-12">
        {/* Main Footer Links & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Logo & Info */}
          <div className="flex flex-col space-y-6">
            <Link href="/" className="inline-block hover:opacity-95 transition-opacity">
              <Image
                src="/logo.png"
                alt="Orisil Jewels Logo"
                width={150}
                height={45}
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-xs leading-relaxed text-white/80 font-light">
              Orisil is a trusted 925 sterling silver jewellery brand dedicated to creating elegant, timeless pieces for the modern wearer. Each design is crafted from certified 92.5% pure silver, ensuring exceptional quality, authenticity, and long-lasting brilliance. At Orisil, we believe jewellery is more than an accessory—it is an expression of individuality. Pure in form, unique in character, and forever shining, Orisil jewellery is designed to celebrate who you are.
            </p>
            <div className="text-xs space-y-2 text-white/80 font-light pt-2">
              <p><span className="font-semibold">Phone:</span> +91 89888 18882</p>
              <p><span className="font-semibold">Email:</span> orisiljewels@gmail.com</p>
              <p><span className="font-semibold">GST Number:</span> 07AHKPD4554B1ZP</p>
            </div>
            
            {/* Hallmark Area */}
            <div className="flex items-center space-x-3 pt-4 border-t border-white/10">
              <div className="relative w-24 h-24 flex-none">
                {/* Fallback BIS Hallmark logo image */}
                <Image
                  src="/hallmark.png"
                  alt="BIS Hallmark Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-[11px] font-medium tracking-wider text-white/90">
                BIS Hallmark 925 Silver
              </div>
            </div>
          </div>

          {/* Column 2: Our Company */}
          <div className="flex flex-col space-y-4 lg:pl-10">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
              OUR COMPANY
            </h3>
            <ul className="space-y-2.5 text-xs text-white/85 font-light">
              <li>
                <Link href="/" className="hover:text-gray-300 transition-colors">Home page</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-gray-300 transition-colors">All products</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gray-300 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-300 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
              CUSTOMER SERVICE
            </h3>
            <ul className="space-y-2.5 text-xs text-white/85 font-light">
              <li>
                <Link href="/privacy-policy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-gray-300 transition-colors">Shipping Policy</Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-gray-300 transition-colors">Refund Policy</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-300 transition-colors">Contact Information</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white leading-snug">
              Join Us — Where Every Sparkle Tells a Story
            </h3>
            <p className="text-xs leading-relaxed text-white/80 font-light">
              Be the first to discover new collections, exclusive offers, style inspiration, and more from Orisil. Join our community and let timeless 925 sterling silver elegance arrive straight to your inbox.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3 pt-2">
              <input
                type="email"
                placeholder="Email address"
                required
                className="bg-transparent border-b border-white/30 focus:border-white py-2 px-1 text-xs text-white placeholder-white/50 focus:outline-none transition-colors font-light"
              />
              <button
                type="submit"
                className="w-full bg-white hover:bg-slate-100 text-[#2a1733] font-bold text-xs tracking-widest py-3 uppercase transition-colors duration-300 cursor-pointer"
              >
                SUBSCRIBE
              </button>
            </form>

            {/* Socials Row */}
            <div className="flex items-center space-x-5 pt-4">
              <Link href="#" className="hover:text-gray-300 transition-colors" aria-label="Facebook">
                <FacebookIcon size={16} />
              </Link>
              <Link href="#" className="hover:text-gray-300 transition-colors" aria-label="Instagram">
                <InstagramIcon size={16} />
              </Link>
              <Link href="#" className="hover:text-gray-300 transition-colors" aria-label="YouTube">
                <YoutubeIcon size={16} />
              </Link>
              <Link href="#" className="hover:text-gray-300 transition-colors" aria-label="WhatsApp">
                <WhatsappIcon size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Commitment Divider & Section */}
        <div className="border-t border-white/10 pt-10 flex flex-col space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
            OUR COMMITMENT
          </h3>
          <p className="text-xs leading-relaxed text-white/80 font-light">
            At Orisil, our commitment lies in purity, craftsmanship, and customer trust. We craft every piece exclusively from certified 925 sterling silver, ensuring timeless quality, elegance, and authenticity in every design.
          </p>
        </div>

        {/* Bottom copyright / line */}
        <div className="border-t border-dashed border-white/10 pt-6 flex justify-between items-center text-[10px] text-white/60 font-light">
          <div>© {new Date().getFullYear()} Orisil Jewels. All rights reserved.</div>
          <div className="flex space-x-4">
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
