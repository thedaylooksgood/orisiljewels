'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, ShoppingCart, Eye } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  badge?: string;
}

const bestsellerProducts: Product[] = [
  {
    id: 1,
    name: "Orisil Jewels Pastel Multi-Stone Ring",
    price: "Rs. 1,400.00",
    image: "/best sellers/1.jpg",
  },
  {
    id: 2,
    name: "92.5 Sterling Silver \"Floral Vine\" Ring",
    price: "Rs. 1,499.00",
    image: "/best sellers/2.jpg",
  },
  {
    id: 3,
    name: "Orisil Playful Heart-Skull Motif Ring",
    price: "Rs. 2,200.00",
    image: "/best sellers/3.jpg",
  },
  {
    id: 4,
    name: "Orisil Contemporary Gold-Finished Ring",
    price: "Rs. 3,100.00",
    image: "/best sellers/4.png",
  },
  {
    id: 5,
    name: "Orisil Contemporary Enamel Silver Ring",
    price: "Rs. 1,300.00",
    image: "/best sellers/5.png",
  },
  {
    id: 6,
    name: "Vibrant Enamel Knot Ring",
    price: "Rs. 1,575.00",
    image: "/best sellers/6.png",
  },
  {
    id: 7,
    name: "Orisil Contemporary Gold-Finished Band",
    price: "Rs. 3,500.00",
    image: "/best sellers/7.jpg",
  },
  {
    id: 8,
    name: "Orisil Minimalist Solitaire Sterling Ring",
    price: "Rs. 2,950.00",
    image: "/best sellers/8.png",
  },
  {
    id: 9,
    name: "Orisil Multi-Gemstone Sterling Ring",
    price: "Rs. 1,450.00",
    image: "/best sellers/9.jpg",
  },
  {
    id: 10,
    name: "Orisil Heart-Enamel Sterling Ring",
    price: "Rs. 1,870.00",
    image: "/best sellers/10.png",
  },
];

export function Bestsellers() {
  const [wishlist, setWishlist] = useState<Record<number, boolean>>({});

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="w-full bg-white py-16 px-4 md:px-8 select-none">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-[#2a1733] text-2xl md:text-3xl font-bold tracking-[0.2em] uppercase mb-3">
            Our Bestseller
          </h2>
          <p className="text-slate-500 text-xs md:text-sm tracking-wider font-light">
            Our most-loved creations, perfected through passion and praise.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {bestsellerProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col bg-white group rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300 border border-slate-100/60 p-3"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-square overflow-hidden bg-slate-50 rounded-lg">
                {product.badge && (
                  <span className="absolute top-2 left-2 z-10 bg-[#2a1733] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                    {product.badge}
                  </span>
                )}

                {/* Product Image */}
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover w-full h-full transform transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Bottom Overlay Actions Menu on Hover */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center bg-white shadow-md rounded-md overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-slate-100">
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="p-2.5 text-slate-500 hover:text-red-500 border-r border-slate-100 transition-colors cursor-pointer focus:outline-none"
                    title="Wishlist"
                  >
                    <Heart
                      size={15}
                      fill={wishlist[product.id] ? "#ef4444" : "none"}
                      color={wishlist[product.id] ? "#ef4444" : "currentColor"}
                    />
                  </button>
                  <button
                    className="p-2.5 text-slate-500 hover:text-[#2a1733] border-r border-slate-100 transition-colors cursor-pointer focus:outline-none"
                    title="Add to Cart"
                  >
                    <ShoppingCart size={15} />
                  </button>
                  <button
                    className="p-2.5 text-slate-500 hover:text-blue-500 transition-colors cursor-pointer focus:outline-none"
                    title="Quick View"
                  >
                    <Eye size={15} />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col flex-grow pt-4 text-center">
                <h3 className="text-xs md:text-[13px] font-medium text-slate-800 tracking-wide line-clamp-2 min-h-[32px] hover:text-[#2a1733] transition-colors duration-200">
                  {product.name}
                </h3>
                
                <span className="mt-2 text-xs md:text-sm font-semibold text-slate-900">
                  {product.price}
                </span>

                {/* Add to Cart Button */}
                <button className="mt-4 w-full bg-[#2a1733] hover:bg-[#3d224b] text-white text-[11px] font-bold uppercase tracking-widest py-2.5 px-4 rounded transition-colors duration-300 cursor-pointer focus:outline-none">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
