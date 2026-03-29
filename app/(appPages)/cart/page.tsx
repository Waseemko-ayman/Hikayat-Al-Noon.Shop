import CartPage from '@/features/cart';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cart - Hikayat Al-Noon',
  description: 'View your shopping cart and proceed to checkout',
};

const Cart = () => <CartPage />;

export default Cart;
