'use client';
import React from 'react';
import AllProducts from './Sections/AllProducts';
import CreateProducts from './Sections/CreateProducts';
import GenericPage from '@/components/organism/GenericPage';

const ProductsPage = () => {
  const tabsData = [
    { value: 'allProducts', label: 'All Products' },
    {
      value: 'createProducts',
      label: 'Create New Product',
    },
  ];

  return (
    <GenericPage
      title="Products"
      description="Create and manage products for your store"
      tabs={tabsData}
      allComponent={AllProducts}
      createComponent={CreateProducts}
    />
  );
};

export default ProductsPage;
