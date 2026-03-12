'use client';

import dynamic from 'next/dynamic';
import RepairServices from './Sections/RepairServices';

const KnowUs = dynamic(() => import('./Sections/KnowUs'), { ssr: false });
const FeatursSec = dynamic(() => import('@/components/organism/FeatursSec'), {
  ssr: false,
});

const AboutPage = () => {
  return (
    <>
      <RepairServices />
      <KnowUs />
      <FeatursSec />
    </>
  );
};

export default AboutPage;
