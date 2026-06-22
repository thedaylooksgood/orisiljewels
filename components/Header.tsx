'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
// cn helper removed to use standard string interpolation
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  ChevronDown,
  Menu,
  X,
  Plus,
  Minus,
  Truck,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState<number>(0);

  // Mobile accordion state
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);

  useEffect(() => {
    const updateCount = () => {
      const saved = localStorage.getItem('orisil-cart');
      if (saved) {
        try {
          const items = JSON.parse(saved);
          const totalQty = items.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0);
          setCartCount(totalQty);
        } catch (e) {
          console.error(e);
          setCartCount(0);
        }
      } else {
        // Fallback default of 2 to match initial showcase items when no storage exists
        setCartCount(2);
      }
    };

    updateCount();

    window.addEventListener('orisil-cart-change', updateCount);
    window.addEventListener('storage', updateCount);

    return () => {
      window.removeEventListener('orisil-cart-change', updateCount);
      window.removeEventListener('storage', updateCount);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile drawer or search overlay is open
  useEffect(() => {
    if (showMobileMenu || showSearchOverlay) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showMobileMenu, showSearchOverlay]);

  const dockTransition = {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1] as const, // Cinematic butter-smooth easing
  };

  return (
    <>
      {/* Outer Sticky Wrapper - Height is fixed at 72px to prevent document scroll layout shifts */}
      <header className="sticky top-0 z-50 w-full h-[72px] bg-transparent pointer-events-none flex justify-center">
        <motion.div
          animate={{
            width: isScrolled ? "min(100%, 1100px)" : "100%",
            marginTop: isScrolled ? "0.75rem" : "0rem",
            borderRadius: isScrolled ? "16px" : "0px",
            height: isScrolled ? "54px" : "72px",
          }}
          transition={dockTransition}
          className={`pointer-events-auto relative flex justify-center transition-shadow duration-700 w-full ${isScrolled ? "shadow-[0_12px_40px_rgba(109,76,78,0.06)]" : ""
            }`}
        >
          {/* Animated Backgrounds */}
          <motion.div
            animate={{ 
              opacity: isScrolled ? 1 : 0,
              borderRadius: isScrolled ? "16px" : "0px"
            }}
            transition={dockTransition}
            className="absolute inset-0 bg-white/95 backdrop-blur-xl z-0"
          />
          <motion.div
            animate={{ 
              opacity: isScrolled ? 0 : 1,
              borderRadius: isScrolled ? "16px" : "0px"
            }}
            transition={dockTransition}
            className="absolute inset-0 bg-white z-0"
          />

          {/* Continuous Border for connectivity */}
          <motion.div
            animate={{
              borderRadius: isScrolled ? "16px" : "0px",
            }}
            transition={dockTransition}
            className={`absolute inset-0 pointer-events-none z-[1] ${isScrolled ? "border border-accent-rose/25" : "border-b border-accent-rose/10"
              }`}
          />



          {/* INNER CONTENT CONTAINER - aligns with other sections when not scrolled */}
          <div className={`w-full relative z-10 flex items-center justify-between h-full mx-auto ${isScrolled ? 'px-6' : 'max-w-[1320px] px-4 md:px-8'}`}>

            {/* Logo Group - Animated size */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group z-10">
              <motion.div
                animate={{
                  height: isScrolled ? "90px" : "110px",
                  width: isScrolled ? "250px" : "320px",
                }}
                transition={dockTransition}
                className="relative cursor-pointer"
              >
                {/* Using CSS Masking to dynamically tint the PNG logo without blend-mode solid block issues */}
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
              </motion.div>
            </Link>

            {/* Desktop Navigation - Plus Jakarta Sans (font-sans) in TitleCase */}
            <nav className="hidden lg:flex items-center z-10">
              <motion.div
                animate={{ gap: isScrolled ? "1.5rem" : "2.25rem" }}
                transition={dockTransition}
                className="flex items-center font-sans text-sm font-medium text-[#6D4C4E]"
              >
                <Link
                  href="/"
                  className="hover:text-[#C17F78] transition-colors duration-300 relative py-1 group"
                >
                  Home
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] rounded-full bg-[#C17F78] transition-all duration-300 group-hover:w-full" />
                </Link>

                {/* SHOP Item with premium Mega Menu */}
                <div className="relative group/menu py-4">
                  <Link href="/products" className="flex items-center hover:text-[#C17F78] transition-colors duration-300 gap-1 py-1">
                    Shop <ChevronDown size={12} className="opacity-70 group-hover/menu:rotate-180 transition-transform duration-300" strokeWidth={2.5} />
                  </Link>

                  {/* Mega Menu Dropdown */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-screen max-w-[1100px] opacity-0 invisible scale-95 translate-y-4 group-hover/menu:opacity-100 group-hover/menu:visible group-hover/menu:scale-100 group-hover/menu:translate-y-0 transition-all duration-300 ease-out z-50">
                    <div className="bg-white/95 backdrop-blur-xl border border-accent-rose/25 rounded-2xl shadow-[0_20px_50px_rgba(109,76,78,0.12)] overflow-hidden grid grid-cols-12 p-8 gap-8 font-sans">
                      {/* Left Column: Image Promo with elegant color hover transition */}
                      <div className="col-span-3 relative rounded-xl overflow-hidden aspect-[3/4] shadow-sm border border-accent-rose/15 group/promo cursor-pointer">
                        <Image
                          src="/megamenu_jewelry.png"
                          alt="Timeless Beauty"
                          fill
                          className="object-cover transition-all duration-700 ease-out scale-100 group-hover/promo:scale-105 filter saturate-[0.8] sepia-[0.1] group-hover/promo:saturate-110 group-hover/promo:sepia-0"
                        />
                        {/* Rose Gold Color Overlay Tint - Fades on Hover */}
                        <div className="absolute inset-0 bg-[#C17F78]/15 mix-blend-color opacity-100 group-hover/promo:opacity-0 transition-opacity duration-700"></div>
                        {/* Dark Editorial Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-95"></div>
                        <div className="absolute bottom-5 left-5 right-5 text-white z-10 transition-transform duration-500 group-hover/promo:translate-y-[-2px]">
                          <p className="font-bodoni text-lg font-medium tracking-wide">Timeless Beauty</p>
                          <p className="text-[9px] font-semibold tracking-widest uppercase opacity-90 mt-1">CRAFTED FOR YOU</p>
                        </div>
                      </div>

                      {/* Mega Menu Links Grid (Middle Columns) */}
                      <div className="col-span-6 grid grid-cols-2 gap-x-8 gap-y-6">
                        <div>
                          <h4 className="text-[11px] font-bold tracking-widest text-[#6D4C4E] border-b border-accent-rose/20  mb-3">Rings</h4>
                          <ul className="space-y-2 text-[11px] font-medium text-[#6D4C4E]/80">
                            <li><Link href="/products?category=Rings" className="hover:text-[#C17F78] transition-colors">Engagement Rings</Link></li>
                            <li><Link href="/products?category=Rings" className="hover:text-[#C17F78] transition-colors">Wedding Rings</Link></li>
                            <li><Link href="/products?category=Rings" className="hover:text-[#C17F78] transition-colors">Diamond Rings</Link></li>
                            <li><Link href="/products?category=Rings" className="hover:text-[#C17F78] transition-colors">Gemstone Rings</Link></li>
                            <li><Link href="/products?category=Rings" className="hover:text-[#C17F78] transition-colors">Stacking Rings</Link></li>
                            <li className="pt-1"><Link href="/products?category=Rings" className="text-[#C17F78] font-bold hover:underline">View All Rings →</Link></li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-[11px] font-bold tracking-widest text-[#6D4C4E] border-b border-accent-rose/20  mb-3">Necklaces</h4>
                          <ul className="space-y-2 text-[11px] font-medium text-[#6D4C4E]/80">
                            <li><Link href="/products?category=Necklaces%2FPendants" className="hover:text-[#C17F78] transition-colors">Pendant Necklaces</Link></li>
                            <li><Link href="/products?category=Necklaces%2FPendants" className="hover:text-[#C17F78] transition-colors">Chain Necklaces</Link></li>
                            <li><Link href="/products?category=Necklaces%2FPendants" className="hover:text-[#C17F78] transition-colors">Diamond Necklaces</Link></li>
                            <li><Link href="/products?category=Necklaces%2FPendants" className="hover:text-[#C17F78] transition-colors">Gemstone Necklaces</Link></li>
                            <li><Link href="/products?category=Necklaces%2FPendants" className="hover:text-[#C17F78] transition-colors">Initial Necklaces</Link></li>
                            <li className="pt-1"><Link href="/products?category=Necklaces%2FPendants" className="text-[#C17F78] font-bold hover:underline">View All Necklaces →</Link></li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-[11px] font-bold tracking-widest text-[#6D4C4E] border-b border-accent-rose/20  mb-3">Earrings</h4>
                          <ul className="space-y-2 text-[11px] font-medium text-[#6D4C4E]/80">
                            <li><Link href="/products?category=Earrings" className="hover:text-[#C17F78] transition-colors">Stud Earrings</Link></li>
                            <li><Link href="/products?category=Earrings" className="hover:text-[#C17F78] transition-colors">Hoop Earrings</Link></li>
                            <li><Link href="/products?category=Earrings" className="hover:text-[#C17F78] transition-colors">Drop Earrings</Link></li>
                            <li><Link href="/products?category=Earrings" className="hover:text-[#C17F78] transition-colors">Diamond Earrings</Link></li>
                            <li><Link href="/products?category=Earrings" className="hover:text-[#C17F78] transition-colors">Pearl Earrings</Link></li>
                            <li className="pt-1"><Link href="/products?category=Earrings" className="text-[#C17F78] font-bold hover:underline">View All Earrings →</Link></li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-[11px] font-bold tracking-widest text-[#6D4C4E] border-b border-accent-rose/20  mb-3">Bracelets</h4>
                          <ul className="space-y-2 text-[11px] font-medium text-[#6D4C4E]/80">
                            <li><Link href="/products?category=Bracelets" className="hover:text-[#C17F78] transition-colors">Chain Bracelets</Link></li>
                            <li><Link href="/products?category=Bracelets" className="hover:text-[#C17F78] transition-colors">Diamond Bracelets</Link></li>
                            <li><Link href="/products?category=Bracelets" className="hover:text-[#C17F78] transition-colors">Bangle Bracelets</Link></li>
                            <li><Link href="/products?category=Bracelets" className="hover:text-[#C17F78] transition-colors">Tennis Bracelets</Link></li>
                            <li><Link href="/products?category=Ladies%20Anklets" className="hover:text-[#C17F78] transition-colors">Ladies Anklets</Link></li>
                            <li className="pt-1"><Link href="/products?category=Bracelets" className="text-[#C17F78] font-bold hover:underline">View All Bracelets →</Link></li>
                          </ul>
                        </div>
                      </div>

                      {/* Right Column: Editorial Promo Info Card */}
                      <div className="col-span-3 bg-bg-soft/50 border border-accent-rose/20 rounded-xl p-6 flex flex-col justify-between items-center text-center">
                        <span className="font-script text-[44px] text-[#C17F78] leading-none mb-1">
                          crafted for you
                        </span>
                        <p className="text-[10px] text-black/85 leading-relaxed font-light mt-2 mb-5">
                          Discover our most loved sterling silver pieces, designed to be cherished for a lifetime.
                        </p>
                        <Link
                          href="/products"
                          className="w-full bg-[#C17F78] hover:bg-[#b06e67] text-white text-[9px] font-bold tracking-[0.25em] py-3 rounded-lg shadow-sm transition-all duration-300 hover:translate-y-[-2px] uppercase"
                        >
                          DISCOVER NOW
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* COLLECTIONS Item with similar structure */}
                <div className="relative group/menu py-4">
                  <Link href="/products" className="flex items-center hover:text-[#C17F78] transition-colors duration-300 gap-1 py-1">
                    Collections <ChevronDown size={12} className="opacity-70 group-hover/menu:rotate-180 transition-transform duration-300" strokeWidth={2.5} />
                  </Link>
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-64 opacity-0 invisible scale-95 translate-y-3 group-hover/menu:opacity-100 group-hover/menu:visible group-hover/menu:scale-100 group-hover/menu:translate-y-0 transition-all duration-300 ease-out z-50">
                    <div className="bg-white border border-accent-rose/25 shadow-2xl rounded-xl overflow-hidden py-2 font-sans">
                      <Link href="/products?filter=new-arrivals" className="block px-6 py-3 text-[11px] text-black hover:text-[#C17F78] hover:bg-bg-soft/40 transition-colors font-medium border-b border-accent-rose/10">
                        New Arrivals
                      </Link>
                      <Link href="/products?filter=bestseller" className="block px-6 py-3 text-[11px] text-black hover:text-[#C17F78] hover:bg-bg-soft/40 transition-colors font-medium border-b border-accent-rose/10">
                        Best Sellers
                      </Link>
                      <Link href="/products" className="block px-6 py-3 text-[11px] text-black hover:text-[#C17F78] hover:bg-bg-soft/40 transition-colors font-medium border-b border-accent-rose/10">
                        Bridal Collection
                      </Link>
                      <Link href="/products" className="block px-6 py-3 text-[11px] text-black hover:text-[#C17F78] hover:bg-bg-soft/40 transition-colors font-medium border-b border-accent-rose/10">
                        Signature Collection
                      </Link>
                      <Link href="/products" className="block px-6 py-3 text-[11px] text-black hover:text-[#C17F78] hover:bg-bg-soft/40 transition-colors font-medium">
                        Luxury Gifts
                      </Link>
                    </div>
                  </div>
                </div>

                <Link
                  href="/about"
                  className="hover:text-[#C17F78] transition-colors duration-300 relative py-1 group"
                >
                  About
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] rounded-full bg-[#C17F78] transition-all duration-300 group-hover:w-full" />
                </Link>
                <Link
                  href="/contact"
                  className="hover:text-[#C17F78] transition-colors duration-300 relative py-1 group"
                >
                  Contact
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] rounded-full bg-[#C17F78] transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            </nav>

            {/* Right Utilities Icons */}
            <div className="flex items-center space-x-2 md:space-x-4 text-[#6D4C4E] z-10">
              {/* Search Trigger */}
              <button
                onClick={() => setShowSearchOverlay(true)}
                className="p-2 hover:text-[#C17F78] transition-all duration-300 cursor-pointer rounded-full hover:bg-bg-soft/50 hover:scale-105 active:scale-95"
                aria-label="Search products"
              >
                <Search size={19} strokeWidth={1.5} />
              </button>

              {/* User Account */}
              <Link
                href="/account"
                className="p-2 hover:text-[#C17F78] transition-all duration-300 cursor-pointer rounded-full hover:bg-bg-soft/50 hover:scale-105 active:scale-95 hidden sm:inline-block"
                aria-label="My account"
              >
                <User size={19} strokeWidth={1.5} />
              </Link>

              {/* Wishlist */}
              <Link
                href="/products?filter=wishlist"
                className="p-2 hover:text-[#C17F78] transition-all duration-300 cursor-pointer rounded-full hover:bg-bg-soft/50 hover:scale-105 active:scale-95 relative"
                aria-label="My wishlist"
              >
                <Heart size={19} strokeWidth={1.5} />
              </Link>

              {/* Shopping Cart Bag */}
              <Link
                href="/cart"
                className="p-2 hover:text-[#C17F78] transition-all duration-300 cursor-pointer rounded-full hover:bg-bg-soft/50 hover:scale-105 active:scale-95 relative inline-block"
                aria-label="View shopping cart"
              >
                <ShoppingBag size={19} strokeWidth={1.5} />
                <span className="absolute top-1 right-1 bg-[#C17F78] text-white text-[8px] font-bold w-[14px] h-[14px] flex items-center justify-center rounded-full border border-white">
                  {cartCount}
                </span>
              </Link>

              {/* Mobile Hamburger menu */}
              <button
                onClick={() => setShowMobileMenu(true)}
                className="p-2 hover:text-[#C17F78] lg:hidden transition-all duration-300 cursor-pointer rounded-full hover:bg-bg-soft/50 hover:scale-105 active:scale-95"
                aria-label="Open mobile menu"
              >
                <Menu size={20} strokeWidth={1.75} />
              </button>
            </div>
          </div>{/* END INNER CONTAINER */}
        </motion.div>
      </header>

      {/* --- INTERACTIVE PORTALS / DRAWERS --- */}

      {/* 1. SEARCH OVERLAY DRAWER */}
      <div
        className={`fixed inset-0 z-50 bg-white/98 backdrop-blur-md flex flex-col justify-start items-center transition-all duration-500 ease-in-out ${showSearchOverlay
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-full pointer-events-none'
          }`}
      >
        {/* Top bar with close */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-6 flex justify-end">
          <button
            onClick={() => {
              setShowSearchOverlay(false);
              setSearchQuery("");
            }}
            className="p-3 border border-accent-rose/30 rounded-full hover:bg-bg-soft hover:text-[#C17F78] text-black transition-all duration-300 cursor-pointer"
            aria-label="Close search"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Center Search Elements */}
        <div className="w-full max-w-3xl px-6 flex flex-col justify-center flex-grow pb-32">
          <h2 className="font-bodoni text-4xl md:text-5xl text-black font-medium text-center mb-8">
            Search
          </h2>
          <div className="relative w-full border-b border-black/30 pb-4 flex items-center group">
            <input
              type="text"
              placeholder="Search for products, collections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xl md:text-2xl text-black placeholder-black/40 focus:outline-none pr-12 font-light select-text"
              autoFocus={showSearchOverlay}
            />
            <button className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:text-[#C17F78] text-black transition-colors">
              <Search size={24} strokeWidth={1.5} />
            </button>
          </div>

          {/* Popular searches */}
          <div className="mt-8 font-sans">
            <h4 className="text-[10px] font-bold tracking-[0.25em] text-black/60 uppercase mb-4">
              POPULAR SEARCHES
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {["Engagement Rings", "Diamond Necklace", "Hoop Earrings", "Tennis Bracelet"].map((item) => (
                <button
                  key={item}
                  onClick={() => setSearchQuery(item)}
                  className="px-4 py-2 text-[10px] font-medium tracking-wide text-black border border-accent-rose/40 hover:border-[#C17F78] hover:bg-[#C17F78] hover:text-white rounded-full transition-all duration-300 cursor-pointer"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. MOBILE MENU DRAWER */}
      {/* Background Dim Backdrop */}
      <div
        onClick={() => setShowMobileMenu(false)}
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${showMobileMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
      />
      {/* Slide-out Sidebar Panel */}
      <div
        className={`fixed left-0 top-0 bottom-0 h-full w-[85%] sm:w-[420px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out lg:hidden border-r border-accent-rose/20 ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Header inside drawer */}
        <div className="p-5 flex items-center justify-between border-b border-accent-rose/15">
          <Link href="/" className="flex items-center" onClick={() => setShowMobileMenu(false)}>
            <Image
              src="/logo.png"
              alt="Orisil Jewels Logo"
              width={140}
              height={42}
              className="h-9 w-auto object-contain brightness-0"
            />
          </Link>
          <button
            onClick={() => setShowMobileMenu(false)}
            className="p-2 border border-accent-rose/20 text-black hover:text-[#C17F78] transition-colors"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Scrollable links pane */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 flex flex-col justify-between font-sans">
          <div className="space-y-5">
            {/* Home link */}
            <Link
              href="/"
              onClick={() => setShowMobileMenu(false)}
              className="block text-sm font-medium text-[#6D4C4E] hover:text-[#C17F78] transition-colors py-2 border-b border-accent-rose/10"
            >
              Home
            </Link>

            {/* Shop Accordion */}
            <div className="space-y-2 border-b border-accent-rose/10 ">
              <button
                onClick={() => setMobileShopOpen(!mobileShopOpen)}
                className="w-full flex justify-between items-center text-sm font-medium text-[#6D4C4E] hover:text-[#C17F78] transition-colors py-2"
              >
                <span>Shop</span>
                {mobileShopOpen ? <Minus size={14} strokeWidth={2} /> : <Plus size={14} strokeWidth={2} />}
              </button>

              <div className={`pl-4 space-y-3 overflow-hidden transition-all duration-300 ${mobileShopOpen ? 'max-h-[350px] opacity-100 mt-2 ' : 'max-h-0 opacity-0 pointer-events-none'
                }`}>
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/products?category=${encodeURIComponent(cat)}`}
                    onClick={() => setShowMobileMenu(false)}
                    className="block text-[11px] font-medium text-[#6D4C4E]/70 hover:text-[#C17F78] transition-colors"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            {/* Collections Accordion */}
            <div className="space-y-2 border-b border-accent-rose/10 ">
              <button
                onClick={() => setMobileCollectionsOpen(!mobileCollectionsOpen)}
                className="w-full flex justify-between items-center text-sm font-medium text-[#6D4C4E] hover:text-[#C17F78] transition-colors py-2"
              >
                <span>Collections</span>
                {mobileCollectionsOpen ? <Minus size={14} strokeWidth={2} /> : <Plus size={14} strokeWidth={2} />}
              </button>

              <div className={`pl-4 space-y-3 overflow-hidden transition-all duration-300 ${mobileCollectionsOpen ? 'max-h-[200px] opacity-100 mt-2 ' : 'max-h-0 opacity-0 pointer-events-none'
                }`}>
                <Link href="/products?filter=new-arrivals" onClick={() => setShowMobileMenu(false)} className="block text-[11px] font-medium text-[#6D4C4E]/70 hover:text-[#C17F78] transition-colors">
                  New Arrivals
                </Link>
                <Link href="/products?filter=bestseller" onClick={() => setShowMobileMenu(false)} className="block text-[11px] font-medium text-[#6D4C4E]/70 hover:text-[#C17F78] transition-colors">
                  Best Sellers
                </Link>
                <Link href="/products" onClick={() => setShowMobileMenu(false)} className="block text-[11px] font-medium text-[#6D4C4E]/70 hover:text-[#C17F78] transition-colors">
                  Bridal Collection
                </Link>
                <Link href="/products" onClick={() => setShowMobileMenu(false)} className="block text-[11px] font-medium text-[#6D4C4E]/70 hover:text-[#C17F78] transition-colors">
                  Signature Collection
                </Link>
              </div>
            </div>

            <Link
              href="/about"
              onClick={() => setShowMobileMenu(false)}
              className="block text-sm font-medium text-[#6D4C4E] hover:text-[#C17F78] transition-colors py-2 border-b border-accent-rose/10"
            >
              About
            </Link>

            <Link
              href="/contact"
              onClick={() => setShowMobileMenu(false)}
              className="block text-sm font-medium text-[#6D4C4E] hover:text-[#C17F78] transition-colors py-2 border-b border-[#E0B4B8]/10"
            >
              Contact
            </Link>
          </div>

          {/* Commitment Promo Cards inside menu */}
          <div className="pt-8 border-t border-accent-rose/20 mt-auto space-y-4 font-sans">
            <div className="bg-bg-soft rounded-xl p-5 border border-accent-rose/20 space-y-4 select-none">
              <div className="flex items-center space-x-3.5">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-cta-primary shadow-sm">
                  <Truck size={14} />
                </div>
                <div>
                  <h5 className="text-[10px] font-bold tracking-widest text-[#6D4C4E]">FREE SHIPPING</h5>
                  <p className="text-[8px] text-[#6D4C4E]/70 tracking-wider font-light mt-0.5">On all orders over $150</p>
                </div>
              </div>

              <div className="flex items-center space-x-3.5">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-cta-primary shadow-sm">
                  <ShieldCheck size={14} />
                </div>
                <div>
                  <h5 className="text-[10px] font-bold tracking-widest text-[#6D4C4E]">LIFETIME WARRANTY</h5>
                  <p className="text-[8px] text-[#6D4C4E]/70 tracking-wider font-light mt-0.5">For your peace of mind</p>
                </div>
              </div>

              <div className="flex items-center space-x-3.5">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-cta-primary shadow-sm">
                  <RefreshCw size={14} />
                </div>
                <div>
                  <h5 className="text-[10px] font-bold tracking-widest text-[#6D4C4E]">30 DAYS RETURNS</h5>
                  <p className="text-[8px] text-[#6D4C4E]/70 tracking-wider font-light mt-0.5">Hassle free & easy</p>
                </div>
              </div>
            </div>

            {/* Account Utility inside drawer */}
            <Link
              href="/account"
              onClick={() => setShowMobileMenu(false)}
              className="flex items-center justify-center space-x-2 w-full py-3 bg-black hover:bg-black/90 text-white rounded-lg text-[10px] font-bold tracking-widest transition-colors uppercase"
            >
              <User size={14} />
              <span>MY ACCOUNT</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
