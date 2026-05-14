'use client';

import BlogPostCard from '@/components/molecules/BlogPostCard';
import BlogSidebar from './BlogSidebar';
import { useSupabaseQuery } from '@/Hooks/useSupabaseQuery';
import BlogPostCardSkeleton from '@/components/Skeletons/BlogPostCardSkeleton';
import ErrorFetching from '@/components/molecules/ErrorFetching';
import { PATHS } from '@/data/paths';
import { useCallback, useState } from 'react';
import { useDebounce } from 'use-debounce';
import EmptyState from '@/components/molecules/EmptyState';

const FeaturedSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchQuery, 700);

  const {
    data: blogPosts,
    isLoading,
    error,
  } = useSupabaseQuery('posts', {
    is_featured: true,
    title: debouncedSearchTerm ? debouncedSearchTerm.toLowerCase() : undefined,
  });

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(() => value);
  }, []);

  const handleReset = () => {
    setSearchQuery('');
  };

  const hasActiveFilters = searchQuery !== '';

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            Featured & Editor&apos;s Picks
          </h2>
          <p className="mt-2 text-muted-foreground">
            Handpicked stories from our fashion experts
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <BlogPostCardSkeleton key={i} />
                ))
              ) : error ? (
                <ErrorFetching error={error} />
              ) : (
                blogPosts?.data?.map((post) => (
                  <BlogPostCard
                    key={post.title}
                    href={PATHS.BLOG.POST(post?.slug)}
                    {...post}
                  />
                ))
              )}
            </div>
            {/* EmptyState خارج الـ container */}
            {!isLoading && !error && blogPosts?.data?.length === 0 && (
              <EmptyState
                imageSrc="no-post.png"
                messageText={
                  hasActiveFilters
                    ? 'No posts match your filters. Try adjusting them.'
                    : 'Oops! There are no posts.'
                }
                showButton={hasActiveFilters}
                buttonText={hasActiveFilters ? 'Reset filters' : ''}
                buttonHref={!hasActiveFilters ? PATHS.HOME : undefined}
                handleClick={hasActiveFilters ? handleReset : undefined}
              />
            )}
          </div>
          <div className="lg:col-span-1">
            <BlogSidebar
              searchQuery={searchQuery}
              handleSearch={handleSearchChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
