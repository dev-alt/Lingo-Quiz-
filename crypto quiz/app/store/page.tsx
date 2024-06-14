'use client'
import { title } from "@/components/primitives";
import ProductList from "@/components/productList";
import generateFakeProducts from '@/components/generateFakeData';
import { Input, useDisclosure } from '@nextui-org/react';
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
	useEffect(() => {
		setFakeProducts(generateFakeProducts(10));
	}, []);


	const filteredProducts = fakeProducts.filter((products) =>
		products.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const handleBuy = (product: Product) => {
		console.log("Buying product:", product.title);
		setSelectedProduct(product);
		console.log("Selected product:", selectedProduct);
		onOpen();
	};

	const handleConfirmPurchase = () => {
		if (selectedProduct) {
			console.log("Confirmed purchase of:", selectedProduct.title);
			onClose();
			showToast('Purchase successful!', 'success');
		}
	};

	useEffect(() => {
		console.log('isOpen state changed:', isOpen);
	}, [isOpen]);

	return (

		<div className="max-w-7xl mx-auto py-12 bg-gray-900 p-6 rounded-md shadow-lg shadow-teal-500 border-2 border-teal-500">

<div className="flex flex-col items-center justify-center">
			<p className="text-3xl font-bold text-white pb-4">LINGOQUIZ STORE</p>
			</div>
			<ProductList products={filteredProducts} onBuy={handleBuy} />
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