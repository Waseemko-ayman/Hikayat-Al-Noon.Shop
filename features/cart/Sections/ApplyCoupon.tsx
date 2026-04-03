'use client';
import Container from '@/components/atoms/Container';
import Layer from '@/components/atoms/Layer';
import React from 'react';
import ApplyCouponCard from './ApplyCouponCard';
import CartTotals from './CartTotals';
import { viewCartMode } from '@/utils/types';

const ApplyCoupon = ({ viewMode }: { viewMode: viewCartMode }) => {
  const TitleStyle = 'text-(--fifth-color) text-lg mb-4 font-bold';

  return (
    <Layer otherClassName={viewMode === 'table' ? 'py-5!' : 'py-0!'}>
      <Container
        otherClassName={
          viewMode === 'table'
            ? 'flex items-start justify-between gap-5 max-[991px]:flex-wrap max-[991px]:justify-center max-[991px]:gap-[30px]'
            : 'space-y-5 max-[991px]:space-y-6'
        }
      >
        <ApplyCouponCard TitleStyle={TitleStyle} viewMode={viewMode} />
        <CartTotals TitleStyle={TitleStyle} />
      </Container>
    </Layer>
  );
};

export default ApplyCoupon;
