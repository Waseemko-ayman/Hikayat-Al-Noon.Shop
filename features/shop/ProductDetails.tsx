/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useState } from 'react';
import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Layer from '@/components/atoms/Layer';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import PrdocutGallery from '@/components/molecules/PrdocutGallery';
import RandomFeaturedProducts from '@/components/molecules/RandomFeaturedProducts';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCartContext } from '@/context/CartContext';
import { ProductCardProps } from '@/interfaces';
import { useToast } from '@/lib/toast';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import useSupabaseClient from '@/Hooks/useSupabaseClient';
import ButtonLoading from '@/components/atoms/ButtonLoading';

const ProductDetailsPage = ({ product }: { product: ProductCardProps }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [targetSrc, setTargetSrc] = useState('');
  const [size, setSize] = useState('');
  const [errorMsgSize, setErrorMsgSize] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const pathname = usePathname();
  const pathParts = pathname.split('/').slice(1);

  // Notifications
  const { showToast } = useToast();

  // Cart Context
  const { addToCart, user, isLoading: addIsLoading } = useCartContext();

  // Filter featured products
  const {
    data: featuredProducts,
    isLoading,
    error,
  } = useSupabaseClient(
    'products',
    { category: product.category }, // filter by category
  );

  // Shuffle the array randomly
  let randomFour: ProductCardProps[] = [];
  if (featuredProducts && featuredProducts.length > 0) {
    const shuffled = [...featuredProducts].sort(() => 0.5 - Math.random());
    randomFour = shuffled.slice(0, 4);
  }

  // Pathname Settings
  let accumulatedPath = '';

  const breadcrumbs: { label: string; href: string }[] = [
    { label: 'Home', href: '/' },
  ];

  for (let i = 0; i < pathParts.length; i++) {
    const part = pathParts[i];
    accumulatedPath = `/${part}`;
    breadcrumbs.push({
      label: part.slice(0, 1).toUpperCase() + part.slice(1),
      href: accumulatedPath,
    });
  }

  const handleSelectSize = (value: string) => {
    setSize(value);
    setErrorMsgSize(false);
  };

  const handleAddProduct = async (product: any) => {
    if (!size) {
      showToast('Select size first', 'error');
      setErrorMsgSize(true);
      return;
    }

    await addToCart({ ...product, size, quantity }, user.id);
    showToast(`Add ${product.title} (${size} x${quantity}) to cart`);
  };

  // Set initial targetSrc when product changes
  useEffect(() => {
    if (product?.gallery?.length) {
      setTargetSrc(product.gallery[0]?.image);
    }
  }, [product]);

  return (
    <Layer>
      <Container>
        <Breadcrumb>
          <BreadcrumbList className="flex items-center md:pl-12">
            {breadcrumbs.map((crumb, index) => (
              <AnimatedWrapper
                key={index}
                custom={index}
                direction="x"
                distance={40}
              >
                <BreadcrumbItem>
                  {index === breadcrumbs.length - 1 ? (
                    <span className="text-(--forth-color) text-base truncate">
                      {crumb.label
                        .split('-')
                        .map(
                          (item) =>
                            item.slice(0, 1).toUpperCase() +
                            item.slice(1).toLowerCase(),
                        )
                        .join(' ')}
                    </span>
                  ) : (
                    <BreadcrumbLink
                      href={crumb.href}
                      className="hover:text-(--forth-color) transtion-all duration-300"
                    >
                      {crumb.label}
                    </BreadcrumbLink>
                  )}
                  {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                </BreadcrumbItem>
              </AnimatedWrapper>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center gap-10 max-[992px]:flex-col sm:pt-[50px]">
          <div className="w-full md:w-[500px] mx-auto relative">
            {/* Layer / Background behind the image */}
            <div className="max-sm:hidden absolute inset-0 -z-10 rounded-lg bg-(--forth-color) opacity-20 shadow-lg -rotate-3" />

            <div className="relative w-full h-[500px] max-md:h-[400px]">
              {!isLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-sm" />
              )}
              <Image
                key={targetSrc}
                src={
                  targetSrc ||
                  product?.image ||
                  '/assets/no-image-available.webp'
                }
                alt={product?.title}
                className={`w-full rounded-sm object-contain transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                fill
                onLoadingComplete={() => setIsLoaded(true)}
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>

            {product && product?.gallery && product?.gallery?.length > 1 && (
              <PrdocutGallery
                productDetails={product}
                setTargetSrc={setTargetSrc}
              />
            )}
          </div>
          <div className="w-1/2 max-[992px]:w-full">
            <h2 className="text-3xl font-bold mb-[30px]">{product?.title}</h2>
            <div className="w-fit mb-2.5">
              <div className="flex items-end gap-2 mb-5">
                <span className="block text-[33px] font-bold">
                  ${product?.price}.00
                </span>

                {product?.old_price && (
                  <>
                    <span className="text-xl line-through text-gray-400">
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
                      {product?.size?.map((size: string, index: number) => (
                        <SelectItem key={index} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errorMsgSize && (
                    <p className="text-sm text-red-500 mt-1">
                      Please select size
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center flex-wrap gap-2.5 mb-10">
              <div className="flex items-center gap-2.5">
                <Button
                  variant="primary"
                  otherClassName="!py-2 !px-[15px]"
                  handleClick={() => product && handleAddProduct(product)}
                >
                  {addIsLoading ? (
                    <ButtonLoading text="Adding..." />
                  ) : (
                    'Add To Cart'
                  )}
                </Button>
                <Button variant="primary" otherClassName="!py-2 !px-[15px]">
                  Buy Now
                </Button>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-[22px] mb-3">Product Details</h3>
              <p className="text-(--seconde-color) text-[18px] leading-normal">
                {product?.description}
              </p>
            </div>
          </div>
        </div>
        <RandomFeaturedProducts
          error={error}
          randomFour={randomFour}
          isLoading={isLoading}
        />
      </Container>
    </Layer>
  );
};

export default ProductDetailsPage;
