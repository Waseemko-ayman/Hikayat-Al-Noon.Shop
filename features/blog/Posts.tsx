/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Container from '@/components/atoms/Container';
import Layer from '@/components/atoms/Layer';
import BlogPostCard from '@/components/molecules/BlogPostCard';
import EmptyState from '@/components/molecules/EmptyState';
import ErrorFetching from '@/components/molecules/ErrorFetching';
import RepairServicesComp from '@/components/molecules/RepairServicesSection';
import BlogPostCardSkeleton from '@/components/Skeletons/BlogPostCardSkeleton';
import { PATHS } from '@/data/paths';
import { useSupabaseQuery } from '@/Hooks/useSupabaseQuery';
import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import useAPI from '@/Hooks/useAPI';
import { PostFiltersProps } from '@/interfaces';
import PostsFilters from './Sections/PostsFilters';

const PostsPage = () => {
  const [filters, setFilters] = useState<PostFiltersProps>({
    searchQuery: '',
    postScope: 'all',
    category: 'all',
  });

  const { searchQuery, postScope, category } = filters;
  const [debouncedSearchTerm] = useDebounce(searchQuery, 700);

  const { get: getPostsCategories, data: categories } = useAPI<{
    id: string;
    name: string;
  }>('posts_categories');

  const {
    data: blogPosts,
    isLoading,
    error,
  } = useSupabaseQuery('posts', {
    title: debouncedSearchTerm ? debouncedSearchTerm.toLowerCase() : undefined,
    category: category !== 'all' ? category : undefined,
    is_featured:
      postScope === 'is_featured'
        ? true
        : postScope === 'latest'
          ? false
          : undefined,
    order: postScope === 'popular' ? 'views' : undefined,
    ascending: postScope === 'popular' ? false : undefined,
  });

  const handleSearchChange = useCallback((value: string) => {
    setFilters((prev: any) => ({ ...prev, searchQuery: value }));
  }, []);

  const handleReset = () => {
    setFilters({
      searchQuery: '',
      postScope: 'all',
      category: 'all',
    });
  };

  const hasActiveFilters =
    searchQuery !== '' || postScope !== 'all' || category !== 'all';

  useEffect(() => {
    getPostsCategories();
  }, [getPostsCategories]);

  return (
    <>
      <RepairServicesComp
        subTitle="#Posts"
        description="Explore our latest articles, insights, and updates covering design, development, and digital experiences."
        bgImage="/assets/banner/b8.webp"
      />
      <Layer>
        <Container>
          {(isLoading || blogPosts !== undefined) && (
            <PostsFilters
              filters={filters}
              setFilters={setFilters}
              onSearchChange={handleSearchChange}
              handleReset={handleReset}
              hasActiveFilters={hasActiveFilters}
              categories={categories ?? []}
            />
          )}

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <BlogPostCardSkeleton key={i} />
              ))
            ) : error ? (
              <ErrorFetching error={error} />
            ) : (
              blogPosts?.data?.map((post) => (
                <BlogPostCard
                  key={post.id}
                  href={PATHS.BLOG.POST(post?.slug)}
                  {...post}
                />
              ))
            )}
          </div>
          
          {!isLoading && !error && blogPosts?.data?.length === 0 && (
            <EmptyState
              imageSrc="no-post.png"
              messageText={
                hasActiveFilters
                  ? 'No posts match your filters. Try adjusting them.'
                  : 'Oops! There are no posts.'
              }
              showButton={hasActiveFilters}
              buttonText={
                hasActiveFilters ? 'Reset filters' : 'Go to Home page'
              }
              buttonHref={!hasActiveFilters ? PATHS.HOME : undefined}
              handleClick={hasActiveFilters ? handleReset : undefined}
            />
          )}
        </Container>
      </Layer>
    </>
  );
};

export default PostsPage;
