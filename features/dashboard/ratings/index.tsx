/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useCallback, useMemo, useState } from 'react';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import StatsItem from '@/components/molecules/StatsItem';
import StatsItemSkeleton from '@/components/Skeletons/StatsItemSkeleton';
import { Inbox, Search, X } from 'lucide-react';
import { FaStar } from 'react-icons/fa6';
import { useDebounce } from 'use-debounce';
import ProductRatingCard from '@/components/molecules/ProductRatingCard';
import { ProductCardProps } from '@/interfaces';
import RatingsSummarySkeleton from '@/components/Skeletons/RatingsSummarySkeleton';
import CardWrapper from '@/components/Template/CardWrapper';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import { useSupabaseQuery } from '@/Hooks/useSupabaseQuery';
import EmptyState from '@/components/molecules/EmptyState';

const RatingsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const [debouncedSearchTerm] = useDebounce(searchQuery, 700);

  // Supabase Hook
  const { data, isLoading } = useSupabaseQuery(
    'products',
    debouncedSearchTerm
      ? { title: debouncedSearchTerm.toLowerCase() }
      : undefined,
  );

  const products = data?.data;

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const ratingsAvg = useMemo(() => {
    if (!products || products.length === 0) return '0.0';

    const total = products.reduce(
      (acc: number, p: any) => acc + (p.rating || 0),
      0,
    );

    return (total / products.length).toFixed(1);
  }, [products]);

  const stats = [
    {
      Icon: FaStar,
      value: products?.length || 0,
      label: 'Total',
    },
    {
      Icon: FaStar,
      value: ratingsAvg,
      label: 'Average Rating',
    },
  ];

  const isSearching = !!debouncedSearchTerm;

  return (
    <div className="max-md:mt-5">
      {/* Header */}
      <header className="bg-(--forth-color) text-white rounded-lg mb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-4">
          <div className="flex max-sm:flex-col justify-center max-sm:text-center items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
              <FaStar className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Ratings Overview</h1>
              <p className="text-sm text-white/80">
                Monitor customer feedback across all products
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-col min-[800px]:flex-row items-center justify-between gap-2 md:gap-4">
            {isLoading
              ? Array.from({ length: stats.length }).map((_, i) => (
                  <StatsItemSkeleton key={i} />
                ))
              : stats.map((s, i) => (
                  <StatsItem
                    key={i}
                    Icon={s.Icon}
                    value={s.value}
                    label={s.label}
                  />
                ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div>
        <div className="relative w-full sm:w-fit">
          <Input
            type="text"
            placeholder="Search messages..."
            inputName="search"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            otherClassName="pr-8 rounded-lg! focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64 transition-colors"
          />
          {searchQuery ? (
            <Button
              variant="ghost"
              handleClick={() => handleSearchChange('')}
              otherClassName="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-0! hover:bg-transparent! hover:text-(--forth-color)!"
            >
              <X className="h-4 w-4" />
            </Button>
          ) : (
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-10">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <AnimatedWrapper key={i} custom={i}>
                  <RatingsSummarySkeleton
                    key={i}
                    otherClassName="p-2.5 md:p-3.5 border border-gray-200 rounded-[20px] md:shadow-[20px_20px_34px_rgb(0,0,0,0.03)] animate-pulse"
                    infoHeader
                  />
                </AnimatedWrapper>
              ))
            : products?.map((product: ProductCardProps, i: number) => (
                <AnimatedWrapper key={i} custom={i}>
                  <CardWrapper withFlex={false}>
                    <ProductRatingCard
                      key={product.id}
                      ratings={product.ratings}
                      product={product}
                      infoHeader
                    />
                  </CardWrapper>
                </AnimatedWrapper>
              ))}
        </div>
        {!isLoading && products?.length === 0 && (
          <EmptyState
            imageSrc="bookmark.png"
            messageText={isSearching ? 'No results found' : 'No products yet'}
            description="Try adjusting your search or check available products"
            showButton={!!searchQuery}
            Icon={Inbox}
            buttonText="Clear search"
            handleClick={() => setSearchQuery('')}
          />
        )}
      </div>
    </div>
  );
};

export default RatingsPage;
