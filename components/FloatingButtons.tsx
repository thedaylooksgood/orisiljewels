'use client';

import React, { useEffect, useState } from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';

export function FloatingButtons() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-8 right-8 flex flex-col space-y-4 z-50">
      <button 
        className="bg-[#25D366] hover:bg-[#1ebe5d] text-white p-3.5 rounded-full shadow-[0_4px_14px_rgba(37,211,102,0.4)] transition-transform hover:scale-110 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={26} strokeWidth={2.5} />
      </button>
      
      {isVisible && (
        <button 
          onClick={scrollToTop}
          className="bg-[#111827] hover:bg-[#1f2937] text-white p-3.5 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} strokeWidth={3} />
        </button>
      )}
    </div>
  );
}
