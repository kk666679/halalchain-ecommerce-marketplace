'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from './Button';
import CartIcon from './CartIcon';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('token');

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="https://oq1gkkfo4q0hj5xi.public.blob.vercel-storage.com/Halalchain_20251003_011847_0000.svg"
              alt="HalalChain"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
              >
                🔍
              </button>
            </div>
          </form>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/products" className="text-gray-700 hover:text-green-600">
              Products
            </Link>
            <Link href="/integrations" className="text-gray-700 hover:text-green-600">
              Integrations
            </Link>
            <Link href="/halal-certification" className="text-gray-700 hover:text-green-600">
              Halal Certification
            </Link>

            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="text-gray-700 hover:text-green-600">
                  Dashboard
                </Link>
                <CartIcon />
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <CartIcon />
                <Link href="/auth/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="primary" size="sm">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-green-600"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                >
                  🔍
                </button>
              </div>
            </form>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col space-y-2">
              <Link
                href="/products"
                className="text-gray-700 hover:text-green-600 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/integrations"
                className="text-gray-700 hover:text-green-600 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Integrations
              </Link>

              {isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    className="text-gray-700 hover:text-green-600 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/cart"
                    className="text-gray-700 hover:text-green-600 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Cart
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full justify-start"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/cart"
                    className="text-gray-700 hover:text-green-600 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Cart
                  </Link>
                  <Link
                    href="/auth/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button variant="outline" size="sm" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button variant="primary" size="sm" className="w-full">
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
