/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductDetailsPage from '@/features/shop/ProductDetails';
import supabase from '@/config/api';
import { Metadata } from 'next';
import React from 'react';

export async function generateMetadata({
  params,
}: {
  params: Promise<any>;
}): Promise<Metadata> {
  const { slug } = await params;

  return {
    // title: `Product Details - Item ${id}`,
    // description: `Details of product with ID ${id}`,
    title: `Product Details - Hikayat Al-Noon`,
    description: `Details of product with ${slug}`,
  };
}

export default async function ProductPageWrapper({
  params,
}: {
  params: Promise<any>;
}) {
  const resolvedParams = await params;

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .single();

  if (error) {
    console.error(error);
    return <div>Product not found</div>;
  }

  return <ProductDetailsPage product={product} />;
}
