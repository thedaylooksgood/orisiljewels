'use client';

import React from 'react';
import { Gallery6, GalleryItem } from '@/components/ui/gallery6';

const bestsellersData: GalleryItem[] = [
  {
    id: "item-1",
    title: "Dainty Flower Ring",
    summary: "18k gold plated floral design with brilliant-cut CZ center stone. Rs. 2,250",
    url: "/products?id=1",
    image: "/home-page/our-collections/rings.png",
  },
  {
    id: "item-2",
    title: "Evil Eye Enamel Ring",
    summary: "Hand-painted navy enamel with protective eye motif & CZ sparkle. Rs. 1,850",
    url: "/products?id=2",
    image: "/home-page/our-collections/evil-eye.png",
  },
  {
    id: "item-3",
    title: "Twisted Gold Ring",
    summary: "Minimalist twisted band in high-polish sterling silver finish. Rs. 2,250",
    url: "/products?id=3",
    image: "/home-page/our-collections/necklace.png",
  },
  {
    id: "item-4",
    title: "Minimal Solitaire",
    summary: "Classic eternity band with subtle sparkle in premium 92.5 silver. Rs. 3,350",
    url: "/products?id=4",
    image: "/home-page/our-collections/bracelets.png",
  },
  {
    id: "item-5",
    title: "Dainty Pearl Ring",
    summary: "Open cuff design featuring twin freshwater pearls with lustre finish. Rs. 1,650",
    url: "/products?id=5",
    image: "/home-page/our-collections/earrings.png",
  },
];

export function Bestsellers() {
  return (
    <Gallery6 
      tagline="Most Loved"
      heading="Our Bestsellers" 
      demoUrl="/products" 
      items={bestsellersData} 
    />
  );
}