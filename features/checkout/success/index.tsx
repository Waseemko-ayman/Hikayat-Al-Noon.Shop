/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect } from 'react';
import { useCartContext } from '@/context/CartContext';
import { Check, Package } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import PaymentResultLayout from '@/components/organism/PaymentResultLayout';
import { SuccessPageActions } from '@/data';

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  const { clearCart } = useCartContext();

  useEffect(() => {
    if (!orderId) return;

    clearCart();
  }, [orderId]);

  return (
    <PaymentResultLayout
      HeaderIcon={Check}
      title="Payment Successful"
      description="Your order has been confirmed and is being processed."
      headerGradient="from-emerald-50 to-teal-50"
      iconBg="bg-emerald-400/20"
      iconWrapper="from-emerald-400 to-teal-500 shadow-emerald-200"
      actions={SuccessPageActions}
      supportTextColor="text-teal-600 hover:text-teal-700"
      footerText="Secured by 256-bit SSL encryption"
      mainContent={
        <div className="px-8 py-6 border-b border-slate-100">
          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
            <div className="w-9 h-9 rounded-xl bg-teal-100 flex items-center justify-center shrink-0">
              <Package className="w-4 h-4 text-teal-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                What&apos;s next
              </p>
              <p className="text-sm text-slate-700 mt-0.5 leading-snug">
                You&apos;ll receive a confirmation email with your order details
                and tracking info.
              </p>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default SuccessPage;
