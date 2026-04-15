import { Skeleton } from '@/components/ui/skeleton';
import CardWrapper from '../Template/CardWrapper';

const OrderCardSkeleton = () => {
  return (
    <CardWrapper withFlex={false}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left side */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-lg" />

            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center justify-between sm:justify-end gap-4">
          <Skeleton className="h-9 w-28 rounded-lg" />
          <Skeleton className="h-6 w-6 rounded-md" />
        </div>
      </div>
    </CardWrapper>
  );
};

export default OrderCardSkeleton;
