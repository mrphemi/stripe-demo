import Stripe from "stripe";
import { currentUser } from "@clerk/nextjs/server";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function Home() {
	// const products = await stripe.products.list({
	// 	limit: 3,
	// });

	return (
		<>
			<p>Home Page</p>
		</>
	);
}
