"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PiPlus, 
  PiMinus, 
  PiTrash, 
  PiArrowLeft, 
  PiShieldCheck, 
  PiTruck, 
  PiArrowsCounterClockwise, 
  PiTag, 
  PiLock,
  PiCheckBold
} from 'react-icons/pi';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  sku: string;
  details: string;
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "925 Sterling Silver Classic Solitaire Ring",
    price: 2499,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop",
    sku: "OJ-RNG-082-07",
    details: "Size: 7"
  },
  {
    id: 2,
    name: "Timeless Silver Infinite Love Pendant Necklace",
    price: 3299,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop",
    sku: "OJ-NKL-143-18",
    details: "Length: 18 inches"
  }
];

const FREE_SHIPPING_THRESHOLD = 5000;

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('orisil-cart');
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch (e) {
        console.error(e);
        setCartItems(initialCartItems);
      }
    } else {
      setCartItems(initialCartItems);
      localStorage.setItem('orisil-cart', JSON.stringify(initialCartItems));
      window.dispatchEvent(new Event('orisil-cart-change'));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('orisil-cart', JSON.stringify(cartItems));
      window.dispatchEvent(new Event('orisil-cart-change'));
    }
  }, [cartItems, isLoaded]);

  if (!isLoaded) {
    return (
      <div className="w-full bg-[#FDFBFB] min-h-screen py-12 md:py-20 font-sans text-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#C17F78]/30 border-t-[#C17F78] rounded-full animate-spin"></div>
          <p className="text-xs font-bold tracking-widest text-[#6D4C4E] uppercase">Loading your cart...</p>
        </div>
      </div>
    );
  }

  // Derive Subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Derive Discount
  let discount = 0;
  if (appliedPromo === "ORISIL10") {
    discount = Math.round(subtotal * 0.1);
  } else if (appliedPromo === "WELCOME500") {
    discount = Math.min(500, subtotal);
  }

  // Derive Shipping
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 150;
  
  // Tax (estimated 3% GST on silver jewellery)
  const tax = Math.round((subtotal - discount) * 0.03);

  // Total
  const total = subtotal - discount + shipping + tax;

  // Free shipping progress percent
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const missingForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  const updateQuantity = (id: number, newQty: number) => {
    if (newQty < 1) return;
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    const code = promoCode.trim().toUpperCase();

    if (code === "ORISIL10") {
      setAppliedPromo("ORISIL10");
      setPromoCode('');
    } else if (code === "WELCOME500") {
      setAppliedPromo("WELCOME500");
      setPromoCode('');
    } else {
      setPromoError("Invalid promo code. Try ORISIL10 or WELCOME500");
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
  };

  return (
    <div className="w-full bg-[#FDFBFB] min-h-screen py-12 md:py-20 font-sans text-black">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8">
        
        {/* Page Breadcrumb & Header */}
        <div className="mb-10 text-left">
          <div className="flex items-center gap-2 text-[11px] font-bold text-[#6D4C4E]/60 uppercase tracking-widest mb-3">
            <Link href="/" className="hover:text-[#C17F78] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-[#C17F78] transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-[#4A3234]">Your Cart</span>
          </div>
          <h1 className="font-bodoni text-3xl md:text-4.5xl font-bold text-[#4A3234] tracking-wide">
            Shopping Cart
          </h1>
        </div>

        <AnimatePresence mode="wait">
          {cartItems.length === 0 ? (
            <motion.div 
              key="empty-cart"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full bg-white rounded-3xl border border-[#C17F78]/15 shadow-[0_4px_25px_rgba(74,50,52,0.02)] p-12 md:p-20 flex flex-col items-center justify-center text-center max-w-2xl mx-auto mt-6"
            >
              <div className="w-20 h-20 rounded-full bg-[#C17F78]/5 flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-[#C17F78]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h2 className="font-bodoni text-2xl font-bold text-[#4A3234] mb-3">Your cart is empty</h2>
              <p className="font-sans text-[#6D4C4E]/80 text-sm leading-relaxed max-w-sm mb-8">
                Before you checkout, you must add some items to your shopping cart. You will find a lot of interesting items on our shop page.
              </p>
              <Link 
                href="/products"
                className="bg-[#C17F78] hover:bg-[#a66a63] text-white flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold tracking-widest text-xs transition-all duration-300 uppercase shadow-md hover:-translate-y-0.5"
              >
                <PiArrowLeft className="w-4 h-4" /> Start Shopping
              </Link>
            </motion.div>
          ) : (
            <motion.div 
              key="cart-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col lg:flex-row items-start gap-8"
            >
              
              {/* ================= LEFT COLUMN: CART ITEMS ================= */}
              <div className="w-full lg:w-[65%] flex flex-col gap-6">
                
                {/* Free Shipping Progress Indicator */}
                <div className="w-full bg-white rounded-2xl border border-[#C17F78]/15 shadow-[0_4px_25px_rgba(74,50,52,0.02)] p-5 md:p-6 text-left">
                  <div className="flex items-center gap-3 mb-3">
                    <PiTruck className="w-6 h-6 text-[#C17F78] flex-shrink-0" />
                    <p className="font-sans text-sm text-[#4A3234]">
                      {missingForFreeShipping > 0 ? (
                        <>
                          You are only <strong className="text-[#C17F78] font-bold">₹{missingForFreeShipping}</strong> away from <strong className="font-bold">FREE SHIPPING</strong>!
                        </>
                      ) : (
                        <strong className="text-[#C17F78] font-bold">Congratulations! You've unlocked FREE SHIPPING! 🎉</strong>
                      )}
                    </p>
                  </div>
                  {/* Progress Bar Track */}
                  <div className="w-full h-2.5 bg-[#C17F78]/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-[#C17F78] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Items List Card */}
                <div className="w-full bg-white rounded-3xl border border-[#C17F78]/15 shadow-[0_4px_25px_rgba(74,50,52,0.02)] overflow-hidden">
                  <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-5 border-b border-[#C17F78]/10 bg-[#FDFBFB] text-[11px] font-bold tracking-widest text-[#6D4C4E]/60 uppercase">
                    <div className="col-span-6 text-left">Product</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-right">Total</div>
                  </div>

                  <div className="divide-y divide-[#C17F78]/10">
                    {cartItems.map((item) => (
                      <div 
                        key={item.id}
                        className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-0 items-center px-6 md:px-8 py-6 text-left md:text-center"
                      >
                        {/* Product Detail Column */}
                        <div className="col-span-1 md:col-span-6 flex items-center gap-4">
                          {/* Image */}
                          <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl border border-[#C17F78]/10 overflow-hidden flex-shrink-0 bg-gray-50">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          {/* Details */}
                          <div className="flex flex-col items-start gap-1">
                            <h3 className="font-bodoni text-[#4A3234] text-base font-bold leading-tight hover:text-[#C17F78] transition-colors cursor-pointer">
                              {item.name}
                            </h3>
                            <span className="text-[10px] text-[#6D4C4E]/60 tracking-wider font-semibold">SKU: {item.sku}</span>
                            <span className="text-[11px] text-[#C17F78] font-medium mt-1">{item.details}</span>
                          </div>
                        </div>

                        {/* Price Column */}
                        <div className="col-span-1 md:col-span-2 flex justify-between md:justify-center items-center md:block">
                          <span className="md:hidden text-[11px] font-bold text-[#6D4C4E]/50 uppercase tracking-widest">Price</span>
                          <span className="font-sans text-[#4A3234] text-[15px] font-medium">₹{item.price}</span>
                        </div>

                        {/* Quantity Selector Column */}
                        <div className="col-span-1 md:col-span-2 flex justify-between md:justify-center items-center md:block">
                          <span className="md:hidden text-[11px] font-bold text-[#6D4C4E]/50 uppercase tracking-widest">Quantity</span>
                          <div className="flex items-center border border-[#C17F78]/20 rounded-lg overflow-hidden w-28 bg-white h-9 shadow-sm">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-9 h-full flex items-center justify-center hover:bg-[#C17F78]/5 text-[#6D4C4E] hover:text-[#C17F78] transition-all cursor-pointer"
                              disabled={item.quantity <= 1}
                            >
                              <PiMinus className="w-3.5 h-3.5" />
                            </button>
                            <span className="flex-grow text-[13px] font-bold font-sans text-[#4A3234] text-center select-none">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-9 h-full flex items-center justify-center hover:bg-[#C17F78]/5 text-[#6D4C4E] hover:text-[#C17F78] transition-all cursor-pointer"
                            >
                              <PiPlus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Total Column & Remove Trigger */}
                        <div className="col-span-1 md:col-span-2 flex justify-between md:justify-end items-center md:gap-4 md:text-right">
                          <span className="md:hidden text-[11px] font-bold text-[#6D4C4E]/50 uppercase tracking-widest">Total</span>
                          <div className="flex items-center gap-3">
                            <span className="font-sans text-[#4A3234] text-[15px] font-bold">
                              ₹{item.price * item.quantity}
                            </span>
                            {/* Remove Trigger */}
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                              aria-label="Remove item"
                            >
                              <PiTrash className="w-4.5 h-4.5" />
                            </button>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>

                  {/* Cart Footer Link */}
                  <div className="px-6 md:px-8 py-5 border-t border-[#C17F78]/10 bg-[#FDFBFB] flex justify-start">
                    <Link 
                      href="/products"
                      className="text-[#C17F78] hover:text-[#a66a63] font-bold text-xs tracking-wider flex items-center gap-1.5 uppercase transition-colors"
                    >
                      ← Continue Shopping
                    </Link>
                  </div>
                </div>

              </div>

              {/* ================= RIGHT COLUMN: ORDER SUMMARY ================= */}
              {/* Sticky layout sidebar */}
              <div className="w-full lg:w-[35%] lg:sticky lg:top-28">
                
                {/* Summary Card Container */}
                <div className="w-full bg-white rounded-3xl border border-[#C17F78]/15 shadow-[0_4px_25px_rgba(74,50,52,0.02)] p-6 md:p-8 flex flex-col text-left">
                  <h2 className="font-bodoni text-[#4A3234] text-xl md:text-2xl font-bold tracking-wide border-b border-[#C17F78]/10 pb-4 mb-6">
                    Order Summary
                  </h2>

                  {/* Summary Math Rows */}
                  <div className="space-y-4 font-sans text-sm text-[#6D4C4E]/90 border-b border-[#C17F78]/10 pb-5 mb-6">
                    
                    {/* Subtotal */}
                    <div className="flex justify-between items-center">
                      <span>Subtotal</span>
                      <span className="text-[#4A3234] font-medium">₹{subtotal}</span>
                    </div>

                    {/* Applied Promo Row */}
                    {appliedPromo && (
                      <div className="flex justify-between items-center text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-100 text-xs">
                        <div className="flex items-center gap-1">
                          <PiTag className="w-4 h-4" />
                          <span>Code <strong>{appliedPromo}</strong> Applied</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <strong>- ₹{discount}</strong>
                          <button 
                            onClick={handleRemovePromo}
                            className="text-emerald-800 hover:text-emerald-950 font-bold transition-colors cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Shipping Row */}
                    <div className="flex justify-between items-center">
                      <span>Shipping</span>
                      <span className="text-[#4A3234]">
                        {shipping === 0 ? (
                          <strong className="text-[#C17F78] font-bold">FREE</strong>
                        ) : (
                          `₹${shipping}`
                        )}
                      </span>
                    </div>

                    {/* Tax Row */}
                    <div className="flex justify-between items-center">
                      <span>Estimated GST (3%)</span>
                      <span className="text-[#4A3234]">₹{tax}</span>
                    </div>

                  </div>

                  {/* Final Total */}
                  <div className="flex justify-between items-end mb-6 font-sans">
                    <span className="text-base text-[#4A3234] font-bold">Total</span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-[#4A3234] font-sans">
                        ₹{total}
                      </span>
                      <p className="text-[10px] text-[#6D4C4E]/60 font-semibold tracking-wider uppercase mt-1">Inclusive of all taxes</p>
                    </div>
                  </div>

                  {/* Promo Code Apply Form */}
                  <form onSubmit={handleApplyPromo} className="mb-6">
                    <label className="block text-[10px] font-bold tracking-[0.15em] text-[#6D4C4E]/60 uppercase mb-2">
                      Have a Promo Code?
                    </label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="e.g. ORISIL10" 
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-grow border border-[#C17F78]/20 focus:border-[#C17F78] focus:outline-none rounded-xl px-4 py-2.5 text-xs text-black uppercase tracking-wider placeholder-gray-400 bg-gray-50 focus:bg-white transition-all select-text"
                      />
                      <button 
                        type="submit"
                        className="bg-[#C17F78] hover:bg-[#a66a63] text-white text-[10px] font-bold tracking-widest px-5 rounded-xl transition-colors uppercase cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <p className="text-red-500 text-[11px] mt-1.5 font-medium">{promoError}</p>
                    )}
                    {!appliedPromo && (
                      <p className="text-[#C17F78]/80 text-[10.5px] mt-1.5 font-medium leading-relaxed">
                        💡 Try <strong className="font-bold">ORISIL10</strong> (10% Off) or <strong className="font-bold">WELCOME500</strong> (₹500 Off)
                      </p>
                    )}
                  </form>

                  {/* Checkout Button */}
                  <button 
                    className="w-full bg-[#C17F78] hover:bg-[#a66a63] text-white flex items-center justify-center gap-2 py-4 rounded-xl font-bold tracking-widest text-[11px] transition-all duration-300 uppercase shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <PiLock className="w-4.5 h-4.5" /> Secure Checkout
                  </button>

                  {/* Accepted Payments Grid */}
                  <div className="mt-6 border-t border-[#C17F78]/10 pt-5 text-center">
                    <p className="text-[9px] font-bold tracking-widest text-[#6D4C4E]/50 uppercase mb-3">
                      WE ACCEPT
                    </p>
                    <div className="flex justify-center items-center flex-wrap gap-2.5 text-[9px] font-bold text-[#6D4C4E]/60 select-none">
                      <span className="bg-gray-100 px-2 py-1 rounded border border-gray-200">VISA</span>
                      <span className="bg-gray-100 px-2 py-1 rounded border border-gray-200">MASTERCARD</span>
                      <span className="bg-gray-100 px-2 py-1 rounded border border-gray-200">RUPAY</span>
                      <span className="bg-gray-100 px-2 py-1 rounded border border-gray-200">UPI</span>
                      <span className="bg-gray-100 px-2 py-1 rounded border border-gray-200">NETBANKING</span>
                    </div>
                  </div>

                  {/* Security trust badges list */}
                  <div className="mt-6 space-y-3.5 border-t border-[#C17F78]/10 pt-5">
                    
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#C17F78]/5 flex items-center justify-center flex-shrink-0">
                        <PiShieldCheck className="w-4 h-4 text-[#C17F78]" />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold text-[#4A3234] uppercase tracking-wider">Secure Payment Gateway</h4>
                        <p className="text-[9px] text-[#6D4C4E]/70 font-medium">SSL encryption ensures 100% data protection</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#C17F78]/5 flex items-center justify-center flex-shrink-0">
                        <PiTruck className="w-4 h-4 text-[#C17F78]" />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold text-[#4A3234] uppercase tracking-wider">Insured Safe Shipping</h4>
                        <p className="text-[9px] text-[#6D4C4E]/70 font-medium">Transit insurance covered for all silver parcels</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#C17F78]/5 flex items-center justify-center flex-shrink-0">
                        <PiArrowsCounterClockwise className="w-4 h-4 text-[#C17F78]" />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold text-[#4A3234] uppercase tracking-wider">Hassle-Free Returns</h4>
                        <p className="text-[9px] text-[#6D4C4E]/70 font-medium">Easy return policy & 92.5% lifetime buy-back</p>
                      </div>
                    </div>

                  </div>

                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
