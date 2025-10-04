'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types';
import { Button } from '@/components/Button';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/auth/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (err) {
      console.error('Invalid user data:', err);
      router.push('/auth/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading dashboard...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.name}!</h1>
              <p className="text-gray-600 mt-2">Role: {user.role}</p>
              <p className="text-gray-600">Email: {user.email}</p>
            </div>
            <div className="flex items-center space-x-2">
              {user.isVerified && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  ✓ Verified
                </span>
              )}
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Role-specific content */}
        {user.role === 'vendor' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2">My Products</h3>
              <p className="text-gray-600 mb-4">Manage your product listings</p>
              <Button variant="primary" size="sm">
                View Products
              </Button>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2">Orders</h3>
              <p className="text-gray-600 mb-4">Track and manage orders</p>
              <Button variant="primary" size="sm">
                View Orders
              </Button>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2">Analytics</h3>
              <p className="text-gray-600 mb-4">View sales performance</p>
              <Button variant="primary" size="sm">
                View Analytics
              </Button>
            </div>
          </div>
        )}

        {user.role === 'buyer' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2">My Orders</h3>
              <p className="text-gray-600 mb-4">Track your order history</p>
              <Button variant="primary" size="sm">
                View Orders
              </Button>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2">Wishlist</h3>
              <p className="text-gray-600 mb-4">Manage your saved products</p>
              <Button variant="primary" size="sm">
                View Wishlist
              </Button>
            </div>
          </div>
        )}

        {user.role === 'admin' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2">Users</h3>
              <p className="text-gray-600 mb-4">Manage platform users</p>
              <Button variant="primary" size="sm">
                Manage Users
              </Button>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2">Products</h3>
              <p className="text-gray-600 mb-4">Review product listings</p>
              <Button variant="primary" size="sm">
                Review Products
              </Button>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2">Orders</h3>
              <p className="text-gray-600 mb-4">Monitor all orders</p>
              <Button variant="primary" size="sm">
                View Orders
              </Button>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2">Analytics</h3>
              <p className="text-gray-600 mb-4">Platform insights</p>
              <Button variant="primary" size="sm">
                View Analytics
              </Button>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" onClick={() => router.push('/products')}>
              Browse Products
            </Button>
            <Button variant="outline" onClick={() => router.push('/')}>
              Go to Homepage
            </Button>
            {user.role === 'vendor' && (
              <Button variant="primary">
                Add New Product
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}