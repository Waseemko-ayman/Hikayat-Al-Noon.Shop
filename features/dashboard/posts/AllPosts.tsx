'use client';
import GenericAllTable from '@/components/organism/GenericAllTable';

const AllPosts = ({
  value,
  onTabChange,
  onEditIdChange,
}: {
  value: string;
  onTabChange: (val: string) => void;
  onEditIdChange: (id: string | number | null) => void;
}) => {
  return (
    <GenericAllTable
      value={value}
      title="All Posts"
      description="View and manage all posts"
      tableName="posts"
      placeholder="Search for post..."
      createTabValue="createPosts"
      onEditIdChange={onEditIdChange}
      onTabChange={onTabChange}
      deleteLocation="Posts"
    />
  );
};

export default AllPosts;
