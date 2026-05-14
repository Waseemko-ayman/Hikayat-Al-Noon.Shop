"use client";
import GenericPage from '@/components/organism/GenericPage';
import AllPosts from './AllPosts';
import { FileText } from 'lucide-react';
import CreatePosts from './CreatePosts';

const PostsPage = () => {
  const tabsData = [
    { value: 'allPosts', label: 'All Posts' },
    {
      value: 'createPosts',
      label: 'Create New Post',
    },
  ];

  return (
    <GenericPage
      title="All Posts"
      description="Manage Posts for your store"
      Icon={FileText}
      tabs={tabsData}
      allComponent={AllPosts}
      createComponent={CreatePosts}
    />
  );
};

export default PostsPage;
