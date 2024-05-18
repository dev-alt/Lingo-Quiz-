import { title } from "@/components/primitives";

export default function DocsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col justify-center gap-4 py-8 md:py-10">
						<div className="text-center overflow-hidden p-4 md:p-6 shadow-[5px_3px_5px_5px_#14b8a6] mr-4">
				<h1 className={title({ color: "violet" })} >Leaderboard&nbsp;</h1>
			</div>
			<div className="inline-block text-center justify-center items-center">
				{children}
			</div>
		</section>
	);
}
