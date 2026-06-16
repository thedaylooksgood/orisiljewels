'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

import GlareAuto from './GlareAuto';

export function Banner() {
  const autoplay = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay.current]);
  const [isSettled, setIsSettled] = useState(true);

  const onScroll = useCallback(() => {
    setIsSettled(false);
  }, []);

  const onSettled = useCallback(() => {
    setIsSettled(true);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    
    emblaApi.on('scroll', onScroll);
    emblaApi.on('settle', onSettled);

    return () => {
      emblaApi.off('scroll', onScroll);
      emblaApi.off('settle', onSettled);
    };
  }, [emblaApi, onScroll, onSettled]);

  const handleMouseEnter = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (autoplay) autoplay.stop();
  }, [emblaApi]);

  const handleMouseLeave = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (autoplay) autoplay.play();
  }, [emblaApi]);

  return (
    <GlareAuto isSettled={isSettled} transitionDuration={2500} glareOpacity={0.25} glareAngle={135} glareColor="#ffffff" borderColor="transparent" borderRadius="0px">
      <div 
        className="w-full relative overflow-hidden" 
        ref={emblaRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex items-center">
          <div className="flex-[0_0_100%] min-w-0 relative w-full h-[calc(100vh-96px)]">
            <Image
              src="/banner_1.png"
              alt="Latest Designs Dropping Every Week"
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="flex-[0_0_100%] min-w-0 relative w-full h-[calc(100vh-96px)]">
            <Image
              src="/banner_2.webp"
              alt="New Arrivals"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </GlareAuto>
  );
}
