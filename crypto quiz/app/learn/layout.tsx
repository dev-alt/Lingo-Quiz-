export default function LeaderboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="min-w-full min-h-full max-w-lg">
				{children}
			</div>
		</section>
	);
}
