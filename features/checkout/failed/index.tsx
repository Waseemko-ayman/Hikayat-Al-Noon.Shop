'use client';
import { CircleAlert as AlertCircle, ArrowLeft } from 'lucide-react';
import { TroubleshootingTips } from '@/data';
import Link from 'next/link';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';

const FailedPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-4 pt-40 py-16">
      <div className="w-full max-w-md transition-all duration-700 ease-out">
        <AnimatedWrapper>
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-br from-red-50 to-rose-50 px-8 pt-12 pb-8 flex flex-col items-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full bg-red-400/20 animate-pulse" />
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center shadow-lg shadow-red-200">
                  <AlertCircle className="w-10 h-10 text-white stroke-[2.5]" />
                </div>
              </div>

              <h1 className="text-2xl font-bold text-slate-800 tracking-tight text-center">
                Payment Failed
              </h1>
              <p className="text-slate-500 mt-2 text-center text-sm leading-relaxed">
                We couldn&apos;t process your payment. Please try again or
                contact support.
              </p>
            </div>

            <div className="px-8 py-6 border-b border-slate-100">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 bg-red-50 rounded-2xl border border-red-200/50">
                  <div className="w-5 h-5 rounded-full bg-red-200 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-red-700 uppercase tracking-widest">
                      Why this happened
                    </p>
                    <p className="text-sm text-red-600 mt-1 leading-snug">
                      This could be due to insufficient funds, incorrect card
                      details, or a temporary issue with your bank.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-8 py-6 border-b border-slate-100">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
                Troubleshooting tips
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                {TroubleshootingTips.map((tip) => (
                  <li key={tip.id} className="flex gap-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>{tip.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="px-8 py-6 flex flex-col gap-3">
              <Link
                href="/"
                className="flex items-center justify-center gap-2 w-full bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-semibold text-sm py-3.5 px-6 rounded-2xl transition-colors duration-150"
              >
                <AlertCircle className="w-4 h-4" />
                Try Again
              </Link>
              <Link
                href="/orders"
                className="flex items-center justify-center gap-2 w-full bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 font-semibold text-sm py-3.5 px-6 rounded-2xl border border-slate-200 transition-colors duration-150"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Shopping
              </Link>
            </div>

            <div className="px-8 pb-6 text-center">
              <p className="text-xs text-slate-400">
                Still having issues?{' '}
                <button className="text-red-600 hover:text-red-700 font-medium underline underline-offset-2">
                  Contact support
                </button>
              </p>
            </div>
          </div>
        </AnimatedWrapper>

        <AnimatedWrapper>
          <p className="text-center text-xs text-slate-400 mt-6">
            Your data is secure. No charges were made.
          </p>
        </AnimatedWrapper>
      </div>
    </div>
  );
};

export default FailedPage;
