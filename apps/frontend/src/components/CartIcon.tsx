'use client';

import { useCart } from '@/hooks/useCart';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export default function CartIcon() {
  const { cart } = useCart();
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link href="/cart" className="relative p-2 text-gray-600 hover:text-green-600 transition-colors">
      <ShoppingCart className="h-6 w-6" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  );
}