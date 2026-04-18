'use client';
import GenericAllTable from '@/components/organism/GenericAllTable';

const AllOrders = ({ value }: { value: string }) => {
  return (
    <GenericAllTable
      value={value}
      title="All Orders"
      description="View and manage all orders"
      tableName="orders"
      placeholder="Search for order..."
      deleteLocation="Orders"
      showEdit={false}
      showActionsColumn={false}
    />
  );
};

export default AllOrders;
