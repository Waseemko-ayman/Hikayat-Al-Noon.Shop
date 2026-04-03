'use client';

import dynamic from 'next/dynamic';
import RepairServices from './Sections/RepairServices';

const CartProducts = dynamic(() => import('./Sections/CartProducts'), {
  ssr: false,
});

const CartPage = () => {
  return (
    <>
      <RepairServices />
      <CartProducts />
    </>
  );
};

export default CartPage;
