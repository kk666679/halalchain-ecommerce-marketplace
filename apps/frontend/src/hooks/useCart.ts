'use client';

import { useState, useEffect } from 'react';
import { Cart, CartItem, CheckoutData } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export function useCart() {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAuthHeaders = () => {
    if (typeof window === 'undefined') {
      return {};
    }
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  };

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE}/cart`, {
        headers: getAuthHeaders(),
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setCart(data);
      } else {
        setError(`Failed to fetch cart: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setError('Error fetching cart');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity: number = 1) => {
    try {
      const response = await fetch(`${API_BASE}/cart`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ productId, quantity }),
      });
      if (response.ok) {
        await fetchCart();
        return true;
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
    return false;
  };

  const updateCartItem = async (itemId: string, quantity: number) => {
    try {
      const response = await fetch(`${API_BASE}/cart/${itemId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ quantity }),
      });
      if (response.ok) {
        await fetchCart();
        return true;
      }
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
    return false;
  };

  const removeFromCart = async (itemId: string) => {
    try {
      const response = await fetch(`${API_BASE}/cart/${itemId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        await fetchCart();
        return true;
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
    return false;
  };

  const checkout = async (checkoutData: CheckoutData) => {
    try {
      const response = await fetch(`${API_BASE}/cart/checkout`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(checkoutData),
      });
      if (response.ok) {
        const order = await response.json();
        setCart({ items: [], total: 0 });
        return order;
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
    return null;
  };

  useEffect(() => {
    fetchCart();
  }, []);

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