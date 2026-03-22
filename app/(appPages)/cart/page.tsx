import CartPage from '@/features/cart';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Cart - Wénor Shop',
  description: 'View your shopping cart and proceed to checkout',
};

const Cart = () => <CartPage />;

export default Cart;
