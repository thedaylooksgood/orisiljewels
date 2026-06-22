'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Props {
  mainImage: string;
  productName: string;
}

export function ProductImageGallery({ mainImage, productName }: Props) {
  const ALL_NICE_IMAGES = [
    "/home-page/our-collections/rings.png",
    "/home-page/our-collections/evil-eye.png",
    "/home-page/our-collections/necklace.png",
    "/home-page/our-collections/bracelets.png",
    "/home-page/our-collections/earrings.png"
  ];
  
  const otherImages = ALL_NICE_IMAGES.filter(img => img !== mainImage);
  const thumbnails = [mainImage, ...otherImages].slice(0, 5);
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-4 w-full max-w-[500px]">
      {/* Thumbnails Column (vertical strip on sm and up, horizontal on mobile) */}
      <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-x-visible flex-shrink-0">
        {thumbnails.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`relative w-14 h-16 sm:w-16 sm:h-20 rounded-lg overflow-hidden 
              border-2 transition-all duration-300 flex-shrink-0 cursor-pointer
              ${selectedIndex === index 
                ? 'border-[#C17F78] shadow-sm' 
                : 'border-transparent hover:border-[#E0B4B8]'
              }`}
          >
            <Image
              src={img}
              alt={`${productName} view ${index + 1}`}
              fill
              sizes="64px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image (large) */}
      <div className="relative w-full aspect-square bg-[#F3E3E4] rounded-xl overflow-hidden group flex-1">
        <Image
          src={thumbnails[selectedIndex]}
          alt={productName}
          fill
          sizes="(max-width: 640px) 100vw, 400px"
          className="object-cover transition-transform duration-700 
            ease-out group-hover:scale-105"
          priority
        />
      </div>
    </div>
  );
}
