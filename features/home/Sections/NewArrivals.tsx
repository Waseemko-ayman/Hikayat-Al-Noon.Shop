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
import ProductCardSkeleton from '@/components/Skeletons/ProductCardSkeleton';

const NewArrivals = () => {
  const router = useRouter();

  // Supabase Hook
  const {
    data: products,
    error,
    isLoading,
  } = useSupabaseClient('products', {
    section: 'newArrivals',
  });

  return (
    <ResponsiveWrapper>
      <MainTitle
        title="New Arrivals"
        description="Summer Collection New Modern Design"
      />
      <GridWrapper isScrollable>
        {isLoading ? (
          Array.from({ length: products?.length || 4 }).map((_, index) => (
            <AnimatedWrapper key={index} custom={index}>
              <ProductCardSkeleton />
            </AnimatedWrapper>
          ))
        ) : error ? (
          <ErrorFetching error={error} />
        ) : (
          products?.map((item: ProductCardProps, index: number) => (
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
          ))
        )}
      </GridWrapper>
    </ResponsiveWrapper>
  );
};

export default NewArrivals;
