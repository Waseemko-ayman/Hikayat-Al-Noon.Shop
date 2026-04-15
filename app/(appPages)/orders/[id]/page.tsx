/* eslint-disable @typescript-eslint/no-explicit-any */
import EmptyState from '@/components/molecules/EmptyState';
import { Metadata } from 'next';
import OrderDetailsPage from '@/features/orders/OrderDetailsPage';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { RefreshCcw } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<any>;
}): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Order Details - ${id}`,
    description: `Details of order ${id}`,
  };
}

export default async function OrderPageWrapper({
  params,
}: {
  params: Promise<any>;
}) {
  const { id } = await params;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      cookies: {
        async getAll() {
          return (await cookies()).getAll();
        },
        setAll() {},
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: order, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('id', id)
    .eq('user_id', user?.id)
    .single();

  if (error || !order) {
    return (
      <EmptyState
        imageSrc="no-products.png"
        messageText="Order Not Found"
        description="Sorry, we couldn't find this order."
        otherClassName="pt-36 md:pt-48"
        buttonText="Try Again"
        Icon={RefreshCcw}
      />
    );
  }

  return <OrderDetailsPage order={order} />;
}
