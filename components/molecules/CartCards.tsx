import { CartCardseProps } from '@/interfaces';
import React from 'react';
import AnimatedWrapper from './FramerMotion/AnimatedWrapper';
import CartCardSkeleton from '../Skeletons/CartCardSkeleton';
import CartCard from './CartCard';

const CartCards: React.FC<CartCardseProps> = ({
  cartItems,
  updateQuantity,
  handleDelete,
  isLoading,
}) => {
  return (
    <div className="relative grid grid-cols-1 gap-2 md:gap-4 lg:gap-6">
      {isLoading
        ? Array.from({ length: cartItems?.length }).map((_, index) => (
            <AnimatedWrapper key={index} custom={index}>
              <CartCardSkeleton />
            </AnimatedWrapper>
          ))
        : cartItems.map((item, index) => (
            <AnimatedWrapper key={item.id} custom={index}>
              <CartCard
                item={item}
                updateQuantity={updateQuantity}
                handleDelete={handleDelete}
              />
            </AnimatedWrapper>
          ))}
    </div>
  );
};

export default CartCards;
