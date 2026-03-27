import { CartCardseProps } from '@/interfaces';
import React from 'react';
import AnimatedWrapper from './FramerMotion/AnimatedWrapper';
import { FaTrash } from 'react-icons/fa6';
import Image from 'next/image';
import QuantityController from './QuantityController';
import Button from '../atoms/Button';
import CartCardSkeleton from '../Skeletons/CartCardSkeleton';

const CartCards: React.FC<CartCardseProps> = ({
  cartItems,
  updateQuantity,
  handleDelete,
  isLoading,
}) => {
  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4 lg:gap-6">
      {isLoading
        ? Array.from({ length: cartItems?.length }).map((_, index) => (
            <AnimatedWrapper key={index} custom={index}>
              <CartCardSkeleton />
            </AnimatedWrapper>
          ))
        : cartItems.map((item, index) => (
            <AnimatedWrapper key={item.id} custom={index}>
              <div className="relative bg-white border border-[#2d2d2d20] rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="relative flex flex-col sm:flex-row justify-between gap-4 p-4 md:p-5">
                  <div className="relative flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={150}
                      height={150}
                      className="rounded-lg"
                    />
                    <div className="flex flex-col justify-between text-center sm:text-left">
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-(--seconde-color) mb-1">
                          {item.title}
                        </h3>
                        {item.size && (
                          <p className="text-sm text-[var(--enjoy-gray-650)] mb-1 font-semibold">
                            Size:{' '}
                            {typeof item?.size === 'string'
                              ? item?.size
                              : item?.size?.join(', ')}
                          </p>
                        )}
                        {item.old_price ? (
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xl line-through text-gray-400">
                              ${item.old_price.toFixed(2)}
                            </span>
                            <span className="text-2xl font-bold text-(--forth-color)">
                              ${item.price && item.price.toFixed(2)}
                            </span>
                            <span className="bg-red-500 text-white text-xs px-1 py-0.5 rounded-sm">
                              -{item.discount}%
                            </span>
                          </div>
                        ) : (
                          <p className="text-2xl font-bold text-(--forth-color) mb-3">
                            ${item.price && item.price.toFixed(2)}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-center md:justify-start flex-wrap gap-3 mt-3">
                        <span className="text-sm text-[var(--enjoy-gray-650)] font-medium">
                          Quantity:
                        </span>
                        <QuantityController
                          item={item}
                          updateQuantity={updateQuantity}
                          otherClassName="gap-2 bg-gray-50 rounded-full px-3 py-1.5"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row sm:flex-col items-center md:items-end justify-between border-t md:border-t-0 md:border-l border-[#2d2d2d10] pt-4 md:pt-0 md:pl-6">
                    <Button
                      variant="circle"
                      handleClick={() =>
                        handleDelete(item?.id ?? 0, item.title)
                      }
                      otherClassName="group flex items-center justify-center w-10 h-10 border-none bg-red-50 hover:bg-red-500"
                      aria-label="Remove item"
                    >
                      <FaTrash className="text-red-500 group-hover:text-white transition-colors duration-300" />
                    </Button>

                    <div className="text-center md:text-right mt-4 md:mt-0">
                      <p className="text-xs text-[var(--enjoy-gray-650)] mb-1 uppercase tracking-wider">
                        Subtotal
                      </p>
                      <p className="text-2xl md:text-3xl font-bold text-(--seconde-color)">
                        $
                        {item?.price && item?.quantity
                          ? (item.price * item.quantity).toFixed(2)
                          : 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedWrapper>
          ))}
    </div>
  );
};

export default CartCards;
