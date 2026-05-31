'use client';

import MainTitle from '@/components/atoms/MainTitle';
import ErrorFetching from '@/components/molecules/ErrorFetching';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import ProductCard from '@/components/molecules/ProductCard';
import { ProductCardProps } from '@/interfaces';
import { PATHS } from '@/data/paths';
import { useRouter } from 'next/navigation';
import ResponsiveWrapper from '@/components/molecules/ResponsiveWrapper';
import GridWrapper from '@/components/organism/GridWrapper';
import ProductCardSkeleton from '@/components/Skeletons/ProductCardSkeleton';
import { useSupabaseQuery } from '@/Hooks/useSupabaseQuery';
import useIsMobile from '@/Hooks/useIsMobile';

const FeaturedProducts = () => {
  const router = useRouter();
  const isMobile = useIsMobile();

  // Supabase Hook
  const { data, error, isLoading } = useSupabaseQuery('products', {
    section: 'featured',
  });

  const products = data?.data;

  return (
    <ResponsiveWrapper>
      <MainTitle
        title="Featured Product"
        description="Summer Collection New Modern Design"
      />
      <GridWrapper isScrollable>
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <AnimatedWrapper key={index} custom={index}>
              <ProductCardSkeleton />
            </AnimatedWrapper>
          ))
        ) : error ? (
          <ErrorFetching error={error} />
        ) : (
          products?.map((item: ProductCardProps, index: number) => (
            <AnimatedWrapper
              key={item?.id}
              custom={index}
              direction={isMobile ? 'x' : 'y'}
            >
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
          ))
        )}
      </GridWrapper>
    </ResponsiveWrapper>
  );
};

export default FeaturedProducts;
