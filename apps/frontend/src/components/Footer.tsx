import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">HalalChain</h3>
            <p className="text-gray-300 text-sm">
              Your trusted marketplace for halal-certified products with blockchain verification.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-md font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="text-gray-300 hover:text-white">Products</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-md font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/help" className="text-gray-300 hover:text-white">Help Center</Link></li>
              <li><Link href="/shipping" className="text-gray-300 hover:text-white">Shipping Info</Link></li>
              <li><Link href="/returns" className="text-gray-300 hover:text-white">Returns</Link></li>
            </ul>
          </div>

          {/* Vendor */}
          <div>
            <h4 className="text-md font-semibold mb-4">For Vendors</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/vendor/register" className="text-gray-300 hover:text-white">Become a Vendor</Link></li>
              <li><Link href="/vendor/dashboard" className="text-gray-300 hover:text-white">Vendor Portal</Link></li>
              <li><Link href="/certification" className="text-gray-300 hover:text-white">Halal Certification</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; 2025 HalalChain. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
