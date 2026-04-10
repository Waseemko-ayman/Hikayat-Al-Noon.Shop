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
import { useToast } from '@/lib/toast';
import { usePathname } from 'next/navigation';
import ProductReviews from './Sections/ProductReviews';
import ProductInfoSection from './Sections/ProductInfoSection';
import { useSupabaseQuery } from '@/Hooks/useSupabaseQuery';

const ProductDetailsPage = ({ product }: { product: ProductCardProps }) => {
  const [, setTargetSrc] = useState('');
  const [size] = useState('');
  const [, setErrorMsgSize] = useState(false);
  const [quantity] = useState(1);

  // Reviews state
  const [, setReviews] = useState<
    { user: string; rating: number; comment: string }[]
  >([]);

  const pathname = usePathname();
  const pathParts = pathname.split('/').slice(1);

  const { showToast } = useToast();

  // Context
  const { addToCart, user, isLoading: addIsLoading } = useCartContext();

  const {
    data: featuredProducts,
    isLoading,
    error,
  } = useSupabaseQuery('products', { category: product.category });

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

  const handleAddProduct = async (product: any) => {
    if (!size) {
      setErrorMsgSize(true);
      return;
    }
    await addToCart({ ...product, size, quantity }, user.id);
    showToast(`Add ${product.title} (${size} x${quantity}) to cart`, 'success');
  };

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
          addToCart={(item) => handleAddProduct(item)}
          addIsLoading={addIsLoading}
        />

        {/* Reviews Section */}
        <ProductReviews product={product} isLoading={isLoading} />

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
