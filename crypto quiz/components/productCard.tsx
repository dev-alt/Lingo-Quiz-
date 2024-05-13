'use client';

import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Card, CardBody, Image, Button } from '@nextui-org/react';

interface ProductCardProps {
    product: {
        id: number;
        title: string;
        imageUrl: string;
        description: string;
        price: number;
    };
    onAddToCart: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {

  
    return (
      <motion.div 
        whileHover={{ scale: 1.05, y: [-5, 0, -3, 0], 
        transition: { duration: 2, ease: "easeInOut", repeat: Infinity } }}
        className="cursor-pointer"
      >
        <Card className=' border-2 border-teal-500 bg-yellow-200'>
        <CardBody className="flex flex-col items-center relative p-0">
                <Image
                    src={product.imageUrl}
                    alt={product.title}
                    width={200}
                    height={150}
                />
                <h4 className="text-center mt-2">
                    {product.title}
                </h4>
                <b className="text-center mt-2">Price: {product.price}</b>
                <Button color="primary" onClick={() => onAddToCart(product.id)}
                className=''>
                    Add to Cart
                </Button>
            </CardBody>
        </Card>
    </motion.div>
);
}

export default ProductCard;

