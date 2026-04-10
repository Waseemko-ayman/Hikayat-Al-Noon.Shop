'use client';
import CardWrapper from '@/components/Template/CardWrapper';
import { renderRatingsStars } from '@/utils/renderRatingsStars';
import { ReviewProps } from '@/interfaces';

const CommentCard = ({ review }: { review: ReviewProps }) => {
  return (
    <CardWrapper
      withFlex={false}
      contentClassName="p-0! mb-4 transition-all duration-200 rounded-xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50/50">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600">
            {review.user?.charAt(0).toUpperCase()}
          </div>

          <div>
            <p className="font-semibold text-sm">{review.user}</p>
            <div className="flex items-center gap-1 mt-1">
              {renderRatingsStars(review.rating)}
            </div>
          </div>
        </div>

        {/* Rating Badge */}
        <span className="text-xs font-medium bg-black text-white px-2 py-1 rounded-md">
          {review.rating}.0
        </span>
      </div>

      {/* Comment */}
      <div className="p-4 pb-0">
        <p className="text-gray-700 text-sm leading-relaxed">
          {review.comment}
        </p>
      </div>
    </CardWrapper>
  );
};

export default CommentCard;
