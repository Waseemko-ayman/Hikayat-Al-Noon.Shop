import { Skeleton } from '@/components/ui/skeleton';

const PopularPostSkeleton = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <article key={i} className="flex gap-3">
          {/* Image Skeleton */}
          <Skeleton className="h-16 w-16 rounded-lg" />

          {/* Content Skeleton */}
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-3 w-[40%]" />
          </div>
        </article>
      ))}
    </div>
  );
};

export default PopularPostSkeleton;
