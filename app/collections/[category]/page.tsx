import React, { Suspense } from 'react';
import { ProductsContent } from '@/components/ProductsContent';

export const metadata = {
  title: 'Collections | Orisil Jewels',
  description: 'Browse our exclusive collection of 92.5 Sterling Silver jewellery.',
};

export default function CollectionPage() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#2a1733] border-t-transparent mb-4"></div>
        <p className="text-xs text-slate-400 tracking-widest uppercase font-semibold">Loading Collection...</p>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
