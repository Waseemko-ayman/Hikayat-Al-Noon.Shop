import PostsPage from '@/features/blog/Posts';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Posts',
  description:
    'Explore our latest articles, insights, and updates across design, development, and digital experiences.',
};

const Posts = () => <PostsPage />;

export default Posts;
