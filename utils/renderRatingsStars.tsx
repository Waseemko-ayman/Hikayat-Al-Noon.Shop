import { FaStar } from 'react-icons/fa6';

export const renderRatingsStars = (
  rating: number,
  onClick?: (rating: number) => void,
) =>
  [1, 2, 3, 4, 5].map((star) => (
    <FaStar
      key={star}
      className={`cursor-pointer text-xl transition ${
        star <= rating ? 'text-yellow-500' : 'text-gray-300'
      }`}
      onClick={() => onClick && onClick(star)}
    />
  ));
