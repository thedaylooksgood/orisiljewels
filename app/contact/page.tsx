"use client";

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, User, Tag, PenLine, Gem, ShieldCheck, Truck, Headset } from 'lucide-react';
import { FaInstagram, FaPinterestP, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Message sent successfully! We will get back to you soon.');
      setFormData({ firstName: '', email: '', phone: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="bg-[#FFF6F7] min-h-screen w-full flex items-center justify-center p-4">
      {/* Strict container: 1320px wide, exactly 480px high */}
      <div className="flex flex-col gap-4 w-full max-w-[1320px] h-[480px]">
        
        {/* TOP ROW: Two Boxes (Height: approx 380px) */}
        <div className="grid grid-cols-2 gap-4 h-[380px]">
          
          {/* LEFT BOX: Contact Info & Background Image */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-[20px] shadow-sm relative overflow-hidden p-6 lg:p-8 flex flex-col justify-between h-full border border-[rgba(224,180,184,0.3)]"
            style={{ 
              backgroundImage: "url('/contact-box.png')", 
              backgroundSize: "cover", 
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}
          >
            <div className="absolute inset-0 bg-white/10 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col h-full justify-between">
              {/* Headings */}
              <div>
                <p className="font-script text-[#C17F78] text-[34px] leading-none mb-1">
                  We&apos;d love to hear from you
                </p>
                <div className="flex items-center gap-3">
                  <h1 className="font-bodoni text-[#6D4C4E] text-[26px] font-bold tracking-widest uppercase leading-none mt-1">
                    CONTACT US
                  </h1>
                  <span className="text-[#C17F78] text-[10px]">✦</span>
                </div>
                
                {/* Divider with Heart */}
                <div className="flex items-center gap-2 w-28 mt-2 mb-3">
                  <div className="flex-1 h-[1px] bg-[#6D4C4E]/20"></div>
                  <span className="text-[#C17F78] text-[8px]">♥</span>
                  <div className="flex-1 h-[1px] bg-[#6D4C4E]/20"></div>
                </div>

                <p className="font-sans text-[#6D4C4E]/80 text-[12px] leading-snug max-w-[280px]">
                  Have a question, need assistance, or just want to say hello? We&apos;re here to help you with love and care.
                </p>
              </div>

              {/* Contact Details List */}
              <div className="grid grid-cols-2 gap-x-2 gap-y-3 font-sans mt-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#E0B4B8]/20 flex items-center justify-center shrink-0 border border-[#C17F78]/30">
                    <MapPin size={14} className="text-[#A05C5A]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-bodoni font-bold text-[#6D4C4E] text-[11px] tracking-widest uppercase mb-0.5">Visit Our Studio</h4>
                    <a href="https://maps.google.com/?q=Ring+Road+Market,+Shop+45,+Sarojini+Nagar,+New+Delhi+-+110023" target="_blank" rel="noreferrer" className="block text-[#6D4C4E]/80 hover:text-[#C17F78] transition-colors text-[11px] leading-tight max-w-[160px]">
                      Shop 45, Sarojini Nagar,<br />New Delhi - 110023
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#E0B4B8]/20 flex items-center justify-center shrink-0 border border-[#C17F78]/30">
                    <Phone size={14} className="text-[#A05C5A]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-bodoni font-bold text-[#6D4C4E] text-[11px] tracking-widest uppercase mb-0.5">Call Us</h4>
                    <a href="tel:+918988818882" className="block text-[#6D4C4E]/80 hover:text-[#C17F78] transition-colors text-[11px]">+91 89888 18882</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#E0B4B8]/20 flex items-center justify-center shrink-0 border border-[#C17F78]/30">
                    <Mail size={14} className="text-[#A05C5A]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-bodoni font-bold text-[#6D4C4E] text-[11px] tracking-widest uppercase mb-0.5">Email Us</h4>
                    <a href="mailto:orisiljewels@gmail.com" className="block text-[#6D4C4E]/80 hover:text-[#C17F78] transition-colors text-[11px]">orisiljewels@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#E0B4B8]/20 flex items-center justify-center shrink-0 border border-[#C17F78]/30">
                    <Clock size={14} className="text-[#A05C5A]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-bodoni font-bold text-[#6D4C4E] text-[11px] tracking-widest uppercase mb-0.5">Business Hours</h4>
                    <p className="text-[#6D4C4E]/80 text-[11px] leading-tight">Mon - Sun<br />10:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className="mt-2 pt-2 flex items-center gap-4 border-t border-[#6D4C4E]/10">
                <span className="font-script text-[#C17F78] text-[26px] leading-none">Follow Us</span>
                <div className="flex gap-2">
                  <a href="#" className="w-7 h-7 flex items-center justify-center bg-[#E0B4B8]/20 border border-[#C17F78]/30 rounded-full hover:bg-[#A05C5A] hover:text-white text-[#A05C5A] transition-all"><FaInstagram size={12} /></a>
                  <a href="#" className="w-7 h-7 flex items-center justify-center bg-[#E0B4B8]/20 border border-[#C17F78]/30 rounded-full hover:bg-[#A05C5A] hover:text-white text-[#A05C5A] transition-all"><FaPinterestP size={12} /></a>
                  <a href="#" className="w-7 h-7 flex items-center justify-center bg-[#E0B4B8]/20 border border-[#C17F78]/30 rounded-full hover:bg-[#A05C5A] hover:text-white text-[#A05C5A] transition-all"><FaWhatsapp size={13} /></a>
                  <a href="#" className="w-7 h-7 flex items-center justify-center bg-[#E0B4B8]/20 border border-[#C17F78]/30 rounded-full hover:bg-[#A05C5A] hover:text-white text-[#A05C5A] transition-all"><FaEnvelope size={11} /></a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT BOX: Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#FCF5F5] rounded-[20px] border border-[rgba(224,180,184,0.4)] shadow-sm p-6 lg:p-8 flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-[20px] font-bodoni font-bold text-[#6D4C4E] uppercase tracking-widest leading-none">
                  SEND US A MESSAGE
                </h2>
                <span className="text-[#C17F78] text-[12px]">✦</span>
              </div>
              <p className="text-[12px] text-[#6D4C4E]/70 font-sans leading-snug mb-4">
                Fill out the form below and our team will get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-3 w-full">
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#C17F78]/70">
                    <User size={14} strokeWidth={1.5} />
                  </div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full pl-9 pr-3 py-2.5 text-[12px] bg-transparent border border-[#E0B4B8]/60 rounded-xl focus:outline-none focus:border-[#A05C5A] focus:bg-white/50 transition-all text-[#6D4C4E] placeholder-[#6D4C4E]/50 font-sans"
                    placeholder="First Name *"
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#C17F78]/70">
                    <Mail size={14} strokeWidth={1.5} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-9 pr-3 py-2.5 text-[12px] bg-transparent border border-[#E0B4B8]/60 rounded-xl focus:outline-none focus:border-[#A05C5A] focus:bg-white/50 transition-all text-[#6D4C4E] placeholder-[#6D4C4E]/50 font-sans"
                    placeholder="Email Address *"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#C17F78]/70">
                    <Phone size={14} strokeWidth={1.5} />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2.5 text-[12px] bg-transparent border border-[#E0B4B8]/60 rounded-xl focus:outline-none focus:border-[#A05C5A] focus:bg-white/50 transition-all text-[#6D4C4E] placeholder-[#6D4C4E]/50 font-sans"
                    placeholder="Phone Number"
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#C17F78]/70">
                    <Tag size={14} strokeWidth={1.5} />
                  </div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full pl-9 pr-3 py-2.5 text-[12px] bg-transparent border border-[#E0B4B8]/60 rounded-xl focus:outline-none focus:border-[#A05C5A] focus:bg-white/50 transition-all text-[#6D4C4E] placeholder-[#6D4C4E]/50 font-sans"
                    placeholder="Subject *"
                  />
                </div>
              </div>

              <div className="relative">
                <div className="absolute top-3 left-0 pl-3 pointer-events-none text-[#C17F78]/70">
                  <PenLine size={14} strokeWidth={1.5} />
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full pl-9 pr-3 py-3 text-[12px] bg-transparent border border-[#E0B4B8]/60 rounded-xl focus:outline-none focus:border-[#A05C5A] focus:bg-white/50 transition-all text-[#6D4C4E] placeholder-[#6D4C4E]/50 font-sans resize-none"
                  placeholder="Tell us what you need..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 mt-1 bg-[#B06A68] hover:bg-[#6D4C4E] text-white rounded-xl text-[12px] font-bold tracking-[0.15em] uppercase transition-colors duration-300 shadow flex items-center justify-center gap-2 disabled:opacity-70"
              >
                <span>{isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}</span>
                {!isSubmitting && <Send size={14} className="-rotate-45 ml-1" />}
              </button>
            </form>
          </motion.div>
        </div>

        {/* BOTTOM ROW: Badges (Height: 84px) */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-[#FCF5F5] border border-[rgba(224,180,184,0.4)] rounded-[20px] shadow-sm px-10 h-[84px] flex items-center w-full"
        >
          <div className="flex w-full justify-between items-center">
            
            {/* Badge 1 */}
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full border border-[#C17F78]/30 bg-transparent flex items-center justify-center text-[#A05C5A] shrink-0">
                <Gem className="w-5 h-5" strokeWidth={1.2} />
              </div>
              <div>
                <h5 className="text-[11px] font-bodoni font-bold text-[#6D4C4E] tracking-widest uppercase mb-0.5">Authentic 925 Silver</h5>
                <p className="text-[10px] text-[#6D4C4E]/70 font-sans leading-tight">Certified & Hallmarked</p>
              </div>
            </div>

            {/* Badge 2 */}
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full border border-[#C17F78]/30 bg-transparent flex items-center justify-center text-[#A05C5A] shrink-0">
                <ShieldCheck className="w-5 h-5" strokeWidth={1.2} />
              </div>
              <div>
                <h5 className="text-[11px] font-bodoni font-bold text-[#6D4C4E] tracking-widest uppercase mb-0.5">Secure Packaging</h5>
                <p className="text-[10px] text-[#6D4C4E]/70 font-sans leading-tight">Packed with extra care</p>
              </div>
            </div>

            {/* Badge 3 */}
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full border border-[#C17F78]/30 bg-transparent flex items-center justify-center text-[#A05C5A] shrink-0">
                <Truck className="w-5 h-5" strokeWidth={1.2} />
              </div>
              <div>
                <h5 className="text-[11px] font-bodoni font-bold text-[#6D4C4E] tracking-widest uppercase mb-0.5">Fast & Reliable Shipping</h5>
                <p className="text-[10px] text-[#6D4C4E]/70 font-sans leading-tight">Delivering across India</p>
              </div>
            </div>

            {/* Badge 4 */}
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full border border-[#C17F78]/30 bg-transparent flex items-center justify-center text-[#A05C5A] shrink-0">
                <Headset className="w-5 h-5" strokeWidth={1.2} />
              </div>
              <div>
                <h5 className="text-[11px] font-bodoni font-bold text-[#6D4C4E] tracking-widest uppercase mb-0.5">Customer Support</h5>
                <p className="text-[10px] text-[#6D4C4E]/70 font-sans leading-tight">We&apos;re always here to assist</p>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
}
