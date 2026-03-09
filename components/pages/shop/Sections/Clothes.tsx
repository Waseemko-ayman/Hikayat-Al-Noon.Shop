/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Container from '@/components/atoms/Container';
import Layer from '@/components/atoms/Layer';
import ProdcutsContainer from '@/components/atoms/ProdcutsContainer';
import ProductCard from '@/components/molecules/ProductCard';
import { PATHS } from '@/data/paths';
import { useRouter } from 'next/navigation';
import { ProductCardProps } from '@/interfaces';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import ProductFilter from './ProductFilter';
import useSupabaseClient from '@/Hooks/useSupabaseClient';
import ErrorFetching from '@/components/molecules/ErrorFetching';
import { useDebounce } from 'use-debounce';
import ProductSkeletons from '@/components/molecules/ProductSkeletons';
import useAPI from '@/Hooks/useAPI';
import EmptyState from '@/components/molecules/EmptyState';
import { FaBoxOpen } from 'react-icons/fa6';

const Clothes = () => {
  const [filters, setFilters] = useState({
    searchQuery: '',
    category: 'all',
    sortBy: 'all',
    discount: false,
    priceRange: [0, 1000],
    isFiltersOpen: false,
  });

  const { searchQuery, category, sortBy, discount, priceRange } = filters;
  const [debouncedSearchTerm] = useDebounce(searchQuery, 700);
  const router = useRouter();

  // Supabase API
  const { get: getSections, data: sections } = useAPI<{
    id: string;
    name: string;
  }>('sections');

  const { get: getCategories, data: categories } = useAPI<{
    id: string;
    name: string;
  }>('categories');

  // Supabase Hook
  const {
    data: products,
    error,
    isLoading,
  } = useSupabaseClient(
    'products',
    {
      title: debouncedSearchTerm
        ? debouncedSearchTerm.toLowerCase()
        : undefined,
      category: category !== 'all' ? category : undefined,
      discount: discount ? true : undefined,
      section:
        sortBy === 'featured' || sortBy === 'newArrivals' ? sortBy : undefined,
      rating_avg: sortBy === 'rating' ? true : undefined,
      price:
        sortBy === 'price-low'
          ? true
          : sortBy === 'price-high'
            ? false
            : undefined,
    },
    priceRange as [number, number],
  );

  const handleReset = () => {
    setFilters({
      searchQuery: '',
      category: 'all',
      sortBy: 'all',
      discount: false,
      priceRange: [0, 1000],
      isFiltersOpen: false,
    });
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    category !== 'all' ||
    discount ||
    sortBy !== 'all' ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 1000;

  const handleSearchChange = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: value }));
  }, []);

  useEffect(() => {
    getSections();
    getCategories();
  }, []);

  return (
    <Layer>
      <Container>
        {(isLoading || products !== undefined) && (
          <ProductFilter
            filters={filters}
            setFilters={setFilters}
            onSearchChange={handleSearchChange}
            handleReset={handleReset}
            hasActiveFilters={hasActiveFilters}
            sections={sections ?? []}
            categories={categories ?? []}
          />
        )}

        <ProdcutsContainer>
          {isLoading ? (
            <ProductSkeletons count={8} />
          ) : error ? (
            <ErrorFetching error={error} />
          ) : products?.length > 0 ? (
            products.map((item: ProductCardProps, index: number) => (
              <AnimatedWrapper key={item.id} custom={index}>
                <ProductCard
                  key={item.id}
                  image={item.image}
                  title={item.title}
                  productData={item}
                  handleClick={() =>
                    item?.slug && router.push(PATHS.SHOP.ITEM(item?.slug))
                  }
                />
              </AnimatedWrapper>
            ))
          ) : null}
        </ProdcutsContainer>

        {/* EmptyState خارج الـ container */}
        {!isLoading && !error && products?.length === 0 && (
          <EmptyState
            imageSrc="no-products.png"
            messageText={
              !hasActiveFilters
                ? 'Oops! There are no products in the store yet.'
                : 'No products match your filters. Try adjusting them.'
            }
            Icon={FaBoxOpen}
            buttonText={!hasActiveFilters ? 'Go to home page' : 'Reset filters'}
            buttonHref={!hasActiveFilters ? PATHS.HOME : undefined}
            handleClick={hasActiveFilters ? handleReset : undefined}
          />
        )}
      </Container>
    </Layer>
  );
};

export default Clothes;
