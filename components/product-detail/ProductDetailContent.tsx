'use client';

import React from 'react';
import { getProductById, getRelatedProducts, getProductTags, generateSKU, METAL_COLORS, RING_SIZES } from '@/lib/products';
import { Breadcrumb } from './Breadcrumb';
import { ProductImageGallery } from './ProductImageGallery';
import { ProductInfo } from './ProductInfo';
import { ReviewSection } from './ReviewSection';
import { RelatedProducts } from './RelatedProducts';

interface Props {
  productId: number;
}

export function ProductDetailContent({ productId }: Props) {
  const product = getProductById(productId);
  if (!product) return null;

  const relatedProducts = getRelatedProducts(product);
  const tags = getProductTags(product);
  const sku = generateSKU(product.id);

  return (
    <div className="bg-white min-h-screen">
      {/* Container max-w-[1320px] mx-auto px-4 md:px-8 */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 md:px-8 py-6">
        
        {/* 1. Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: product.category, href: `/collections/${product.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` },
            { label: product.name },
          ]}
        />

        {/* 2. Product Top Section: Image Gallery + Product Info */}
        <div className="grid grid-cols-1 lg:grid-cols-[500px_1fr] gap-6 lg:gap-12 mt-5 items-start">
          
          {/* Left: Image Gallery */}
          <div className="w-full flex justify-center lg:justify-start lg:sticky lg:top-24">
            <ProductImageGallery
              mainImage={product.image}
              productName={product.name}
            />
          </div>

          {/* Right: Product Info */}
          <ProductInfo
            product={product}
            sku={sku}
            tags={tags}
            colors={METAL_COLORS}
            sizes={RING_SIZES}
          />
        </div>

        {/* 3. Reviews Section */}
        <div className="mt-12 pt-8 border-t border-[rgba(224,180,184,0.25)]">
          <ReviewSection product={product} />
        </div>

        {/* 4. Related Products Carousel */}
        <div className="mt-12 mb-8">
          <RelatedProducts products={relatedProducts} />
        </div>
      </div>
    </div>
  );
}
