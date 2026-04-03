"use client";
import dynamic from 'next/dynamic';
import RepairServices from './Sections/RepairServices';
import Loading from '@/components/atoms/Loading';
const Clothes = dynamic(() => import('./Sections/Clothes'), {
  ssr: false,
  loading: () => <Loading loadingText="Loading products..." MainHightScreen />,
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
