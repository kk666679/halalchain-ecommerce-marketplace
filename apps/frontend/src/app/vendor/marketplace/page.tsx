'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Product } from '@/types';
import { Button } from '@/components/Button';
export default function VendorMarketplacePage() {
  const [user, setUser] = useState<User | null>(null);
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Halal Chicken Breast',
      description: 'Fresh, premium halal-certified chicken breast',
      price: 12.99,
      category: 'Meat',
      sku: 'HB001',
      barcode: '123456789',
      images: ['/placeholder-product.jpg'],
      vendorId: 'vendor1',
      isHalalCertified: true,
      blockchainHash: '0x1234...abcd',
      stockQuantity: 100,
      minStockLevel: 10,
      maxStockLevel: 200,
      isActive: true,
      tags: ['halal', 'chicken'],
      rating: 4.5,
      reviewCount: 25,
      createdAt: new Date(),
      updatedAt: new Date(),
      vendor: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
      orderItems: [],
      inventories: [],
      certifications: [],
      cartItems: [],
      reviews: [],
      procurements: []
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
        router.push('/marketplace');
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
        <div className="text-center text-foreground">Loading vendor marketplace...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-card rounded-lg shadow-md p-6 mb-8 border">
          <h1 className="text-3xl font-bold text-card-foreground mb-2">Vendor Marketplace</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card rounded-lg shadow-md p-6 border">
            <h3 className="text-lg font-semibold text-card-foreground">Total Products</h3>
            <p className="text-3xl font-bold text-primary">{products.length}</p>
          </div>
          <div className="bg-card rounded-lg shadow-md p-6 border">
            <h3 className="text-lg font-semibold text-card-foreground">Total Orders</h3>
            <p className="text-3xl font-bold text-primary">12</p>
          </div>
          <div className="bg-card rounded-lg shadow-md p-6 border">
            <h3 className="text-lg font-semibold text-card-foreground">Revenue</h3>
            <p className="text-3xl font-bold text-primary">$1,234</p>
          </div>
          <div className="bg-card rounded-lg shadow-md p-6 border">
            <h3 className="text-lg font-semibold text-card-foreground">Rating</h3>
            <p className="text-3xl font-bold text-primary">4.8⭐</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card rounded-lg shadow-md p-6 mb-8 border">
          <h2 className="text-xl font-semibold text-card-foreground mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Add New Product</Button>
            <Button variant="outline">Manage Inventory</Button>
            <Button variant="outline">View Orders</Button>
            <Button variant="outline">Analytics</Button>
          </div>
        </div>

        {/* Recent Products */}
        <div className="bg-card rounded-lg shadow-md p-6 border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-card-foreground">Your Products</h2>
            <Button variant="primary" size="sm">Add Product</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-card-foreground">Product</th>
                  <th className="text-left py-2 text-card-foreground">Price</th>
                  <th className="text-left py-2 text-card-foreground">Status</th>
                  <th className="text-left py-2 text-card-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-border">
                    <td className="py-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-muted rounded mr-3"></div>
                        <div>
                          <p className="font-medium text-card-foreground">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-card-foreground">${product.price}</td>
                    <td className="py-3">
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
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