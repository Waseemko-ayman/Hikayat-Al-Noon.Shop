import ProductRatingCard from '@/components/molecules/ProductRatingCard';
import React from 'react';

const RatingsSummary: React.FC<{ ratings: number[] }> = ({ ratings }) => {
  return (
    <div className="py-4">
      <ProductRatingCard ratings={ratings} />
    </div>
  );
};

export default RatingsSummary;
