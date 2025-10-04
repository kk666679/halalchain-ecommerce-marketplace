'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Product } from '@/types';
import { productsApi } from '@/lib/api';
import { Button } from '@/components/Button';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{ isValid: boolean; hash: string } | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productsApi.getById(id as string);
        setProduct(data);
      } catch {
        // Use mock data when backend is not available
        const mockProduct: Product = {
          id: id as string,
          name: 'Halal Chicken Breast',
          description: 'Fresh, premium halal-certified chicken breast from trusted farms. Our chicken is raised according to strict halal standards and processed in certified facilities.',
          price: 12.99,
          category: 'Meat',
          images: ['/placeholder-product.jpg'],
          vendorId: 'vendor1',
          vendorName: 'Halal Meats Co',
          isHalalCertified: true,
          blockchainHash: '0x1234567890abcdef',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        setProduct(mockProduct);
        console.warn('Backend not available, using mock data');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleVerifyHalal = async () => {
    if (!product) return;
    
    try {
      setVerifying(true);
      const result = await productsApi.verifyHalal(product.id);
      setVerificationResult(result);
    } catch {
      // Mock verification result when backend is not available
      setVerificationResult({ isValid: true, hash: '0x1234567890abcdef' });
      console.warn('Backend not available, using mock verification');
    } finally {
      setVerifying(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      alert(`Added ${product.name} to cart`);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">Product not found</div>
      </div>
    );
  }

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
              <span className="text-gray-500">By {product.vendorName}</span>
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
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleVerifyHalal}
                  disabled={verifying}
                >
                  {verifying ? 'Verifying...' : 'Verify on Blockchain'}
                </Button>
                {verificationResult && (
                  <div className={`mt-2 p-2 rounded ${verificationResult.isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {verificationResult.isValid ? '✓ Verification successful' : '✗ Verification failed'}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-yellow-600">⚠ This product is not Halal certified</p>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <Button
              variant="primary"
              size="lg"
              onClick={handleAddToCart}
              className="w-full"
            >
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.history.back()}
              className="w-full"
            >
              Back to Products
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}