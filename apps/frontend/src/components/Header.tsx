'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from './Button';
import CartIcon from './CartIcon';
import { ThemeToggle } from './theme-toggle';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-background border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/halalchain-logo.svg" alt="HalalChain Logo" width={40} height={40} />
            <span className="font-bold text-xl text-primary">HalalChain</span>
          </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/products" className="text-foreground hover:text-primary transition-colors">
            Products
          </Link>
          <Link href="/integrations" className="text-foreground hover:text-primary transition-colors">
            Integrations
          </Link>
          <Link href="/halal-certification" className="text-foreground hover:text-primary transition-colors">
            Halal Certification
          </Link>
          <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors">
            Dashboard
          </Link>
        </nav>

        {/* Right side icons */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <CartIcon />
          {/* User menu or auth buttons */}
          <Button variant="outline" size="sm" onClick={() => router.push('/auth/login')}>
            Login
          </Button>
          <Button variant="primary" size="sm" onClick={() => router.push('/auth/register')}>
            Register
          </Button>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-background border-t border-border shadow-inner">
          <ul className="flex flex-col space-y-2 p-4">
            <li>
              <Link href="/" className="block text-foreground hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="block text-foreground hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Products
              </Link>
            </li>
            <li>
              <Link href="/integrations" className="block text-foreground hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Integrations
              </Link>
            </li>
            <li>
              <Link href="/halal-certification" className="block text-foreground hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Halal Certification
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="block text-foreground hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Dashboard
              </Link>
            </li>
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
          </ul>
        </nav>
      )}
    </header>
  );
}

