'use client';

import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import ErrorFetching from '@/components/molecules/ErrorFetching';
import PopularPostSkeleton from '@/components/Skeletons/PopularPostSkeleton';
import { BlogSidebarTags } from '@/data';
import { PATHS } from '@/data/paths';
import { useSupabaseQuery } from '@/Hooks/useSupabaseQuery';
import { Search, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const BlogSidebar = ({
  searchQuery,
  handleSearch,
}: {
  searchQuery: string;
  handleSearch: (value: string) => void;
}) => {
  const {
    data: popularPosts,
    isLoading,
    error,
  } = useSupabaseQuery('posts', {
    order: 'views',
    ascending: false,
  });

  return (
    <aside className="space-y-8">
      {/* Search */}
      <div className="rounded-xl border border-(--seven-color) bg-card p-5 shadow-sm">
        <h3 className="mb-4 font-semibold text-card-foreground">Search</h3>
        <Input
          type="text"
          inputName="search"
          placeholder="Search articles..."
          otherClassName="w-full rounded-lg! text-sm"
          inputClassName="pl-5!"
          iconWrapper="left-2 top-1/2 -translate-y-1/2"
          iconClassName="h-4 w-4 text-muted-foreground cursor-default!"
          Icon={Search}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* Popular Posts */}
      <div className="rounded-xl border border-(--seven-color) bg-card p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-card-foreground">Popular Posts</h3>
        </div>
        <div className="space-y-4">
          {isLoading ? (
            <PopularPostSkeleton />
          ) : error ? (
            <ErrorFetching error={error} />
          ) : (
            popularPosts?.data?.slice(0, 3)?.map((post) => (
              <Link
                key={post.title}
                className="group flex gap-3"
                href={PATHS.BLOG.POST(post?.slug)}
              >
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="line-clamp-2 text-sm font-medium text-card-foreground transition-colors duration-300 group-hover:text-primary">
                    {post.title}
                  </h4>
                  <span className="mt-1 text-xs text-muted-foreground">
                    {post.date}
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Tags */}
      <div className="rounded-xl border border-(--seven-color) bg-card p-5 shadow-sm">
        <h3 className="mb-4 font-semibold text-card-foreground">
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {BlogSidebarTags.map((tag) => (
            <Button
              key={tag}
              variant="outline"
              otherClassName="rounded-full! border-(--forth-color)! px-3! py-1.5! text-xs font-medium text-muted-foreground hover:bg-(--forth-color) hover:text-white"
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default BlogSidebar;
