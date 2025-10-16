 

'use client';

/**
 * Header component for the HalalChain application.
 * Provides responsive navigation, user authentication UI, cart access, and theme toggle.
 * Integrates with AuthContext for user state management.
 */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from './Button';
import CartIcon from './CartIcon';
import { ThemeToggle } from './theme-toggle';
import { Menu, X, User, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';

export const Header = React.memo(function Header() {
  // State for mobile menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // State for user dropdown menu toggle
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const router = useRouter();
  // Destructure user and logout from AuthContext
  const { user, logout } = useAuth();

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Toggle user dropdown menu visibility
  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  // Handle user logout: call logout from context, close menu, redirect to home
  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    router.push('/');
  };

  // Keyboard navigation: Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setUserMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="glass border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and brand link */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/halalchain-logo.svg" alt="HalalChain Logo" width={40} height={40} />
            <span className="font-bold text-xl text-primary">HalalChain</span>
          </Link>

        {/* Desktop Navigation menu */}
        <nav className="hidden md:flex items-center space-x-6" role="navigation" aria-label="Main navigation">
          <Link href="/products" className="text-foreground hover:text-primary transition-colors">
            Products
          </Link>
          <Link href="/integrations" className="text-foreground hover:text-primary transition-colors">
            Integrations
          </Link>
          <Link href="/halal-certification" className="text-foreground hover:text-primary transition-colors">
            Halal Certification
          </Link>
          <Link href="/marketplace" className="text-foreground hover:text-primary transition-colors">
            Marketplace
          </Link>
          {user && user.role === UserRole.VENDOR && (
            <Link href="/vendor/marketplace" className="text-foreground hover:text-primary transition-colors">
              Vendor Marketplace
            </Link>
          )}
          <Link href="/ai-site-generator" className="text-foreground hover:text-primary transition-colors">
            AI Site Generator
          </Link>
          <Link href="/ai-chat" className="text-foreground hover:text-primary transition-colors">
            AI Chat
          </Link>
          <Link href="/investor" className="text-foreground hover:text-primary transition-colors">
            Investor
          </Link>
        </nav>

        {/* Right side: theme toggle, cart, auth buttons/menu, mobile toggle */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <CartIcon />
          {user ? (
            <div className="relative">
              {/* User menu button */}
              <button
                onClick={toggleUserMenu}
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors"
                aria-label="User menu"
                aria-expanded={userMenuOpen}
                aria-haspopup="menu"
              >
                <User size={20} />
                <span className="hidden sm:block">{user.name}</span>
                <ChevronDown size={16} />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg z-50" role="menu">
                  <div className="py-1">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-foreground hover:bg-muted"
                      onClick={() => setUserMenuOpen(false)}
                      role="menuitem"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/orders"
                      className="block px-4 py-2 text-sm text-foreground hover:bg-muted"
                      onClick={() => setUserMenuOpen(false)}
                      role="menuitem"
                    >
                      Orders
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-foreground hover:bg-muted"
                      onClick={() => setUserMenuOpen(false)}
                      role="menuitem"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted"
                      role="menuitem"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Login and Register buttons for unauthenticated users */}
              <Button variant="outline" size="sm" onClick={() => router.push('/auth/login')}>
                Login
              </Button>
              <Button variant="primary" size="sm" onClick={() => router.push('/auth/register')}>
                Register
              </Button>
            </>
          )}

          {/* Mobile menu toggle button */}
          <button
            className="md:hidden p-2 rounded-md text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-background border-t border-border shadow-inner" role="navigation" aria-label="Mobile navigation">
          <ul className="flex flex-col space-y-2 p-4">
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
              <Link href="/marketplace" className="block text-foreground hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Marketplace
              </Link>
            </li>
            {user && user.role === UserRole.VENDOR && (
              <li>
                <Link href="/vendor/marketplace" className="block text-foreground hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Vendor Marketplace
                </Link>
              </li>
            )}
            <li>
              <Link href="/ai-site-generator" className="block text-foreground hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                AI Site Generator
              </Link>
            </li>
            <li>
              <Link href="/ai-chat" className="block text-foreground hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                AI Chat
              </Link>
            </li>
            <li>
              <Link href="/investor" className="block text-foreground hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Investor
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link href="/profile" className="block text-foreground hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    Profile
                  </Link>
                </li>
                <li>
                  <Link href="/orders" className="block text-foreground hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    Orders
                  </Link>
                </li>
                <li>
                  <Link href="/settings" className="block text-foreground hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    Settings
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                    className="block w-full text-left text-foreground hover:text-primary transition-colors"
                  >
                    Logout
                  </button>
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
});
