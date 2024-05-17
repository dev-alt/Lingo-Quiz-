'use client';

import React from 'react';
import ProductCard from './productCard';
import { Product, ProductListProps } from '../types/products.types';


const ProductList: React.FC<ProductListProps> = ({ products }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={() => { } } isLoading={false} />
        ))}
    </div>
);

export default ProductList;