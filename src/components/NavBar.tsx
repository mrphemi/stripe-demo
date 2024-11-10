import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const NavBar = () => {
	return (
		<nav className="bg-dark-grey text-white flex justify-between p-4">
			<Link href="/">Logo</Link>

			<SignedOut>
				<div className="flex gap-4">
					<Link href="/login">Log in</Link>
					<Link href="/signup">Join the club</Link>
				</div>
			</SignedOut>

			<SignedIn>
				<div className="flex gap-4">
					<UserButton />
					<Link href="" target="_blank">
						Manage Subscription
					</Link>
				</div>
			</SignedIn>
		</nav>
	);
};

export default NavBar;
