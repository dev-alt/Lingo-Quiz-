'use client'
import { title } from "@/components/primitives";
import ProductList from "@/components/productList";
import generateFakeProducts from '@/components/generateFakeData'; 
import { Button, Spacer, Input } from '@nextui-org/react';
import { useState } from 'react';

export default function StorePage() {
	const fakeProducts = generateFakeProducts(10);
	const [searchQuery, setSearchQuery] = useState('');
	const filteredProducts = fakeProducts.filter((product) =>
		product.title.toLowerCase().includes(searchQuery.toLowerCase())
	  );
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
	  <ProductList products={filteredProducts} />
	  </div>

	);
}
