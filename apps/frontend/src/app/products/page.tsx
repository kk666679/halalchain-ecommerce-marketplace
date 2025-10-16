'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Product, UserRole } from '@/types';
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
            sku: 'HALAL-001',
            vendor: { id: "vendor1", userId: 'user1', storeName: 'Halal Meats Co', totalSales: 0, isVerified: true, createdAt: new Date(), updatedAt: new Date(), user: { id: 'user1', email: '', password: '', name: '', role: UserRole.VENDOR, isVerified: true, createdAt: new Date(), updatedAt: new Date() }, products: [], suppliers: [], warehouses: [] },
            isHalalCertified: true,
            blockchainHash: '0x1234...abcd',
            stockQuantity: 100,
            minStockLevel: 10,
            maxStockLevel: 200,
            isActive: true,
            tags: [],
            reviewCount: 0,
            orderItems: [],
            inventories: [],
            certifications: [],
            cartItems: [],
            reviews: [],
            procurements: [],
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: '2',
            name: 'Organic Dates',
            description: 'Premium Medjool dates from certified farms',
            price: 8.50,
            category: 'Fruits',
            images: [],
            vendorId: 'vendor2',
            sku: 'HALAL-002',
            vendor: { id: "vendor2", userId: 'user2', storeName: 'Desert Fruits', totalSales: 0, isVerified: true, createdAt: new Date(), updatedAt: new Date(), user: { id: 'user2', email: '', password: '', name: '', role: UserRole.VENDOR, isVerified: true, createdAt: new Date(), updatedAt: new Date() }, products: [], suppliers: [], warehouses: [] },
            isHalalCertified: true,
            blockchainHash: '0x5678...efgh',
            stockQuantity: 150,
            minStockLevel: 15,
            maxStockLevel: 300,
            isActive: true,
            tags: [],
            reviewCount: 0,
            orderItems: [],
            inventories: [],
            certifications: [],
            cartItems: [],
            reviews: [],
            procurements: [],
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: '3',
            name: 'Halal Beef Jerky',
            description: 'Artisan halal beef jerky with natural spices',
            price: 15.99,
            category: 'Snacks',
            images: [],
            vendorId: 'vendor3',
            sku: 'HALAL-003',
            vendor: { id: "vendor3", userId: 'user3', storeName: 'Snack Masters', totalSales: 0, isVerified: true, createdAt: new Date(), updatedAt: new Date(), user: { id: 'user3', email: '', password: '', name: '', role: UserRole.VENDOR, isVerified: true, createdAt: new Date(), updatedAt: new Date() }, products: [], suppliers: [], warehouses: [] },
            isHalalCertified: true,
            blockchainHash: '0x9abc...ijkl',
            stockQuantity: 80,
            minStockLevel: 8,
            maxStockLevel: 160,
            isActive: true,
            tags: [],
            reviewCount: 0,
            orderItems: [],
            inventories: [],
            certifications: [],
            cartItems: [],
            reviews: [],
            procurements: [],
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: '4',
            name: 'Halal Lamb Chops',
            description: 'Tender halal lamb chops from grass-fed sheep',
            price: 24.99,
            category: 'Meat',
            images: [],
            vendorId: 'vendor1',
            sku: 'HALAL-004',
            vendor: { id: "vendor1", userId: 'user1', storeName: 'Halal Meats Co', totalSales: 0, isVerified: true, createdAt: new Date(), updatedAt: new Date(), user: { id: 'user1', email: '', password: '', name: '', role: UserRole.VENDOR, isVerified: true, createdAt: new Date(), updatedAt: new Date() }, products: [], suppliers: [], warehouses: [] },
            isHalalCertified: true,
            blockchainHash: '0xdef1...2345',
            stockQuantity: 60,
            minStockLevel: 6,
            maxStockLevel: 120,
            isActive: true,
            tags: [],
            reviewCount: 0,
            orderItems: [],
            inventories: [],
            certifications: [],
            cartItems: [],
            reviews: [],
            procurements: [],
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: '5',
            name: 'Organic Honey',
            description: 'Pure organic honey from wildflower meadows',
            price: 18.50,
            category: 'Pantry',
            images: [],
            vendorId: 'vendor4',
            sku: 'HALAL-005',
            vendor: { id: "vendor4", userId: 'user4', storeName: 'Golden Harvest', totalSales: 0, isVerified: true, createdAt: new Date(), updatedAt: new Date(), user: { id: 'user4', email: '', password: '', name: '', role: UserRole.VENDOR, isVerified: true, createdAt: new Date(), updatedAt: new Date() }, products: [], suppliers: [], warehouses: [] },
            isHalalCertified: true,
            blockchainHash: '0x6789...abcd',
            stockQuantity: 90,
            minStockLevel: 9,
            maxStockLevel: 180,
            isActive: true,
            tags: [],
            reviewCount: 0,
            orderItems: [],
            inventories: [],
            certifications: [],
            cartItems: [],
            reviews: [],
            procurements: [],
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: '6',
            name: 'Halal Cheese Selection',
            description: 'Artisan halal cheese variety pack',
            price: 22.00,
            category: 'Dairy',
            images: [],
            vendorId: 'vendor5',
            sku: 'HALAL-006',
            vendor: { id: "vendor5", userId: 'user5', storeName: 'Dairy Delights', totalSales: 0, isVerified: true, createdAt: new Date(), updatedAt: new Date(), user: { id: 'user5', email: '', password: '', name: '', role: UserRole.VENDOR, isVerified: true, createdAt: new Date(), updatedAt: new Date() }, products: [], suppliers: [], warehouses: [] },
            isHalalCertified: true,
            blockchainHash: '0xefgh...5678',
            stockQuantity: 70,
            minStockLevel: 7,
            maxStockLevel: 140,
            isActive: true,
            tags: [],
            reviewCount: 0,
            orderItems: [],
            inventories: [],
            certifications: [],
            cartItems: [],
            reviews: [],
            procurements: [],
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: '7',
            name: 'Halal Frozen Pizza',
            description: 'Delicious halal frozen pizza with premium toppings',
            price: 9.99,
            category: 'Frozen',
            images: [],
            vendorId: 'vendor6',
            sku: 'HALAL-007',
            vendor: { id: "vendor6", userId: 'user6', storeName: 'Frozen Foods Co', totalSales: 0, isVerified: true, createdAt: new Date(), updatedAt: new Date(), user: { id: 'user6', email: '', password: '', name: '', role: UserRole.VENDOR, isVerified: true, createdAt: new Date(), updatedAt: new Date() }, products: [], suppliers: [], warehouses: [] },
            isHalalCertified: true,
            blockchainHash: '0xijkl...9012',
            stockQuantity: 120,
            minStockLevel: 12,
            maxStockLevel: 240,
            isActive: true,
            tags: [],
            reviewCount: 0,
            orderItems: [],
            inventories: [],
            certifications: [],
            cartItems: [],
            reviews: [],
            procurements: [],
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: '8',
            name: 'Halal Spice Mix',
            description: 'Traditional Middle Eastern spice blend',
            price: 6.75,
            category: 'Spices',
            images: [],
            vendorId: 'vendor7',
            sku: 'HALAL-008',
            vendor: { id: "vendor7", userId: 'user7', storeName: 'Spice Bazaar', totalSales: 0, isVerified: true, createdAt: new Date(), updatedAt: new Date(), user: { id: 'user7', email: '', password: '', name: '', role: UserRole.VENDOR, isVerified: true, createdAt: new Date(), updatedAt: new Date() }, products: [], suppliers: [], warehouses: [] },
            isHalalCertified: true,
            blockchainHash: '0xmnop...3456',
            stockQuantity: 200,
            minStockLevel: 20,
            maxStockLevel: 400,
            isActive: true,
            tags: [],
            reviewCount: 0,
            orderItems: [],
            inventories: [],
            certifications: [],
            cartItems: [],
            reviews: [],
            procurements: [],
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: '9',
            name: 'Halal Energy Bars',
            description: 'Nutritious halal energy bars with nuts and dates',
            price: 12.50,
            category: 'Health',
            images: [],
            vendorId: 'vendor8',
            sku: 'HALAL-009',
            vendor: { id: "vendor8", userId: 'user8', storeName: 'Healthy Bites', totalSales: 0, isVerified: true, createdAt: new Date(), updatedAt: new Date(), user: { id: 'user8', email: '', password: '', name: '', role: UserRole.VENDOR, isVerified: true, createdAt: new Date(), updatedAt: new Date() }, products: [], suppliers: [], warehouses: [] },
            isHalalCertified: true,
            blockchainHash: '0xqrst...7890',
            stockQuantity: 100,
            minStockLevel: 10,
            maxStockLevel: 200,
            isActive: true,
            tags: [],
            reviewCount: 0,
            orderItems: [],
            inventories: [],
            certifications: [],
            cartItems: [],
            reviews: [],
            procurements: [],
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: '10',
            name: 'Halal Olive Oil',
            description: 'Extra virgin halal olive oil from Mediterranean groves',
            price: 16.25,
            category: 'Oils',
            images: [],
            vendorId: 'vendor9',
            sku: 'HALAL-010',
            vendor: { id: "vendor9", userId: 'user9', storeName: 'Mediterranean Oils', totalSales: 0, isVerified: true, createdAt: new Date(), updatedAt: new Date(), user: { id: 'user9', email: '', password: '', name: '', role: UserRole.VENDOR, isVerified: true, createdAt: new Date(), updatedAt: new Date() }, products: [], suppliers: [], warehouses: [] },
            isHalalCertified: true,
            blockchainHash: '0xuvwx...1234',
            stockQuantity: 85,
            minStockLevel: 8,
            maxStockLevel: 170,
            isActive: true,
            tags: [],
            reviewCount: 0,
            orderItems: [],
            inventories: [],
            certifications: [],
            cartItems: [],
            reviews: [],
            procurements: [],
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: '11',
            name: 'Halal Tea Collection',
            description: 'Premium halal tea collection with exotic flavors',
            price: 14.99,
            category: 'Beverages',
            images: [],
            vendorId: 'vendor10',
            sku: 'HALAL-011',
            vendor: { id: "vendor10", userId: 'user10', storeName: 'Tea Masters', totalSales: 0, isVerified: true, createdAt: new Date(), updatedAt: new Date(), user: { id: 'user10', email: '', password: '', name: '', role: UserRole.VENDOR, isVerified: true, createdAt: new Date(), updatedAt: new Date() }, products: [], suppliers: [], warehouses: [] },
            isHalalCertified: true,
            blockchainHash: '0xyzab...5678',
            stockQuantity: 95,
            minStockLevel: 9,
            maxStockLevel: 190,
            isActive: true,
            tags: [],
            reviewCount: 0,
            orderItems: [],
            inventories: [],
            certifications: [],
            cartItems: [],
            reviews: [],
            procurements: [],
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: '12',
            name: 'Halal Cookies',
            description: 'Homemade halal cookies with traditional recipes',
            price: 8.99,
            category: 'Bakery',
            images: [],
            vendorId: 'vendor11',
            sku: 'HALAL-012',
            vendor: { id: "vendor11", userId: 'user11', storeName: 'Sweet Treats', totalSales: 0, isVerified: true, createdAt: new Date(), updatedAt: new Date(), user: { id: 'user11', email: '', password: '', name: '', role: UserRole.VENDOR, isVerified: true, createdAt: new Date(), updatedAt: new Date() }, products: [], suppliers: [], warehouses: [] },
            isHalalCertified: true,
            blockchainHash: '0xcdef...9012',
            stockQuantity: 110,
            minStockLevel: 11,
            maxStockLevel: 220,
            isActive: true,
            tags: [],
            reviewCount: 0,
            orderItems: [],
            inventories: [],
            certifications: [],
            cartItems: [],
            reviews: [],
            procurements: [],
            createdAt: new Date(),
            updatedAt: new Date()
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
