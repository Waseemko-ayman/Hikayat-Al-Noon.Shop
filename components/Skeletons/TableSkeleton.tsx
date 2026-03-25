import { Skeleton } from '@/components/ui/skeleton';
import { TableSkeletonProps } from '@/interfaces';

const TableSkeleton = ({ rows = 5, columns = 5 }: TableSkeletonProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-center">
        {/* Header */}
        <thead>
          <tr>
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="px-6 py-3">
                <Skeleton className="h-4 w-20 mx-auto" />
              </th>
            ))}
            <th className="px-6 py-3">
              <Skeleton className="h-4 w-16 mx-auto" />
            </th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex} className="border-t border-gray-200">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex} className="px-6 py-4">
                  <Skeleton className="h-4 w-full max-w-[120px] mx-auto" />
                </td>
              ))}
              {/* Actions */}
              <td className="px-6 py-4 flex justify-center gap-2">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
