import { Skeleton } from '../ui/skeleton';

const StatsItemSkeleton = () => {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5">
      {/* icon / dot */}
      <Skeleton className="h-4 w-4 rounded-full bg-white/30" />

      {/* value */}
      <Skeleton className="h-4 w-8 bg-white/30" />

      {/* label */}
      <Skeleton className="h-4 w-16 bg-white/30" />
    </div>
  );
};

export default StatsItemSkeleton;
