/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderRatingsStars } from '@/utils/renderRatingsStars';
import Button from '@/components/atoms/Button';
import ButtonLoading from '@/components/atoms/ButtonLoading';
import { useEffect, useState } from 'react';
import { useCartContext } from '@/context/CartContext';
import { useToast } from '@/lib/toast';
import useAPI from '@/Hooks/useAPI';
import { ItemProductProps, ReviewProps } from '@/interfaces';
import CommentCardSkeleton from '@/components/Skeletons/CommentCardSkeleton';
import CommentCard from '@/components/molecules/CommentCard';
import { useQueryClient } from '@tanstack/react-query';

const CommentsTabContent: React.FC<ItemProductProps> = ({
  product,
  isLoading,
}) => {
  const [reviews, setReviews] = useState<ReviewProps[]>([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const queryClient = useQueryClient();

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

      /**
       * 🧠 Meaning
       * Consider the product data stored in the cache as outdated.
        Therefore:
        ✔ React Query performs an automatic refetch
        ✔ Retrieves the data from Supabase again
        ✔ Updates all components that use the same query
       */
      queryClient.invalidateQueries({
        queryKey: ['supabase', 'products'],
      });

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
  const latestComment = reviews.slice(-1);
  const olderReviews = reviews.slice(0, -1);

  return (
    <>
      {reviews.length === 0 && <p className="text-gray-500">No reviews yet.</p>}

      {isLoading
        ? Array.from({ length: 1 }).map((_, i) => (
            <CommentCardSkeleton key={i} />
          ))
        : latestComment.map((review, index) => (
            <CommentCard key={index} review={review} />
          ))}

      {/* Toggle Older Reviews */}
      {olderReviews.length > 0 && (
        <div className="mt-2">
          <Button
            variant="text"
            handleClick={() => setShowAll((prev) => !prev)}
            otherClassName="px-0!"
          >
            {showAll ? 'Hide' : 'Show all'} reviews ({olderReviews.length})
          </Button>

          {showAll &&
            olderReviews.map((review, index) => (
              <CommentCard key={index} review={review} />
            ))}
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
    </>
  );
};

export default CommentsTabContent;
