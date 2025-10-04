'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Product } from '@/types';
import { Button } from '@/components/Button';

export default function VendorDashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Halal Chicken Breast',
      description: 'Fresh, premium halal-certified chicken breast',
      price: 12.99,
      category: 'Meat',
      images: ['/placeholder-product.jpg'],
      vendorId: 'vendor1',
      vendorName: 'Your Store',
      isHalalCertified: true,
      blockchainHash: '0x1234...abcd',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]);
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
      if (parsedUser.role !== 'vendor') {
        router.push('/dashboard');
        return;
      }
      setUser(parsedUser);
    } catch (err) {
      console.error('Invalid user data:', err);
      router.push('/auth/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading vendor dashboard...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Vendor Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900">Total Products</h3>
            <p className="text-3xl font-bold text-green-600">{products.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900">Total Orders</h3>
            <p className="text-3xl font-bold text-blue-600">12</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900">Revenue</h3>
            <p className="text-3xl font-bold text-purple-600">$1,234</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900">Rating</h3>
            <p className="text-3xl font-bold text-yellow-600">4.8⭐</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Add New Product</Button>
            <Button variant="outline">Manage Inventory</Button>
            <Button variant="outline">View Orders</Button>
            <Button variant="outline">Analytics</Button>
          </div>
        </div>

        {/* Recent Products */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Products</h2>
            <Button variant="primary" size="sm">Add Product</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Product</th>
                  <th className="text-left py-2">Price</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-left py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="py-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded mr-3"></div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">${product.price}</td>
                    <td className="py-3">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        Active
                      </span>
                    </td>
                    <td className="py-3">
                      <Button variant="outline" size="sm">Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}