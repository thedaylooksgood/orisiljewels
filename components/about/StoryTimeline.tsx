"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const milestones = [
  { year: 1984, title: "The Beginning", text: "A small dream founded on purity and trust." },
  { year: 1995, title: "Growing Together", text: "Thousands of families became a part of our journey." },
  { year: 2005, title: "Design Evolution", text: "Blending tradition with innovation in every collection." },
  { year: 2015, title: "Expanding Love", text: "Our designs started more hearts and celebrations." },
  { year: 2024, title: "A New Chapter", text: "Bringing our legacy online to be closer to you." },
];

function AnimatedCounter({ value, inView, delay }: { value: number, inView: boolean, delay: number }) {
  const [count, setCount] = useState(value < 1900 ? 0 : 1900);
  
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        let start = 1900;
        if (value < 1900) start = 0; // Fallback just in case
        const duration = 1000; // 1 second counting animation
        const startTime = performance.now();
        
        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Custom ease out curve for a natural slow down at the end
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const currentCount = Math.floor(start + (value - start) * easeOutQuart);
          
          setCount(currentCount);
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setCount(value);
          }
        };
        requestAnimationFrame(animate);
      }, delay * 1000);
      
      return () => clearTimeout(timer);
    }
  }, [value, inView, delay]);

  return <span>{count}</span>;
}

export function StoryTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Trigger when the timeline horizontal wrapper is fully (100%) in view.
  // We use 0.95 to account for sub-pixel browser rendering or Zoom factors.
  const isInView = useInView(timelineRef, { once: true, amount: 0.95 });

  return (
    <section className="w-full py-24 bg-[#FDFBFB] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        
        {/* Title */}
        <div className="flex flex-col items-center mb-24">
          <h2 className="text-[#4A3234] font-bodoni text-3xl md:text-4xl font-bold uppercase tracking-widest text-center">
            Our Journey So Far
          </h2>
          <div className="w-16 h-[2px] bg-[#C17F78]/60 mt-4"></div>
        </div>
        
        {/* Timeline Horizontal Container */}
        {/* Allows horizontal scrolling on very small mobile screens while maintaining layout */}
        <div 
          ref={timelineRef} 
          className="w-full overflow-x-auto hide-scrollbar pb-10"
        >
          <div className="relative min-w-[800px] w-full flex justify-between items-start">
            
            {/* The Horizontal Line Base (Faint) */}
            <div className="absolute top-[52px] -translate-y-1/2 left-[10%] w-[80%] h-[2px] bg-[#C17F78]/20 z-0"></div>
            
            {/* The Animated Progress Line (Fills on enter, once) */}
            <motion.div 
              className="absolute top-[52px] -translate-y-1/2 left-[10%] w-[80%] h-[2px] bg-[#C17F78] origin-left z-0"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            ></motion.div>

            {/* Render Nodes */}
            {milestones.map((milestone, i) => (
              <TimelineNode 
                key={i} 
                milestone={milestone} 
                index={i} 
                isInView={isInView} 
              />
            ))}
            
          </div>
        </div>

      </div>
    </section>
  );
}

function TimelineNode({ 
  milestone, 
  index, 
  isInView 
}: { 
  milestone: any; 
  index: number; 
  isInView: boolean; 
}) {
  return (
    <div className="flex flex-col items-center text-center w-1/5 relative z-10 px-2">
      
      {/* Year Counter (Bounces in) */}
      <div className="h-[40px] flex items-end justify-center mb-0">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ type: "spring", stiffness: 100, damping: 12, delay: index * 0.35 }}
          className="font-bodoni text-[#4A3234] text-2xl md:text-3xl font-bold leading-none"
        >
          <AnimatedCounter value={milestone.year} inView={isInView} delay={index * 0.35} />
        </motion.div>
      </div>

      {/* Circle Icon (Scales & Bounces in, centered in its 24px container) */}
      <div className="h-[24px] flex items-center justify-center my-0">
        <motion.div 
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.05 + (index * 0.35) }}
          className="w-[20px] h-[20px] rounded-full bg-white border-[4px] border-[#C17F78] shadow-[0_0_0_8px_rgba(193,127,120,0.15)] relative flex items-center justify-center z-10"
        >
          {/* Inner circle fill for exact styling */}
          <div className="w-[6px] h-[6px] bg-[#C17F78] rounded-full"></div>
        </motion.div>
      </div>

      {/* Content Card (Fades up with a bounce) */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ type: "spring", stiffness: 90, damping: 12, delay: 0.2 + (index * 0.35) }}
        className="mt-4 flex flex-col items-center"
      >
        <h3 className="font-bodoni text-[#4A3234] text-base md:text-lg font-bold mb-2">{milestone.title}</h3>
        <p className="font-sans text-[#6D4C4E]/80 text-[12px] md:text-[13px] leading-relaxed max-w-[160px]">
          {milestone.text}
        </p>
      </motion.div>

    </div>
  );
}
