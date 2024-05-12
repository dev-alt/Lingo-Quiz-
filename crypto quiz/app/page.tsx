'use client'
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import CourseCard from "@/components/courseCard";

export default function Home() {
	const handleResume = (courseId: number) => {
		// Your logic for handling the "Resume" button click
		console.log('Resuming course:', courseId);
		// ... (Your actual resume logic goes here)
	};


	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 ">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title({ color: "violet" })}>LingoQuiz&nbsp;</h1>
			</div>
			<div className="inline-block max-w-lg text-center justify-center py-4 gap-8 md:py-10 space-y-4 max-w-4xl">
				<CourseCard
					title="Introduction to Cryptography"
					imageUrl="https://www.example.com/cryptography-image.jpg"
					progress={30}
					maxProgress={100}
					onResume={() => handleResume(1)}
				/>
				<CourseCard
					title="Introduction to Cryptography"
					imageUrl="https://www.example.com/cryptography-image.jpg"
					progress={30}
					maxProgress={100}
					onResume={() => handleResume(1)}
				/>
				<CourseCard
					title="Introduction to Cryptography"
					imageUrl="https://www.example.com/cryptography-image.jpg"
					progress={30}
					maxProgress={100}
					onResume={() => handleResume(1)}
				/>
								<CourseCard
					title="Introduction to Cryptography"
					imageUrl="https://www.example.com/cryptography-image.jpg"
					progress={30}
					maxProgress={100}
					onResume={() => handleResume(1)}
				/>
								<CourseCard
					title="Introduction to Cryptography"
					imageUrl="https://www.example.com/cryptography-image.jpg"
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
