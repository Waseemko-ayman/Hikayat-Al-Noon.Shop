'use client';

// import dynamic from 'next/dynamic';
import RepairServices from './Sections/RepairServices';
import CategoriesSection from './Sections/CategoriesSection';
import BlogPosts from './Sections/BlogPosts';
import FeaturedSection from './Sections/FeaturedSection';

// const NeverRead = dynamic(() => import('./Sections/NeverRead'), { ssr: false });

const BlogPage = () => {
  return (
    <>
      <RepairServices />
      <CategoriesSection />
      <BlogPosts />
      <FeaturedSection />
    </>
  );
};

export default BlogPage;
