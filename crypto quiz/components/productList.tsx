'use client';

import React from 'react';
import ProductCard from './productCard';

interface Product {
    id: number;
    title: string;
    imageUrl: string;
    description: string;
    price: number;
}


interface ProductListProps {
    products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={() => { /* Your add to cart logic */ }} />
        ))}
    </div>
);

export default ProductList;