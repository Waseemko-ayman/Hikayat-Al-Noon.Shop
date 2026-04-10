import { ProductRatingCardProps } from '@/interfaces';
import RatingAverage from '../atoms/RatingAverage';
import RatingBreakdownItem from './RatingBreakdownItem';
import Image from 'next/image';

const ProductRatingCard: React.FC<ProductRatingCardProps> = ({
  product,
  infoHeader = false,
  ratings,
}) => {
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
      label: 'Excellent',
      value: breakdown.excellent,
      rating: 5,
      color: 'bg-green-500',
    },
    { label: 'Good', value: breakdown.good, rating: 4, color: 'bg-lime-400' },
    {
      label: 'Average',
      value: breakdown.average,
      rating: 3,
      color: 'bg-yellow-400',
    },
    { label: 'Poor', value: breakdown.poor, rating: 2, color: 'bg-orange-500' },
    { label: 'Bad', value: breakdown.bad, rating: 1, color: 'bg-red-500' },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      {product && infoHeader && (
        <div className="flex items-center gap-3 mb-4">
          <Image
            src={product.image}
            alt={product.title}
            width={50}
            height={50}
            className="rounded-lg max-sm:w-20 max-sm:h-20"
          />
          <div>
            <h3 className="font-semibold text-lg">{product.title}</h3>
            <p className="text-sm text-gray-500">{total} reviews</p>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        <RatingAverage avg={avg} total={total} />

        <div className="flex-1 space-y-2">
          {ratingLabels.map((item, i) => (
            <RatingBreakdownItem
              key={i}
              label={item.label}
              rating={item.rating}
              value={item.value}
              total={total}
              color={item.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductRatingCard;
