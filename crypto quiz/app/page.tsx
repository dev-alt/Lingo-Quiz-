'use client'
import { Link } from "@nextui-org/link";
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
			<div className="inline-block max-w-lg text-center justify-center max-w-4xl">
				<h1 className={title({ color: "violet" })}>LingoQuiz&nbsp;</h1>
			</div>
			<div className="inline-block text-center justify-center py-4 gap-8 md:py-10 space-y-4 max-w-4xl">
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
