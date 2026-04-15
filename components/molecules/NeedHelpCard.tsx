import Link from 'next/link';
import { PATHS } from '@/data/paths';

const NeedHelpCard = () => {
  return (
    <div className="mt-8 bg-white rounded-2xl border border-slate-400 px-6 py-4">
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
          <span className="text-xs text-blue-600 font-bold">?</span>
        </div>

        {/* Content */}
        <div>
          <p className="text-sm font-medium text-slate-900">Need help?</p>

          <p className="text-sm text-slate-500 mt-1">
            If you have any questions about your orders, please{' '}
            <Link
              href={PATHS.CONTACT}
              className="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-2"
            >
              contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NeedHelpCard;
