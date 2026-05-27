/* eslint-disable @typescript-eslint/no-explicit-any */
// ProductInfoSection.tsx
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Button from '@/components/atoms/Button';
import ButtonLoading from '@/components/atoms/ButtonLoading';
import PrdocutGallery from '@/components/molecules/PrdocutGallery';
import { ProductInfoSectionProps } from '@/interfaces';
import { useToast } from '@/lib/toast';

const ProductInfoSection: React.FC<ProductInfoSectionProps> = ({
  product,
  addToCart,
  addIsLoading,
  user,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [targetSrc, setTargetSrc] = useState(
    product?.gallery?.[0]?.image || product?.image || '',
  );
  const [size, setSize] = useState('');
  const [errorMsgSize, setErrorMsgSize] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { showToast } = useToast();

  const handleSelectSize = (value: string) => {
    setSize(value);
    setErrorMsgSize(false);
  };

  const handleAddProduct = async (product: any) => {
    if (!size) {
      setErrorMsgSize(true);
      return;
    }
    await addToCart({ ...product, size, quantity }, user?.id);
    showToast(`Add ${product.title} (${size} x${quantity}) to cart`, 'success');
  };

  return (
    <div className="flex items-center gap-10 max-[992px]:flex-col sm:pt-[50px]">
      <div className="w-full md:w-[500px] mx-auto relative">
        <div className="max-sm:hidden absolute inset-0 -z-10 rounded-lg bg-(--forth-color) opacity-20 shadow-lg -rotate-3" />
        <div className="relative w-full h-[500px] max-md:h-[400px]">
          {!isLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-sm" />
          )}
          <Image
            key={targetSrc}
            src={targetSrc || '/assets/no-image-available.webp'}
            alt={product?.title}
            className={`w-full rounded-sm object-contain transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            fill
            onLoadingComplete={() => setIsLoaded(true)}
            sizes="(max-width: 768px) 100vw, 500px"
          />
        </div>
        {product?.gallery && product?.gallery?.length > 1 && (
          <PrdocutGallery
            productDetails={product}
            setTargetSrc={setTargetSrc}
          />
        )}
      </div>

      <div className="w-1/2 max-[992px]:w-full">
        <h2 className="text-3xl font-bold mb-[30px]">{product?.title}</h2>

        <div className="w-fit mb-2.5">
          <div className="flex items-end gap-2 mb-6">
            <span className="block text-[33px] font-bold leading-none">
              ${product?.price}.00
            </span>
            {product?.old_price && (
              <>
                <span className="text-xl line-through text-gray-400 leading-none">
                  ${product?.old_price}.00
                </span>
                <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-sm">
                  -{product?.discount}%
                </span>
              </>
            )}
          </div>

          <div className="flex items-start flex-wrap gap-2.5 mb-5">
            <input
              type="number"
              min="1"
              placeholder="Num"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
              className="w-24 h-11 rounded-md shadow-xs py-2 pl-3 border border-input focus:border-(--forth-color) outline-none"
            />
            <div>
              <Select value={size} onValueChange={handleSelectSize}>
                <SelectTrigger
                  id="size"
                  className={`w-30 !h-11 bg-background focus:!border-(--forth-color) ${errorMsgSize ? 'border-red-500' : ''}`}
                >
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {product?.size?.map((s: string, index: number) => (
                    <SelectItem key={index} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errorMsgSize && (
                <p className="text-sm text-red-500 mt-1">Please select size</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2.5 mb-10">
          <Button
            variant="primary"
            otherClassName="!py-2 !px-[15px]"
            handleClick={() => handleAddProduct(product)}
          >
            {addIsLoading ? <ButtonLoading text="Adding..." /> : 'Add To Cart'}
          </Button>
          <Button
            variant="outline"
            otherClassName="!py-2 !px-4 text-(--forth-color)! hover:text-white! border-(--forth-color)!"
          >
            Buy Now
          </Button>
        </div>

        <div>
          <h3 className="font-bold text-[22px] mb-3">Product Details</h3>
          <p className="text-(--seconde-color) text-[18px] leading-normal">
            {product?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoSection;
