import React from 'react';
import Image from 'next/image';
import { Product, UserRole } from '@/types';
import { Button } from '@/components/Button';

interface ProductDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  // Generate static params for known products
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ];
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { id } = await params;
  // Mock product data for static generation
  const product: Product = {
    id,
    name: 'Halal Chicken Breast',
    description: 'Fresh, premium halal-certified chicken breast from trusted farms. Our chicken is raised according to strict halal standards and processed in certified facilities.',
    price: 12.99,
    category: 'Meat',
    images: ['/placeholder-product.jpg'],
    vendorId: 'vendor1',
    sku: 'HALAL-CHICKEN-001',
    isHalalCertified: true,
    blockchainHash: '0x1234567890abcdef',
    stockQuantity: 100,
    minStockLevel: 10,
    maxStockLevel: 200,
    isActive: true,
    tags: [],
    reviewCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    vendor: {
      id: 'vendor1',
      userId: 'user1',
      storeName: 'Halal Meats Co',
      totalSales: 0,
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      user: {
        id: 'user1',
        email: 'vendor@example.com',
        password: '',
        name: 'Vendor User',
        role: UserRole.VENDOR,
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      products: [],
      suppliers: [],
      warehouses: []
    },
    orderItems: [],
    inventories: [],
    certifications: [],
    cartItems: [],
    reviews: [],
    procurements: []
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative">
            <Image
              src={product.images[0] || '/placeholder-product.jpg'}
              alt={product.name}
              width={600}
              height={400}
              className="w-full h-96 object-cover rounded-lg"
            />
            {product.isHalalCertified && (
              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-2 rounded-full font-semibold">
                Halal Certified
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl font-bold text-green-600">${product.price.toFixed(2)}</span>
              <span className="text-gray-500">By {product.vendor.storeName}</span>
            </div>
          </div>

          {/* Halal Verification */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Halal Verification</h3>
            {product.isHalalCertified ? (
              <div className="space-y-2">
                <p className="text-green-600 font-medium">✓ This product is Halal certified</p>
                {product.blockchainHash && (
                  <p className="text-sm text-gray-600">
                    Blockchain Hash: <code className="bg-gray-200 px-1 rounded">{product.blockchainHash}</code>
                  </p>
                )}
                <Button variant="outline" size="sm">
                  Verify on Blockchain
                </Button>
              </div>
            ) : (
              <p className="text-yellow-600">⚠ This product is not Halal certified</p>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <Button variant="primary" size="lg" className="w-full">
              Add to Cart
            </Button>
            <Button variant="outline" size="lg" className="w-full">
              Back to Products
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}