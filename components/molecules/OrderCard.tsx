import { Calendar, ChevronRight, Package } from 'lucide-react';
import Button from '../atoms/Button';
import { OrderProps } from '@/interfaces';
import CardWrapper from '../Template/CardWrapper';
import { formatDate } from '@/utils/formateDate';
import { formatPrice } from '@/utils/formatPrice';
import { getStatusColor, getStatusIcon } from '@/utils/orderStatus';
import { useRouter } from 'next/navigation';
import { PATHS } from '@/data/paths';

const OrderCard = ({ order }: { order: OrderProps }) => {
  const router = useRouter();
  return (
    <CardWrapper withFlex={false}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left side */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
              <Package className="w-5 h-5 text-slate-600" />
            </div>

            <div>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                Order ID
              </p>
              <p className="text-slate-900 font-mono text-sm">
                {order?.id.slice(0, 8)}...{order?.id.slice(-4)}
              </p>
              {order?.user_name && (
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  {order.user_name}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-slate-600">
              <Calendar className="w-4 h-4" />
              {formatDate(order?.created_at)}
            </div>

            <div className="flex items-center gap-2 text-slate-600">
              <span className="font-semibold text-slate-900">
                {formatPrice(order?.amount)}
              </span>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center justify-between sm:justify-end gap-4">
          <span
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium ${getStatusColor(order?.status)}`}
          >
            <span className="text-base">{getStatusIcon(order?.status)}</span>
            <span className="capitalize">{order?.status}</span>
          </span>

          <Button
            variant="text"
            Icon={ChevronRight}
            otherClassName="p-0! text-slate-400 hover:text-slate-600"
            handleClick={() => router.push(PATHS.ORDERS.ITEM(order?.id))}
          />
        </div>
      </div>
    </CardWrapper>
  );
};

export default OrderCard;
