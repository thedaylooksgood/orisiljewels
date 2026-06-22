'use client';

import React, { useState } from 'react';
import type { Product } from '@/lib/products';
import { Star, Plus, Minus } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { QuantitySelector } from './QuantitySelector';
import { ColorSelector } from './ColorSelector';
import { SizeSelector } from './SizeSelector';

interface Props {
  product: Product;
  sku: string;
  tags: string[];
  colors: readonly { readonly name: string; readonly hex: string }[];
  sizes: readonly string[];
}

export function ProductInfo({ product, sku, tags, colors, sizes }: Props) {
  const [selectedColor, setSelectedColor] = useState(colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(sizes[0] || '');
  const [quantity, setQuantity] = useState(1);

  // Accordion state
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    description: true,
    specifications: false,
    care: false,
    shipping: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Fake original price (15% higher)
  const originalPrice = Math.round(product.price * 1.15);
  const originalDisplayPrice = `Rs. ${originalPrice.toLocaleString('en-IN')}.00`;

  // Fake rating and review count derived deterministically to avoid hydration mismatch
  const rating = 4.8;
  const reviewCount = ((product.id * 17) % 120) + 30;

  return (
    <div className="flex flex-col gap-4 text-left max-w-lg lg:max-w-none">
      {/* Category Badge */}
      {product.category && (
        <span className="inline-block bg-[#F3E3E4] text-[#6D4C4E] text-[10px] 
          font-bold uppercase tracking-widest px-3.5 py-1 rounded-full w-fit">
          {product.category}
        </span>
      )}

      {/* Product Name */}
      <h1 className="text-xl md:text-2xl font-bold text-[#333333] leading-tight 
        font-bodoni">
        {product.name}
      </h1>

      {/* Star Rating */}
      <div className="flex items-center gap-1.5">
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map(star => (
            <Star
              key={star}
              size={14}
              className={star <= Math.floor(rating) 
                ? 'fill-[#F5A623] text-[#F5A623]' 
                : 'fill-[#E0E0E0] text-[#E0E0E0]'}
            />
          ))}
        </div>
        <span className="text-xs text-[#9E9E9E]">
          ({rating} from {reviewCount} Reviews)
        </span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-2.5">
        <span className="text-2xl font-bold text-[#333333]">
          {product.displayPrice}
        </span>
        <span className="text-sm text-[#9E9E9E] line-through font-light">
          {originalDisplayPrice}
        </span>
      </div>

      {/* Available Color + Quantity (side by side) */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#333333] mb-1.5">
            Available Color
          </h3>
          <ColorSelector
            colors={colors}
            selected={selectedColor}
            onSelect={setSelectedColor}
          />
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#333333] mb-1.5">
            Quantity
          </h3>
          <QuantitySelector
            value={quantity}
            onChange={setQuantity}
            min={1}
            max={10}
          />
        </div>
      </div>

      {/* Available Size */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#333333] mb-1.5">
          Available Size
        </h3>
        <SizeSelector
          sizes={sizes}
          selected={selectedSize}
          onSelect={setSelectedSize}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2.5 mt-1">
        <button className="flex-1 bg-[#C17F78] hover:bg-[#6D4C4E] text-white 
          text-xs font-bold uppercase tracking-widest py-3 rounded-lg 
          transition-all duration-400 cursor-pointer">
          BUY IT NOW
        </button>
        <button className="flex-1 border-2 border-[#C17F78] text-[#C17F78] 
          hover:bg-[#C17F78] hover:text-white text-xs font-bold uppercase 
          tracking-widest py-3 rounded-lg transition-all duration-400 cursor-pointer">
          ADD TO CART
        </button>
      </div>

      {/* Divider */}
      <hr className="border-[rgba(224,180,184,0.2)]" />

      {/* Meta Info: SKU, Tags, Share */}
      <div className="space-y-1.5 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-[#333333]">SKU:</span>
          <span className="text-[#9E9E9E]">{sku}</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-semibold text-[#333333]">Tags:</span>
          {tags.map((tag, i) => (
            <React.Fragment key={tag}>
              <span className="text-[#9E9E9E] hover:text-[#C17F78] cursor-pointer transition-colors">
                {tag}
              </span>
              {i < tags.length - 1 && <span className="text-[#9E9E9E]">,</span>}
            </React.Fragment>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-0.5">
          <span className="font-semibold text-[#333333]">Share:</span>
          <div className="flex items-center gap-2.5">
            {[FaFacebookF, FaTwitter, FaInstagram, FaEnvelope].map((Icon, i) => (
              <button
                key={i}
                className="text-[#9E9E9E] hover:text-[#C17F78] transition-colors cursor-pointer"
              >
                <Icon size={14} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Collapsible Accordion Dropdown Openers */}
      <div className="border-t border-[rgba(224,180,184,0.3)] pt-3.5 mt-3 space-y-2.5">
        {/* Description Section */}
        <div className="border-b border-[rgba(224,180,184,0.2)] pb-2.5">
          <button
            onClick={() => toggleSection('description')}
            className="w-full flex justify-between items-center text-xs font-bold text-[#6D4C4E] uppercase tracking-wider py-0.5 cursor-pointer hover:text-[#C17F78] transition-colors"
          >
            <span>Description</span>
            {openSections.description ? <Minus size={14} /> : <Plus size={14} />}
          </button>
          {openSections.description && (
            <p className="mt-2 text-xs text-[#666666] leading-relaxed font-light">
              Crafted with the finest 92.5 sterling silver, this exquisite piece from Orisil Jewels embodies timeless elegance and modern sophistication. Each detail has been carefully designed to complement your style.
            </p>
          )}
        </div>

        {/* Specifications Section */}
        <div className="border-b border-[rgba(224,180,184,0.2)] pb-2.5">
          <button
            onClick={() => toggleSection('specifications')}
            className="w-full flex justify-between items-center text-xs font-bold text-[#6D4C4E] uppercase tracking-wider py-0.5 cursor-pointer hover:text-[#C17F78] transition-colors"
          >
            <span>Specifications</span>
            {openSections.specifications ? <Minus size={14} /> : <Plus size={14} />}
          </button>
          {openSections.specifications && (
            <ul className="mt-2 text-xs text-[#666666] space-y-1.5 list-disc pl-4 leading-relaxed font-light">
              <li><strong className="font-semibold text-[#333333]">Material:</strong> 92.5 Sterling Silver (BIS Hallmarked)</li>
              <li><strong className="font-semibold text-[#333333]">Gemstone:</strong> AAA+ Quality Zirconia Crystals</li>
              <li><strong className="font-semibold text-[#333333]">Design Type:</strong> Adjustable / Free Size</li>
              <li><strong className="font-semibold text-[#333333]">Plating:</strong> Rhodium Plated (Anti-Tarnish coating)</li>
              <li><strong className="font-semibold text-[#333333]">Weight:</strong> Lightweight for maximum comfort</li>
            </ul>
          )}
        </div>

        {/* Care Instructions Section */}
        <div className="border-b border-[rgba(224,180,184,0.2)] pb-2.5">
          <button
            onClick={() => toggleSection('care')}
            className="w-full flex justify-between items-center text-xs font-bold text-[#6D4C4E] uppercase tracking-wider py-0.5 cursor-pointer hover:text-[#C17F78] transition-colors"
          >
            <span>Care Instructions</span>
            {openSections.care ? <Minus size={14} /> : <Plus size={14} />}
          </button>
          {openSections.care && (
            <ul className="mt-2 text-xs text-[#666666] space-y-1.5 list-disc pl-4 leading-relaxed font-light">
              <li>Keep away from water, perfume, and cosmetic products.</li>
              <li>Store in dry, airtight bags or the original soft velvet pouch.</li>
              <li>Wipe gently with a clean polishing cloth after use to retain luster.</li>
            </ul>
          )}
        </div>

        {/* Shipping & Returns Section */}
        <div className="border-b border-[rgba(224,180,184,0.2)] pb-2.5">
          <button
            onClick={() => toggleSection('shipping')}
            className="w-full flex justify-between items-center text-xs font-bold text-[#6D4C4E] uppercase tracking-wider py-0.5 cursor-pointer hover:text-[#C17F78] transition-colors"
          >
            <span>Shipping & Returns</span>
            {openSections.shipping ? <Minus size={14} /> : <Plus size={14} />}
          </button>
          {openSections.shipping && (
            <p className="mt-2 text-xs text-[#666666] leading-relaxed font-light">
              We offer free insured delivery on all orders across India. Orders are typically shipped within 24-48 hours and arrive in 3-5 business days. Easy 7-day return policy for unused items.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
