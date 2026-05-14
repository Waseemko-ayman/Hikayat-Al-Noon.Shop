'use client';

import { Skeleton } from '@/components/ui/skeleton';

const BlogPostCardSkeleton = () => {
  return (
    <div className="relative max-w-full p-2.5 md:p-3.5 border border-gray-200 rounded-[20px] animate-pulse">
      {/* Image skeleton */}
      <Skeleton className="aspect-[16/10] w-full" />

      <div className="p-5">
        {/* meta (date + read time) */}
        <div className="mb-3 flex items-center gap-4">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-24" />
        </div>

        {/* title */}
        <Skeleton className="mb-2 h-5 w-full" />
        <Skeleton className="mb-4 h-5 w-3/4" />

        {/* excerpt */}
        <Skeleton className="mb-2 h-4 w-full" />
        <Skeleton className="mb-4 h-4 w-2/3" />

        {/* button */}
        <Skeleton className="h-4 w-28" />
      </div>
    </div>
  );
};

export default BlogPostCardSkeleton;
