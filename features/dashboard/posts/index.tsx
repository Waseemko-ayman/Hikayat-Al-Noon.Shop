'use client';
import GenericPage from '@/components/organism/GenericPage';
import AllPosts from './AllPosts';
import { FileText } from 'lucide-react';
import CreatePosts from './CreatePosts';
import CreatePostsCategories from './CreatePostsCategories';

const PostsPage = () => {
  const tabsData = [
    { value: 'allPosts', label: 'All Posts' },
    {
      value: 'createPosts',
      label: 'Create New Post',
    },
    {
      value: 'createPostsCategories',
      label: 'Create New Post Category',
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
      overviewComponent={CreatePostsCategories}
      overviewTabValue="createPostsCategories"
    />
  );
};

export default PostsPage;
