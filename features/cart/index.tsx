'use client';
import dynamic from 'next/dynamic';

import RepairServices from './Sections/RepairServices';
import { useCartContext } from '@/context/CartContext';

const CartProducts = dynamic(() => import('./Sections/CartProducts'), {
  ssr: false,
});
const ApplyCoupon = dynamic(() => import('./Sections/ApplyCoupon'), {
  ssr: false,
});

const CartPage = () => {
  const { cartItems } = useCartContext();

  return (
    <>
      <RepairServices />
      <CartProducts />
      {cartItems.length > 0 && <ApplyCoupon />}
    </>
  );
};

export default CartPage;
