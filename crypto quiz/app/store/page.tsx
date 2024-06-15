'use client'
import ProductList from "@/components/productList";
import generateFakeProducts from '@/components/generateFakeData';
import {useDisclosure } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import ConfirmPurchaseModal from "@/components/modals/confirmStoreModal";
import { Product } from '@/types';
import { useToast } from "@/context/toastContext";

export default function StorePage() {
	const [fakeProducts, setFakeProducts] = useState<Product[]>([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { showToast } = useToast();
	
	// Generate fake products on component mount
	useEffect(() => {
		setFakeProducts(generateFakeProducts(10));
	}, []);

	// Filter products based on search query
	const filteredProducts = fakeProducts.filter((product) =>
		product.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	// Handle buy button click
	const handleBuy = (product: Product) => {
		setSelectedProduct(product);
		onOpen();
	};

	// Handle confirm purchase button click
	const handleConfirmPurchase = () => {
		if (selectedProduct) {
			onClose();
			showToast('Purchase successful!', 'success');
		}
	};

	return (
		<div className="max-w-7xl mx-auto py-12 bg-gray-900 p-6 rounded-md shadow-lg shadow-teal-500 border-2 border-teal-500">
			{/* Store title */}
			<div className="flex flex-col items-center justify-center">
				<p className="text-3xl font-bold text-white pb-4">LINGOQUIZ STORE</p>
			</div>
			{/* Product list */}
			<ProductList products={filteredProducts} onBuy={handleBuy} />
			{/* Confirm purchase modal */}
			{selectedProduct && (
				<ConfirmPurchaseModal
					isOpen={isOpen}
					onClose={onClose}
					product={selectedProduct}
					handleBuy={handleConfirmPurchase}
				/>
			)}
		</div>
	);
}