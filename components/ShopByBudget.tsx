'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface BudgetTier {
  id: number;
  label: string;
  amount: string;
  link: string;
  hasBow?: boolean;
}

const budgetTiers: BudgetTier[] = [
  {
    id: 1,
    label: "UNDER",
    amount: "₹999",
    link: "/products?maxPrice=999",
  },
  {
    id: 2,
    label: "UNDER",
    amount: "₹1499",
    link: "/products?maxPrice=1499",
  },
  {
    id: 3,
    label: "UNDER",
    amount: "₹1999",
    link: "/products?maxPrice=1999",
  },
  {
    id: 4,
    label: "UNDER",
    amount: "₹2499",
    link: "/products?maxPrice=2499",
  },
  {
    id: 5,
    label: "UNDER",
    amount: "₹2999",
    link: "/products?maxPrice=2999",
  },
  {
    id: 6,
    label: "ABOVE",
    amount: "₹3000",
    link: "/products?minPrice=3000",
    hasBow: true,
  },
];

export function ShopByBudget() {
  return (
    <section className="w-full bg-white py-16 px-4 md:px-8 select-none">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-[#2a1733] text-2xl md:text-3xl font-bold tracking-[0.2em] uppercase mb-3">
            Shop By Budget
          </h2>
          <p className="text-slate-500 text-xs md:text-sm tracking-wider font-light">
            Beautiful jewelry that fits every budget.
          </p>
        </div>

        {/* Budget Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 justify-items-center">
          {budgetTiers.map((tier) => (
            <Link
              key={tier.id}
              href={tier.link}
              className="relative w-[130px] h-[130px] md:w-[140px] md:h-[140px] bg-gradient-to-b from-[#0a0410] via-[#210c32] to-[#471868] rounded-[22px] flex flex-col items-center justify-between py-4 px-2 group hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
            >
              {/* Optional Pink Bow Ornament (Only on the "ABOVE ₹3000" card) */}
              {tier.hasBow && (
                <div className="absolute -top-2 -right-2 w-10 h-10 z-10 pointer-events-none transform rotate-12 group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src="/budget/bow.png"
                    alt="Decorative bow"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
              )}

              {/* Top Text (UNDER / ABOVE) */}
              <span className="text-[9px] md:text-[10px] font-black tracking-[0.22em] text-white uppercase">
                {tier.label}
              </span>

              {/* Middle Text (Price Value) */}
              <span className="text-[21px] md:text-[23px] font-black text-white tracking-wide leading-none my-auto">
                {tier.amount}
              </span>

              {/* Arrow Circle (Bottom) */}
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center text-[#120721] group-hover:bg-[#d4af37] group-hover:text-white transition-all duration-300 shadow-sm">
                <ArrowRight size={15} strokeWidth={3} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
