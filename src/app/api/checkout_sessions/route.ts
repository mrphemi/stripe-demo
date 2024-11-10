import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function GET(req: Request) {}

export async function POST(req: Request) {
	const body = await req.json();

	const priceCode =
		body.paymentFrequency === "monthly"
			? process.env.STRIPE_MONTHLY_PRICE_ID
			: process.env.STRIPE_YEARLY_PRICE_ID;

	try {
		// Create Checkout Sessions from body params.
		const session = await stripe.checkout.sessions.create({
			ui_mode: "embedded",
			// customer_email: "jdoe@mail.com",
			line_items: [
				{
					// Provide the exact Price ID (for example, pr_1234) of
					// the product you want to sell
					price: priceCode,
					quantity: 1,
				},
			],
			mode: "subscription",
			return_url: `${req.headers.get("origin")}/return?session_id={CHECKOUT_SESSION_ID}`,
		});

		return NextResponse.json({ clientSecret: session.client_secret });
	} catch (err) {
		if (err instanceof Error) {
			console.log(err);
			return NextResponse.json(err.message, { status: err.statusCode || 500 });
		}
	}
}
