import EmptyState from '@/components/molecules/EmptyState';
import supabase from '@/config/api';
import PostDetailsPage from '@/features/blog/PostDetails';
import { RefreshCcw } from 'lucide-react';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;

  return {
    title: `Post Details`,
    description: `Details of post with ${resolvedParams.slug}`,
  };
}

export default async function BlogDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .maybeSingle();

  if (error || !post) {
    const handleClick = () => {
      location.reload();
    };
    return (
      <EmptyState
        imageSrc="no-post.png"
        messageText="Post Not Found"
        description="Sorry, we couldn't find the post you're looking for."
        otherClassName="pt-36 md:pt-48"
        buttonText="Try Again"
        Icon={RefreshCcw}
        iconClassName="h-5 w-5"
        handleClick={handleClick}
      />
    );
  }

  return <PostDetailsPage post={post} />;
}
