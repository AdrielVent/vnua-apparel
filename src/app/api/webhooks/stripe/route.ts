import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createPrintfulOrder } from '@/utils/printful';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy_key_for_build', {
  apiVersion: '2026-05-27.dahlia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle checkout.session.completed
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;

    const recipient = {
      name: session.shipping_details?.name || 'Customer Name',
      address1: session.shipping_details?.address?.line1 || '',
      address2: session.shipping_details?.address?.line2 || undefined,
      city: session.shipping_details?.address?.city || '',
      state_code: session.shipping_details?.address?.state || '',
      country_code: session.shipping_details?.address?.country || 'US',
      zip: session.shipping_details?.address?.postal_code || '',
      email: session.customer_details?.email || undefined,
    };

    // Retrieve items from session metadata (stored as a JSON string)
    const itemsJson = session.metadata?.items;
    if (!itemsJson) {
      console.error('No items found in Stripe session metadata');
      return NextResponse.json({ error: 'No items in session metadata' }, { status: 400 });
    }

    try {
      const parsedItems = JSON.parse(itemsJson); // Array of { printfulVariantId: number, quantity: number }
      
      const printfulItems = parsedItems.map((item: any) => ({
        variant_id: Number(item.printfulVariantId),
        quantity: Number(item.quantity),
      }));

      // Call Printful API to create a draft order
      const order = await createPrintfulOrder({
        recipient,
        items: printfulItems,
      });

      console.log(`Printful order created successfully: Order ID ${order.id}`);
      return NextResponse.json({ success: true, printfulOrderId: order.id });
    } catch (err: any) {
      console.error('Failed to process Printful order fulfillment:', err.message);
      return NextResponse.json({ error: `Fulfillment Error: ${err.message}` }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
// export const dynamic = 'force-dynamic';
