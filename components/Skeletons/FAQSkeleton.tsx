import { Skeleton } from '@/components/ui/skeleton';

const FAQSkeleton = () => {
  return (
    <div className="w-full space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-xl px-6 sm:px-8 py-5"
        >
          {/* Trigger skeleton */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-[70%]" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </div>

          {/* Content skeleton */}
          <div className="mt-4 space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-[90%]" />
            <Skeleton className="h-3 w-[80%]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQSkeleton;
