import ShopPage from '@/features/shop';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop - Wénor Shop',
  description: 'Browse and purchase clothes from Wénor Shop',
};

const Shop = async () => <ShopPage />;

export default Shop;
