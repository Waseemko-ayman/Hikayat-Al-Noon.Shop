/* eslint-disable @typescript-eslint/no-explicit-any */
import GenericAllTable from '@/components/organism/GenericAllTable';
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

  return (
    <GenericAllTable<any>
      value={value}
      title="All Products"
      tableName="order_items"
      customFilterKey="order_id"
      customFilterValue={orderId}
      description="Browse all products included in this order"
      placeholder="Search for product..."
      onTabChange={onTabChange}
      showEdit={false}
      showActionsColumn={false}
    />
  );
};

export default AllOrderItems;
