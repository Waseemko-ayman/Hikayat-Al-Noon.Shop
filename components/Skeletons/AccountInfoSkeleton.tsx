import React from 'react';
import { Skeleton } from '../ui/skeleton';

const AccountInfoSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-3">
      {/* Role */}
      <Skeleton className="h-6 w-24 rounded-full mb-2" />

      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-3 w-44" />

      {/* Email verified */}
      <div className="flex items-center gap-2 mt-2">
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-3 w-28" />
      </div>

      {/* Provider */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-14" />
      </div>
    </div>
  );
};

export default AccountInfoSkeleton;
