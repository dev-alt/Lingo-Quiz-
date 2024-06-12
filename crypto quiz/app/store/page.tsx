'use client'
import { title } from "@/components/primitives";
import ProductList from "@/components/productList";
import generateFakeProducts from '@/components/generateFakeData';
import { Input, useDisclosure } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import ConfirmPurchaseModal from "@/components/confirmStoreModal";
import { Product} from '@/types/products.types';
import { useToast } from "../toastContext";

export default function StorePage() {
	const [fakeProducts, setFakeProducts] = useState<Product[]>([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
	const { isOpen, onOpen, onClose } = useDisclosure();
    const { showToast } = useToast();
	useEffect(() => {
        setFakeProducts(generateFakeProducts(10));
    }, []);

	
	const filteredProducts = fakeProducts.filter((product) =>
		product.title.toLowerCase().includes(searchQuery.toLowerCase())
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
			<div className="flex items-center justify-between mb-8">
				<h1 className={title({ color: "violet" })}>
					LingoQuiz Store
				</h1>
				<div className="items-center mt-2">
					<Input
						type="text"
						placeholder="Search products..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="max-w-xs rounded-md"
					/>
				</div>
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