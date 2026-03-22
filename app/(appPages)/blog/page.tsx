import BlogPage from '@/features/blog';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Blog - Wénor Shop',
  description: 'Read the latest articles on Wénor Shop',
};

const Blog = () => <BlogPage />;

export default Blog;
