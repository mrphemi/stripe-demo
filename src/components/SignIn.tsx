"use client";

import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { SignIn as SignInComponent } from "@clerk/nextjs";

const SignIn = () => {
	const router = useRouter();
	return (
		<Dialog.Root open={true} onOpenChange={() => router.back()}>
			<Dialog.Trigger asChild>
				<li>Sign In</li>
			</Dialog.Trigger>
			<Dialog.Overlay className="bg-black-brand/60 fixed inset-0" />
			<Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] grid place-content-center">
				<SignInComponent routing="hash" forceRedirectUrl="/subscribe" />
			</Dialog.Content>
		</Dialog.Root>
	);
};

export default SignIn;
