import React from 'react';
import { renderRatingsStars } from '@/utils/renderRatingsStars';
import { RatingAverageProps } from '@/interfaces';

const RatingAverage: React.FC<RatingAverageProps> = ({ avg, total }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full lg:max-w-[150px] lg:border-r border-gray-300 px-3">
      <p className="text-4xl font-bold">{avg}</p>

      <div className="flex mt-1">
        {renderRatingsStars(Number(avg), undefined, 'pointer-events-none')}
      </div>

      <p className="text-sm text-gray-500 mt-1">{total} reviews</p>
    </div>
  );
};

export default RatingAverage;
