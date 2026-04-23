import GenericAllTable from '@/components/organism/GenericAllTable';
import { useSupabaseQuery } from '@/Hooks/useSupabaseQuery';
import { useParams } from 'next/navigation';

const AllOrderItems = ({
  value,
  onTabChange,
}: {
  value: string;
  onTabChange: (val: string) => void;
}) => {
  const params = useParams();
  const orderId = String(params?.id);

  const { data, isLoading, error } = useSupabaseQuery('order_items', {
    order_id: orderId,
  });

  return (
    <GenericAllTable
      value={value}
      title="All Products"
      description="Browse all products included in this order"
      data={data?.data ?? []}
      isLoading={isLoading}
      error={error}
      placeholder="Search for product..."
      onTabChange={onTabChange}
      showEdit={false}
      showActionsColumn={false}
    />
  );
};

export default AllOrderItems;
