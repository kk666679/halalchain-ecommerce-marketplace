'use client';

'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { productsApi } from '@/lib/api';
import { Product } from '@/types';
import { useCart } from '@/hooks/useCart';

export default function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const { addToCart, cart } = useCart();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productsApi.getAll();
      setProducts(data);
      const uniqueCategories = [...new Set(data.map(p => p.category))];
      setCategories(uniqueCategories);
    } catch (err) {
      setError('Failed to load products');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = useCallback(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory]);

  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  const handleAddToCart = async (product: Product) => {
    try {
      await addToCart(product.id, 1);
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-emerald-800">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={loadProducts}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-emerald-800 text-shadow-md">
        🕌 HalalChain Marketplace
      </h1>

      {/* Search and Filter */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 @container md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((p) => (
          <motion.div
            key={p.id}
            whileHover={{ scale: 1.03 }}
            className="bg-white shadow-md rounded-2xl p-4 transition-all border border-emerald-100 hover:border-emerald-400"
          >
            <Image
              src={p.images[0] || '/placeholder-product.jpg'}
              alt={p.name}
              width={300}
              height={200}
              className="rounded-xl object-cover mb-3"
            />
            <h2 className="font-semibold text-lg">{p.name}</h2>
            <p className="text-emerald-700 font-bold mb-2">
              ${p.price.toFixed(2)}
              {p.compareAtPrice && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  ${p.compareAtPrice.toFixed(2)}
                </span>
              )}
            </p>
            <p className="text-sm text-gray-500 mb-2">Vendor: {p.vendor?.storeName || 'Unknown Vendor'}</p>

            {/* Rating */}
            {p.rating && (
              <div className="flex items-center mb-2">
                <span className="text-yellow-500">⭐</span>
                <span className="text-sm ml-1">{p.rating.toFixed(1)} ({p.reviewCount} reviews)</span>
              </div>
            )}

            {/* Stock Status */}
            <div className="mb-2">
              {p.stockQuantity > 0 ? (
                <span className="text-xs text-green-700 font-medium bg-green-100 px-2 py-1 rounded-full">
                  In Stock ({p.stockQuantity})
                </span>
              ) : (
                <span className="text-xs text-red-700 font-medium bg-red-100 px-2 py-1 rounded-full">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Halal Certification */}
            {p.isHalalCertified && (
              <span className="text-xs text-green-700 font-medium bg-green-100 px-2 py-1 rounded-full mb-2 block">
                ✅ Halal Certified
              </span>
            )}

            <button
              onClick={() => handleAddToCart(p)}
              disabled={p.stockQuantity === 0}
              className="mt-4 w-full rounded-xl bg-emerald-600 text-white py-2 hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {p.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </motion.div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center mt-12">
          <p className="text-gray-600">No products found matching your criteria.</p>
        </div>
      )}

      <div className="mt-12 text-center">
        <Link
          href="/checkout"
          className="inline-block bg-emerald-700 text-white px-6 py-3 rounded-2xl hover:bg-emerald-800 transition text-lg shadow-lg"
        >
          Go to Checkout ({cart?.items?.length || 0})
        </Link>
      </div>
    </div>
  );
}
