/* eslint-disable @typescript-eslint/no-explicit-any */
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(req: Request) {
  const body = await req.text(); // raw
  const sig = (await headers()).get('stripe-signature')!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch {
    return new Response('Webhook Error', { status: 400 });
  }

  // 👇 التعامل مع الحدث
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    // 1) جلب الطلب
    const { data: orders } = await supabase
      .from('orders')
      .select('*')
      .eq('stripe_payment_intent', paymentIntent.id)
      .single();

    if (!orders) return new Response('Order not found', { status: 404 });

    // 2) تحديث الطلب إلى paid
    await supabase
      .from('orders')
      .update({
        status: 'paid',
      })
      .eq('id', orders.id)
      .neq('status', 'paid');

    const { data: order_items } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', orders.id);

    await resend.emails.send({
      from: 'Store <onboarding@resend.dev>',
      to: orders.user_email,
      subject: `Order #${orders.id} confirmed ✅`,
      html: `
        <body style="margin:0; padding:0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; background-color:#f5f5f5;">
          <table role="presentation" style="width:100%; border-collapse:collapse; background-color:#f5f5f5;">
            <tr>
              <td align="center" style="padding:40px 20px;">

                <!-- Main Container -->
                <table role="presentation" style="width:100%; max-width:600px; border-collapse:collapse; background-color:#ffffff; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">

                  <!-- Header / Logo -->
                  <tr>
                    <td align="center" style="padding:40px 40px 20px 40px; background:linear-gradient(135deg,#088178 0%,#054b46 100%);">
                      <img src="https://usodykqqnbeiohqwkwfy.supabase.co/storage/v1/object/public/Hikayat-Al-Noon-logo/Hikayat-Al-Noon-logo.png"
                        alt="Hikayat Al-Noon Logo"
                        style="width:120px; height:auto; display:block; border-radius:8px;" />
                    </td>
                  </tr>

                  <!-- Title -->
                  <tr>
                    <td style="padding:40px 40px 20px 40px;">
                      <h2 style="margin:0 0 16px 0; font-size:26px; font-weight:600; color:#222; text-align:center;">
                        Order Confirmed 🎉
                      </h2>
                      <p style="margin:0; font-size:15px; line-height:1.6; color:#777; text-align:center;">
                        Hi ${orders.user_name}, your order has been successfully placed and is now being prepared.
                      </p>
                    </td>
                  </tr>

                  <!-- Order Summary -->
                  <tr>
                    <td style="padding:0 40px 30px 40px;">
                      <table style="width:100%; background:#f9fafb; border-radius:8px; padding:20px;">
                        <tr>
                          <td style="font-size:14px; color:#555;">Order ID:</td>
                          <td style="font-size:14px; font-weight:600; color:#111; text-align:right;">#${orders.id}</td>
                        </tr>
                        <tr>
                          <td style="font-size:14px; color:#555; padding-top:10px;">Total:</td>
                          <td style="font-size:14px; font-weight:600; color:#16a34a; text-align:right; padding-top:10px;">
                            $${orders.amount}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Items -->
                  <tr>
                    <td style="padding:0 40px 30px 40px;">
                      <h3 style="margin-bottom:15px; font-size:18px; color:#222;">Order Details</h3>

                      ${
                        order_items &&
                        order_items
                          .map(
                            (item: any) => `
                          <table style="width:100%; margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:10px;">
                            <tr>
                              <td style="width:60px;">
                                <img src="${item.image}" alt="${item.title}"
                                  style="width:50px; height:50px; object-fit:cover; border-radius:6px;" />
                              </td>
                              <td style="font-size:14px; color:#333;">
                                ${item.title}<br/>
                                <span style="color:#888;">Qty: ${item.quantity}</span>
                              </td>
                              <td style="font-size:14px; font-weight:600; color:#111; text-align:right;">
                                $${item.price}
                              </td>
                            </tr>
                          </table>
                        `,
                          )
                          .join('')
                      }

                    </td>
                  </tr>

                  <!-- CTA -->
                  <tr>
                    <td align="center" style="padding:0 40px 40px 40px;">
                      <table role="presentation">
                        <tr>
                          <td style="border-radius:6px; background:linear-gradient(135deg,#16a34a 0%,#15803d 100%);">
                            <a href="https://hikayatalnoon.vercel.app/orders/${orders.id}"
                              style="display:inline-block; padding:14px 40px; font-size:15px; font-weight:600; color:#fff; text-decoration:none; border-radius:6px;">
                              View your order
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding:20px 40px; background-color:#f1f5f9; border-radius:0 0 8px 8px;">
                      <p style="margin:0; font-size:13px; color:#64748b; text-align:center;">
                        You will receive another email when your order is shipped.
                      </p>
                    </td>
                  </tr>

                </table>

              </td>
            </tr>
          </table>
        </body>
      `,
    });
  }

  return new Response('ok');
}
