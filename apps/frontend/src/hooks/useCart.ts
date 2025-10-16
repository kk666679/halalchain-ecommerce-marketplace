import { useState, useEffect, useCallback } from 'react';
import { cartApi } from '@/lib/api';
import { Cart } from '@/types';

export function useCart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setCart({ items: [], total: 0 });
        return;
      }

      const cartData = await cartApi.getCart() as Cart;
      setCart(cartData);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      setCart({ items: [], total: 0 });
    }
  }, []);

  const addToCart = async (productId: string, quantity: number = 1) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Please login to add items to cart');
      }

      setLoading(true);
      await cartApi.addToCart(productId, quantity);
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
      await cartApi.updateCartItem(cartItemId, quantity);
      await fetchCart();
    } catch (error) {
      console.error('Failed to update cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      setLoading(true);
      await cartApi.removeFromCart(cartItemId);
      await fetchCart();
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      throw error;
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
      const order = await cartApi.checkout();
      setCart({ items: [], total: 0 });
      return order;
    } catch (error) {
      console.error('Checkout failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      // Remove all cart items one by one (or implement a clear endpoint in backend)
      if (cart?.items) {
        for (const item of cart.items) {
          await removeFromCart(item.id);
        }
      }
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return {
    cart: cart || { items: [], total: 0 },
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    checkout,
    clearCart,
    refreshCart: fetchCart,
  };
}
