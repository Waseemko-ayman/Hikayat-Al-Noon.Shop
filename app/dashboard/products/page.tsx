import ProductsPage from '@/features/dashboard/products';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Products - Hikayat Al-Noon Dashboard',
  description:
    'Manage your products, inventory, and listings in the Hikayat Al-Noon dashboard.',
};

const Products = () => <ProductsPage />;

export default Products;
