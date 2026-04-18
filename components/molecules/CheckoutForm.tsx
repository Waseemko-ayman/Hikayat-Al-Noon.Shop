/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../atoms/Input';
import { PaymentFormValues } from '@/interfaces';
import { paymentCheckoutInput } from '@/data';
import { checkoutSchema } from '@/validations/forms/checkout.schema';

const CheckoutForm = ({
  clientSecret,
  orderId,
}: {
  clientSecret: string;
  orderId: string | number | null;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormValues>({
    resolver: yupResolver(checkoutSchema),
  });

  const [cardComplete, setCardComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const onSubmit = async (data: PaymentFormValues) => {
    setErrorMsg('');
    setLoading(true);

    if (!stripe || !elements || !cardComplete) return;

    if (!cardComplete) {
      setErrorMsg('Card details are incomplete');
      setLoading(false);
      return;
    }

    const card = elements.getElement(CardElement);

    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card!,
        billing_details: {
          name: data.name,
          email: data.email,
        },
      },
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message || 'Payment failed');
      router.replace(
        `/checkout/failed?orderId=${orderId}&reason=${error.message}`,
      );
      return;
    }

    router.replace(`/checkout/success?orderId=${orderId}`);
  };

  const onError = (formErrors: any) => {
    if (!cardComplete && Object.keys(formErrors).length === 0) {
      setErrorMsg('Card details are incomplete');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh] px-4 pt-46 pb-10">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-100"
      >
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
          Complete Your Payment
        </h2>

        <div className="space-y-3">
          {paymentCheckoutInput.map((input) => (
            <Input
              key={input.id}
              type={input.type}
              inputName={input.name}
              placeholder={input.placeholder}
              error={errors}
              register={register}
              otherClassName="rounded-lg! w-full!"
            />
          ))}

          {/* Card Input */}
          <div className="p-4 border rounded-lg mb-4 focus-within:ring-2 focus-within:ring-green-500">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#111827',
                    '::placeholder': {
                      color: '#9CA3AF',
                    },
                  },
                  invalid: {
                    color: '#EF4444',
                  },
                },
              }}
              onChange={(e) => setCardComplete(e.complete)}
            />
          </div>
        </div>

        {/* Error Message */}
        {errorMsg && <p className="text-red-500 text-sm mb-3">{errorMsg}</p>}

        {/* Button */}
        <button
          type="submit"
          disabled={loading || !stripe || !cardComplete}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>

        <p className="text-xs text-gray-400 text-center mt-3">
          Secure payment powered by Stripe
        </p>
      </form>
    </div>
  );
};

export default CheckoutForm;
