'use client';

import { CategoryCardProps } from '@/interfaces';
import { Lightbulb, TrendingUp, Shirt, BookOpen } from 'lucide-react';
import CardWrapper from '../Template/CardWrapper';

const iconMap = {
  tips: Lightbulb,
  trends: TrendingUp,
  outfits: Shirt,
  guides: BookOpen,
};

const CategoryCard = ({
  title,
  description,
  icon,
  count,
}: CategoryCardProps) => {
  const Icon = iconMap[icon];

  return (
    <CardWrapper withFlex={false} otherClassName="hover:-translate-y-1">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-(--forth-color) group-hover:text-white">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-card-foreground transition-colors duration-300 group-hover:text-primary">
        {title}
      </h3>
      <p className="mb-3 text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
      <span className="text-xs font-medium text-(--forth-color)">
        {count} articles
      </span>
    </CardWrapper>
  );
};

export default CategoryCard;
