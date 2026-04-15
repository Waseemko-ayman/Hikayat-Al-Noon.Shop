import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import CardWrapper from '@/components/Template/CardWrapper';
import { OrderItemProps } from '@/interfaces';
import { formatPrice } from '@/utils/formatPrice';
import Image from 'next/image';

const OrderItems = ({ orderItems }: { orderItems: OrderItemProps[] }) => {
  return (
    <AnimatedWrapper>
      <CardWrapper withFlex={false} contentClassName="p-0!">
        <div className="p-5 border-b flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Order Items</h2>
          <span className="text-sm text-slate-500">
            {orderItems?.length || 0} items
          </span>
        </div>

        <div className="divide-y">
          {orderItems?.map((item, index) => (
            <AnimatedWrapper key={item.id} custom={index}>
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-slate-50 transition">
                {/* TOP (image + info) */}
                <div className="flex items-start sm:items-center gap-4">
                  {/* IMAGE */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-slate-100 border shrink-0">
                    <Image
                      src={item.image || 'no-image.png'}
                      alt={item.title || 'product'}
                      width={70}
                      height={70}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* INFO */}
                  <div className="flex flex-col gap-1">
                    <p className="font-medium text-slate-900 text-sm sm:text-base line-clamp-1">
                      {item.title}
                    </p>

                    <div className="text-xs sm:text-sm text-slate-500 flex flex-wrap items-center gap-2">
                      <span>Qty: {item.quantity}</span>

                      {item.size && (
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] sm:text-xs font-medium">
                          Size: {item.size}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* PRICE */}
                <div className="flex sm:block items-center justify-between sm:text-right">
                  <p className="font-semibold text-slate-900 text-sm sm:text-base">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                  <p className="text-[10px] sm:text-xs text-slate-400">
                    {formatPrice(item.price)} each
                  </p>
                </div>
              </div>
            </AnimatedWrapper>
          ))}
        </div>
      </CardWrapper>
    </AnimatedWrapper>
  );
};

export default OrderItems;
