import React, { Suspense } from 'react';
import { ProductsContent } from '@/components/ProductsContent';

export const metadata = {
  title: 'All Products | Orisil Jewels',
  description: 'Browse our exclusive collection of 92.5 Sterling Silver jewellery including rings, earrings, bracelets, necklaces and more.',
};

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#C17F78] border-t-transparent mb-4"></div>
        <p className="text-xs text-slate-400 tracking-widest uppercase font-semibold">Loading Collection...</p>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
