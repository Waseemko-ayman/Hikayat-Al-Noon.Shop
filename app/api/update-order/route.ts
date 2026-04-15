import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(req: Request) {
  const { paymentIntentId } = await req.json();

  await supabase
    .from('orders')
    .update({ status: 'paid' })
    .eq('stripe_payment_intent', paymentIntentId);

  return Response.json({ success: true });
}
