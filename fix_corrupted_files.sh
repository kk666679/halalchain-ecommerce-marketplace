#!/bin/bash

echo "Checking current file states and fixing corrupted files..."

# First, let's see what's actually in the files
echo "=== Current checkout page content ==="
head -20 /workspaces/halalchain-ecommerce-marketplace/apps/frontend/src/app/checkout/page.tsx

echo "=== Current home page content ==="
tail -10 /workspaces/halalchain-ecommerce-marketplace/apps/frontend/src/app/page.tsx

echo "=== Current useCart content ==="
tail -10 /workspaces/halalchain-ecommerce-marketplace/apps/frontend/src/hooks/useCart.ts

# Create completely fresh files
echo "Creating fresh files..."

# Fresh checkout page
cat << 'FRESH_CHECKOUT' > /workspaces/halalchain-ecommerce-marketplace/apps/frontend/src/app/checkout/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, loading, checkout } = useCart();
  const [formData, setFormData] = useState({
    shippingAddress: '',
    paymentMethod: 'stripe',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await checkout();
      router.push('/order-confirmation');
    } catch (error) {
      console.error('Checkout failed:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Shipping Address</label>
            <textarea
              value={formData.shippingAddress}
              onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
          <div className="mb-4">
            <select
              value={formData.paymentMethod}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="stripe">Credit Card (Stripe)</option>
              <option value="crypto">Cryptocurrency</option>
            </select>
          </div>

          {formData.paymentMethod === 'stripe' && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Card Number</label>
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Expiry Date</label>
                  <input
                    type="text"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">CVV</label>
                  <input
                    type="text"
                    value={formData.cvv}
                    onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="123"
                    required
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between items-center mb-2">
            <span>Subtotal:</span>
            <span>${cart?.total?.toFixed(2) || '0.00'}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span>Shipping:</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between items-center font-semibold text-lg border-t pt-2">
            <span>Total:</span>
            <span>${cart?.total?.toFixed(2) || '0.00'}</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Complete Order'}
        </button>
      </form>
    </div>
  );
}
FRESH_CHECKOUT

# Fresh home page
cat << 'FRESH_HOME' > /workspaces/halalchain-ecommerce-marketplace/apps/frontend/src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import ProductGrid from '@/components/product-grid';
import { useCart } from '@/hooks/useCart';

export default function HomePage() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCart(productId, 1);
      alert('Product added to cart!');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      alert('Failed to add product to cart');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              HalalChain Marketplace
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover trusted halal products with blockchain-verified certifications. 
              Shop with confidence knowing every item meets strict halal standards.
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-gray-600">Blockchain-verified halal products</p>
        </div>
        
        <ProductGrid 
          products={products} 
          onAddToCart={handleAddToCart}
        />
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Halal Certified</h3>
              <p className="text-gray-600">Every product is blockchain-verified for authentic halal certification</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable shipping with real-time tracking</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">Multiple secure payment options including cryptocurrency</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
FRESH_HOME

# Fresh useCart hook
cat << 'FRESH_USECART' > /workspaces/halalchain-ecommerce-marketplace/apps/frontend/src/hooks/useCart.ts
import { useState, useEffect, useCallback } from 'react';

interface CartItem {
  id: string;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
}

interface Cart {
  items: CartItem[];
  total: number;
}

export function useCart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('http://localhost:3001/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const cartData = await response.json();
        setCart(cartData);
      }
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  }, []);

  const addToCart = async (productId: string, quantity: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Please login to add items to cart');
      }

      setLoading(true);
      const response = await fetch('http://localhost:3001/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }

      await fetchCart();
    } catch (error) {
      console.error('Failed to add to cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (cartItemId: string, quantity: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      setLoading(true);
      const response = await fetch(`http://localhost:3001/cart/item/${cartItemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      });

      if (response.ok) {
        await fetchCart();
      }
    } catch (error) {
      console.error('Failed to update cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      setLoading(true);
      const response = await fetch(`http://localhost:3001/cart/item/${cartItemId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await fetchCart();
      }
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Please login to checkout');
      }

      setLoading(true);
      const response = await fetch('http://localhost:3001/cart/checkout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Checkout failed');
      }

      const order = await response.json();
      setCart(null);
      return order;
    } catch (error) {
      console.error('Checkout failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return {
    cart,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    checkout,
    refreshCart: fetchCart,
  };
}
FRESH_USECART

# Fix layout.tsx
cat << 'FRESH_LAYOUT' > /workspaces/halalchain-ecommerce-marketplace/apps/frontend/src/app/layout.tsx
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  );
}
FRESH_LAYOUT

# Fix menu-bar.tsx
cat << 'FRESH_MENUBAR' > /workspaces/halalchain-ecommerce-marketplace/apps/frontend/src/components/menu-bar.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function MenuBar() {
  const [activeItem, setActiveItem] = useState('Home');

  const menuItems = ['Home', 'Products', 'About', 'Contact'];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-gray-900">HalalChain</h1>
          </div>

          {/* Menu Items */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveItem(item)}
                className="relative px-3 py-2 text-sm font-medium transition-colors"
              >
                <span className={`relative z-10 ${
                  activeItem === item ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}>
                  {item}
                </span>
                {activeItem === item && (
                  <motion.div
                    layoutId="activeMenuItem"
                    className="absolute inset-0 bg-blue-100 rounded-md"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
FRESH_MENUBAR

echo "Fresh files created. Verifying syntax..."

# Check the files are properly formatted
cd /workspaces/halalchain-ecommerce-marketplace/apps/frontend
npx prettier --write src/app/checkout/page.tsx
npx prettier --write src/app/page.tsx
npx prettier --write src/hooks/useCart.ts
npx prettier --write src/app/layout.tsx
npx prettier --write src/components/menu-bar.tsx

echo "Building project..."
npm run build

