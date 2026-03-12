'use client';

import MainTitle from '@/components/atoms/MainTitle';
import ErrorFetching from '@/components/molecules/ErrorFetching';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import ProductCard from '@/components/molecules/ProductCard';
import useSupabaseClient from '@/Hooks/useSupabaseClient';
import { ProductCardProps } from '@/interfaces';
import { PATHS } from '@/data/paths';
import { useRouter } from 'next/navigation';
import ProductSkeletons from '@/components/molecules/ProductSkeletons';
import Layer from '@/components/atoms/Layer';
import Container from '@/components/atoms/Container';

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
    <Layer>
      <Container>
        <MainTitle
          title="Featured Product"
          description="Summer Collection New Modern Design"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5">
          {isLoading ? (
            <ProductSkeletons count={products?.length} />
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
        </div>
      </Container>
    </Layer>
  );
};

export default FeaturedProducts;
