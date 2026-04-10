'use client';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const RatingsSummarySkeleton: React.FC<{
  infoHeader?: boolean;
  otherClassName?: string;
}> = ({ infoHeader, otherClassName = '' }) => {
  return (
    <div className={`w-full ${otherClassName}`}>
      {/* Header Skeleton */}
      {infoHeader && (
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="w-[50px] h-[50px] rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="w-[140px] h-4" />
            <Skeleton className="w-[80px] h-3" />
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left (Average) */}
        <div className="flex flex-col items-center justify-center min-w-[120px] gap-2">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="flex mt-1 gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="w-5 h-5 rounded-full" />
            ))}
          </div>
          <Skeleton className="w-16 h-4 mt-1" />
        </div>

        {/* Right (Breakdown) */}
        <div className="flex-1 space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center gap-3 text-sm">
              <Skeleton className="w-[60px] h-4" />
              <div className="flex-1">
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
              <Skeleton className="w-[40px] h-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingsSummarySkeleton;
