'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  badge?: string;
}

const newArrivalsProducts: Product[] = [
  {
    id: 1,
    name: "Orisil Playful Heart-Skull Motif Ring",
    price: "Rs. 2,200.00",
    image: "/New arrivals/1.jpg",
    badge: "New",
  },
  {
    id: 2,
    name: "Orisil Contemporary Gold-Finished Ring",
    price: "Rs. 3,100.00",
    image: "/New arrivals/2.jpg",
  },
  {
    id: 3,
    name: "Orisil Contemporary Enamel Silver Ring",
    price: "Rs. 1,300.00",
    image: "/New arrivals/3.jpg",
  },
  {
    id: 4,
    name: "Vibrant Enamel Knot Ring",
    price: "Rs. 1,575.00",
    image: "/New arrivals/4.jpg",
  },
  {
    id: 5,
    name: "Orisil Contemporary Gold Band Ring",
    price: "Rs. 3,500.00",
    image: "/New arrivals/5.jpg",
  },
];

export function NewArrivals() {
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
            New Arrivals
          </h2>
          <p className="text-slate-500 text-xs md:text-sm tracking-wider font-light">
            Discover the latest pieces to refresh your jewelry collection.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {newArrivalsProducts.map((product) => (
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
                
                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-2 right-2 z-10 p-1.5 bg-white/80 hover:bg-white rounded-full shadow-sm text-slate-400 hover:text-red-500 transition-colors duration-300 focus:outline-none cursor-pointer"
                  aria-label="Add to wishlist"
                >
                  <Heart
                    size={15}
                    className="transition-transform duration-300"
                    fill={wishlist[product.id] ? "#ef4444" : "none"}
                    color={wishlist[product.id] ? "#ef4444" : "currentColor"}
                  />
                </button>

                {/* Product Image */}
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover w-full h-full transform transition-transform duration-500 ease-out group-hover:scale-105"
                />
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
