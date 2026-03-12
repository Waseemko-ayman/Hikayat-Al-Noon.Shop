"use client";
import dynamic from 'next/dynamic';
import React from 'react';
import RepairServices from './Sections/RepairServices';
import Loading from '@/components/atoms/Loading';
const Clothes = dynamic(() => import('./Sections/Clothes'), {
  ssr: false,
  loading: () => <Loading loadingText="Loading products..." />,
});

const ShopPage = () => {
  return (
    <>
      <RepairServices />
      <Clothes />
    </>
  );
};

export default ShopPage;
