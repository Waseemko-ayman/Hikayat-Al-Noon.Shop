'use client';
import dynamic from 'next/dynamic';

import RepairServices from './Sections/RepairServices';
import { useCartContext } from '@/context/CartContext';

const ProductsTable = dynamic(() => import('./Sections/ProductsTable'), {
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
      <ProductsTable />
      {cartItems.length > 0 && <ApplyCoupon />}
    </>
  );
};

export default CartPage;
