import GenericAllTable from '@/components/organism/GenericAllTable';

const AllOrderItems = ({
  value,
  onTabChange,
}: {
  value: string;
  onTabChange: (val: string) => void;
}) => {
  // const params = useParams();
  // const orderId = String(params?.id);

  return (
    <GenericAllTable
      value={value}
      title="All Products"
      tableName="order_items"
      description="Browse all products included in this order"
      placeholder="Search for product..."
      onTabChange={onTabChange}
      showEdit={false}
      showActionsColumn={false}
    />
  );
};

export default AllOrderItems;
