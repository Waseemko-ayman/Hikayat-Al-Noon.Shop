'use client';
import GenericAllTable from '@/components/organism/GenericAllTable';

const AllFAQ = ({ value }: { value: string }) => {
  return (
    <GenericAllTable
      value={value}
      title="All FAQ"
      description="View and manage all faqs"
      tableName="faqs"
      placeholder="Search for order..."
      deleteLocation="faqs"
      showEdit={false}
    />
  );
};

export default AllFAQ;
