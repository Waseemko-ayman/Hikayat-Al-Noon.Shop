'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '@/components/molecules/CheckoutForm';
import { useSearchParams } from 'next/navigation';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const CheckoutPage = () => {
  const searchParams = useSearchParams();
  const clientSecret = searchParams.get('clientSecret');
  const orderId = searchParams.get('orderId');

  if (!clientSecret) return <p>Loading payment...</p>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm clientSecret={clientSecret} orderId={orderId} />
    </Elements>
  );
};

export default CheckoutPage;
