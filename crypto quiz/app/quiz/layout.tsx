export default function QuizLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex items-center justify-center py-8 md:py-10"> 
      <div className="w-full max-w-3xl text-center"> 
				{children}
			</div>
		</section>
	);
}
