/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductCardProps } from '@/interfaces';
import React from 'react';
import Layer from '../atoms/Layer';
import MainTitle from '../atoms/MainTitle';
import ProdcutsContainer from '../atoms/ProdcutsContainer';
import AnimatedWrapper from './FramerMotion/AnimatedWrapper';
import ProductCard from './ProductCard';
import { PATHS } from '@/data/paths';
import { useRouter } from 'next/navigation';
import ErrorFetching from './ErrorFetching';
import ProductSkeletons from './ProductSkeletons';

const RandomFeaturedProducts = ({
  randomFour,
  isLoading,
  error,
}: {
  randomFour: ProductCardProps[];
  isLoading: boolean;
  error: any;
}) => {
  const router = useRouter();

  return (
    <Layer otherClassName="!mt-10">
      <MainTitle
        title="Similar Products"
        description="Explore Our Latest Collection of Featured Products"
      />
      <ProdcutsContainer>
        {isLoading ? (
          <ProductSkeletons count={4} />
        ) : error ? (
          <ErrorFetching />
        ) : (
          randomFour.map((item, index) => (
            <AnimatedWrapper key={item?.id} custom={index}>
              <ProductCard
                key={item?.id}
                image={item?.image}
                title={item.title}
                price={item?.price}
                productData={item}
                handleClick={() =>
                  item?.slug && router.push(PATHS.SHOP.ITEM(item?.slug))
                }
              />
            </AnimatedWrapper>
          ))
        )}
      </ProdcutsContainer>
    </Layer>
  );
};

export default RandomFeaturedProducts;
