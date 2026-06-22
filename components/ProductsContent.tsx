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

import Link from 'next/link';
import { ALL_PRODUCTS, type Product } from '@/lib/products';


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
  const [categoriesOpen, setCategoriesOpen] = useState(false);

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
  const handleAddToCart = (product: Product) => {
    const saved = localStorage.getItem('orisil-cart');
    let items = [];
    if (saved) {
      try {
        items = JSON.parse(saved);
      } catch (e) {
        items = [];
      }
    } else {
      // Default to initial showcase items
      items = [
        {
          id: 1,
          name: "925 Sterling Silver Classic Solitaire Ring",
          price: 2499,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop",
          sku: "OJ-RNG-082-07",
          details: "Size: 7"
        },
        {
          id: 2,
          name: "Timeless Silver Infinite Love Pendant Necklace",
          price: 3299,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop",
          sku: "OJ-NKL-143-18",
          details: "Length: 18 inches"
        }
      ];
    }

    const existingIndex = items.findIndex((item: any) => item.id === product.id && item.details === 'Standard');
    if (existingIndex > -1) {
      items[existingIndex].quantity += 1;
    } else {
      items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        sku: `OJ-PROD-${product.id}`,
        details: 'Standard'
      });
    }

    localStorage.setItem('orisil-cart', JSON.stringify(items));
    window.dispatchEvent(new Event('orisil-cart-change'));

    setAddedToCartToast(product.name);
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
    <div className="w-full bg-white min-h-screen text-slate-800 font-sans 4">
      {/* Toast Notification */}
      {addedToCartToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-[#6D4C4E] text-white text-xs md:text-sm font-semibold tracking-wider px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-3 animate-fade-in border border-white/10">
          <ShoppingBag size={16} className="text-yellow-400" />
          <span>Added &ldquo;{addedToCartToast}&rdquo; to your cart!</span>
        </div>
      )}

      {/* Main Listing Area */}
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 py-8">

        {/* Two-Column Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Left Sidebar: Filter Panel (Desktop only) */}
          <aside className="hidden lg:flex flex-col w-[22%] flex-none space-y-5 sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#E0B4B8]/50 hover:[&::-webkit-scrollbar-thumb]:bg-[#C17F78] [&::-webkit-scrollbar-thumb]:rounded-full border-r border-slate-100 pr-6 pb-8">

            {/* Categories list (collapsible) */}
            <div className="bg-white py-2">
              <button 
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="w-full flex items-center justify-between text-[13px] font-black uppercase tracking-[0.15em] text-slate-900 mb-3 pb-2 border-b border-slate-100 cursor-pointer"
              >
                <span>Categories</span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${categoriesOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`flex flex-col text-xs text-slate-600 font-light overflow-hidden transition-all duration-300 ${categoriesOpen ? 'max-h-[500px] opacity-100 mb-4 space-y-3.5' : 'max-h-0 opacity-0'}`}>
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        const slug = getSlugFromCategory(cat);
                        router.push(`/collections/${slug}`);
                      }}
                      className={`text-left transition-colors cursor-pointer hover:text-[#C17F78] ${isActive
                          ? 'text-[#C17F78] font-bold text-[13px]'
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
            <div className="bg-white py-0">
              <h3 className="text-[13px] font-black uppercase tracking-[0.15em] text-slate-900 mb-3 pb-2 border-b border-slate-100">
                Availability
              </h3>
              <div className="flex flex-col space-y-3.5 text-xs font-light text-slate-600">
                <label className="flex items-center space-x-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={availability.inStock}
                    onChange={(e) => setAvailability(prev => ({ ...prev, inStock: e.target.checked }))}
                    className="w-4 h-4 border border-slate-300 rounded-sm bg-white accent-[#C17F78] focus:outline-none cursor-pointer"
                  />
                  <span>In stock</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={availability.outOfStock}
                    onChange={(e) => setAvailability(prev => ({ ...prev, outOfStock: e.target.checked }))}
                    className="w-4 h-4 border border-slate-300 rounded-sm bg-white accent-[#C17F78] focus:outline-none cursor-pointer"
                  />
                  <span>Out of stock</span>
                </label>
              </div>
            </div>

            {/* Price Dual-Range Slider (screenshot style) */}
            <div key={`${activeCategory}-${maxPriceLimit}`} className="bg-white py-0">
              <h3 className="text-[13px] font-black uppercase tracking-[0.15em] text-slate-900 mb-2 pb-2 border-b border-slate-100">
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
            <div className="bg-white py-0">
              <h3 className="text-[13px] font-black uppercase tracking-[0.15em] text-slate-900 mb-3 pb-2 border-b border-slate-100">
                Popular Products
              </h3>
              <div className="flex flex-col space-y-4">
                {popularProducts.map((p) => (
                  <Link href={`/products/${p.id}`} key={p.id} className="flex items-center space-x-3 group cursor-pointer">
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
                      <span className="text-[11px] font-medium text-slate-700 hover:text-[#C17F78] transition-colors line-clamp-2 leading-snug">
                        {p.name}
                      </span>
                      <span className="text-xs font-black text-slate-900 mt-1">
                        Rs. {p.price.toLocaleString()}.00
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Search Input */}
            <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#6D4C4E] mb-3">Search</h3>
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  name="search"
                  key={searchParam}
                  type="text"
                  placeholder="Find jewellery..."
                  defaultValue={searchParam}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg py-2 pl-3 pr-9 focus:outline-none focus:border-[#C17F78] transition-colors"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#C17F78] cursor-pointer">
                  <Search size={15} />
                </button>
              </form>
            </div>

            {/* Clear All Filters Button */}
            {(categoryParam || filterParam || availability.inStock || availability.outOfStock || priceRange.min > 0 || priceRange.max < maxPriceLimit || searchParam || idParam) && (
              <button
                onClick={handleClearAll}
                className="w-full flex items-center justify-center gap-2 border border-dashed border-[#C17F78]/30 hover:border-[#C17F78] text-slate-600 hover:text-[#C17F78] font-bold text-xs tracking-wider uppercase py-3 rounded-lg transition-colors cursor-pointer"
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
                      className={`p-1 transition-colors cursor-pointer ${viewMode === 'grid' ? 'text-[#C17F78]' : 'text-slate-400 hover:text-slate-700'}`}
                      title="Grid View"
                    >
                      <Grid3X3 size={17} strokeWidth={2.5} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-1 transition-colors cursor-pointer ${viewMode === 'list' ? 'text-[#C17F78]' : 'text-slate-400 hover:text-slate-700'}`}
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
                className="flex items-center gap-2 bg-[#C17F78] hover:bg-[#6D4C4E] text-white font-bold text-[10px] uppercase tracking-wider py-2 px-3.5 rounded cursor-pointer transition-colors"
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
                  <span className="bg-slate-100 text-[#C17F78] text-[10px] font-bold px-3 py-1 rounded flex items-center gap-1.5 uppercase tracking-wide">
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
                  className="bg-[#C17F78] hover:bg-[#6D4C4E] text-white text-[11px] font-bold uppercase tracking-widest py-3 px-8 rounded transition-colors cursor-pointer"
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
                    className="flex flex-col bg-white group rounded-md overflow-hidden relative"
                  >
                    <Link href={`/products/${product.id}`} className="block">
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
                        <h3 className="text-xs md:text-[13px] font-medium text-slate-800 hover:text-[#C17F78] transition-colors leading-relaxed truncate w-full px-1">
                          {product.name}
                        </h3>

                        {/* Product price */}
                        <span className="mt-1.5 text-xs md:text-sm font-semibold text-slate-900">
                          {product.displayPrice}
                        </span>
                      </div>
                    </Link>

                    {/* Add to Cart button */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="mt-4 w-full bg-[#C17F78] hover:bg-[#6D4C4E] text-white text-[11px] font-black uppercase tracking-widest py-3 rounded transition-colors cursor-pointer focus:outline-none"
                    >
                      Add to Cart
                    </button>
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
                    <Link href={`/products/${product.id}`} className="flex flex-1 items-center gap-6 min-w-0 cursor-pointer text-left">
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
                        <h3 className="text-sm font-bold text-slate-800 mt-1 hover:text-[#C17F78] transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1 font-light leading-relaxed">
                          Handcrafted in 92.5 Sterling Silver. Certification and Hallmarking details provided with purchase.
                        </p>
                        <div className="text-sm font-black text-slate-900 mt-2.5">
                          {product.displayPrice}
                        </div>
                      </div>
                    </Link>

                    {/* Action */}
                    <div className="flex-none w-full sm:w-auto">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full sm:w-44 bg-[#C17F78] hover:bg-[#6D4C4E] text-white text-[11px] font-black uppercase tracking-widest py-3 px-6 rounded transition-colors cursor-pointer"
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
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#6D4C4E] flex items-center gap-2">
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
                      className={`text-left py-1 ${isActive ? 'text-[#C17F78] font-bold' : 'text-slate-600'}`}
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
                    className="w-4 h-4 border border-slate-300 rounded bg-white accent-[#C17F78] cursor-pointer"
                  />
                  <span>In stock</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={availability.outOfStock}
                    onChange={(e) => setAvailability(prev => ({ ...prev, outOfStock: e.target.checked }))}
                    className="w-4 h-4 border border-slate-300 rounded bg-white accent-[#C17F78] cursor-pointer"
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
              className="w-full flex items-center justify-center gap-2 border border-dashed border-[#C17F78]/30 text-slate-600 font-bold text-xs tracking-wider uppercase py-3.5 rounded-lg"
            >
              <RefreshCw size={13} /> Clear All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
