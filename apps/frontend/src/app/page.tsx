'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { productsApi } from '@/lib/api';
import { ProductCard } from '@/components/ProductCard';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const data = await productsApi.getAll();
        setFeaturedProducts(data.slice(0, 8));
      } catch {
        // Use mock data when backend is not available
        const mockProducts: Product[] = [
          {
            id: '1',
            name: 'Halal Chicken Breast',
            description: 'Fresh, premium halal-certified chicken breast',
            price: 12.99,
            category: 'Meat',
            images: [],
            vendorId: 'vendor1',
            vendorName: 'Halal Meats Co',
            isHalalCertified: true,
            blockchainHash: '0x1234...abcd',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '2',
            name: 'Organic Dates',
            description: 'Premium Medjool dates from certified farms',
            price: 8.50,
            category: 'Fruits',
            images: [],
            vendorId: 'vendor2',
            vendorName: 'Desert Fruits',
            isHalalCertified: true,
            blockchainHash: '0x5678...efgh',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '3',
            name: 'Halal Beef Jerky',
            description: 'Artisan halal beef jerky with natural spices',
            price: 15.99,
            category: 'Snacks',
            images: [],
            vendorId: 'vendor3',
            vendorName: 'Snack Masters',
            isHalalCertified: true,
            blockchainHash: '0x9abc...ijkl',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '4',
            name: 'Halal Lamb Chops',
            description: 'Tender halal lamb chops from grass-fed sheep',
            price: 24.99,
            category: 'Meat',
            images: [],
            vendorId: 'vendor1',
            vendorName: 'Halal Meats Co',
            isHalalCertified: true,
            blockchainHash: '0xdef1...2345',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '5',
            name: 'Organic Honey',
            description: 'Pure organic honey from wildflower meadows',
            price: 18.50,
            category: 'Pantry',
            images: [],
            vendorId: 'vendor4',
            vendorName: 'Golden Harvest',
            isHalalCertified: true,
            blockchainHash: '0x6789...abcd',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '6',
            name: 'Halal Cheese Selection',
            description: 'Artisan halal cheese variety pack',
            price: 22.00,
            category: 'Dairy',
            images: [],
            vendorId: 'vendor5',
            vendorName: 'Dairy Delights',
            isHalalCertified: true,
            blockchainHash: '0xefgh...5678',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '7',
            name: 'Halal Frozen Pizza',
            description: 'Delicious halal frozen pizza with premium toppings',
            price: 9.99,
            category: 'Frozen',
            images: [],
            vendorId: 'vendor6',
            vendorName: 'Frozen Foods Co',
            isHalalCertified: true,
            blockchainHash: '0xijkl...9012',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '8',
            name: 'Halal Spice Mix',
            description: 'Traditional Middle Eastern spice blend',
            price: 6.75,
            category: 'Spices',
            images: [],
            vendorId: 'vendor7',
            vendorName: 'Spice Bazaar',
            isHalalCertified: true,
            blockchainHash: '0xmnop...3456',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '9',
            name: 'Halal Energy Bars',
            description: 'Nutritious halal energy bars with nuts and dates',
            price: 12.50,
            category: 'Health',
            images: [],
            vendorId: 'vendor8',
            vendorName: 'Healthy Bites',
            isHalalCertified: true,
            blockchainHash: '0xqrst...7890',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '10',
            name: 'Halal Olive Oil',
            description: 'Extra virgin halal olive oil from Mediterranean groves',
            price: 16.25,
            category: 'Oils',
            images: [],
            vendorId: 'vendor9',
            vendorName: 'Mediterranean Oils',
            isHalalCertified: true,
            blockchainHash: '0xuvwx...1234',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '11',
            name: 'Halal Tea Collection',
            description: 'Premium halal tea collection with exotic flavors',
            price: 14.99,
            category: 'Beverages',
            images: [],
            vendorId: 'vendor10',
            vendorName: 'Tea Masters',
            isHalalCertified: true,
            blockchainHash: '0xyzab...5678',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '12',
            name: 'Halal Cookies',
            description: 'Homemade halal cookies with traditional recipes',
            price: 8.99,
            category: 'Bakery',
            images: [],
            vendorId: 'vendor11',
            vendorName: 'Sweet Treats',
            isHalalCertified: true,
            blockchainHash: '0xcdef...9012',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ];
        setFeaturedProducts(mockProducts);
        console.warn('Backend not available, using mock data');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const handleViewDetails = (product: Product) => {
    window.location.href = `/products/${product.id}`;
  };

  const handleAddToCart = (product: Product) => {
    alert(`Added ${product.name} to cart`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }



  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-50 to-blue-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to HalalChain
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Trust Starts Here. Blockchain Driven Transparency.
          </p>
          <Link href="/products" className="bg-green-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-green-700 transition-colors">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          {featuredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No featured products available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={handleViewDetails}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Link href="/products" className="bg-green-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-green-700 transition-colors">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Why Choose HalalChain?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6">
              <div className="text-4xl mb-4">🕌</div>
              <h3 className="text-xl font-semibold mb-2">Halal Certified</h3>
              <p className="text-gray-600">Every product undergoes rigorous halal verification.</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-xl font-semibold mb-2">Blockchain Transparency</h3>
              <p className="text-gray-600">Track supply chain with immutable blockchain records.</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-2">Trusted Vendors</h3>
              <p className="text-gray-600">Shop from verified multivendor marketplace.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
