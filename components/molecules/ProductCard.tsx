'use client';
import Image from 'next/image';
import { useState } from 'react';
import Button from '../atoms/Button';
import { FaCartShopping } from 'react-icons/fa6';
import { useToast } from '@/lib/toast';
import { useCartContext } from '@/context/CartContext';
import { ProductCardProps } from '@/interfaces';
import { GlowingEffect } from '../ui/glowing-effect';
import ResponsiveDialogDrawer from '../organism/ResponsiveDialogDrawer';
import useIsMobile from '@/Hooks/useIsMobile';
import ProductDetailsInDialog from './ProductDetailsInDialog';
import { renderStars } from '@/utils/renderStars';

const ProductCard = ({
  productData,
  handleClick,
  otherClassName,
}: ProductCardProps) => {
  const [open, setOpen] = useState(false);

  const { image, title, trade_mark, price, old_price, discount, ratings } =
    productData;

  // Contexts
  const { addToCart, user, isLoading } = useCartContext();
  const { showToast } = useToast();
  // Hooks
  const isMobile = useIsMobile();

  // حساب متوسط النجوم من الـ stars في كل rating object
  const averageRating =
    ratings && ratings?.length > 0
      ? ratings.reduce((sum: number, r: number) => sum + r, 0) / ratings.length
      : 0; // بدل null حطينا 0

  return (
    <div
      className={`relative max-w-full p-3.5 border border-[#cce7d0] rounded-[20px] shadow-[20px_20px_34px_rgb(0, 0, 0, 0.03)] hover:shadow-[10px_10px_54px_#ddd] hover:scale-[1.02] cursor-pointer transition-all duration-300 ${otherClassName}`}
    >
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />
      <div onClick={handleClick} className="cursor-pointer">
        <div className="relative">
          <div className="relative w-full max-w-[500px] md:max-w-[500px] aspect-square">
            <Image
              src={image || '/assets/no-image-available.webp'}
              alt={title}
              title={title}
              fill
              className="object-cover rounded-[20px]"
            />
          </div>
          {discount && (
            <span className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-semibold px-2 py-1 rounded-lg shadow-md z-10">
              rival %{discount}
            </span>
          )}
        </div>
        <div>
          <span className="text-base text-(--first-color)">
            {trade_mark && trade_mark}
          </span>
          <h3 className="text-(--forth-color) text-base mt-2 font-bold">
            {title}
          </h3>

          <div className="flex items-center gap-1">
            {renderStars(averageRating)}
            <span className="ml-1 font-semibold">
              {averageRating.toFixed(1)}
            </span>
          </div>

          <div className={old_price ? 'flex items-center gap-2' : ''}>
            {price && (
              <h5 className="text-(--forth-color) text-lg font-bold">
                ${price}
              </h5>
            )}
            {old_price && (
              <h4
                className={`font-semibold ${
                  price ? 'line-through text-gray-400 text-sm' : 'text-[15px]'
                }`}
              >
                ${old_price}
              </h4>
            )}
          </div>
        </div>
      </div>
      <ResponsiveDialogDrawer
        trigger={
          <Button
            variant="circle"
            otherClassName="absolute bottom-2.5 right-2.5 flex items-center justify-center"
            ariaLabel={`Add ${productData?.title} to cart`}
            handleClick={(e) => {
              e.stopPropagation();
              addToCart?.(productData, user.id);
              showToast(`Add ${productData?.title} to cart`);
              setOpen(true);
            }}
          >
            <FaCartShopping size="20px" />
          </Button>
        }
        open={open}
        setOpen={setOpen}
        isMobile={isMobile}
      >
        {open && productData && (
          <ProductDetailsInDialog
            addToCart={addToCart}
            user={user}
            productData={productData}
            showToast={showToast}
            isLoading={isLoading}
          />
        )}
      </ResponsiveDialogDrawer>
    </div>
  );
};

export default ProductCard;
