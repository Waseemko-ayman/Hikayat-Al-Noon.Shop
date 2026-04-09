import { renderRatingsStars } from '@/utils/renderRatingsStars';
import React from 'react';

const RatingsSummary: React.FC<{ ratings: number[] }> = ({ ratings }) => {
  const total = ratings.length;
  const breakdown = {
    excellent: ratings.filter((r) => r === 5).length,
    good: ratings.filter((r) => r === 4).length,
    average: ratings.filter((r) => r === 3).length,
    poor: ratings.filter((r) => r === 2).length,
    bad: ratings.filter((r) => r === 1).length,
  };
  const avg =
    total > 0 ? (ratings.reduce((a, b) => a + b, 0) / total).toFixed(1) : '0.0';

  const ratingLabels = [
    {
      id: 'excellent',
      label: 'Excellent',
      value: breakdown.excellent,
      color: 'bg-green-500',
    },
    { id: 'good', label: 'Good', value: breakdown.good, color: 'bg-lime-400' },
    {
      id: 'average',
      label: 'Average',
      value: breakdown.average,
      color: 'bg-yellow-400',
    },
    {
      id: 'poor',
      label: 'Poor',
      value: breakdown.poor,
      color: 'bg-orange-500',
    },
    { id: 'bad', label: 'Bad', value: breakdown.bad, color: 'bg-red-500' },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 max-md:py-4">
      {/* Left (Average) */}
      <div className="flex flex-col items-center justify-center min-w-[120px] md:border-r border-gray-300 px-6">
        <p className="text-4xl font-bold">{avg}</p>
        <div className="flex mt-1">
          {renderRatingsStars(Number(avg), undefined, 'pointer-events-none')}
        </div>
        <p className="text-sm text-gray-500 mt-1">{total} reviews</p>
      </div>

      {/* Right (Breakdown) */}
      <div className="flex-1 space-y-2">
        {ratingLabels.map((item) => (
          <div key={item.id} className="flex items-center gap-3 text-sm">
            <span className="w-[60px] text-gray-600">{item.label}</span>

            <div className="flex-1">
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className={`h-full rounded-full transition-all ${item.color}`}
                  style={{
                    width: total > 0 ? `${(item.value / total) * 100}%` : '0%',
                  }}
                />
              </div>
            </div>

            <span className="w-[40px] text-right text-gray-500">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingsSummary;
