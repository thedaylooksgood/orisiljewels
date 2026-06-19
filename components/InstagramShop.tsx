'use client';

import React from 'react';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

interface InstagramPost {
  id: number;
  image: string;
  link: string;
}

const instagramPosts: InstagramPost[] = [
  {
    id: 1,
    image: "/instagram shop/1.jpg",
    link: "/products?id=1",
  },
  {
    id: 2,
    image: "/instagram shop/2.jpg",
    link: "/products?id=2",
  },
  {
    id: 3,
    image: "/instagram shop/3.jpg",
    link: "/products?id=3",
  },
  {
    id: 4,
    image: "/instagram shop/4.jpg",
    link: "/products?id=4",
  },
  {
    id: 5,
    image: "/instagram shop/5.jpg",
    link: "/products?id=5",
  },
];

export function InstagramShop() {
  return (
    <section className="w-full bg-white py-16 select-none">
      <div className="w-full max-w-[1320px] mx-auto px-4 md:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-[#2a1733] text-2xl md:text-3xl font-bold tracking-[0.2em] uppercase mb-3">
            Instagram Shop
          </h2>
          <p className="text-slate-500 text-xs md:text-sm tracking-wider font-light">
            Straight from our feed to your cart. Tap. Love. Shop.
          </p>
        </div>

        {/* Instagram Posts Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {instagramPosts.map((post) => (
            <Link
              key={post.id}
              href={post.link}
              className="relative w-full aspect-square bg-slate-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md group transition-all duration-300 cursor-pointer block border border-slate-100"
            >
              {/* Product Image */}
              <Image
                src={post.image}
                alt={`Instagram Post ${post.id}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Shopping Bag Icon in Top Right */}
              <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white flex items-center justify-center text-slate-800 shadow-sm group-hover:bg-[#2a1733] group-hover:text-white transition-colors duration-300">
                <ShoppingBag size={16} strokeWidth={2} />
              </div>

              {/* Subtle hover overlay */}
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
