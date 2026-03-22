'use client';
import dynamic from 'next/dynamic';

import Hero from './Sections/Hero';
import Loading from '@/components/atoms/Loading';
import FeatursSec from '@/components/organism/FeatursSec';

const FeaturedProducts = dynamic(() => import('./Sections/FeaturedProducts'), {
  ssr: false,
  loading: () => <Loading loadingText="Loading featured products..." />,
});
const RepairServices = dynamic(() => import('./Sections/RepairServices'), {
  ssr: false,
  loading: () => <Loading loadingText="Loading repair services..." />,
});
const NewArrivals = dynamic(() => import('./Sections/NewArrivals'), {
  ssr: false,
  loading: () => <Loading loadingText="Loading new arrivals..." />,
});
const Banners = dynamic(() => import('./Sections/Banners'), {
  ssr: false,
  loading: () => <Loading loadingText="Loading banners..." />,
});

const HomePage = () => {
  return (
    <>
      <Hero />
      <FeatursSec />
      <FeaturedProducts />
      <RepairServices />
      <NewArrivals />
      <Banners />
    </>
  );
};

export default HomePage;
