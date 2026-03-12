'use client';

import MainTitle from '@/components/atoms/MainTitle';
import ErrorFetching from '@/components/molecules/ErrorFetching';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import ProductCard from '@/components/molecules/ProductCard';
import useSupabaseClient from '@/Hooks/useSupabaseClient';
import { ProductCardProps } from '@/interfaces';
import { PATHS } from '@/data/paths';
import { useRouter } from 'next/navigation';
import ResponsiveWrapper from '@/components/molecules/ResponsiveWrapper';
import GridWrapper from '@/components/organism/GridWrapper';
import ProductSkeletons from '@/components/molecules/ProductSkeletons';

const FeaturedProducts = () => {
  const router = useRouter();

  // Supabase Hook
  const {
    data: products,
    error,
    isLoading,
  } = useSupabaseClient('products', {
    section: 'featured',
  });

  return (
    <ResponsiveWrapper>
      <MainTitle
        title="Featured Product"
        description="Summer Collection New Modern Design"
      />
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          <ProductSkeletons count={products?.length} />
        </div>
      ) : error ? (
        <ErrorFetching error={error} />
      ) : (
        <GridWrapper isScrollable>
          {products?.map((item: ProductCardProps, index: number) => (
            <AnimatedWrapper key={item?.id} custom={index}>
              <ProductCard
                key={item?.id}
                image={item.image}
                title={item.title}
                productData={item}
                handleClick={() =>
                  item?.slug && router.push(PATHS.SHOP.ITEM(item?.slug))
                }
              />
            </AnimatedWrapper>
          ))}
        </GridWrapper>
      )}
    </ResponsiveWrapper>
  );
};

export default FeaturedProducts;
