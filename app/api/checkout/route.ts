/* eslint-disable @typescript-eslint/no-explicit-any */
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(req: Request) {
  const { items, userId, userEmail, userName, userPhone } = await req.json();

  // ⚠️ لا تثق بالأسعار من الفرونت
  const itemsTotal = items.reduce(
    (acc: number, item: any) => acc + item.price * item.quantity,
    0,
  );

  const { data: settings } = await supabase
    .from('settings')
    .select('shipping, free_shipping_min')
    .single();

  const baseShipping = Number(settings?.shipping || 0);
  const freeShippingMin = Number(settings?.free_shipping_min || 0);

  const shippingCost = itemsTotal >= freeShippingMin ? 0 : baseShipping;

  // 3) total النهائي
  const amount = itemsTotal + shippingCost;

  // 1) إنشاء PaymentIntent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: 'usd',
    metadata: {
      userId,
    },
  });

  // 2) إنشاء Order
  const { data: order, error } = await supabase
    .from('orders')
    .insert({
      user_id: userId,
      user_email: userEmail,
      user_name: userName,
      user_phone: userPhone,
      amount,
      stripe_payment_intent: paymentIntent.id,
    })
    .select()
    .single();

  if (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }

  // 3) تخزين المنتجات
  const { error: itemsError } = await supabase.from('order_items').insert(
    items.map((item: any) => ({
      order_id: order.id,
      product_id: item.id,
      title: item.title,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
      size: item.size,
      shipping: shippingCost,
      subtotal: itemsTotal,
    })),
  );

  if (itemsError) {
    console.error('ORDER ITEMS ERROR:', itemsError);
  }

  return Response.json({
    clientSecret: paymentIntent.client_secret,
    orderId: order.id,
  });
}
