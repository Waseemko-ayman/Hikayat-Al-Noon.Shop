import React from 'react';
import CardWrapper from '../Template/CardWrapper';
import { Skeleton } from '../ui/skeleton';

const StatsCardSkeleton = () => {
  return (
    <CardWrapper contentClassName="items-center! justify-start gap-3">
      {/* Icon */}
      <Skeleton className="h-6 w-6 rounded-md" />

      {/* Text */}
      <div className="space-y-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-6 w-16" />
      </div>
    </CardWrapper>
  );
};

export default StatsCardSkeleton;
