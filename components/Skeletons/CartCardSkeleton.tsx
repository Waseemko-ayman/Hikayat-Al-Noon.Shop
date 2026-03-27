// CartCardSkeleton.tsx
'use client';
import { Skeleton } from '@/components/ui/skeleton';

const CartCardSkeleton = () => {
  return (
    <div className="relative bg-white border border-[#2d2d2d20] rounded-lg shadow-sm animate-pulse">
      <div className="flex flex-col sm:flex-row justify-between gap-4 p-4 md:p-5">
        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6">
          <Skeleton className="w-[150px] h-[150px] rounded-lg" />
          <div className="flex flex-col justify-between text-center sm:text-left flex-1">
            <Skeleton className="w-40 h-6 mb-1" />
            <Skeleton className="w-20 h-4 mb-1" />
            <Skeleton className="w-32 h-6 mb-3" />
            <Skeleton className="w-24 h-8 rounded-full mt-3" />
          </div>
        </div>
        <div className="flex flex-row sm:flex-col items-center md:items-end justify-between border-t md:border-t-0 md:border-l border-[#2d2d2d10] pt-4 md:pt-0 md:pl-6">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="w-20 h-6 mt-4 md:mt-0 mx-auto md:mx-0" />
        </div>
      </div>
    </div>
  );
};

export default CartCardSkeleton;
