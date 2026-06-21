"use client";

import React, { useState } from 'react';
import Image from 'next/image';
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
    <div className="relative w-full flex items-center justify-center p-4 pt-4 pb-8 md:pt-6 md:pb-10 overflow-hidden">
      {/* Background Image for the whole section */}
      <Image 
        src="/budget_bg.png" 
        alt="Background" 
        fill
        priority
        className="absolute inset-0 w-full h-full object-cover z-0 blur-[4px] scale-105" 
      />
      {/* Subtle overlay to ensure the image isn't too overpowering */}
      <div className="absolute inset-0 bg-[#FFF6F7]/20 z-0 pointer-events-none"></div>

      {/* Main Container */}
      <div className="relative z-10 flex flex-col gap-4 w-full max-w-[1320px] mx-auto">
        
        {/* TOP ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          {/* LEFT BOX: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="rounded-[24px] bg-white/60 backdrop-blur-2xl border border-[#E0B4B8]/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-8 flex flex-col justify-between"
          >
            <div className="flex flex-col h-full justify-between gap-6">
              {/* Headings with staggered text animation */}
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
                }}
              >
                <motion.p variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="font-script text-[#C17F78] text-[34px] md:text-[38px] leading-none mb-2">
                  We&apos;d love to hear from you
                </motion.p>
                <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="flex items-center gap-3">
                  <h1 className="font-bodoni text-[#6D4C4E] text-[26px] md:text-[30px] font-bold tracking-widest uppercase leading-none mt-1">
                    CONTACT US
                  </h1>
                  <span className="text-[#C17F78] text-[12px] animate-pulse">✦</span>
                </motion.div>
                
                {/* Divider with Heart */}
                <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }} className="flex items-center gap-2 w-28 mt-4 mb-4">
                  <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#C17F78]/40 to-transparent"></div>
                  <span className="text-[#C17F78] text-[10px]">♥</span>
                  <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#C17F78]/40 to-transparent"></div>
                </motion.div>

                <motion.p variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="font-sans text-[#6D4C4E] text-[13px] leading-relaxed max-w-[320px] font-medium">
                  Have a question, need assistance, or just want to say hello? We&apos;re here to help you with love and care.
                </motion.p>
              </motion.div>

              {/* Contact Details List */}
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.4 } }
                }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5 font-sans mt-2"
              >
                {[
                  { icon: MapPin, title: "Visit Our Studio", content: "Shop 45, Sarojini Nagar,\nNew Delhi - 110023", href: "https://maps.google.com/?q=Ring+Road+Market,+Shop+45,+Sarojini+Nagar,+New+Delhi+-+110023" },
                  { icon: Phone, title: "Call Us", content: "+91 89888 18882", href: "tel:+918988818882" },
                  { icon: Mail, title: "Email Us", content: "orisiljewels@gmail.com", href: "mailto:orisiljewels@gmail.com" },
                  { icon: Clock, title: "Business Hours", content: "Mon - Sun\n10:00 AM - 6:00 PM", href: null }
                ].map((item, i) => (
                  <motion.div key={i} variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="flex items-start gap-3 group">
                    <div className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 border border-[#E0B4B8]/60 group-hover:scale-110 transition-transform duration-300">
                      <item.icon size={14} className="text-[#A05C5A]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-bodoni font-bold text-[#6D4C4E] text-[11px] tracking-widest uppercase mb-1">{item.title}</h4>
                      {item.href ? (
                        <a href={item.href} target={item.title === "Visit Our Studio" ? "_blank" : undefined} rel={item.title === "Visit Our Studio" ? "noreferrer" : undefined} className="block text-[#6D4C4E]/80 hover:text-[#C17F78] transition-colors text-[12px] leading-snug whitespace-pre-line font-medium">
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-[#6D4C4E]/80 text-[12px] leading-snug whitespace-pre-line font-medium">{item.content}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Socials */}
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                className="mt-2 pt-4 flex items-center gap-4 border-t border-[#6D4C4E]/10"
              >
                <span className="font-script text-[#C17F78] text-[26px] leading-none">Follow Us</span>
                <div className="flex gap-2.5">
                  {[FaInstagram, FaPinterestP, FaWhatsapp, FaEnvelope].map((Icon, idx) => (
                    <a key={idx} href="#" className="w-8 h-8 flex items-center justify-center bg-white border border-[#E0B4B8]/60 shadow-sm rounded-full hover:bg-[#A05C5A] hover:text-white text-[#A05C5A] hover:scale-110 transition-all duration-300">
                      <Icon size={12} />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT BOX: Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="rounded-[24px] bg-white/60 backdrop-blur-2xl border border-[#E0B4B8]/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-8 flex flex-col justify-between"
          >
            <motion.div 
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-[20px] md:text-[22px] font-bodoni font-bold text-[#6D4C4E] uppercase tracking-widest leading-none">
                  SEND US A MESSAGE
                </h2>
                <span className="text-[#C17F78] text-[12px] animate-pulse">✦</span>
              </div>
              <p className="text-[13px] text-[#6D4C4E]/80 font-sans leading-relaxed mb-5 font-medium">
                Fill out the form below and our team will get back to you as soon as possible.
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-3 w-full h-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C17F78]/80">
                    <User size={14} strokeWidth={1.5} />
                  </div>
                  <input
                    type="text" name="firstName" value={formData.firstName} onChange={handleChange} required
                    className="w-full pl-10 pr-4 py-3 text-[12px] bg-white border border-[#E0B4B8]/80 shadow-sm rounded-xl focus:outline-none focus:border-[#C17F78] transition-all text-[#6D4C4E] placeholder-[#6D4C4E]/60 font-sans font-medium"
                    placeholder="First Name *"
                  />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C17F78]/80">
                    <Mail size={14} strokeWidth={1.5} />
                  </div>
                  <input
                    type="email" name="email" value={formData.email} onChange={handleChange} required
                    className="w-full pl-10 pr-4 py-3 text-[12px] bg-white border border-[#E0B4B8]/80 shadow-sm rounded-xl focus:outline-none focus:border-[#C17F78] transition-all text-[#6D4C4E] placeholder-[#6D4C4E]/60 font-sans font-medium"
                    placeholder="Email Address *"
                  />
                </motion.div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C17F78]/80">
                    <Phone size={14} strokeWidth={1.5} />
                  </div>
                  <input
                    type="tel" name="phone" value={formData.phone} onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 text-[12px] bg-white border border-[#E0B4B8]/80 shadow-sm rounded-xl focus:outline-none focus:border-[#C17F78] transition-all text-[#6D4C4E] placeholder-[#6D4C4E]/60 font-sans font-medium"
                    placeholder="Phone Number"
                  />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C17F78]/80">
                    <Tag size={14} strokeWidth={1.5} />
                  </div>
                  <input
                    type="text" name="subject" value={formData.subject} onChange={handleChange} required
                    className="w-full pl-10 pr-4 py-3 text-[12px] bg-white border border-[#E0B4B8]/80 shadow-sm rounded-xl focus:outline-none focus:border-[#C17F78] transition-all text-[#6D4C4E] placeholder-[#6D4C4E]/60 font-sans font-medium"
                    placeholder="Subject *"
                  />
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="relative flex-1 min-h-[100px]">
                <div className="absolute top-3.5 left-0 pl-3.5 pointer-events-none text-[#C17F78]/80">
                  <PenLine size={14} strokeWidth={1.5} />
                </div>
                <textarea
                  name="message" value={formData.message} onChange={handleChange} required rows={3}
                  className="w-full h-full pl-10 pr-4 py-3.5 text-[12px] bg-white border border-[#E0B4B8]/80 shadow-sm rounded-xl focus:outline-none focus:border-[#C17F78] transition-all text-[#6D4C4E] placeholder-[#6D4C4E]/60 font-sans resize-none font-medium"
                  placeholder="Tell us what you need..."
                />
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                type="submit" disabled={isSubmitting}
                className="w-full py-3.5 mt-1 bg-gradient-to-r from-[#B06A68] to-[#9A504E] hover:from-[#9A504E] hover:to-[#7E3D3B] text-white rounded-xl text-[13px] font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-3 disabled:opacity-70"
              >
                <span>{isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}</span>
                {!isSubmitting && <motion.div animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}><Send size={14} className="-rotate-45" /></motion.div>}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* BOTTOM ROW: Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
          className="rounded-[24px] bg-white/60 backdrop-blur-2xl border border-[#E0B4B8]/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-5 lg:px-8 flex items-center w-full"
        >
          <div className="flex flex-wrap w-full justify-center md:justify-between items-center gap-4">
            {[
              { icon: Gem, title: "Authentic 925 Silver", subtitle: "Certified & Hallmarked" },
              { icon: ShieldCheck, title: "Secure Packaging", subtitle: "Packed with extra care" },
              { icon: Truck, title: "Fast & Reliable Shipping", subtitle: "Delivering across India" },
              { icon: Headset, title: "Customer Support", subtitle: "We're always here to assist" }
            ].map((badge, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -2 }}
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-full border border-[#E0B4B8]/80 bg-white shadow-sm flex items-center justify-center text-[#A05C5A] shrink-0 group-hover:bg-[#A05C5A] group-hover:border-[#A05C5A] group-hover:text-white transition-colors duration-300">
                  <badge.icon className="w-5 h-5" strokeWidth={1.8} />
                </div>
                <div>
                  <h5 className="text-[11px] font-bodoni font-bold text-[#6D4C4E] tracking-widest uppercase mb-0.5">{badge.title}</h5>
                  <p className="text-[10px] text-[#6D4C4E]/80 font-sans leading-tight font-medium">{badge.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
