'use client';
import { CircleAlert as AlertCircle } from 'lucide-react';
import { FailedPageActions, TroubleshootingTips } from '@/data';
import PaymentResultLayout from '@/components/organism/PaymentResultLayout';

const FailedPage = () => {
  return (
    <PaymentResultLayout
      HeaderIcon={AlertCircle}
      title="Payment Failed"
      description="We couldn’t process your payment. Please try again or contact support."
      headerGradient="from-red-50 to-rose-50"
      iconBg="bg-red-400/20"
      iconWrapper="from-red-400 to-rose-500 shadow-red-200"
      actions={FailedPageActions}
      supportTextColor="text-red-600 hover:text-red-700"
      footerText="Your data is secure. No charges were made."
      mainContent={
        <>
          {/* Reason */}
          <div className="px-8 py-6 border-b border-slate-100">
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

          {/* Tips */}
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
        </>
      }
    />
  );
};

export default FailedPage;
