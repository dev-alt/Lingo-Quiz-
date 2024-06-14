"use client";
import { motion } from "framer-motion";

export default function StoreLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col justify-center gap-4 py-8 md:py-4">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
				className="text-center p-4 rounded-lg shadow-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-800 z-10"
			>
				<h1 className="text-3xl md:text-5xl font-extrabold">LingoQuiz</h1>
				<h2 className="text-xl md:text-2xl font-semibold">
					Master your language skills
				</h2>
			</motion.div>

			<div className="inline-block text-center justify-center items-center">
			  {children}
			</div>
		</section>
	  );
	}