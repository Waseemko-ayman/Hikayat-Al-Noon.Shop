'use client';
import { Skeleton } from '@/components/ui/skeleton';
import CardWrapper from '@/components/Template/CardWrapper';

const CommentCardSkeleton = () => {
  return (
    <CardWrapper
      withFlex={false}
      contentClassName="p-0! mb-4 border border-gray-200 rounded-xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-full" />

          <div className="space-y-2">
            <Skeleton className="h-3 w-24" />
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-3 w-3 rounded-sm" />
              ))}
            </div>
          </div>
        </div>

        <Skeleton className="h-5 w-10 rounded-md" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-[90%]" />
        <Skeleton className="h-3 w-[80%]" />
      </div>
    </CardWrapper>
  );
};

export default CommentCardSkeleton;
