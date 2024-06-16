'use client'
import ProductList from "@/components/productList";
import {useDisclosure } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import ConfirmPurchaseModal from "@/components/modals/confirmStoreModal";
import { Product } from '@/types';
import { useToast } from "@/context/toastContext";
import { useQuery } from "@apollo/client";
import { GET_ITEMS } from "@/queries/graphql";

export default function StorePage() {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { showToast } = useToast();
	
	const { loading, error, data } = useQuery(GET_ITEMS);

	// Filter products based on search query
	const filteredProducts = data?.getItems.filter((product: Product) => 
		product.name.toLowerCase().includes(searchQuery.toLowerCase())
	  ) || [];

	// Handle buy button click
	const handleBuy = (product: Product) => {
		setSelectedProduct(product);
		onOpen();
	};

	// Handle confirm purchase button click
	const handleConfirmPurchase = async () => {
		if (selectedProduct) {
			console.log('Buying product:', selectedProduct);
		  try {
			// Fetch the token from localStorage
			const token = localStorage.getItem('token');
			if (!token) {
			  throw new Error('No authentication token found');
			}
	
			// Send the purchase request to the backend
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/transactions/buy-item`, {
			  method: 'POST',
			  headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			  },
			  body: JSON.stringify({ itemId: selectedProduct._id })
			});
	
			if (response.ok) {
			  const data = await response.json();
			  showToast(data.message, 'success');
			  onClose(); 
			} else {
			  const errorData = await response.json();
			  showToast(errorData.error, 'error');
			}
		  } catch (error) {
			showToast('An error occurred while processing your purchase.', 'error');
			console.error(error); 
		  }
		}
	  };

	  if (loading) {
		return <p>Loading...</p>;
	  }
	  if (error) {
		return <p>Error: {error.message}</p>;
	  }

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