/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';
import React, { useEffect, useState } from 'react';
import { renderRatingsStars } from '@/utils/renderRatingsStars';
import { useCartContext } from '@/context/CartContext';
import Button from '@/components/atoms/Button';
import ButtonLoading from '@/components/atoms/ButtonLoading';
import { useToast } from '@/lib/toast';
import useAPI from '@/Hooks/useAPI';
import { ItemProductProps, ReviewProps } from '@/interfaces';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import CardWrapper from '@/components/Template/CardWrapper';

const ProductReviews: React.FC<ItemProductProps> = ({ product }) => {
  const [reviews, setReviews] = useState<ReviewProps[]>([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const { user } = useCartContext();
  const { showToast } = useToast();
  const {
    edit,
    isLoading: editRatings,
    error: editRatingsError,
  } = useAPI('products');

  useEffect(() => {
    if (product) {
      setReviews(
        (product.comments || []).map((c: any, i: number) => ({
          user: c.user,
          rating: product.ratings?.[i] || 0,
          comment: c.comment,
        })),
      );
    }
  }, [product]);

  const handleSubmitReview = async () => {
    if (!newComment || newRating === 0) {
      showToast('Please add a rating and comment', 'error');
      return;
    }

    const newCommentObj = {
      user: user?.user_metadata?.display_name || 'Guest',
      comment: newComment,
    };

    const updatedProduct = {
      ratings: [...(product.ratings || []), newRating],
      comments: [...(product.comments || []), newCommentObj],
    };

    try {
      await edit(product?.id, updatedProduct);
      setReviews([
        ...reviews,
        {
          user: user?.user_metadata?.display_name || 'Guest',
          rating: newRating,
          comment: newComment,
        },
      ]);
      setNewComment('');
      setNewRating(0);
      showToast('Review added successfully');
    } catch {
      showToast(editRatingsError?.message || 'Failed to add review', 'error');
    }
  };

  // Reviews to display
  const latestReview = reviews.slice(-1);
  const olderReviews = reviews.slice(0, -1);

  return (
    <div className="mt-16">
      <h3 className="font-bold text-[22px] mb-3">Customer Reviews</h3>

      {reviews.length === 0 && <p className="text-gray-500">No reviews yet.</p>}

      {latestReview.map((review, index) => (
        <CardWrapper key={index} withFlex={false} contentClassName="p-0! mb-3">
          <div className="mb-2 p-3 border-b border-gray-400">
            <p className="font-semibold">{review.user}</p>
            <div className="flex items-center gap-1 mt-1">
              {renderRatingsStars(review.rating)}
            </div>
          </div>
          <p className="text-gray-700 p-3">{review.comment}</p>
        </CardWrapper>
      ))}

      {/* Toggle Older Reviews */}
      {olderReviews.length > 0 && (
        <div className="mt-2">
          <Button
            variant="text"
            handleClick={() => setShowAll((prev) => !prev)}
            otherClassName="px-0!"
          >
            {showAll
              ? `Hide reviews (${olderReviews.length})`
              : `Show all reviews (${olderReviews.length})`}
          </Button>

          {showAll && (
            <Accordion type="single" collapsible className="space-y-2 mt-2">
              {olderReviews.map((review, index) => (
                <AccordionItem key={index} value={`review-${index}`}>
                  <CardWrapper
                    withFlex={false}
                    contentClassName="cursor-pointer flex flex-col gap-2 p-0! pr-3!"
                  >
                    <AccordionTrigger>
                      <div className="flex flex-col gap-2 w-full">
                        {/* Header */}
                        <div className="p-3">
                          <p className="font-semibold text-base">
                            {review.user}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            {renderRatingsStars(review.rating)}
                          </div>
                        </div>

                        {/* Content */}
                        <AccordionContent>
                          <p className="text-gray-700 p-3">{review.comment}</p>
                        </AccordionContent>
                      </div>
                    </AccordionTrigger>
                  </CardWrapper>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      )}

      {/* Add Review Section */}
      <div className="mt-5">
        <h4 className="font-semibold mb-2">Add Your Review</h4>
        <div className="flex items-center gap-2 mb-2">
          {renderRatingsStars(newRating, setNewRating)}
        </div>
        <textarea
          className="w-full border rounded-md p-2 mb-2"
          placeholder="Write your comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button
          variant="primary"
          handleClick={handleSubmitReview}
          disabled={!newComment || newRating === 0 || editRatings}
        >
          {editRatings ? (
            <ButtonLoading text="Submitting..." />
          ) : (
            'Submit Review'
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProductReviews;
