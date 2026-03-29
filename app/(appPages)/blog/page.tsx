import BlogPage from '@/features/blog';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Blog - Hikayat Al-Noon',
  description: 'Read the latest articles on Hikayat Al-Noon',
};

const Blog = () => <BlogPage />;

export default Blog;
