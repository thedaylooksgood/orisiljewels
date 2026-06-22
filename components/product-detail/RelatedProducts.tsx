'use client';

import React, { useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { Heart, ArrowLeft, ArrowRight } from 'lucide-react';
import type { Product } from '@/lib/products';

const TEMP_IMAGES = [
  "/home-page/our-collections/rings.png",
  "/home-page/our-collections/evil-eye.png",
  "/home-page/our-collections/necklace.png",
  "/home-page/our-collections/bracelets.png",
  "/home-page/our-collections/earrings.png"
];

interface Props {
  products: Product[];
}

export function RelatedProducts({ products }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (products.length === 0) return null;

  return (
    <div className="text-left">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#6D4C4E] font-bodoni">
          Related Products
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={scrollPrev}
            className="w-9 h-9 rounded-full border border-[rgba(224,180,184,0.5)] 
              flex items-center justify-center hover:border-[#C17F78] 
              hover:bg-[#FFF6F7] transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} className="text-[#6D4C4E]" />
          </button>
          <button
            onClick={scrollNext}
            className="w-9 h-9 rounded-full border border-[rgba(224,180,184,0.5)] 
              bg-[#6D4C4E] flex items-center justify-center hover:bg-[#C17F78] 
              transition-colors cursor-pointer"
          >
            <ArrowRight size={16} className="text-white" />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-6">
          {products.map((product, index) => (
              <div
              key={product.id}
              className="flex-none w-[calc(50%-12px)] sm:w-[calc(33.333%-16px)] 
                md:w-[calc(25%-18px)] lg:w-[calc(20%-19.2px)] xl:w-[calc(16.666%-20px)]"
            >
              <Link href={`/products/${product.id}`} className="group block">
                {/* Image */}
                <div className="relative aspect-[3/4] bg-[#F3E3E4] rounded-2xl 
                  overflow-hidden mb-3">
                  <Image
                    src={TEMP_IMAGES[index % TEMP_IMAGES.length]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-700 
                      ease-out group-hover:scale-105"
                  />
                  {/* Wishlist Heart */}
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/80 
                      backdrop-blur-sm rounded-full flex items-center justify-center 
                      hover:bg-white transition-colors cursor-pointer"
                  >
                    <Heart size={16} className="text-[#6D4C4E] 
                      hover:fill-[#C17F78] hover:text-[#C17F78] transition-colors" />
                  </button>
                </div>
                
                {/* Product Info */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-medium text-[#333333] 
                    group-hover:text-[#C17F78] transition-colors truncate">
                    {product.name}
                  </h3>
                  <span className="text-sm font-bold text-[#333333] flex-shrink-0">
                    {product.displayPrice}
                  </span>
                </div>
                
                {/* Color Swatches (mini) */}
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="w-3 h-3 rounded-full bg-[#C0C0C0] 
                    border border-gray-200" />
                  <span className="w-3 h-3 rounded-full bg-[#E0B4B8] 
                    border border-gray-200" />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
