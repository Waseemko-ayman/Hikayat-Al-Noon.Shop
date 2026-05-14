'use client';

import Layer from '@/components/atoms/Layer';
import CategoryCard from '@/components/molecules/CategoryCard';
import { BlogCategories } from '@/data';

const CategoriesSection = () => {
  return (
    <Layer className="md:py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Explore Categories
          </h2>
          <p className="mt-3 text-muted-foreground">
            Find inspiration across our curated fashion topics
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BlogCategories.map((category) => (
            <CategoryCard key={category.title} {...category} />
          ))}
        </div>
      </div>
    </Layer>
  );
};

export default CategoriesSection;
