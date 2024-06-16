"use client"
import { motion } from "framer-motion";

export default function CourseLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
	<section className="mt-4 flex items-center justify-center py-8 md:py-10 relative">
		<div className="w-full min-w-full text-center text-white">

			{/* Floating Title */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
				className="p-4 rounded-lg shadow-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-800 z-10"
			>
				<h1 className="text-3xl md:text-5xl font-extrabold">LingoQuiz</h1>
				<h2 className="text-xl md:text-2xl font-semibold">
					Master your language skills
				</h2>
			</motion.div>

			{/* Quiz Content */}
			<div className="mt-8">
				{children}
			</div>
		</div>
	</section>
	);
}



