'use client';

import dynamic from 'next/dynamic';
import RepairServices from './Sections/RepairServices';

const KnowUs = dynamic(() => import('./Sections/KnowUs'), { ssr: false });
const AboutDeveloper = dynamic(() => import('./Sections/AboutDeveloper'), {
  ssr: false,
});
const FeatursSec = dynamic(() => import('@/components/organism/FeatursSec'), {
  ssr: false,
});

const AboutPage = () => {
  return (
    <>
      <RepairServices />
      <KnowUs />
      <AboutDeveloper />
      <FeatursSec />
    </>
  );
};

export default AboutPage;
