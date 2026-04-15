import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import CardWrapper from '@/components/Template/CardWrapper';
import { statusConfig } from '@/data';
import { OrderProps } from '@/interfaces';
import { Package } from 'lucide-react';

const OrderDetailsHeader = ({ order }: { order: OrderProps }) => {
  const StatusIcon =
    statusConfig[order.status as keyof typeof statusConfig]?.icon || Package;

  const statusStyle =
    statusConfig[order.status as keyof typeof statusConfig]?.className ||
    'bg-slate-50 text-slate-700 border-slate-200';

  return (
    <AnimatedWrapper>
      <CardWrapper>
        {/* LEFT */}
        <div className="flex items-start sm:items-center gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0">
            <Package className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
          </div>

          <div>
            <h1 className="text-base sm:text-xl font-bold text-slate-900">
              Order #{order.id.slice(0, 8)}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Full order breakdown & status tracking
            </p>
          </div>
        </div>

        {/* STATUS */}
        <div
          className={`w-full sm:w-auto flex items-center justify-center sm:justify-end gap-2 px-4 py-2 rounded-xl border font-medium text-sm sm:text-base ${statusStyle}`}
        >
          <StatusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="capitalize">{order.status}</span>
        </div>
      </CardWrapper>
    </AnimatedWrapper>
  );
};

export default OrderDetailsHeader;
