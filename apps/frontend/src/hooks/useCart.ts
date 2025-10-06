import { useState, useEffect, useCallback } from 'react';

interface CartItem {
  id: string;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    isHalalCertified: boolean;
    halalScore?: number;
  };
  quantity: number;
}

interface Cart {
  items: CartItem[];
  total: number;
}

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

      const response = await fetch('http://localhost:3001/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const cartData = await response.json();
        setCart(cartData);
      } else {
        setCart({ items: [], total: 0 });
      }
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
      const response = await fetch('http://localhost:3001/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }

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
      const response = await fetch(`http://localhost:3001/cart/item/${cartItemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      });

      if (response.ok) {
        await fetchCart();
      }
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
      const response = await fetch(`http://localhost:3001/cart/item/${cartItemId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await fetchCart();
      }
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
      const response = await fetch('http://localhost:3001/cart/checkout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Checkout failed');
      }

      const order = await response.json();
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
