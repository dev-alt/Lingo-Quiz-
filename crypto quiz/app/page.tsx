'use client'
import Link from 'next/link'
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import CourseCard from "@/components/courseCard";

export default function Home() {
	const handleResume = (courseId: number) => {
		console.log('Resuming course:', courseId);
	};

	return (
		<section className="flex flex-col justify-center gap-4 py-8 md:py-10 ">
			<div className="text-center overflow-hidden p-4 md:p-6 shadow-[5px_3px_5px_5px_#14b8a6] mr-4">
				<h1 className={title({ color: "violet" })} >CryptoQuiz&nbsp;</h1>
			</div>
			<div className="inline-block text-center justify-center py-4 gap-8 md:py-10 space-y-8 max-w-4xl md:ml-10">
				<Link href={`/quiz/create/`} className="flex items-center justify-between w-full text-white">	
					Create New Quiz
				</Link>
				<CourseCard
					title="Introduction to Cryptography"
					courseId="1"
					progress={30}
					maxProgress={100}
					onResume={() => handleResume(1)}
				/>
				<CourseCard
					title="Introduction to Cryptography"
					courseId="2"
					progress={30}
					maxProgress={100}
					onResume={() => handleResume(1)}
				/>
				<CourseCard
					title="Introduction to Cryptography"
					courseId="3"
					progress={30}
					maxProgress={100}
					onResume={() => handleResume(1)}
				/>
				<CourseCard
					title="Introduction to Cryptography"
					courseId="4"
					progress={30}
					maxProgress={100}
					onResume={() => handleResume(1)}
				/>
				<CourseCard
					title="Introduction to Cryptography"
					courseId="5"
					progress={30}
					maxProgress={100}
					onResume={() => handleResume(1)}
				/>
			</div>
			<div className="mt-8 ">

			</div>
		</section>
	);
}
