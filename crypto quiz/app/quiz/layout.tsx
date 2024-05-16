"use client";
import { ReactNode } from 'react';
import { useRouter } from "next/navigation";
import { Button, Card, CardBody, CardFooter } from '@nextui-org/react';
import { title } from "@/components/primitives";

export default function QuizLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	return (
		<section className="flex items-center justify-center py-8 md:py-10 bg-gray-800">
		  <div className="w-full max-w-3xl text-center text-white">
			<div>
			  <h1 className={title({ color: "violet" })}>Crypto Quiz</h1>
			  <h2 className="text-white">Test your knowledge of cryptocurrencies</h2>
			</div>
			{/* Remove the button from here */}
			{children}
		  </div>
		</section>
	  );
	}