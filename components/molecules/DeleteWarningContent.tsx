import { AlertTriangle } from 'lucide-react';
import Button from '../atoms/Button';
import { cn } from '@/lib/utils';

type DeleteWarningContentProps = {
  isMobile?: boolean;
  deleteLocation?: string;
  item?: string;
  onCancel: () => void;
  onDelete: () => void;
};

export const DeleteWarningContent: React.FC<DeleteWarningContentProps> = ({
  isMobile,
  deleteLocation,
  item,
  onCancel,
  onDelete,
}) => {
  return (
    <>
      <div
        className={cn(
          `flex gap-3 bg-red-50 border border-red-200 rounded-xl p-4`,
          isMobile && 'mt-4',
        )}
      >
        <AlertTriangle className="text-red-600" size={30} />
        <div>
          <h3 className="text-lg font-semibold text-red-700">Warning</h3>
          <p className="text-gray-700">
            Are you sure you want to remove {item} from the {deleteLocation}?
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <Button otherClassName="p-2!" variant="third" handleClick={onCancel}>
          Cancel
        </Button>
        <Button
          otherClassName="px-2 py-3! bg-red-500! hover:bg-red-600!"
          handleClick={onDelete}
        >
          Delete
        </Button>
      </div>
    </>
  );
};
