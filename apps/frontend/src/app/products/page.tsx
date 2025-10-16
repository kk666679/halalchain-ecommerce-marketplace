'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import { productsApi } from '@/lib/api';
import { ProductCard } from '@/components/ProductCard';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

function ProductsContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productsApi.getAll({ search: searchQuery });
        setProducts(data);
      } catch {
        // Use mock data when backend is not available
        const mockProducts: Product[] = [
          {
            id: '1',
            name: 'Halal Chicken Breast',
            description: 'Fresh, premium halal-certified chicken breast',
            price: 12.99,
            category: 'Meat',
            images: [],
            vendorId: 'vendor1',
            vendorName: 'Halal Meats Co',
            isHalalCertified: true,
            blockchainHash: '0x1234...abcd',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '2',
            name: 'Organic Dates',
            description: 'Premium Medjool dates from certified farms',
            price: 8.50,
            category: 'Fruits',
            images: [],
            vendorId: 'vendor2',
            vendorName: 'Desert Fruits',
            isHalalCertified: true,
            blockchainHash: '0x5678...efgh',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '3',
            name: 'Halal Beef Jerky',
            description: 'Artisan halal beef jerky with natural spices',
            price: 15.99,
            category: 'Snacks',
            images: [],
            vendorId: 'vendor3',
            vendorName: 'Snack Masters',
            isHalalCertified: true,
            blockchainHash: '0x9abc...ijkl',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '4',
            name: 'Halal Lamb Chops',
            description: 'Tender halal lamb chops from grass-fed sheep',
            price: 24.99,
            category: 'Meat',
            images: [],
            vendorId: 'vendor1',
            vendorName: 'Halal Meats Co',
            isHalalCertified: true,
            blockchainHash: '0xdef1...2345',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '5',
            name: 'Organic Honey',
            description: 'Pure organic honey from wildflower meadows',
            price: 18.50,
            category: 'Pantry',
            images: [],
            vendorId: 'vendor4',
            vendorName: 'Golden Harvest',
            isHalalCertified: true,
            blockchainHash: '0x6789...abcd',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '6',
            name: 'Halal Cheese Selection',
            description: 'Artisan halal cheese variety pack',
            price: 22.00,
            category: 'Dairy',
            images: [],
            vendorId: 'vendor5',
            vendorName: 'Dairy Delights',
            isHalalCertified: true,
            blockchainHash: '0xefgh...5678',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '7',
            name: 'Halal Frozen Pizza',
            description: 'Delicious halal frozen pizza with premium toppings',
            price: 9.99,
            category: 'Frozen',
            images: [],
            vendorId: 'vendor6',
            vendorName: 'Frozen Foods Co',
            isHalalCertified: true,
            blockchainHash: '0xijkl...9012',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '8',
            name: 'Halal Spice Mix',
            description: 'Traditional Middle Eastern spice blend',
            price: 6.75,
            category: 'Spices',
            images: [],
            vendorId: 'vendor7',
            vendorName: 'Spice Bazaar',
            isHalalCertified: true,
            blockchainHash: '0xmnop...3456',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '9',
            name: 'Halal Energy Bars',
            description: 'Nutritious halal energy bars with nuts and dates',
            price: 12.50,
            category: 'Health',
            images: [],
            vendorId: 'vendor8',
            vendorName: 'Healthy Bites',
            isHalalCertified: true,
            blockchainHash: '0xqrst...7890',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '10',
            name: 'Halal Olive Oil',
            description: 'Extra virgin halal olive oil from Mediterranean groves',
            price: 16.25,
            category: 'Oils',
            images: [],
            vendorId: 'vendor9',
            vendorName: 'Mediterranean Oils',
            isHalalCertified: true,
            blockchainHash: '0xuvwx...1234',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '11',
            name: 'Halal Tea Collection',
            description: 'Premium halal tea collection with exotic flavors',
            price: 14.99,
            category: 'Beverages',
            images: [],
            vendorId: 'vendor10',
            vendorName: 'Tea Masters',
            isHalalCertified: true,
            blockchainHash: '0xyzab...5678',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '12',
            name: 'Halal Cookies',
            description: 'Homemade halal cookies with traditional recipes',
            price: 8.99,
            category: 'Bakery',
            images: [],
            vendorId: 'vendor11',
            vendorName: 'Sweet Treats',
            isHalalCertified: true,
            blockchainHash: '0xcdef...9012',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ];
        setProducts(searchQuery ? mockProducts.filter(p => 
          p.name.toLowerCase().includes(searchQuery.toLowerCase())
        ) : mockProducts);
        console.warn('Backend not available, using mock data');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  const handleViewDetails = (product: Product) => {
    // Navigate to product details
    window.location.href = `/products/${product.id}`;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-foreground">Loading products...</div>
      </div>
    );
  }



  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
        </h1>
        <p className="text-muted-foreground">
          Discover halal-certified products from trusted vendors
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No products found</p>
          <p className="text-muted-foreground/80 mt-2">
            {searchQuery ? 'Try adjusting your search terms' : 'Check back later for new products'}
          </p>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard
                product={product}
                onViewDetails={handleViewDetails}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8"><div className="text-center text-foreground">Loading products...</div></div>}>
      <ProductsContent />
    </Suspense>
  );
}
