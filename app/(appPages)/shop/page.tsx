import ShopPage from '@/features/shop';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop - Hikayat Al-Noon',
  description: 'Browse and purchase clothes from Hikayat Al-Noon',
};

const Shop = async () => <ShopPage />;

export default Shop;
