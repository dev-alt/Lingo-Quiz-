'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Skeleton } from '@nextui-org/react';
import { ProductCardProps, Product } from '@/types/';

interface ProductCardComponentProps extends ProductCardProps {
  product: Product;
  onBuy: (product: Product) => void;
  isLoading: boolean;  
}

const ProductCard: React.FC<ProductCardComponentProps> = ({ product, onBuy, isLoading }) => {

  return (
    <div className="relative group overflow-hidden p-4 rounded-lg hover:shadow-[2px_2px_10px_1px_#4299e1] max-w-xs mx-auto">
      {isLoading ? (
        <div>
          <Skeleton className="mb-4 h-6 w-3/4" />
          <Skeleton className="h-48 w-full mb-4 rounded-lg" />
          <Skeleton className="h-6 w-1/4 mb-4" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : (
        <>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="cursor-pointer mb-4 relative"
          >
            <Image
              src={product.imageUrl}
              alt={product.title}
              width={200}
              height={200}
              className="object-cover rounded-lg w-full h-48"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
              <p>{product.description}</p>
            </div>
          </motion.div>
          <motion.h4
            className="text-center text-white mb-2 mt-2"
            whileHover={{ scale: 1.1, color: '#4299e1' }}
            transition={{ duration: 0.2 }}
          >
            {product.title}
          </motion.h4>

          <motion.button
           type="button" 
            onClick={() => onBuy(product)}
            className={`
    w-full text-white font-bold py-2 px-4 rounded-lg
    bg-gradient-to-r from-blue-500 to-purple-500
    opacity-0 group-hover:opacity-100 transition-opacity duration-300
    focus:outline-none focus:ring
  `}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            aria-label={`Add ${product.title} to Cart`}
          >
            ${product.price}
          </motion.button>
        </>
      )}
    </div>
  );
};

export default ProductCard;
