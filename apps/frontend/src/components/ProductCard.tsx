import React from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { Button } from './Button';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  onAddToCart,
}) => {
  return (
    <motion.div
      className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="relative">
        <Image
          src={product.images[0] || 'https://oq1gkkfo4q0hj5xi.public.blob.vercel-storage.com/Halalchain_20251003_011828_0000.png'}
          alt={product.name}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
        {product.isHalalCertified && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Halal Certified
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-card-foreground mb-2">{product.name}</h3>
        <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{product.description}</p>
        <p className="text-primary font-bold text-lg mb-2">${product.price.toFixed(2)}</p>
        <p className="text-muted-foreground text-sm mb-4">By {product.vendorName}</p>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails?.(product)}
            className="flex-1"
          >
            View Details
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onAddToCart?.(product)}
            className="flex-1"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
