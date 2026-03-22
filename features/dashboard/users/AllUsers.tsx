'use client';
import GenericAllTable from '@/components/organism/GenericAllTable';

const AllUsers = ({
  value,
  onTabChange,
}: {
  value: string;
  onTabChange: (val: string) => void;
}) => {
  return (
    <GenericAllTable
      value={value}
      title="All Users"
      description="View and manage all registered users on your platform"
      tableName="profiles"
      placeholder="Search for email..."
      deleteLocation="Users"
      onTabChange={onTabChange}
      showEdit={false}
    />
  );
};

export default AllUsers;
