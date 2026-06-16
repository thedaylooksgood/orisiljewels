'use client';

import React, { useState, useMemo, startTransition } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { 
  Filter, 
  X, 
  ChevronDown, 
  Search, 
  SlidersHorizontal,
  Grid3X3,
  List,
  RefreshCw,
  ShoppingBag
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  displayPrice: string;
  image: string;
  category: string;
  isNewArrival?: boolean;
  isBestseller?: boolean;
  available?: boolean;
  badge?: string;
}

// 151 Live products database
const ALL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Orisil Jewels 925 Sterling Silver Adjustable Ring for Women | CZ Sparkling Design | BIS Hallmarked | Silver & Rose Gold Colour | Gift for Women and Girls",
    price: 1999,
    displayPrice: "Rs. 1,999.00",
    image: "/best sellers/4.png",
    category: "Men's Rings",
    isNewArrival: true,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 2,
    name: "Elegant Rose-Bud Design Silver Toe Rings (Pair) – Article No. OJS06-1125-166-203",
    price: 1600,
    displayPrice: "Rs. 1,600.00",
    image: "/instagram shop/2.jpg",
    category: "Toe Rings",
    isNewArrival: true,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 3,
    name: "Elegant Sparkling Adjustable Toe Rings (Bichhiya)",
    price: 1600,
    displayPrice: "Rs. 1,600.00",
    image: "/New arrivals/3.jpg",
    category: "Toe Rings",
    isNewArrival: true,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 4,
    name: "Elegant Heart Pendant Necklace (92.5 Sterling Silver)",
    price: 2000,
    displayPrice: "Rs. 2,000.00",
    image: "/Our Collections/5.png",
    category: "Necklaces/Pendants",
    isNewArrival: true,
    isBestseller: false,
    available: false,
    badge: "Sold out"
  },
  {
    id: 5,
    name: "Crystal Butterfly Necklace & Earrings Set",
    price: 3500,
    displayPrice: "Rs. 3,500.00",
    image: "/Our Collections/3.png",
    category: "Earrings",
    isNewArrival: true,
    isBestseller: false,
    available: false,
    badge: "Sold out"
  },
  {
    id: 6,
    name: "Orisil Jewels™ Star-Shaped Mother of Pearl Necklace & Earrings Set in 92.5 Silver.",
    price: 3500,
    displayPrice: "Rs. 3,500.00",
    image: "/instagram shop/1.jpg",
    category: "Earrings",
    isNewArrival: true,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 7,
    name: "Orisil Jewels™ Oceanic Enamel Silver Toe Rings",
    price: 1300,
    displayPrice: "Rs. 1,300.00",
    image: "/best sellers/8.png",
    category: "Toe Rings",
    isNewArrival: true,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 8,
    name: "Orisil Jewels™ Braided Infinity Silver Toe Rings",
    price: 1700,
    displayPrice: "Rs. 1,700.00",
    image: "/instagram shop/2.jpg",
    category: "Toe Rings",
    isNewArrival: true,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 9,
    name: "Orisil Jewels™ 925 Sterling Silver Ethnic Toe Rings",
    price: 1400,
    displayPrice: "Rs. 1,400.00",
    image: "/New arrivals/3.jpg",
    category: "Toe Rings",
    isNewArrival: true,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 10,
    name: "Orisil Jewels™ 925 Sterling Silver Adjustable Toe Rings – Geometric Circle Design",
    price: 900,
    displayPrice: "Rs. 900.00",
    image: "/best sellers/8.png",
    category: "Toe Rings",
    isNewArrival: true,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 11,
    name: "Contemporary Dual-Tone Silver Circular Hoops",
    price: 3200,
    displayPrice: "Rs. 3,200.00",
    image: "/instagram shop/1.jpg",
    category: "Earrings",
    isNewArrival: true,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 12,
    name: "Exquisite Square Drop Dual-Tone Silver Earrings",
    price: 4900,
    displayPrice: "Rs. 4,900.00",
    image: "/instagram shop/5.jpg",
    category: "Earrings",
    isNewArrival: true,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 13,
    name: "Elegant Dual-Tone Silver Hoop Earrings",
    price: 3500,
    displayPrice: "Rs. 3,500.00",
    image: "/New arrivals/5.jpg",
    category: "Earrings",
    isNewArrival: true,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 14,
    name: "Elegant Pink Stud Silver Hoop Earrings ✨",
    price: 3500,
    displayPrice: "Rs. 3,500.00",
    image: "/best sellers/2.jpg",
    category: "Earrings",
    isNewArrival: true,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 15,
    name: "Elegant Spider Motif Drop Earrings",
    price: 4100,
    displayPrice: "Rs. 4,100.00",
    image: "/Our Collections/3.png",
    category: "Earrings",
    isNewArrival: true,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 16,
    name: "Orisil Jewels Majestic Floral Bloom Statement Ring – 92.5 Sterling Silver.",
    price: 3990,
    displayPrice: "Rs. 3,990.00",
    image: "/best sellers/7.jpg",
    category: "Men's Rings",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 17,
    name: "Exquisite Diamond-Style Sunburst Statement Ring in White Gold Finish",
    price: 2350,
    displayPrice: "Rs. 2,350.00",
    image: "/best sellers/4.png",
    category: "Men's Rings",
    isNewArrival: false,
    isBestseller: false,
    available: false,
    badge: "Sold out"
  },
  {
    id: 18,
    name: "Orisil Jewels Heart-in-Bloom Statement Ring – 92.5 Sterling Silver",
    price: 3450,
    displayPrice: "Rs. 3,450.00",
    image: "/best sellers/5.png",
    category: "Men's Rings",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 19,
    name: "Orisil Jewels Premium 92.5 Sterling Silver",
    price: 3375,
    displayPrice: "Rs. 3,375.00",
    image: "/best sellers/6.png",
    category: "Rings",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 20,
    name: "Orisil Jewels Pastel Multi-Stone Eternity Ring – 92.5 Sterling Silver",
    price: 1400,
    displayPrice: "Rs. 1,400.00",
    image: "/best sellers/8.png",
    category: "Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 21,
    name: "Exquisite Criss-Cross Pavé Silver Ring 💍",
    price: 2800,
    displayPrice: "Rs. 2,800.00",
    image: "/best sellers/9.jpg",
    category: "Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 22,
    name: "Elegant Sterling Silver Criss-Cross Ring",
    price: 2200,
    displayPrice: "Rs. 2,200.00",
    image: "/best sellers/10.png",
    category: "Rings",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 23,
    name: "Rose Gold Finish Multi-Layered Designer Ring",
    price: 3900,
    displayPrice: "Rs. 3,900.00",
    image: "/New arrivals/1.jpg",
    category: "Rings",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 24,
    name: "Elegant Wave Triple-Band Silver Ring",
    price: 3450,
    displayPrice: "Rs. 3,450.00",
    image: "/New arrivals/2.jpg",
    category: "Rings",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 25,
    name: "Elegant Gold Double-Band Diamond Ring",
    price: 3100,
    displayPrice: "Rs. 3,100.00",
    image: "/New arrivals/3.jpg",
    category: "Rings",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 26,
    name: "Orisil Electrifying Lightning Motif Statement Ring",
    price: 2350,
    displayPrice: "Rs. 2,350.00",
    image: "/best sellers/5.png",
    category: "Men's Rings",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 27,
    name: "Orisil Playful Heart-Skull Motif Statement Ring",
    price: 2200,
    displayPrice: "Rs. 2,200.00",
    image: "/New arrivals/2.jpg",
    category: "Men's Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 28,
    name: "Orisil Contemporary Gold-Finished Enamel Bypass Band",
    price: 3100,
    displayPrice: "Rs. 3,100.00",
    image: "/best sellers/1.jpg",
    category: "Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 29,
    name: "Orisil Contemporary Enamel Silver Wave Band",
    price: 1300,
    displayPrice: "Rs. 1,300.00",
    image: "/best sellers/2.jpg",
    category: "Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 30,
    name: "Vibrant Enamel Knot Ring",
    price: 1575,
    displayPrice: "Rs. 1,575.00",
    image: "/best sellers/3.jpg",
    category: "Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 31,
    name: "Orisil Contemporary Gold-Finished Crystal Band",
    price: 3500,
    displayPrice: "Rs. 3,500.00",
    image: "/best sellers/4.png",
    category: "Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 32,
    name: "Orisil Minimalist Solitaire Sterling Silver Ring",
    price: 2950,
    displayPrice: "Rs. 2,950.00",
    image: "/best sellers/5.png",
    category: "Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 33,
    name: "Orisil Multi-Gemstone Sterling Silver Ring",
    price: 1450,
    displayPrice: "Rs. 1,450.00",
    image: "/best sellers/6.png",
    category: "Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 34,
    name: "Orisil Heart-Enamel Sterling Silver Ring",
    price: 1870,
    displayPrice: "Rs. 1,870.00",
    image: "/best sellers/8.png",
    category: "Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 35,
    name: "Orisil Elegant Dual-Tone Sterling Silver Ring",
    price: 2099,
    displayPrice: "Rs. 2,099.00",
    image: "/best sellers/9.jpg",
    category: "Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 36,
    name: "Enchanting Lock & Key Charm Ring",
    price: 1499,
    displayPrice: "Rs. 1,499.00",
    image: "/best sellers/10.png",
    category: "Rings",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 37,
    name: "Radiant 925 Sterling Silver Solitaire Halo Ring",
    price: 1499,
    displayPrice: "Rs. 1,499.00",
    image: "/best sellers/4.png",
    category: "Men's Rings",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 38,
    name: "Timeless 925 Sterling Silver Wrap Ring",
    price: 2550,
    displayPrice: "Rs. 2,550.00",
    image: "/New arrivals/2.jpg",
    category: "Rings",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 39,
    name: "Orisil Jewels™ | 92.5 Sterling Silver Statement Ring",
    price: 2265,
    displayPrice: "Rs. 2,265.00",
    image: "/New arrivals/2.jpg",
    category: "Men's Rings",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 40,
    name: "Stealing Silver Sunburst ring",
    price: 2199,
    displayPrice: "Rs. 2,199.00",
    image: "/instagram shop/1.jpg",
    category: "Rings",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 41,
    name: "Sparkling Multi-Layer Criss-Cross Ring",
    price: 3300,
    displayPrice: "Rs. 3,300.00",
    image: "/instagram shop/2.jpg",
    category: "Rings",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 42,
    name: "Orisil Jewels™ | 92.5 Sterling Silver Designer Ring",
    price: 3200,
    displayPrice: "Rs. 3,200.00",
    image: "/best sellers/1.jpg",
    category: "Rings",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 43,
    name: "Elegant V-Shaped Crown Sterling Silver Ring",
    price: 1550,
    displayPrice: "Rs. 1,550.00",
    image: "/best sellers/2.jpg",
    category: "Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 44,
    name: "Sparkling Pink &amp; White Pave-Set Band Ring",
    price: 2450,
    displayPrice: "Rs. 2,450.00",
    image: "/best sellers/3.jpg",
    category: "Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 45,
    name: "Contemporary Geometric Pavé 92.5 Sterling Silver Adjustable Rings",
    price: 1499,
    displayPrice: "Rs. 1,499.00",
    image: "/best sellers/4.png",
    category: "Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 46,
    name: "Contemporary Geometric Pavé Adjustable 92.5 Sterling Silver Ring",
    price: 1499,
    displayPrice: "Rs. 1,499.00",
    image: "/best sellers/5.png",
    category: "Rings",
    isNewArrival: false,
    isBestseller: true,
    available: false,
    badge: "Sold out"
  },
  {
    id: 47,
    name: "Exquisite 925 Sterling Silver Chevron Lace Ring",
    price: 1499,
    displayPrice: "Rs. 1,499.00",
    image: "/best sellers/6.png",
    category: "Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 48,
    name: "Exquisite Geometric Link Statement 92.5 Sterling Silver Ring",
    price: 1499,
    displayPrice: "Rs. 1,499.00",
    image: "/best sellers/7.jpg",
    category: "Men's Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 49,
    name: "92.5 Sterling Silver \"Floral Vine\" Signature Ring",
    price: 1499,
    displayPrice: "Rs. 1,499.00",
    image: "/best sellers/9.jpg",
    category: "Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 50,
    name: "Elegant Heart & Stone Silver Toe Rings",
    price: 1999,
    displayPrice: "Rs. 1,999.00",
    image: "/instagram shop/2.jpg",
    category: "Toe Rings",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 51,
    name: "Elegant Adjustable Silver Toe Rings",
    price: 1800,
    displayPrice: "Rs. 1,800.00",
    image: "/New arrivals/3.jpg",
    category: "Toe Rings",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 52,
    name: "Elegant Heart 92.5 Silver Toe Rings",
    price: 1990,
    displayPrice: "Rs. 1,990.00",
    image: "/best sellers/8.png",
    category: "Toe Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 53,
    name: "Elegant Adjustable Solitaire Ring",
    price: 1490,
    displayPrice: "Rs. 1,490.00",
    image: "/New arrivals/3.jpg",
    category: "Rings",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 54,
    name: "Elegant Adjustable Silver Solitaire Ring 💍",
    price: 1490,
    displayPrice: "Rs. 1,490.00",
    image: "/instagram shop/1.jpg",
    category: "Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 55,
    name: "Elegant Adjustable Silver Ring for Women",
    price: 1490,
    displayPrice: "Rs. 1,490.00",
    image: "/New arrivals/2.jpg",
    category: "Men's Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 56,
    name: "Elegant Heart 92.5 Silver Toe Rings",
    price: 1900,
    displayPrice: "Rs. 1,900.00",
    image: "/instagram shop/2.jpg",
    category: "Toe Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 57,
    name: "Elegant Heart 92.5 Silver Toe Rings",
    price: 1900,
    displayPrice: "Rs. 1,900.00",
    image: "/New arrivals/3.jpg",
    category: "Toe Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 58,
    name: "Floral Radiance Silver Toe Rings",
    price: 1990,
    displayPrice: "Rs. 1,990.00",
    image: "/best sellers/8.png",
    category: "Toe Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 59,
    name: "Emerald Elegance Silver Toe Rings",
    price: 2000,
    displayPrice: "Rs. 2,000.00",
    image: "/instagram shop/2.jpg",
    category: "Toe Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 60,
    name: "925 Sterling Silver Toe Rings",
    price: 2000,
    displayPrice: "Rs. 2,000.00",
    image: "/New arrivals/3.jpg",
    category: "Toe Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 61,
    name: "Adorable Honey Bee Enamel Toe Rings (92.5 Silver)",
    price: 2000,
    displayPrice: "Rs. 2,000.00",
    image: "/best sellers/8.png",
    category: "Toe Rings",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 62,
    name: "Vibrant Butterfly Enamel Toe Rings (92.5 Silver)",
    price: 2400,
    displayPrice: "Rs. 2,400.00",
    image: "/instagram shop/2.jpg",
    category: "Toe Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 63,
    name: "Sparkling Solitaire & Leaf Pendant Necklace (92.5 Silver)",
    price: 2600,
    displayPrice: "Rs. 2,600.00",
    image: "/best sellers/1.jpg",
    category: "Necklaces/Pendants",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 64,
    name: "Elegant Pearl Halo Pendant Necklace (92.5 Silver)",
    price: 1600,
    displayPrice: "Rs. 1,600.00",
    image: "/Our Collections/5.png",
    category: "Necklaces/Pendants",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 65,
    name: "Sparkling Vintage Car Pendant Necklace",
    price: 2400,
    displayPrice: "Rs. 2,400.00",
    image: "/instagram shop/5.jpg",
    category: "Necklaces/Pendants",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 66,
    name: "Sparkling Devil Pendant Necklace",
    price: 3750,
    displayPrice: "Rs. 3,750.00",
    image: "/New arrivals/5.jpg",
    category: "Necklaces/Pendants",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 67,
    name: "Premium 92.5 Sterling Silver Necklace",
    price: 5550,
    displayPrice: "Rs. 5,550.00",
    image: "/best sellers/1.jpg",
    category: "Necklaces/Pendants",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 68,
    name: "Exquisite 92.5 Sterling Silver Multi-Charm Anklet 💎✨",
    price: 4800,
    displayPrice: "Rs. 4,800.00",
    image: "/instagram shop/4.jpg",
    category: "Ladies Anklets",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 69,
    name: "Exquisite Silver Colorful Stone Charms Anklet 💎✨",
    price: 6990,
    displayPrice: "Rs. 6,990.00",
    image: "/New arrivals/4.jpg",
    category: "Ladies Anklets",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 70,
    name: "Exquisite 92.5 Sterling Silver Medallion Anklet 💎✨",
    price: 8080,
    displayPrice: "Rs. 8,080.00",
    image: "/best sellers/9.jpg",
    category: "Ladies Anklets",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 71,
    name: "Exquisite 92.5 Sterling Silver Drop Charm Anklet 💎✨",
    price: 10600,
    displayPrice: "Rs. 10,600.00",
    image: "/instagram shop/4.jpg",
    category: "Ladies Anklets",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 72,
    name: "Exquisite 92.5 Sterling Silver Floral Charm Anklet 💎✨",
    price: 6650,
    displayPrice: "Rs. 6,650.00",
    image: "/New arrivals/4.jpg",
    category: "Ladies Anklets",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 73,
    name: "Exquisite 92.5 Sterling Silver Floral Charm Anklet 💎✨",
    price: 9550,
    displayPrice: "Rs. 9,550.00",
    image: "/best sellers/9.jpg",
    category: "Ladies Anklets",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 74,
    name: "Exquisite 92.5 Sterling Silver Evil Eye Charms Anklet 💎✨",
    price: 4100,
    displayPrice: "Rs. 4,100.00",
    image: "/best sellers/9.jpg",
    category: "Evil Eye Collection",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 75,
    name: "Exquisite 92.5 Silver Charm Anklet 💎",
    price: 4550,
    displayPrice: "Rs. 4,550.00",
    image: "/New arrivals/4.jpg",
    category: "Ladies Anklets",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 76,
    name: "Designer Silver Toe Rings (92.5 Purity).",
    price: 1900,
    displayPrice: "Rs. 1,900.00",
    image: "/best sellers/8.png",
    category: "Toe Rings",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 77,
    name: "Designer Silver Toe Rings (92.5 Purity)",
    price: 2200,
    displayPrice: "Rs. 2,200.00",
    image: "/instagram shop/2.jpg",
    category: "Toe Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 78,
    name: "Designer Silver Toe Rings (92.5 Purity)",
    price: 2680,
    displayPrice: "Rs. 2,680.00",
    image: "/New arrivals/3.jpg",
    category: "Toe Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 79,
    name: "Elite 92.5 Sterling Silver Multi-Stone Cluster Men's Ring.",
    price: 2799,
    displayPrice: "Rs. 2,799.00",
    image: "/New arrivals/2.jpg",
    category: "Men's Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 80,
    name: "Exquisite 92.5 Sterling Silver Modern Solitaire Men's Ring.",
    price: 3170,
    displayPrice: "Rs. 3,170.00",
    image: "/best sellers/7.jpg",
    category: "Men's Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 81,
    name: "92.5 Sterling Silver Modern Solitaire Gents Ring.",
    price: 2610,
    displayPrice: "Rs. 2,610.00",
    image: "/best sellers/4.png",
    category: "Men's Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 82,
    name: "92.5 Sterling Silver Modern Geometric Onyx Gents Ring.",
    price: 3399,
    displayPrice: "Rs. 3,399.00",
    image: "/best sellers/7.jpg",
    category: "Men's Chains",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 83,
    name: "92.5 Sterling Silver Bold Onyx Statement Gents Ring.",
    price: 3470,
    displayPrice: "Rs. 3,470.00",
    image: "/New arrivals/2.jpg",
    category: "Men's Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 84,
    name: "92.5 Sterling Silver Classic Rectangular Gents Ring",
    price: 1950,
    displayPrice: "Rs. 1,950.00",
    image: "/best sellers/7.jpg",
    category: "Men's Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 85,
    name: "92.5 Sterling Silver Sleek Diagonal Pattern Gents Ring.",
    price: 2750,
    displayPrice: "Rs. 2,750.00",
    image: "/best sellers/4.png",
    category: "Men's Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 86,
    name: "92.5 Sterling Silver Modern Link Gents Ring.",
    price: 3350,
    displayPrice: "Rs. 3,350.00",
    image: "/best sellers/5.png",
    category: "Men's Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 87,
    name: "92.5 Sterling Silver Geometric Gents Ring...",
    price: 3050,
    displayPrice: "Rs. 3,050.00",
    image: "/New arrivals/2.jpg",
    category: "Men's Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 88,
    name: "92.5 Sterling Silver Evil Eye Curb Link Bracelet",
    price: 4025,
    displayPrice: "Rs. 4,025.00",
    image: "/Our Collections/1.png",
    category: "Evil Eye Collection",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 89,
    name: "Sterling Silver Baby Nazariya Bangles (92.5 Chandi)",
    price: 4440,
    displayPrice: "Rs. 4,440.00",
    image: "/best sellers/10.png",
    category: "Evil Eye Collection",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 90,
    name: "Sterling Silver Baby Nazariya Bangles (92.5 Chandi)",
    price: 4400,
    displayPrice: "Rs. 4,400.00",
    image: "/best sellers/9.jpg",
    category: "Evil Eye Collection",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 91,
    name: "92.5 Sterling Silver Adjustable Baby Nazariya (Evil Eye)",
    price: 3200,
    displayPrice: "Rs. 3,200.00",
    image: "/instagram shop/3.jpg",
    category: "Evil Eye Collection",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 92,
    name: "92.5 Sterling Silver Adjustable Baby Kada",
    price: 7100,
    displayPrice: "Rs. 7,100.00",
    image: "/Our Collections/2.png",
    category: "Kids Silver Jewellery",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 93,
    name: "92.5 Sterling Silver Adjustable Baby Kada",
    price: 7250,
    displayPrice: "Rs. 7,250.00",
    image: "/best sellers/1.jpg",
    category: "Kids Silver Jewellery",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 94,
    name: "92.5 Sterling Silver Adjustable Baby Kada.",
    price: 4960,
    displayPrice: "Rs. 4,960.00",
    image: "/best sellers/2.jpg",
    category: "Kids Silver Jewellery",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 95,
    name: "🌙 925 Sterling Silver Baby Moon &amp; Diamond Adjustable Kada (Pair).",
    price: 6750,
    displayPrice: "Rs. 6,750.00",
    image: "/Our Collections/2.png",
    category: "Kids Silver Jewellery",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 96,
    name: "92.5 Sterling Silver Elegant Woven Ladies Chain",
    price: 4500,
    displayPrice: "Rs. 4,500.00",
    image: "/New arrivals/2.jpg",
    category: "Ladies Chains",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 97,
    name: "92.5 Sterling Silver Sleek Flat-Link Gents Chain",
    price: 7400,
    displayPrice: "Rs. 7,400.00",
    image: "/best sellers/7.jpg",
    category: "Men's Chains",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 98,
    name: "92.5 Sterling Silver Multi-Charm Playful Fancy Chain",
    price: 4200,
    displayPrice: "Rs. 4,200.00",
    image: "/instagram shop/3.jpg",
    category: "Ladies Chains",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 99,
    name: "92.5 Sterling Silver Crystal Fancy Chain",
    price: 6600,
    displayPrice: "Rs. 6,600.00",
    image: "/New arrivals/2.jpg",
    category: "Ladies Chains",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 100,
    name: "92.5 Sterling Silver Sleek Twisted Chain",
    price: 2420,
    displayPrice: "Rs. 2,420.00",
    image: "/best sellers/7.jpg",
    category: "Ladies Chains",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 101,
    name: "92.5 Sterling Silver Sleek Snake Chain",
    price: 5450,
    displayPrice: "Rs. 5,450.00",
    image: "/instagram shop/3.jpg",
    category: "Ladies Chains",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 102,
    name: "92.5 Sterling Silver Sleek Snake Chain.",
    price: 3799,
    displayPrice: "Rs. 3,799.00",
    image: "/New arrivals/2.jpg",
    category: "Ladies Chains",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 103,
    name: "92.5 Sterling Silver Modern Textured Link Chain",
    price: 13500,
    displayPrice: "Rs. 13,500.00",
    image: "/best sellers/7.jpg",
    category: "Men's Chains",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 104,
    name: "92.5 Sterling Silver Classic Rope Chain.",
    price: 17500,
    displayPrice: "Rs. 17,500.00",
    image: "/instagram shop/4.jpg",
    category: "Men's Chains",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 105,
    name: "92.5 Sterling Silver Modern Curb Link Chain.",
    price: 11700,
    displayPrice: "Rs. 11,700.00",
    image: "/New arrivals/1.jpg",
    category: "Men's Chains",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 106,
    name: "92.5 Sterling Silver Modern Geometric Link Chain.",
    price: 10900,
    displayPrice: "Rs. 10,900.00",
    image: "/best sellers/7.jpg",
    category: "Men's Chains",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 107,
    name: "92.5 Sterling Silver Modern Geometric Link Chain",
    price: 17000,
    displayPrice: "Rs. 17,000.00",
    image: "/instagram shop/4.jpg",
    category: "Men's Chains",
    isNewArrival: false,
    isBestseller: true,
    available: false,
    badge: "Sold out"
  },
  {
    id: 108,
    name: "92.5 Sterling Silver Animal Enamel Drop Earrings",
    price: 1250,
    displayPrice: "Rs. 1,250.00",
    image: "/New arrivals/5.jpg",
    category: "Earrings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 109,
    name: "92.5 Sterling Silver Cherry Enamel Drop Earrings",
    price: 1700,
    displayPrice: "Rs. 1,700.00",
    image: "/best sellers/2.jpg",
    category: "Earrings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 110,
    name: "Sparkling Silver Oval Hoop Earrings",
    price: 2700,
    displayPrice: "Rs. 2,700.00",
    image: "/Our Collections/3.png",
    category: "Earrings",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 111,
    name: "Orisil Jewels: Nature’s Grace Floral Pink Dangles",
    price: 4400,
    displayPrice: "Rs. 4,400.00",
    image: "/instagram shop/1.jpg",
    category: "Earrings",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 112,
    name: "Orisil Jewels: Ethereal Rose-Tinted Teardrop Dangles",
    price: 2570,
    displayPrice: "Rs. 2,570.00",
    image: "/instagram shop/5.jpg",
    category: "Earrings",
    isNewArrival: false,
    isBestseller: false,
    available: false,
    badge: "Sold out"
  },
  {
    id: 113,
    name: "Orisil Jewels: Gold-Plated 92.5 Silver Celestial Necklace",
    price: 1990,
    displayPrice: "Rs. 1,990.00",
    image: "/instagram shop/5.jpg",
    category: "Necklaces/Pendants",
    isNewArrival: false,
    isBestseller: true,
    available: false,
    badge: "Sold out"
  },
  {
    id: 114,
    name: "Orisil Jewels: Iconic 92.5 Silver Pave Heart Drops Earring.",
    price: 3699,
    displayPrice: "Rs. 3,699.00",
    image: "/best sellers/2.jpg",
    category: "Earrings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 115,
    name: "Orisil Jewels: Iconic 92.5 Silver Turquoise Statement Drops Earring.",
    price: 5800,
    displayPrice: "Rs. 5,800.00",
    image: "/Our Collections/3.png",
    category: "Earrings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 116,
    name: "Orisil Jewels: Iconic 92.5 Silver Geometric Studs Earring.",
    price: 1999,
    displayPrice: "Rs. 1,999.00",
    image: "/instagram shop/1.jpg",
    category: "Earrings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 117,
    name: "Orisil Jewels: Elegant 92.5 Sterling Silver Long Drop Earrings",
    price: 1999,
    displayPrice: "Rs. 1,999.00",
    image: "/instagram shop/5.jpg",
    category: "Earrings",
    isNewArrival: false,
    isBestseller: true,
    available: false,
    badge: "Sold out"
  },
  {
    id: 118,
    name: "Orisil Jewels: Royal Purple Forest Signet Ring",
    price: 2400,
    displayPrice: "Rs. 2,400.00",
    image: "/best sellers/8.png",
    category: "Rings",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 119,
    name: "Orisil Jewels: Radiant Sunflower Heart Signet Ring",
    price: 2550,
    displayPrice: "Rs. 2,550.00",
    image: "/best sellers/9.jpg",
    category: "Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 120,
    name: "Orisil Jewels: Vibrant Evil Eye Protection Band",
    price: 1800,
    displayPrice: "Rs. 1,800.00",
    image: "/Our Collections/1.png",
    category: "Evil Eye Collection",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 121,
    name: "Orisil Jewels: Minimalist Sunburst Adjustable Ring.",
    price: 1500,
    displayPrice: "Rs. 1,500.00",
    image: "/New arrivals/1.jpg",
    category: "Rings",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 122,
    name: "Orisil Jewels: Royal Emerald Bloom Floral Ring Elevate your elegance with our Royal Emerald Bloom Floral Ring.",
    price: 2500,
    displayPrice: "Rs. 2,500.00",
    image: "/New arrivals/2.jpg",
    category: "Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 123,
    name: "Orisil Jewels: Modern Harmony Ring Crafted with Pure 92.5 Sterling Silver",
    price: 1299,
    displayPrice: "Rs. 1,299.00",
    image: "/New arrivals/3.jpg",
    category: "Rings",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 124,
    name: "Orisil Jewels: Classic Solitaire Sparkle Ring Crafted with Pure 92.5 Sterling Silver",
    price: 1499,
    displayPrice: "Rs. 1,499.00",
    image: "/instagram shop/1.jpg",
    category: "Rings",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 125,
    name: "Orisil Jewels: Dainty Four-Leaf Clover Sparkle Ring Crafted with Pure 92.5 Sterling Silver",
    price: 1299,
    displayPrice: "Rs. 1,299.00",
    image: "/instagram shop/2.jpg",
    category: "Rings",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 126,
    name: "Orisil Jewels: Elegant Pink Floral Lattice Statement Ring Crafted with Pure 92.5 Sterling Silver",
    price: 4900,
    displayPrice: "Rs. 4,900.00",
    image: "/best sellers/5.png",
    category: "Men's Rings",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 127,
    name: "Orisil Jewels: Elegant Multilayer Colorful Fusion Ring Made with Pure 92.5 Silver",
    price: 3499,
    displayPrice: "Rs. 3,499.00",
    image: "/best sellers/2.jpg",
    category: "Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 128,
    name: "Orisil Jewels: Elegant Criss-Cross Purple Sparkle Ring Made with Pure 92.5 Silver",
    price: 3900,
    displayPrice: "Rs. 3,900.00",
    image: "/best sellers/3.jpg",
    category: "Rings",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 129,
    name: "Orisil Jewels: Silver Butterfly &amp; Flower Ring Crafted in 92.5 Silver",
    price: 1499,
    displayPrice: "Rs. 1,499.00",
    image: "/best sellers/4.png",
    category: "Rings",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 130,
    name: "The Azure Horizon: 925 Sterling Silver Signature Bracelet",
    price: 2499,
    displayPrice: "Rs. 2,499.00",
    image: "/Our Collections/4.png",
    category: "Bracelets",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 131,
    name: "Exquisite 925 Sterling Silver Two-Tone Crescent Bracelet.",
    price: 3999,
    displayPrice: "Rs. 3,999.00",
    image: "/instagram shop/3.jpg",
    category: "Bracelets",
    isNewArrival: false,
    isBestseller: true,
    available: false,
    badge: "Sold out"
  },
  {
    id: 132,
    name: "Iconic 925 Sterling Silver Nail Bracelet",
    price: 8800,
    displayPrice: "Rs. 8,800.00",
    image: "/instagram shop/4.jpg",
    category: "Bracelets",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 133,
    name: "Personalized \"S\" Initial Adjustable Snake Chain Charm Bracelet – Tri-Tone Edition",
    price: 6799,
    displayPrice: "Rs. 6,799.00",
    image: "/New arrivals/4.jpg",
    category: "Bracelets",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 134,
    name: "Orisil Jewels 925 Sterling Silver Triple Heart Crystal Bangle Bracelet – Hinged Spring Design (2.5 Inches)",
    price: 6799,
    displayPrice: "Rs. 6,799.00",
    image: "/best sellers/6.png",
    category: "Bracelets",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 135,
    name: "92.5 Silver Elevate your style with this exquisite Silver Open Cuff Bracelet",
    price: 5550,
    displayPrice: "Rs. 5,550.00",
    image: "/Our Collections/4.png",
    category: "Bracelets",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 136,
    name: "Baby Anklet 🐟✨Swimmingly Cute! 🐟✨",
    price: 6490,
    displayPrice: "Rs. 6,490.00",
    image: "/best sellers/9.jpg",
    category: "Ladies Anklets",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 137,
    name: "Baby Anklet(Cool Cat 😺 Charm)",
    price: 3450,
    displayPrice: "Rs. 3,450.00",
    image: "/instagram shop/4.jpg",
    category: "Ladies Anklets",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 138,
    name: "✨ Chamakta Sitara for Your Little One! ✨",
    price: 4399,
    displayPrice: "Rs. 4,399.00",
    image: "/New arrivals/4.jpg",
    category: "Ladies Anklets",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 139,
    name: "Baby Anklet(Chhum Chhum happiness! 🐘✨)",
    price: 6400,
    displayPrice: "Rs. 6,400.00",
    image: "/best sellers/9.jpg",
    category: "Ladies Anklets",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 140,
    name: "Little smiles 😊 Silver Anklet",
    price: 5790,
    displayPrice: "Rs. 5,790.00",
    image: "/instagram shop/4.jpg",
    category: "Ladies Anklets",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 141,
    name: "Premium Floral Ruby-Accent Adjustable Ring🌸✨",
    price: 6400,
    displayPrice: "Rs. 6,400.00",
    image: "/best sellers/2.jpg",
    category: "Rings",
    isNewArrival: false,
    isBestseller: true,
    available: false,
    badge: "Sold out"
  },
  {
    id: 142,
    name: "Snow Queen Ring",
    price: 2900,
    displayPrice: "Rs. 2,900.00",
    image: "/best sellers/3.jpg",
    category: "Rings",
    isNewArrival: false,
    isBestseller: false,
    available: false,
    badge: "Sold out"
  },
  {
    id: 143,
    name: "Gift Wrap",
    price: 50,
    displayPrice: "Rs. 50.00",
    image: "/best sellers/4.png",
    category: "Rings",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 144,
    name: "Orisil Jewels: Elegant Geometric Mosaic Ring Crafted in 92.5 Silver",
    price: 1499,
    displayPrice: "Rs. 1,499.00",
    image: "/best sellers/5.png",
    category: "Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 145,
    name: "Orisil Jewels: Two-Tone Regal Ribbon Statement Ring Crafted with Pure 92.5 Sterling Silver",
    price: 3790,
    displayPrice: "Rs. 3,790.00",
    image: "/best sellers/4.png",
    category: "Men's Rings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 146,
    name: "Elegant Silver &amp; Black Crystal Cuff Bracelet with Easy-Open Spring Hinge (Size 2.2)",
    price: 8350,
    displayPrice: "Rs. 8,350.00",
    image: "/instagram shop/3.jpg",
    category: "Bracelets",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
  {
    id: 147,
    name: "Peacock Shape German Silver Adjustable Toe Ring",
    price: 2680,
    displayPrice: "Rs. 2,680.00",
    image: "/New arrivals/3.jpg",
    category: "Toe Rings",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 148,
    name: "Prism Cut Chain",
    price: 17000,
    displayPrice: "Rs. 17,000.00",
    image: "/best sellers/7.jpg",
    category: "Ladies Chains",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 149,
    name: "Gemstone",
    price: 4490,
    displayPrice: "Rs. 4,490.00",
    image: "/New arrivals/1.jpg",
    category: "Rings",
    isNewArrival: false,
    isBestseller: false,
    available: true,
    badge: undefined
  },
  {
    id: 150,
    name: "92.5 Sterling Silver Luxury Interlocking Circle Earrings",
    price: 3100,
    displayPrice: "Rs. 3,100.00",
    image: "/Our Collections/3.png",
    category: "Earrings",
    isNewArrival: false,
    isBestseller: true,
    available: false,
    badge: "Sold out"
  },
  {
    id: 151,
    name: "Orisil Jewels: 92.5 Silver Radiant Emerald-Cut Crystal Hoop Drops",
    price: 4490,
    displayPrice: "Rs. 4,490.00",
    image: "/instagram shop/1.jpg",
    category: "Earrings",
    isNewArrival: false,
    isBestseller: true,
    available: true,
    badge: undefined
  },
];

const CATEGORIES = [
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

export function ProductsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read URL query states
  const categoryParam = searchParams.get('category') || '';
  const filterParam = searchParams.get('filter') || '';
  const minPriceParam = searchParams.get('minPrice') || '';
  const maxPriceParam = searchParams.get('maxPrice') || '';
  const idParam = searchParams.get('id') || '';
  const searchParam = searchParams.get('search') || '';
  const sortParam = searchParams.get('sort') || 'featured';

  // Helper to extract category from collections slug path
  const pathCategory = useMemo(() => {
    const parts = pathname.split('/');
    const colIndex = parts.indexOf('collections');
    if (colIndex !== -1 && parts[colIndex + 1]) {
      const slug = parts[colIndex + 1].toLowerCase();
      if (slug === 'evil-eye') return 'Evil Eye Collection';
      if (slug === 'rings') return 'Rings';
      if (slug === 'earrings') return 'Earrings';
      if (slug === 'bracelets') return 'Bracelets';
      if (slug === 'necklaces-pendants') return 'Necklaces/Pendants';
      if (slug === 'ladies-anklets') return 'Ladies Anklets';
      if (slug === 'toe-rings') return 'Toe Rings';
      if (slug === 'ladies-chains') return 'Ladies Chains';
      if (slug === 'mens-rings') return "Men's Rings";
      if (slug === 'mens-chains') return "Men's Chains";
      if (slug === 'kids-silver-jewellery') return 'Kids Silver Jewellery';
    }
    return '';
  }, [pathname]);

  const activeCategory = categoryParam || pathCategory;

  // Slug helper for collection routing
  const getSlugFromCategory = (cat: string) => {
    const c = cat.toLowerCase();
    if (c === 'evil eye collection') return 'evil-eye';
    if (c === 'necklaces/pendants') return 'necklaces-pendants';
    if (c === "men's rings") return 'mens-rings';
    if (c === "men's chains") return 'mens-chains';
    return c.replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  // Component states
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [addedToCartToast, setAddedToCartToast] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Availability filters state
  const [availability, setAvailability] = useState({
    inStock: false,
    outOfStock: false
  });

  // Dynamically calculate the maximum price limit of the current collection/category
  const maxPriceLimit = useMemo(() => {
    let list = ALL_PRODUCTS;
    if (activeCategory) {
      list = list.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
    }
    if (filterParam === 'new-arrivals') {
      list = list.filter(p => p.isNewArrival);
    } else if (filterParam === 'bestseller') {
      list = list.filter(p => p.isBestseller);
    }
    if (list.length === 0) return 10000;
    return Math.max(...list.map(p => p.price));
  }, [activeCategory, filterParam]);

  // Price Range Slider State initialized from URL params or collection defaults
  const priceRangeMinVal = useMemo(() => {
    const val = parseInt(minPriceParam);
    return isNaN(val) ? 0 : val;
  }, [minPriceParam]);

  const priceRangeMaxVal = useMemo(() => {
    const val = parseInt(maxPriceParam);
    return isNaN(val) ? maxPriceLimit : val;
  }, [maxPriceParam, maxPriceLimit]);

  const [priceRange, setPriceRange] = useState({ min: priceRangeMinVal, max: priceRangeMaxVal });

  // Handle URL state changes helper
  const updateUrlParams = (updates: Record<string, string | null>) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === '') {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };



  // Trigger add to cart feedback
  const handleAddToCart = (productName: string) => {
    setAddedToCartToast(productName);
    setTimeout(() => {
      setAddedToCartToast(null);
    }, 3000);
  };

  // Filtered & Sorted products calculation
  const filteredProducts = useMemo(() => {
    let result = [...ALL_PRODUCTS];

    // Filter by ID (from Instagram shop links)
    if (idParam) {
      const targetId = parseInt(idParam);
      if (!isNaN(targetId)) {
        return result.filter(p => p.id === targetId);
      }
    }

    // Filter by category
    if (activeCategory) {
      result = result.filter(
        p => p.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    // Filter by filter query (new-arrivals / bestseller)
    if (filterParam === 'new-arrivals') {
      result = result.filter(p => p.isNewArrival);
    } else if (filterParam === 'bestseller') {
      result = result.filter(p => p.isBestseller);
    }

    // Filter by availability
    if (availability.inStock && !availability.outOfStock) {
      result = result.filter(p => p.available);
    } else if (availability.outOfStock && !availability.inStock) {
      result = result.filter(p => !p.available);
    }

    // Filter by price range slider
    result = result.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

    // Filter by search query
    if (searchParam) {
      const query = searchParam.toLowerCase();
      result = result.filter(
        p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
      );
    }

    // Sorting logic
    if (sortParam === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortParam === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortParam === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortParam === 'name-desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [activeCategory, filterParam, availability, priceRange, idParam, searchParam, sortParam]);

  // Sidebar Popular Products List (Grab first 3 Bestsellers)
  const popularProducts = useMemo(() => {
    return ALL_PRODUCTS.filter(p => p.isBestseller && p.available).slice(0, 3);
  }, []);

  // Clear all filters
  const handleClearAll = () => {
    setAvailability({ inStock: false, outOfStock: false });
    setPriceRange({ min: 0, max: maxPriceLimit });
    router.push(pathname);
  };

  // Search submit
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchVal = formData.get('search') as string;
    updateUrlParams({ search: searchVal || null });
  };

  return (
    <div className="w-full bg-white min-h-screen text-slate-800 font-sans pb-24">
      {/* Toast Notification */}
      {addedToCartToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-[#2a1733] text-white text-xs md:text-sm font-semibold tracking-wider px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-3 animate-fade-in border border-white/10">
          <ShoppingBag size={16} className="text-yellow-400" />
          <span>Added &ldquo;{addedToCartToast}&rdquo; to your cart!</span>
        </div>
      )}

      {/* Main Listing Area */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-8">
        
        {/* Two-Column Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Sidebar: Filter Panel (Desktop only) */}
          <aside className="hidden lg:flex flex-col w-[22%] flex-none space-y-8 sticky top-20 border-r border-slate-100 pr-6">
            
            {/* Categories list (screenshot style) */}
            <div className="bg-white py-2">
              <h3 className="text-[13px] font-black uppercase tracking-[0.15em] text-slate-900 mb-4 border-b border-slate-100 pb-2.5">
                Categories
              </h3>
              <div className="flex flex-col space-y-3.5 text-xs text-slate-600 font-light">
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        const slug = getSlugFromCategory(cat);
                        router.push(`/collections/${slug}`);
                      }}
                      className={`text-left transition-colors cursor-pointer hover:text-[#2a1733] ${
                        isActive 
                          ? 'text-[#2a1733] font-bold text-[13px]' 
                          : 'text-slate-600 hover:font-medium'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Availability checks (screenshot style) */}
            <div className="bg-white py-2">
              <h3 className="text-[13px] font-black uppercase tracking-[0.15em] text-slate-900 mb-4 border-b border-slate-100 pb-2.5">
                Availability
              </h3>
              <div className="flex flex-col space-y-3.5 text-xs font-light text-slate-600">
                <label className="flex items-center space-x-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={availability.inStock}
                    onChange={(e) => setAvailability(prev => ({ ...prev, inStock: e.target.checked }))}
                    className="w-4 h-4 border border-slate-300 rounded-sm bg-white accent-[#2a1733] focus:outline-none cursor-pointer"
                  />
                  <span>In stock</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={availability.outOfStock}
                    onChange={(e) => setAvailability(prev => ({ ...prev, outOfStock: e.target.checked }))}
                    className="w-4 h-4 border border-slate-300 rounded-sm bg-white accent-[#2a1733] focus:outline-none cursor-pointer"
                  />
                  <span>Out of stock</span>
                </label>
              </div>
            </div>

            {/* Price Dual-Range Slider (screenshot style) */}
            <div key={`${activeCategory}-${maxPriceLimit}`} className="bg-white py-2">
              <h3 className="text-[13px] font-black uppercase tracking-[0.15em] text-slate-900 mb-2 border-b border-slate-100 pb-2.5">
                Price
              </h3>
              
              {/* Labels above handles */}
              <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400 mt-2 px-1">
                <span>₹0</span>
                <span>₹{maxPriceLimit}</span>
              </div>

              {/* Slider tracks */}
              <div className="relative w-full h-1 bg-slate-200 rounded-lg my-4">
                <div 
                  className="absolute h-full bg-slate-800 rounded"
                  style={{
                    left: `${(priceRange.min / maxPriceLimit) * 100}%`,
                    right: `${100 - (priceRange.max / maxPriceLimit) * 100}%`
                  }}
                />
                <input
                  type="range"
                  min="0"
                  max={maxPriceLimit}
                  value={priceRange.min}
                  onChange={(e) => {
                    const val = Math.min(Number(e.target.value), priceRange.max - 100);
                    setPriceRange(prev => ({ ...prev, min: val }));
                  }}
                  className="absolute w-full h-1 -top-0 left-0 appearance-none pointer-events-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-slate-800 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-slate-800 [&::-moz-range-thumb]:cursor-pointer"
                />
                <input
                  type="range"
                  min="0"
                  max={maxPriceLimit}
                  value={priceRange.max}
                  onChange={(e) => {
                    const val = Math.max(Number(e.target.value), priceRange.min + 100);
                    setPriceRange(prev => ({ ...prev, max: val }));
                  }}
                  className="absolute w-full h-1 -top-0 left-0 appearance-none pointer-events-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-slate-800 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-slate-800 [&::-moz-range-thumb]:cursor-pointer"
                />
              </div>

              {/* Price text values at bottom */}
              <div className="flex justify-between items-center text-xs font-semibold text-slate-800 mt-2 px-1">
                <span>₹{priceRange.min}</span>
                <span>₹{priceRange.max}</span>
              </div>
            </div>

            {/* Popular Products Widget (screenshot style) */}
            <div className="bg-white py-2">
              <h3 className="text-[13px] font-black uppercase tracking-[0.15em] text-slate-900 mb-4 border-b border-slate-100 pb-2.5">
                Popular Products
              </h3>
              <div className="flex flex-col space-y-4">
                {popularProducts.map((p) => (
                  <div key={p.id} className="flex items-center space-x-3 group cursor-pointer" onClick={() => updateUrlParams({ id: String(p.id) })}>
                    <div className="relative w-14 h-14 bg-slate-50 rounded-lg overflow-hidden flex-none">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center min-w-0">
                      <span className="text-[11px] font-medium text-slate-700 hover:text-[#2a1733] transition-colors line-clamp-2 leading-snug">
                        {p.name}
                      </span>
                      <span className="text-xs font-black text-slate-900 mt-1">
                        Rs. {p.price.toLocaleString()}.00
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Search Input */}
            <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#2a1733] mb-3">Search</h3>
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  name="search"
                  key={searchParam}
                  type="text"
                  placeholder="Find jewellery..."
                  defaultValue={searchParam}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg py-2 pl-3 pr-9 focus:outline-none focus:border-[#2a1733] transition-colors"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#2a1733] cursor-pointer">
                  <Search size={15} />
                </button>
              </form>
            </div>

            {/* Clear All Filters Button */}
            {(categoryParam || filterParam || availability.inStock || availability.outOfStock || priceRange.min > 0 || priceRange.max < maxPriceLimit || searchParam || idParam) && (
              <button
                onClick={handleClearAll}
                className="w-full flex items-center justify-center gap-2 border border-dashed border-[#2a1733]/30 hover:border-[#2a1733] text-slate-600 hover:text-[#2a1733] font-bold text-xs tracking-wider uppercase py-3 rounded-lg transition-colors cursor-pointer"
              >
                <RefreshCw size={13} />
                Clear All Filters
              </button>
            )}
          </aside>

          {/* Right Area: Catalog Title, Filters Row & Products Grid */}
          <div className="flex-1 w-full lg:w-[78%]">
            
            {/* Header / Breadcrumb / Title Row (screenshot style) */}
            <div className="flex flex-col gap-1 mb-6">
              {/* Breadcrumb path */}
              <div className="text-[11px] tracking-wider text-slate-400 font-medium flex items-center space-x-2.5">
                <span className="hover:text-slate-800 cursor-pointer transition-colors" onClick={() => router.push('/')}>Home</span>
                <span>&gt;</span>
                <span className="text-slate-500 font-semibold uppercase">{activeCategory || "All Products"}</span>
              </div>

              {/* Category main title */}
              <h2 className="text-xl md:text-2xl font-black tracking-widest text-slate-900 uppercase mt-2.5">
                {activeCategory || "All Products"}
              </h2>

              {/* Controls bar (screenshot style) */}
              <div className="flex justify-between items-center border-y border-slate-100 py-3 mt-4 text-xs font-semibold text-slate-500">
                <div className="flex items-center space-x-4">
                  {/* Grid/List icons */}
                  <div className="flex items-center space-x-2.5">
                    <button 
                      onClick={() => setViewMode('grid')}
                      className={`p-1 transition-colors cursor-pointer ${viewMode === 'grid' ? 'text-[#2a1733]' : 'text-slate-400 hover:text-slate-700'}`}
                      title="Grid View"
                    >
                      <Grid3X3 size={17} strokeWidth={2.5} />
                    </button>
                    <button 
                      onClick={() => setViewMode('list')}
                      className={`p-1 transition-colors cursor-pointer ${viewMode === 'list' ? 'text-[#2a1733]' : 'text-slate-400 hover:text-slate-700'}`}
                      title="List View"
                    >
                      <List size={17} strokeWidth={2.5} />
                    </button>
                  </div>
                  
                  {/* Results Text */}
                  <span className="text-slate-500 font-medium tracking-wide">
                    Showing: {filteredProducts.length > 0 ? `1-${filteredProducts.length}` : '0'} of {filteredProducts.length} Results
                  </span>
                </div>

                {/* Sort selection */}
                <div className="flex items-center space-x-2">
                  <div className="relative group">
                    <select
                      value={sortParam}
                      onChange={(e) => updateUrlParams({ sort: e.target.value })}
                      className="appearance-none bg-[#f6f6f6] border-0 text-slate-700 font-medium py-2 pl-4 pr-10 rounded-sm focus:outline-none cursor-pointer text-[11px] md:text-xs"
                    >
                      <option value="featured">Best Selling</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="name-asc">Alphabetically: A-Z</option>
                      <option value="name-desc">Alphabetically: Z-A</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile filters toggle button (Mobile only) */}
            <div className="lg:hidden flex items-center justify-between gap-4 p-3 bg-slate-50 border border-slate-100 rounded-lg mb-6">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="flex items-center gap-2 bg-[#2a1733] text-white font-bold text-[10px] uppercase tracking-wider py-2 px-3.5 rounded cursor-pointer"
              >
                <SlidersHorizontal size={13} />
                Filters
              </button>
              <span className="text-[11px] font-semibold text-slate-500">
                {filteredProducts.length} Results
              </span>
            </div>

            {/* Active filters indicators tags row */}
            {(categoryParam || filterParam || availability.inStock || availability.outOfStock || priceRange.min > 0 || priceRange.max < maxPriceLimit || searchParam || idParam) && (
              <div className="flex flex-wrap gap-2 mb-6 items-center">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mr-1.5">Filters:</span>
                
                {searchParam && (
                  <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-3 py-1 rounded flex items-center gap-1.5">
                    Search: &ldquo;{searchParam}&rdquo;
                    <X size={12} className="cursor-pointer hover:text-red-500" onClick={() => updateUrlParams({ search: null })} />
                  </span>
                )}
                
                {categoryParam && (
                  <span className="bg-slate-100 text-[#2a1733] text-[10px] font-bold px-3 py-1 rounded flex items-center gap-1.5 uppercase tracking-wide">
                    {categoryParam}
                    <X size={12} className="cursor-pointer hover:text-red-500" onClick={() => updateUrlParams({ category: null })} />
                  </span>
                )}

                {filterParam && (
                  <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-3 py-1 rounded flex items-center gap-1.5 uppercase tracking-wide">
                    {filterParam.replace('-', ' ')}
                    <X size={12} className="cursor-pointer hover:text-red-500" onClick={() => updateUrlParams({ filter: null })} />
                  </span>
                )}

                {(availability.inStock || availability.outOfStock) && (
                  <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-3 py-1 rounded flex items-center gap-1.5">
                    Availability: {availability.inStock ? 'In Stock' : ''} {availability.outOfStock ? 'Out of Stock' : ''}
                    <X size={12} className="cursor-pointer hover:text-red-500" onClick={() => setAvailability({ inStock: false, outOfStock: false })} />
                  </span>
                )}

                {(priceRange.min > 0 || priceRange.max < maxPriceLimit) && (
                  <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-3 py-1 rounded flex items-center gap-1.5">
                    Price: ₹{priceRange.min} - ₹{priceRange.max}
                    <X size={12} className="cursor-pointer hover:text-red-500" onClick={() => setPriceRange({ min: 0, max: maxPriceLimit })} />
                  </span>
                )}

                {idParam && (
                  <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-3 py-1 rounded flex items-center gap-1.5">
                    Product ID: {idParam}
                    <X size={12} className="cursor-pointer hover:text-red-500" onClick={() => updateUrlParams({ id: null })} />
                  </span>
                )}

                <button
                  onClick={handleClearAll}
                  className="text-red-500 hover:text-red-700 text-[9px] font-black tracking-wider uppercase ml-1 cursor-pointer transition-colors"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Products grid */}
            {filteredProducts.length === 0 ? (
              <div className="w-full bg-slate-50 border border-slate-100 rounded-xl py-24 px-6 text-center flex flex-col items-center justify-center">
                <SlidersHorizontal size={40} className="text-slate-300 mb-4 animate-pulse" />
                <h3 className="text-base font-bold text-slate-700 mb-1">No Jewellery Matches Your Search</h3>
                <p className="text-xs text-slate-400 max-w-sm mb-6 font-light leading-relaxed">
                  Try adjusting or clearing your filters to discover our stunning sterling silver creations.
                </p>
                <button
                  onClick={handleClearAll}
                  className="bg-[#2a1733] hover:bg-[#3d224b] text-white text-[11px] font-bold uppercase tracking-widest py-3 px-8 rounded transition-colors cursor-pointer"
                >
                  Show All Collection
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              
              /* Grid View (4 columns, screenshot layout) */
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col bg-white group rounded-md overflow-hidden pb-2 relative"
                  >
                    {/* Image Container (square aspect-ratio) */}
                    <div className="relative w-full aspect-square overflow-hidden bg-slate-50 rounded-lg">
                      
                      {/* Sold out badge */}
                      {product.badge === 'Sold out' && (
                        <span className="bg-black text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full absolute top-3.5 left-3.5 z-10">
                          Sold out
                        </span>
                      )}

                      {/* Product Image */}
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>

                    {/* Product Details Centered */}
                    <div className="flex flex-col pt-4 text-center items-center">
                      {/* Product title */}
                      <h3 className="text-xs md:text-[13px] font-medium text-slate-800 hover:text-[#2a1733] transition-colors leading-relaxed truncate w-full px-1">
                        {product.name}
                      </h3>
                      
                      {/* Product price */}
                      <span className="mt-1.5 text-xs md:text-sm font-semibold text-slate-900">
                        {product.displayPrice}
                      </span>

                      {/* Add to Cart button */}
                      <button 
                        onClick={() => handleAddToCart(product.name)}
                        className="mt-4 w-full bg-[#2a1733] hover:bg-[#3d224b] text-white text-[11px] font-black uppercase tracking-widest py-3 rounded transition-colors cursor-pointer focus:outline-none"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              
              /* List View (1 column) */
              <div className="flex flex-col space-y-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col sm:flex-row bg-white border border-slate-100 rounded-xl p-4 gap-6 items-center group hover:shadow-xs transition-shadow"
                  >
                    {/* Image Container */}
                    <div className="relative w-36 h-36 bg-slate-50 rounded-lg overflow-hidden flex-none">
                      {product.badge === 'Sold out' && (
                        <span className="bg-black text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded absolute top-2 left-2 z-10">
                          Sold out
                        </span>
                      )}
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="144px"
                        className="object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 text-center sm:text-left">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{product.category}</span>
                      <h3 className="text-sm font-bold text-slate-800 mt-1 hover:text-[#2a1733] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 font-light leading-relaxed">
                        Handcrafted in 92.5 Sterling Silver. Certification and Hallmarking details provided with purchase.
                      </p>
                      <div className="text-sm font-black text-slate-900 mt-2.5">
                        {product.displayPrice}
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex-none w-full sm:w-auto">
                      <button 
                        onClick={() => handleAddToCart(product.name)}
                        className="w-full sm:w-44 bg-[#2a1733] hover:bg-[#3d224b] text-white text-[11px] font-black uppercase tracking-widest py-3 px-6 rounded transition-colors cursor-pointer"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Side Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileFilterOpen(false)}
          />

          <div className="relative ml-0 mr-auto flex h-full w-full max-w-xs flex-col bg-white py-6 px-5 shadow-xl transition-transform duration-300 overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#2a1733] flex items-center gap-2">
                <Filter size={16} /> Filters
              </h2>
              <button 
                onClick={() => setMobileFilterOpen(false)}
                className="text-slate-400 hover:text-slate-800 p-1 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Categories list */}
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Categories</h3>
              <div className="flex flex-col space-y-2.5 text-xs font-light">
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        const slug = getSlugFromCategory(cat);
                        router.push(`/collections/${slug}`);
                        setMobileFilterOpen(false);
                      }}
                      className={`text-left py-1 ${isActive ? 'text-[#2a1733] font-bold' : 'text-slate-600'}`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Availability */}
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Availability</h3>
              <div className="flex flex-col space-y-3 text-xs font-light text-slate-600">
                <label className="flex items-center space-x-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={availability.inStock}
                    onChange={(e) => setAvailability(prev => ({ ...prev, inStock: e.target.checked }))}
                    className="w-4 h-4 border border-slate-300 rounded bg-white accent-[#2a1733] cursor-pointer"
                  />
                  <span>In stock</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={availability.outOfStock}
                    onChange={(e) => setAvailability(prev => ({ ...prev, outOfStock: e.target.checked }))}
                    className="w-4 h-4 border border-slate-300 rounded bg-white accent-[#2a1733] cursor-pointer"
                  />
                  <span>Out of stock</span>
                </label>
              </div>
            </div>

            {/* Mobile Price slider */}
            <div className="mb-8">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Price</h3>
              <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400 mt-2">
                <span>₹0</span>
                <span>₹{maxPriceLimit}</span>
              </div>
              <div className="relative w-full h-1 bg-slate-200 rounded-lg my-4">
                <div 
                  className="absolute h-full bg-slate-800 rounded"
                  style={{
                    left: `${(priceRange.min / maxPriceLimit) * 100}%`,
                    right: `${100 - (priceRange.max / maxPriceLimit) * 100}%`
                  }}
                />
                <input
                  type="range"
                  min="0"
                  max={maxPriceLimit}
                  value={priceRange.min}
                  onChange={(e) => {
                    const val = Math.min(Number(e.target.value), priceRange.max - 100);
                    setPriceRange(prev => ({ ...prev, min: val }));
                  }}
                  className="absolute w-full h-1 -top-0 left-0 appearance-none pointer-events-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-slate-800 [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <input
                  type="range"
                  min="0"
                  max={maxPriceLimit}
                  value={priceRange.max}
                  onChange={(e) => {
                    const val = Math.max(Number(e.target.value), priceRange.min + 100);
                    setPriceRange(prev => ({ ...prev, max: val }));
                  }}
                  className="absolute w-full h-1 -top-0 left-0 appearance-none pointer-events-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-slate-800 [&::-webkit-slider-thumb]:cursor-pointer"
                />
              </div>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-800 mt-2">
                <span>₹{priceRange.min}</span>
                <span>₹{priceRange.max}</span>
              </div>
            </div>

            {/* Mobile Actions Drawer (Clear All) */}
            <button
              onClick={() => { handleClearAll(); setMobileFilterOpen(false); }}
              className="w-full flex items-center justify-center gap-2 border border-dashed border-[#2a1733]/30 text-slate-600 font-bold text-xs tracking-wider uppercase py-3.5 rounded-lg"
            >
              <RefreshCw size={13} /> Clear All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
