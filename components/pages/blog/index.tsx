"use client"

import dynamic from 'next/dynamic';
import RepairServices from './Sections/RepairServices';

const NeverRead = dynamic(() => import('./Sections/NeverRead'), { ssr: false });

const BlogPage = () => {
  return (
    <>
      <RepairServices />
      <NeverRead />
    </>
  );
};

export default BlogPage;
