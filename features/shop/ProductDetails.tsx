/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useMemo, useState } from 'react';
import Container from '@/components/atoms/Container';
import Layer from '@/components/atoms/Layer';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import RandomFeaturedProducts from '@/components/molecules/RandomFeaturedProducts';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useCartContext } from '@/context/CartContext';
import { ProductCardProps } from '@/interfaces';
import { usePathname } from 'next/navigation';
import ProductReviews from './Sections/ProductReviews';
import ProductInfoSection from './Sections/ProductInfoSection';
import { useSupabaseQuery } from '@/Hooks/useSupabaseQuery';

const ProductDetailsPage = ({
  product: initialProduct,
}: {
  product: ProductCardProps;
}) => {
  const [, setTargetSrc] = useState('');

  // Reviews state
  const [, setReviews] = useState<
    { user: string; rating: number; comment: string }[]
  >([]);

  const pathname = usePathname();
  const pathParts = pathname.split('/').slice(1);

  // Context
  const { addToCart, user, isLoading: addIsLoading } = useCartContext();

  const { data, isLoading, error } = useSupabaseQuery('products', {
    category: initialProduct.category,
  });

  const { data: relatedData, isLoading: relatedLoading } = useSupabaseQuery(
    'products',
    {
      slug: initialProduct.slug,
    },
  );

  const product = relatedData?.data?.[0] ?? initialProduct;

  const featuredProducts = data?.data;

  // Shuffle array
  const randomFour = useMemo(() => {
    if (!featuredProducts?.length) return [];

    return [...featuredProducts].sort(() => 0.5 - Math.random()).slice(0, 4);
  }, [featuredProducts]);

  let accumulatedPath = '';
  const breadcrumbs: { label: string; href: string }[] = [
    { label: 'Home', href: '/' },
  ];

  pathParts.forEach((part) => {
    accumulatedPath = `/${part}`;
    breadcrumbs.push({
      label: part.charAt(0).toUpperCase() + part.slice(1),
      href: accumulatedPath,
    });
  });

  useEffect(() => {
    if (product?.gallery?.length) {
      setTargetSrc(product.gallery[0].image);
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      setReviews(
        (product.comments || []).map((c: any, i: number) => ({
          user: c.user,
          rating: product.ratings?.[i] || 0,
          comment: c.comment,
        })),
      );
    }
  }, [product]);

  return (
    <Layer otherClassName="pt-40 md:pt-44">
      <Container>
        {/* Breadcrumbs */}
        <Breadcrumb>
          <BreadcrumbList className="flex items-center md:pl-12">
            {breadcrumbs.map((crumb, index) => (
              <AnimatedWrapper
                key={index}
                custom={index}
                direction="x"
                distance={40}
              >
                <BreadcrumbItem>
                  {index === breadcrumbs.length - 1 ? (
                    <span className="text-(--forth-color) text-base truncate">
                      {crumb.label}
                    </span>
                  ) : (
                    <BreadcrumbLink
                      href={crumb.href}
                      className="hover:text-(--forth-color) transtion-all duration-300"
                    >
                      {crumb.label}
                    </BreadcrumbLink>
                  )}
                  {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                </BreadcrumbItem>
              </AnimatedWrapper>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        {/* Product Image & Info */}
        <ProductInfoSection
          product={product}
          addToCart={addToCart}
          user={user}
          addIsLoading={addIsLoading}
        />

        {/* Reviews Section */}
        <ProductReviews product={product} isLoading={relatedLoading} />

        <RandomFeaturedProducts
          error={error}
          randomFour={randomFour}
          isLoading={isLoading}
        />
      </Container>
    </Layer>
  );
};

export default ProductDetailsPage;
