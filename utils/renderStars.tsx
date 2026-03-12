import { FaRegStar, FaStar, FaStarHalfStroke } from 'react-icons/fa6';

export const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <FaStar key={`full-${i}`} className="text-sm md:text-lg text-yellow-500" />,
    );
  }

  // Half star if available
  if (hasHalfStar) {
    stars.push(
      <FaStarHalfStroke key="half" className="text-sm md:text-lg text-yellow-500" />,
    );
  }

  // Empty stars (continue to 5 stars)
  const emptyStars = 5 - (fullStars + (hasHalfStar ? 1 : 0));
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <FaRegStar key={`empty-${i}`} className="text-sm md:text-lg text-gray-400" />,
    );
  }

  return stars;
};
