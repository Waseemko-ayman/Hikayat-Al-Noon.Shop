'use client';

import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import { PATHS } from '@/data/paths';
import { ActionItem, PaymentResultLayoutProps } from '@/interfaces';
import Link from 'next/link';

const PaymentResultLayout = ({
  HeaderIcon,
  title,
  description,
  headerGradient,
  iconBg,
  iconWrapper,
  mainContent,
  actions,
  footerText,
  supportTextColor,
}: PaymentResultLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-4 pt-40 py-16">
      <div className="w-full max-w-md transition-all duration-700 ease-out">
        <AnimatedWrapper>
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
            {/* HEADER */}
            <div
              className={`bg-gradient-to-br ${headerGradient} px-8 pt-12 pb-8 flex flex-col items-center`}
            >
              <div className="relative mb-6">
                <div
                  className={`absolute inset-0 rounded-full ${iconBg} animate-ping`}
                />
                <div
                  className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${iconWrapper} flex items-center justify-center shadow-lg`}
                >
                  <HeaderIcon className="w-10 h-10 text-white stroke-[3]" />
                </div>
              </div>

              <h1 className="text-2xl font-bold text-slate-800 tracking-tight text-center">
                {title}
              </h1>
              <p className="text-slate-500 mt-2 text-center text-sm leading-relaxed">
                {description}
              </p>
            </div>

            {/* MAIN CONTENT */}
            {mainContent}

            {/* ACTIONS */}
            <div className="px-8 py-6 flex flex-col gap-3">
              {actions.map((action: ActionItem, index) => {
                const Icon = action.icon;

                const baseStyle =
                  'flex items-center justify-center gap-2 w-full font-semibold text-sm py-3.5 px-6 rounded-2xl transition-colors duration-150';

                const styles =
                  action.variant === 'primary'
                    ? `${baseStyle} bg-slate-900 hover:bg-slate-800 text-white`
                    : `${baseStyle} bg-white hover:bg-slate-50 text-slate-700 border border-slate-200`;

                return (
                  <Link key={index} href={action.href} className={styles}>
                    {Icon && <Icon className="w-4 h-4" />}
                    {action.label}
                  </Link>
                );
              })}
            </div>

            <div className="px-8 pb-6 text-center">
              <p className="text-xs text-slate-400">
                Need help?{' '}
                <Link
                  href={PATHS.CONTACT}
                  className={`${supportTextColor} font-medium underline underline-offset-2`}
                >
                  Contact support
                </Link>
              </p>
            </div>
          </div>
        </AnimatedWrapper>

        {/* FOOTER */}
        <AnimatedWrapper>
          <p className="text-center text-xs text-slate-400 mt-6">
            {footerText}
          </p>
        </AnimatedWrapper>
      </div>
    </div>
  );
};

export default PaymentResultLayout;
