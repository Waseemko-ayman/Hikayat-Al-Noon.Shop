/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect } from 'react';
import { useCartContext } from '@/context/CartContext';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, Check, Package } from 'lucide-react';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import { PATHS } from '@/data/paths';

const SuccessPage = () => {
  const { clearCart } = useCartContext();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-4 pt-40 py-16">
      <div className="w-full max-w-md transition-all duration-700 ease-out">
        <AnimatedWrapper>
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 px-8 pt-12 pb-8 flex flex-col items-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping" />
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-200">
                  <Check className="w-10 h-10 text-white stroke-[3]" />
                </div>
              </div>

              <h1 className="text-2xl font-bold text-slate-800 tracking-tight text-center">
                Payment Successful
              </h1>
              <p className="text-slate-500 mt-2 text-center text-sm leading-relaxed">
                Your order has been confirmed and is being processed.
              </p>
            </div>

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
                    You&apos;ll receive a confirmation email with your order
                    details and tracking info.
                  </p>
                </div>
              </div>
            </div>

            <div className="px-8 py-6 flex flex-col gap-3">
              <Link
                href="/"
                className="flex items-center justify-center gap-2 w-full bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-semibold text-sm py-3.5 px-6 rounded-2xl transition-colors duration-150"
              >
                <ShoppingBag className="w-4 h-4" />
                Continue Shopping
              </Link>
              <Link
                href="/orders"
                className="flex items-center justify-center gap-2 w-full bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 font-semibold text-sm py-3.5 px-6 rounded-2xl border border-slate-200 transition-colors duration-150"
              >
                View Order
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="px-8 pb-6 text-center">
              <p className="text-xs text-slate-400">
                Need help?{' '}
                <Link
                  href={PATHS.CONTACT}
                  className="text-teal-600 hover:text-teal-700 font-medium underline underline-offset-2"
                >
                  Contact support
                </Link>
              </p>
            </div>
          </div>
        </AnimatedWrapper>

        <AnimatedWrapper>
          <p className="text-center text-xs text-slate-400 mt-6">
            Secured by 256-bit SSL encryption
          </p>
        </AnimatedWrapper>
      </div>
    </div>
  );
};

export default SuccessPage;
