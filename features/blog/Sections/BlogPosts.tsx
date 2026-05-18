'use client';

import Button from '@/components/atoms/Button';
import BlogPostCard from '@/components/molecules/BlogPostCard';
import ErrorFetching from '@/components/molecules/ErrorFetching';
import BlogPostCardSkeleton from '@/components/Skeletons/BlogPostCardSkeleton';
import { PATHS } from '@/data/paths';
import { useSupabaseQuery } from '@/Hooks/useSupabaseQuery';
import { useRouter } from 'next/navigation';

const BlogPosts = () => {
  const router = useRouter();

  const {
    data: blogPosts,
    isLoading,
    error,
  } = useSupabaseQuery('posts', {
    is_featured: false,
  });

  return (
    <section className="bg-muted/30 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              Latest Articles
            </h2>
            <p className="mt-2 text-muted-foreground">
              Fresh inspiration delivered weekly
            </p>
          </div>
          <Button
            variant="outline"
            otherClassName="rounded-full! border border-(--forth-color)! bg-transparent px-5 py-2 text-sm font-medium text-primary"
            handleClick={() => router.push(PATHS.BLOG.POSTS)}
          >
            View All Posts
          </Button>
        </div>
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
      </div>
    </section>
  );
};

export default BlogPosts;
