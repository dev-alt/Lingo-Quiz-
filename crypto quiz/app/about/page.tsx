import { title } from "@/components/primitives";
import { SignupFormDemo } from "@/components/signup";

export default function AboutPage() {
	return (
		<div>
			<h1 className={title()}>About</h1>
			<SignupFormDemo />
		</div>
	);
}
