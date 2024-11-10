"use client";

import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import * as Dialog from "@radix-ui/react-dialog";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function CheckOutComp() {
	const router = useRouter();

	const [paymentFrequency, setPaymentFrequency] = React.useState<"monthly" | "yearly">("monthly");

	const fetchClientSecret = useCallback(async () => {
		// Create a Checkout Session
		try {
			const fetchResponse = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/checkout_sessions`,
				{
					method: "POST",
					body: JSON.stringify({ paymentFrequency }),
				}
			);
			const result = await fetchResponse.json();
			return result.clientSecret;
		} catch (err) {
			console.error(err);
		}
	}, [paymentFrequency]);

	const options = { fetchClientSecret };

	return (
		<Dialog.Root open={true} onOpenChange={() => router.back()}>
			<Dialog.Overlay className="bg-black-brand/60 fixed inset-0" />
			<Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] grid max-w-[1050px] w-full">
				<div id="checkout" className="w-full bg-white p-4 space-y-10">
					<EmbeddedCheckoutProvider
						key={paymentFrequency}
						stripe={stripePromise}
						options={options}
					>
						<div className="flex gap-4 text-white">
							<button
								className="border rounded bg-teal p-2"
								onClick={() => {
									setPaymentFrequency("monthly");
								}}
							>
								Monthly
							</button>
							<button
								className="border rounded bg-teal p-2"
								onClick={() => {
									setPaymentFrequency("yearly");
								}}
							>
								Yearly
							</button>
						</div>
						<EmbeddedCheckout />
					</EmbeddedCheckoutProvider>
				</div>
			</Dialog.Content>
		</Dialog.Root>
	);
}
