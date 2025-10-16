import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Image
              src="https://oq1gkkfo4q0hj5xi.public.blob.vercel-storage.com/Halalchain_20251003_011847_0000.svg"
              alt="HalalChain"
              width={120}
              height={40}
              className="h-8 w-auto mb-4 filter invert"
            />
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
              <li><a href="https://halallogistics.xyz" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">Halal Logistics and Supply Chain</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; 2025 Powered by HalalChain AI • Ethical Commerce for Everyone.</p>
        </div>
      </div>
    </footer>
  );
};
