import { notFound } from 'next/navigation';
import { getProductById, ALL_PRODUCTS } from '@/lib/products';
import { ProductDetailContent } from '@/components/product-detail/ProductDetailContent';
import type { Metadata } from 'next';

// Generate static params for all products (SSG)
export function generateStaticParams() {
  return ALL_PRODUCTS.map(product => ({
    id: String(product.id),
  }));
}

// Dynamic metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(Number(id));
  if (!product) return { title: 'Product Not Found' };
  
  return {
    title: `${product.name} | Orisil Jewels`,
    description: `Shop ${product.name} - Premium 92.5 Sterling Silver jewelry. ${product.displayPrice}. Handcrafted with love.`,
  };
}

// The page component
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(Number(id));
  
  if (!product) {
    notFound();
  }
  
  return <ProductDetailContent productId={product.id} />;
}
