'use client';

import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { BlogPostCardProps } from '@/interfaces';
import CardWrapper from '../Template/CardWrapper';
import { calculateReadTime } from '@/utils/calculateReadTime';
import Button from '../atoms/Button';

const BlogPostCard = ({
  title,
  excerpt,
  image,
  category,
  date,
  href,
}: BlogPostCardProps) => {
  const readTime = calculateReadTime(excerpt ?? '');
  return (
    <CardWrapper
      withFlex={false}
      contentClassName="p-0!"
      otherClassName="group overflow-hidden hover:-translate-y-1"
    >
      <div className="flex flex-col h-full">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="absolute left-4 top-4 rounded-full bg-(--third-color) px-3 py-1 text-xs font-semibold text-accent-foreground">
            {category}
          </span>
        </div>
        <div className="flex-1 p-5 pb-2!">
          <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {readTime}
            </span>
          </div>
          <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-card-foreground transition-colors duration-300 group-hover:text-primary">
            {title}
          </h3>
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
            {excerpt}
          </p>
        </div>
        <Button
          variant="ghost"
          href={href}
          otherClassName="p-5! pt-0! w-fit inline-flex items-center gap-2 text-sm font-medium text-(--forth-color) hover:bg-transparent hover:underline transition-all duration-300 group-hover:gap-3"
        >
          Read More
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>
    </CardWrapper>
  );
};

export default BlogPostCard;
