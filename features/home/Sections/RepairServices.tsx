import RepairServicesComp from '@/components/molecules/RepairServicesSection';
import { PATHS } from '@/data/paths';
import React from 'react';

const RepairServices = () => {
  return (
    <RepairServicesComp
      title="Repair Services"
      subTitle={
        <>
          Up to <span className="text-red-600">10% Off</span> - All t-Shirts &
          Accessories
        </>
      }
      bntText="Explore More"
      bgImage="/assets/banner/b2.webp"
      buttonHref={PATHS.SHOP.ROOT}
      otherClassName="md:min-h-[40vh]"
      padding={false}
    />
  );
};

export default RepairServices;
