import ProductsPage from '@/features/dashboard/products';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Products - Wénor Dashboard',
  description:
    'Manage your products, inventory, and listings in the Wénor dashboard.',
};

const Products = () => <ProductsPage />;

export default Products;
