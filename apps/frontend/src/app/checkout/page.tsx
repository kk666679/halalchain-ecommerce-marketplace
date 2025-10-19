'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, loading, checkout } = useCart();
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!shippingInfo.name.trim() || !shippingInfo.address.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    if (cart.items.length === 0) {
      setError('Your cart is empty');
      return;
    }

    try {
      await checkout();
      setSuccess(true);
      // Redirect to success page or order confirmation after a delay
      setTimeout(() => {
        router.push('/marketplace');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout failed. Please try again.');
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-white p-8">
        <div className="bg-white shadow-xl p-8 rounded-2xl max-w-md w-full text-center">
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h1 className="text-2xl font-bold text-emerald-800 mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-4">Thank you for your purchase. Your order has been processed.</p>
          <p className="text-sm text-gray-500">Redirecting to marketplace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-white p-8">
      <h1 className="text-3xl font-bold text-emerald-800 mb-8">Checkout</h1>

      <div className="bg-white shadow-xl p-6 rounded-2xl max-w-md w-full">
        {/* Cart Summary */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
          <div className="space-y-2">
            {cart.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.product.name} x{item.quantity}</span>
                <span>${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              value={shippingInfo.name}
              onChange={handleInputChange}
              required
              className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Shipping Address</label>
            <textarea
              name="address"
              value={shippingInfo.address}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || cart.items.length === 0}
            className="w-full bg-emerald-700 text-white py-3 rounded-xl hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing…' : 'Complete Purchase'}
          </button>
        </form>
      </div>
    </div>
  );
}
