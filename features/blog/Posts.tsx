'use client';
import Container from '@/components/atoms/Container';
import Input from '@/components/atoms/Input';
import Layer from '@/components/atoms/Layer';
import BlogPostCard from '@/components/molecules/BlogPostCard';
import EmptyState from '@/components/molecules/EmptyState';
import ErrorFetching from '@/components/molecules/ErrorFetching';
import RepairServicesComp from '@/components/molecules/RepairServicesSection';
import BlogPostCardSkeleton from '@/components/Skeletons/BlogPostCardSkeleton';
import { PATHS } from '@/data/paths';
import { useSupabaseQuery } from '@/Hooks/useSupabaseQuery';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

const PostsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const [debouncedSearchTerm] = useDebounce(searchQuery, 700);

  const {
    data: blogPosts,
    isLoading,
    error,
  } = useSupabaseQuery('posts', {
    title: debouncedSearchTerm ? debouncedSearchTerm.toLowerCase() : undefined,
  });

  const handleReset = () => {
    setSearchQuery('');
  };

  const hasActiveFilters = searchQuery !== '';

  return (
    <>
      <RepairServicesComp
        subTitle="#Posts"
        description="Explore our latest articles, insights, and updates covering design, development, and digital experiences."
        bgImage="/assets/banner/b8.webp"
      />
      <Layer>
        <Container>
          {/* Search Input */}
          <div className="relative w-full mb-8">
            <Input
              type="text"
              placeholder="Search products..."
              inputName="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              otherClassName="!w-full pr-8 !h-[36px] !rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64 transition-colors"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>

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
              buttonText={hasActiveFilters ? 'Reset filters' : 'Go to Home page'}
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
