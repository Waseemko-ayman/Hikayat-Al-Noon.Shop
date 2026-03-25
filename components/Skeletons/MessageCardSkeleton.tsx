import { Skeleton } from '../ui/skeleton';

const MessageCardSkeleton = () => {
  return (
    <article className="relative rounded-xl border border-gray-200 bg-card p-6">
      {/* Header */}
      <header className="mb-4 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-40" />
          </div>
        </div>
        <Skeleton className="h-3 w-16" />
      </header>

      {/* Subject */}
      <Skeleton className="mb-2 h-4 w-48" />

      {/* Message */}
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>

      {/* Footer */}
      <footer className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-16" />
      </footer>
    </article>
  );
};

export default MessageCardSkeleton;
