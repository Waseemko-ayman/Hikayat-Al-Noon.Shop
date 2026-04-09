'use client';

import React from 'react';
import { ItemProductProps } from '@/interfaces';
import CardWrapper from '@/components/Template/CardWrapper';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import TabsNavigation from '@/components/ui/display/TabsNavigation';
import CommentsTabContent from './Tabs/CommentsTabContent';
import RatingsSummary from './Tabs/RatingsSummary';
import RatingsSummarySkeleton from '@/components/Skeletons/RatingsSummarySkeleton';
import { ProductReviewsTabsData } from '@/data';

const ProductReviews: React.FC<ItemProductProps> = ({ product, isLoading }) => {
  return (
    <div className="mt-16">
      <h3 className="font-bold text-[22px] mb-3">Customer Reviews</h3>
      <CardWrapper contentClassName="p-0!" otherClassName="hover:shadow-none">
        <Tabs defaultValue="ratingsSummary" className="w-full">
          <TabsNavigation tabs={ProductReviewsTabsData} />

          {/* Comments */}
          <TabsContent value="comments" className="p-3 md:p-5">
            <CommentsTabContent product={product} isLoading={isLoading} />
          </TabsContent>

          {/* Ratings */}
          <TabsContent value="ratingsSummary" className="p-3 md:p-5">
            {isLoading ? (
              <RatingsSummarySkeleton />
            ) : (
              <RatingsSummary ratings={product?.ratings || []} />
            )}
          </TabsContent>
        </Tabs>
      </CardWrapper>
    </div>
  );
};

export default ProductReviews;
