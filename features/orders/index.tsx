/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Button from '@/components/atoms/Button';
import EmptyState from '@/components/molecules/EmptyState';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import NeedHelpCard from '@/components/molecules/NeedHelpCard';
import OrderCard from '@/components/molecules/OrderCard';
import OrderCardSkeleton from '@/components/Skeletons/OrderCardSkeleton';
import { PATHS } from '@/data/paths';
import useAPI from '@/Hooks/useAPI';
import { AlertCircle, ArrowLeft, Package } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

const OrdersPage = () => {
  // Hooks
  const { data: orders, get, isLoading, error } = useAPI('orders');

  useEffect(() => {
    get();
  }, [get]);

  return (
    <div className="min-h-screen px-4 pb-20 pt-46">
      <div className="max-w-4xl mx-auto transition-all duration-700 ease-out">
        <AnimatedWrapper>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Your Orders</h1>
              <p className="text-slate-500 mt-1">
                Track and manage all your orders
              </p>
            </div>
            <Link
              href={PATHS.HOME}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back</span>
            </Link>
          </div>
        </AnimatedWrapper>

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <AnimatedWrapper key={index} custom={index}>
                <OrderCardSkeleton />
              </AnimatedWrapper>
            ))}
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl border border-red-200 px-6 py-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-700 font-medium">{error}</p>
            <Button
              variant="text"
              handleClick={() => location.reload()}
              otherClassName="text-red-600 hover:text-red-700 underline underline-offset-2 text-sm mt-2 inline-block"
            >
              Retry loading orders
            </Button>
          </div>
        ) : orders?.length === 0 ? (
          <EmptyState
            imageSrc="no-products.png"
            messageText="No orders yet"
            description="You haven't placed any orders. Start shopping now!"
            buttonText="Start Shopping"
            Icon={Package}
            buttonHref={PATHS.SHOP.ROOT}
            iconClassName="w-4 h-4"
          />
        ) : (
          <div className="space-y-4">
            {orders.map((order: any, index: number) => (
              <AnimatedWrapper key={order.id} custom={index}>
                <OrderCard order={order} />
              </AnimatedWrapper>
            ))}
          </div>
        )}
        <AnimatedWrapper>
          <NeedHelpCard />
        </AnimatedWrapper>
      </div>
    </div>
  );
};

export default OrdersPage;
