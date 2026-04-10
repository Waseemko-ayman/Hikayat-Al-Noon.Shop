import { RatingBreakdownItemProps } from '@/interfaces';
import React from 'react';
import { FaStar } from 'react-icons/fa6';

const RatingBreakdownItem: React.FC<RatingBreakdownItemProps> = ({
  label,
  rating,
  value,
  total,
  color,
}) => {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-[60px] text-gray-600 text-end font-semibold">
        {label}
      </span>

      <div className="flex items-center gap-1 text-gray-400 text-xs px-2">
        <span>{rating}</span>
        <FaStar size={10} />
      </div>

      <div className="flex-1 shrink-0">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className={`h-full rounded-full transition-all ${color}`}
            style={{
              width: total > 0 ? `${(value / total) * 100}%` : '0%',
            }}
          />
        </div>
      </div>

      <span className="w-[20px] text-right text-gray-500 font-semibold">
        {value}
      </span>
    </div>
  );
};

export default RatingBreakdownItem;
