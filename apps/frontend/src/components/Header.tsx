'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from './Button';
import CartIcon from './CartIcon';
import { ThemeToggle } from './theme-toggle';
import { Menu, X, ChevronDown, User, ShoppingBag, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setProfileMenuOpen(false);
    router.push('/');
  };

  return (
    <header className="bg-background border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" aria-label="HalalChain homepage">
            <Image src="/halalchain-logo.svg" alt="HalalChain Logo" width={40} height={40} />
            <span className="font-bold text-xl text-primary">HalalChain</span>
          </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6" role="navigation" aria-label="Main navigation">
          <Link href="/" className="text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-1">
            Home
          </Link>
          <Link href="/products" className="text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-1">
            Products
          </Link>
          <Link href="/integrations" className="text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-1">
            Integrations
          </Link>
          <Link href="/halal-certification" className="text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-1">
            Halal Certification
          </Link>
          <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-1">
            Dashboard
          </Link>
        </nav>

        {/* Right side icons */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <CartIcon />
          {/* User menu or auth buttons */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={toggleProfileMenu}
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-1"
                aria-expanded={profileMenuOpen}
                aria-haspopup="menu"
                aria-label="User menu"
              >
                <User size={20} />
                <span className="hidden sm:block">{user.name}</span>
                <ChevronDown size={16} className={`transition-transform ${profileMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              {profileMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-card rounded-md shadow-lg border border-border py-1 z-50"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <Link
                    href="/profile"
                    className="flex items-center px-4 py-2 text-sm text-card-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:bg-accent focus:text-accent-foreground"
                    role="menuitem"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    <User size={16} className="mr-2" />
                    Profile
                  </Link>
                  <Link
                    href="/orders"
                    className="flex items-center px-4 py-2 text-sm text-card-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:bg-accent focus:text-accent-foreground"
                    role="menuitem"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    <ShoppingBag size={16} className="mr-2" />
                    Orders
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center px-4 py-2 text-sm text-card-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:bg-accent focus:text-accent-foreground"
                    role="menuitem"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    <Settings size={16} className="mr-2" />
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-card-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:bg-accent focus:text-accent-foreground"
                    role="menuitem"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={() => router.push('/auth/login')}>
                Login
              </Button>
              <Button variant="primary" size="sm" onClick={() => router.push('/auth/register')}>
                Register
              </Button>
            </>
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-background border-t border-border shadow-inner" role="navigation" aria-label="Mobile navigation">
          <ul className="flex flex-col space-y-2 p-4">
            <li>
              <Link href="/" className="block text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-1" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="block text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-1" onClick={() => setMobileMenuOpen(false)}>
                Products
              </Link>
            </li>
            <li>
              <Link href="/integrations" className="block text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-1" onClick={() => setMobileMenuOpen(false)}>
                Integrations
              </Link>
            </li>
            <li>
              <Link href="/halal-certification" className="block text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-1" onClick={() => setMobileMenuOpen(false)}>
                Halal Certification
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="block text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-1" onClick={() => setMobileMenuOpen(false)}>
                Dashboard
              </Link>
            </li>
            {isAuthenticated && user ? (
              <>
                <li>
                  <Link href="/profile" className="block text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-1" onClick={() => setMobileMenuOpen(false)}>
                    Profile
                  </Link>
                </li>
                <li>
                  <Link href="/orders" className="block text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-1" onClick={() => setMobileMenuOpen(false)}>
                    Orders
                  </Link>
                </li>
                <li>
                  <Link href="/settings" className="block text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-1" onClick={() => setMobileMenuOpen(false)}>
                    Settings
                  </Link>
                </li>
                <li>
                  <Button variant="outline" size="sm" onClick={() => { setMobileMenuOpen(false); handleLogout(); }}>
                    Logout
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Button variant="outline" size="sm" onClick={() => { setMobileMenuOpen(false); router.push('/auth/login'); }}>
                    Login
                  </Button>
                </li>
                <li>
                  <Button variant="primary" size="sm" onClick={() => { setMobileMenuOpen(false); router.push('/auth/register'); }}>
                    Register
                  </Button>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}

