'use client';

import React from 'react';
import { Skeleton } from '../ui/skeleton';

const ProductCardSkeleton = () => {
  return (
    <div className="relative max-w-full p-2.5 md:p-3.5 border border-gray-200 rounded-[20px] shadow-[20px_20px_34px_rgb(0,0,0,0.03)] animate-pulse">
      <Skeleton className="w-full md:max-w-[500px] aspect-square rounded-[20px] mb-2.5" />

      <div>
        <Skeleton className="w-[60px] h-[16px] md:h-[18px] rounded-sm" />
        <Skeleton className="w-[70%] h-[20px] md:h-[24px] mt-2 rounded-sm" />

        <div className="flex items-center gap-1 mt-2 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="w-[18px] h-[18px] rounded-sm" />
          ))}
          <Skeleton className="w-[24px] h-[16px] ml-1 rounded-sm" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="w-[36px] h-[30px] rounded-sm" />
          <Skeleton className="w-[36px] h-[20px] rounded-sm" />
        </div>
      </div>

      <Skeleton className="absolute bottom-2.5 right-2.5 w-9 h-9 md:w-10 md:h-10 rounded-full" />
    </div>
  );
};

export default ProductCardSkeleton;
