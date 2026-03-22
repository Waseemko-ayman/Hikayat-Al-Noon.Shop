'use client';
import Container from '@/components/atoms/Container';
import Layer from '@/components/atoms/Layer';
import React from 'react';
import ApplyCouponCard from './ApplyCouponCard';
import CartTotals from './CartTotals';

const ApplyCoupon = () => {
  const TitleStyle = 'text-(--fifth-color) text-lg mb-4 font-bold';

  return (
    <Layer otherClassName="!py-5">
      <Container otherClassName="flex items-start justify-between gap-5 max-[991px]:flex-wrap max-[991px]:justify-center max-[991px]:gap-[30px]">
        <ApplyCouponCard TitleStyle={TitleStyle} />
        <CartTotals TitleStyle={TitleStyle} />
      </Container>
    </Layer>
  );
};

export default ApplyCoupon;
