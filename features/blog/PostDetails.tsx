'use client';
import supabase from '@/config/api';
import { PostsProps } from '@/interfaces';
import { Calendar, Clock } from 'lucide-react';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { fadeInUp } from '@/lib/context';
import { calculateReadTime } from '@/utils/calculateReadTime';

const PostDetailsPage = ({ post }: { post: PostsProps }) => {
  const readTime = calculateReadTime(post?.excerpt ?? '');

  useEffect(() => {
    const incrementViews = async () => {
      await supabase.rpc('increment_post_views', {
        post_id: post.id,
      });
    };

    incrementViews();
  }, [post.id]);

  return (
    <article className="pt-20">
      {/* Hero Section */}
      <header className="relative">
        {/* Hero Image */}
        <motion.div
          className="relative aspect-[21/9] w-full overflow-hidden md:aspect-[3/1]"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={post.image || ''}
            alt={post.title}
            fill
            priority
            className="object-cover object-[50%_30%]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </motion.div>

        {/* Header Content */}
        <div className="relative mx-auto max-w-3xl px-6 -mt-10 md:-mt-40">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-(--forth-color) text-white uppercase tracking-wider text-xs font-semibold px-3 py-2 w-fit rounded-md"
          >
            {post.category}
          </motion.div>

          <motion.h1
            className="text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl text-balance"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {post.title}
          </motion.h1>

          <motion.div
            className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <span className="flex items-center gap-1.5">
              <Calendar className="size-4" />
              {post.date}
            </span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" />
              {readTime}
            </span>
          </motion.div>
        </div>
      </header>

      {/* Article Content */}
      <main className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        {/* Excerpt / Introduction */}
        <motion.p
          className="text-lg leading-relaxed text-muted-foreground md:text-xl font-medium border-l-4 border-(--forth-color) pl-6 mb-12"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {post.excerpt}
        </motion.p>

        {/* Article Body */}
        <motion.div
          className="prose prose-lg prose-neutral dark:prose-invert max-w-none"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {post.body}
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer
        className="border-t border-border bg-muted/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="mx-auto max-w-3xl px-6 py-12">
          <p className="text-muted-foreground text-center">
            Thanks for reading! Share this article if you found it helpful.
          </p>
        </div>
      </motion.footer>
    </article>
  );
};

export default PostDetailsPage;
